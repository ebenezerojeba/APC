import Member from '../models/Member.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';


const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// GET /api/admin/members
const getMembers = catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    status,
    lga,
    interests,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = req.query;

  const filter = {};

  // LGA admins are restricted to their LGA
  if (req.lgaFilter) filter.lga = req.lgaFilter;
  else if (lga) filter.lga = lga;

  if (status) filter.status = status;
  if (interests) filter.interests = { $in: interests.split(',') };

  // Search by name, email, or phone
  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [
      { firstName: regex },
      { lastName: regex },
      { email: regex },
      { phone: regex },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const [members, total] = await Promise.all([
    Member.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-ipAddress -userAgent') // Omit tracking fields in list view
      .populate('assignedTo', 'name email'),
    Member.countDocuments(filter),
  ]);

  res.json({
    status: 'success',
    data: {
      members,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
        hasNext: skip + members.length < total,
      },
    },
  });
});

// GET /api/admin/members/:id
const getMember = catchAsync(async (req, res, next) => {
  const member = await Member.findById(req.params.id)
    .populate('assignedTo', 'name email role');

  if (!member) return next(new AppError('Member not found', 404));

  // LGA admin access restriction
  if (req.lgaFilter && member.lga !== req.lgaFilter) {
    return next(new AppError('You do not have access to this member.', 403));
  }

  res.json({ status: 'success', data: { member } });
});

// PATCH /api/admin/members/:id/status
const updateMemberStatus = catchAsync(async (req, res, next) => {
  const { status, adminNotes } = req.body;

  const member = await Member.findById(req.params.id);
  if (!member) return next(new AppError('Member not found', 404));

  if (req.lgaFilter && member.lga !== req.lgaFilter) {
    return next(new AppError('You do not have access to this member.', 403));
  }

  const updates = { status };
  if (adminNotes !== undefined) updates.adminNotes = adminNotes;
  if (status === 'contacted' && !member.contactedAt) updates.contactedAt = new Date();
  updates.assignedTo = req.admin._id;

  const updated = await Member.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  logger.info(`Admin ${req.admin.name} updated member ${updated.fullName} status → ${status}`);

  res.json({
    status: 'success',
    message: 'Member status updated successfully',
    data: { member: updated },
  });
});

// DELETE /api/admin/members/:id
const deleteMember = catchAsync(async (req, res, next) => {
  const member = await Member.findById(req.params.id);
  if (!member) return next(new AppError('Member not found', 404));

  if (req.lgaFilter && member.lga !== req.lgaFilter) {
    return next(new AppError('You do not have access to this member.', 403));
  }

  await member.deleteOne();
  logger.warn(`Admin ${req.admin.name} deleted member: ${member.fullName} (${member.email})`);

  res.json({ status: 'success', message: 'Member deleted successfully', data: null });
});

// GET /api/admin/members/stats
const getMemberStats = catchAsync(async (req, res) => {
  const lgaFilter = req.lgaFilter ? { lga: req.lgaFilter } : {};

  const [
    statusBreakdown,
    lgaBreakdown,
    interestBreakdown,
    registrationTrend,
    totals,
  ] = await Promise.all([
    // Status distribution
    Member.aggregate([
      { $match: lgaFilter },
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),

    // LGA distribution (top 10)
    Member.aggregate([
      { $match: lgaFilter },
      { $group: { _id: '$lga', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),

    // Interest breakdown
    Member.aggregate([
      { $match: lgaFilter },
      { $unwind: { path: '$interests', preserveNullAndEmptyArrays: false } },
      { $group: { _id: '$interests', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),

    // Daily registration trend (last 30 days)
    Member.aggregate([
      {
        $match: {
          ...lgaFilter,
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),

    // Summary totals
    Member.aggregate([
      { $match: lgaFilter },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
          contacted: { $sum: { $cond: [{ $eq: ['$status', 'contacted'] }, 1, 0] } },
          active: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
          thisWeek: {
            $sum: {
              $cond: [
                { $gte: ['$createdAt', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)] },
                1,
                0,
              ],
            },
          },
        },
      },
    ]),
  ]);

  res.json({
    status: 'success',
    data: {
      totals: totals[0] || { total: 0, pending: 0, contacted: 0, active: 0, thisWeek: 0 },
      statusBreakdown,
      lgaBreakdown,
      interestBreakdown,
      registrationTrend,
    },
  });
});

// GET /api/admin/members/export (CSV export)
const exportMembers = catchAsync(async (req, res) => {
  const filter = req.lgaFilter ? { lga: req.lgaFilter } : {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.lga && !req.lgaFilter) filter.lga = req.query.lga;

  const members = await Member.find(filter)
    .select('firstName lastName email phone lga ward interests status createdAt')
    .sort({ createdAt: -1 })
    .lean();

  // Build CSV
  const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'LGA', 'Ward', 'Interests', 'Status', 'Registered At'];
  const rows = members.map(m => [
    m.firstName,
    m.lastName,
    m.email,
    m.phone,
    m.lga,
    m.ward || '',
    (m.interests || []).join('; '),
    m.status,
    new Date(m.createdAt).toISOString(),
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const filename = `apc-members-${new Date().toISOString().split('T')[0]}.csv`;

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(csv);

  logger.info(`Admin ${req.admin.name} exported members CSV (${members.length} rows)`);
});

export {
  getMembers,
  getMember,
  updateMemberStatus,
  deleteMember,
  getMemberStats,
  exportMembers,
};
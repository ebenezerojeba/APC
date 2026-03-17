import News from '../models/News.js';

/* ─────────────────────────────────────────
   PUBLIC
───────────────────────────────────────── */

/**
 * GET /api/news
 * Public — returns published articles for the frontend News component.
 * Supports:  ?limit=5  ?category=  ?search=  ?page=
 */
export const getPublicNews = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [{ title: regex }, { excerpt: regex }, { author: regex }];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [articles, total] = await Promise.all([
      News.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select('-publishedBy -updatedBy -__v')
        .lean(),
      News.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: articles,
      pagination: {
        total,
        page:  Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    console.error('[getPublicNews]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/**
 * GET /api/news/:id
 * Public — single article by ID.
 */
export const getPublicNewsById = async (req, res) => {
  try {
    const article = await News.findById(req.params.id)
      .select('-publishedBy -updatedBy -__v')
      .lean();

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    return res.json({ success: true, data: article });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid article ID.' });
    }
    console.error('[getPublicNewsById]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/* ─────────────────────────────────────────
   ADMIN
───────────────────────────────────────── */

/**
 * GET /api/admin/news
 * Admin — paginated list with full fields.
 */
export const getAdminNews = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [{ title: regex }, { excerpt: regex }, { author: regex }];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [articles, total] = await Promise.all([
      News.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate('publishedBy', 'name email role')
        .populate('updatedBy',   'name email role')
        .lean(),
      News.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: articles,
      pagination: {
        total,
        page:  Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    console.error('[getAdminNews]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/**
 * GET /api/admin/news/stats
 * Admin — category counts + total.
 */
export const getNewsStats = async (req, res) => {
  try {
    const [total, officialStatement, mobilization, registration, obituary] = await Promise.all([
      News.countDocuments(),
      News.countDocuments({ category: 'Official Statement' }),
      News.countDocuments({ category: 'Mobilization' }),
      News.countDocuments({ category: 'Registration' }),
      News.countDocuments({ category: 'Obituary' }),
    ]);

    return res.json({
      success: true,
      data: { total, officialStatement, mobilization, registration, obituary },
    });
  } catch (err) {
    console.error('[getNewsStats]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/**
 * GET /api/admin/news/:id
 * Admin — single article with populated admin refs.
 */
export const getAdminNewsById = async (req, res) => {
  try {
    const article = await News.findById(req.params.id)
      .populate('publishedBy', 'name email role')
      .populate('updatedBy',   'name email role')
      .lean();

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    return res.json({ success: true, data: article });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid article ID.' });
    }
    console.error('[getAdminNewsById]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/**
 * POST /api/admin/news
 * Admin — create a new article.
 */
export const createNews = async (req, res) => {
  try {
    const { title, excerpt, category, date, author, role, paragraphs } = req.body;

    // Validate required fields explicitly (mirrors appointmentController pattern)
    if (!title?.trim() || !excerpt?.trim() || !author?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title, excerpt, and author are required.',
      });
    }

    if (!Array.isArray(paragraphs) || !paragraphs.some((p) => p?.trim())) {
      return res.status(400).json({
        success: false,
        message: 'At least one non-empty paragraph is required.',
      });
    }

    const article = await News.create({
      title:      title.trim(),
      excerpt:    excerpt.trim(),
      category:   category || 'Official Statement',
      date:       date || new Date().toISOString().split('T')[0],
      author:     author.trim(),
      role:       role?.trim() || '',
      paragraphs: paragraphs.map((p) => p.trim()).filter(Boolean),
      publishedBy: req.admin._id,
    });

    return res.status(201).json({
      success: true,
      message: 'Article published successfully.',
      data: article,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: errors[0] });
    }
    console.error('[createNews]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/**
 * PUT /api/admin/news/:id
 * Admin — full update of an existing article.
 */
export const updateNews = async (req, res) => {
  try {
    const { title, excerpt, category, date, author, role, paragraphs } = req.body;

    if (!title?.trim() || !excerpt?.trim() || !author?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title, excerpt, and author are required.',
      });
    }

    if (!Array.isArray(paragraphs) || !paragraphs.some((p) => p?.trim())) {
      return res.status(400).json({
        success: false,
        message: 'At least one non-empty paragraph is required.',
      });
    }

    const article = await News.findByIdAndUpdate(
      req.params.id,
      {
        title:      title.trim(),
        excerpt:    excerpt.trim(),
        category:   category || 'Official Statement',
        date:       date || new Date().toISOString().split('T')[0],
        author:     author.trim(),
        role:       role?.trim() || '',
        paragraphs: paragraphs.map((p) => p.trim()).filter(Boolean),
        updatedBy:  req.admin._id,
      },
      { new: true, runValidators: true }
    )
      .populate('publishedBy', 'name email role')
      .populate('updatedBy',   'name email role');

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    return res.json({
      success: true,
      message: 'Article updated successfully.',
      data: article,
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid article ID.' });
    }
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: errors[0] });
    }
    console.error('[updateNews]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/**
 * DELETE /api/admin/news/:id
 * Admin (super_admin only) — permanently delete an article.
 */
export const deleteNews = async (req, res) => {
  try {
    const article = await News.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    return res.json({ success: true, message: 'Article deleted.' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid article ID.' });
    }
    console.error('[deleteNews]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};
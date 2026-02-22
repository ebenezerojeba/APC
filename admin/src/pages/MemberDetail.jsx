import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft, Mail, Phone, MapPin, Tag, MessageSquare,
  Calendar, Globe, CheckCircle, Trash2, Save, Clock,
} from 'lucide-react';
import { format } from 'date-fns';
import api from '../utils/api.js';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore.js';

const STATUS_CONFIG = {
  pending:   { label: 'Pending',   cls: 'bg-amber-100 text-amber-800 border-amber-200' },
  contacted: { label: 'Contacted', cls: 'bg-blue-100 text-blue-800 border-blue-200'   },
  active:    { label: 'Active',    cls: 'bg-green-100 text-green-800 border-green-200' },
  inactive:  { label: 'Inactive',  cls: 'bg-gray-100 text-gray-600 border-gray-200'   },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.inactive;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
};

const InfoRow = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={15} className="text-gray-500" />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-sm text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
};

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { admin } = useAuthStore();

  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [notes, setNotes] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { data: member, isLoading, error } = useQuery({
    queryKey: ['member', id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/members/${id}`);
      return data.data.member;
    },
  });

  // ── Sync local form state whenever member data loads or refreshes ──────────
  // This replaces the removed onSuccess callback from TanStack Query v5
  useEffect(() => {
    if (member) {
      setSelectedStatus(member.status || 'pending');
      setNotes(member.adminNotes || '');
      setIsDirty(false);
    }
  }, [member]);

  const updateMutation = useMutation({
    mutationFn: (payload) => api.patch(`/admin/members/${id}/status`, payload),
    onSuccess: (res) => {
      // Update cache directly so the badge in the header updates immediately
      queryClient.setQueryData(['member', id], res.data.data.member);
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      setIsDirty(false);
      toast.success('Member status updated successfully');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Update failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/admin/members/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('Member deleted');
      navigate('/members');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Delete failed'),
  });

  const handleUpdate = () => {
    updateMutation.mutate({ status: selectedStatus, adminNotes: notes });
  };

  const handleStatusChange = (val) => {
    setSelectedStatus(val);
    setIsDirty(true);
  };

  const handleNotesChange = (val) => {
    setNotes(val);
    setIsDirty(true);
  };

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-32" />
        <div className="h-28 bg-gray-200 rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-52 bg-gray-200 rounded-2xl" />
            <div className="h-24 bg-gray-200 rounded-2xl" />
          </div>
          <div className="h-72 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-400">Member not found.</p>
        <button onClick={() => navigate('/members')} className="btn-secondary mt-4">
          Back to Members
        </button>
      </div>
    );
  }

  const canEdit = admin?.role !== 'viewer';
  const hasChanges = isDirty;

  return (
    <div className="p-6 lg:p-8 space-y-5">
      {/* Back */}
      <button
        onClick={() => navigate('/members')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Members
      </button>

      {/* Header card — status badge reflects live member.status from DB */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center shrink-0">
            <span className="text-brand-700 font-black text-xl">
              {member.firstName.charAt(0)}{member.lastName.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {member.firstName} {member.lastName}
              </h1>
              {/* Always shows the saved DB status */}
              <StatusBadge status={member.status} />
              {member.welcomeEmailSent && (
                <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <CheckCircle size={12} />
                  Welcome Email Sent
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Registered {format(new Date(member.createdAt), 'MMMM d, yyyy')} · {member.lga} LGA
            </p>
            {member.contactedAt && (
              <p className="text-blue-500 text-xs mt-1 flex items-center gap-1">
                <Clock size={11} />
                Contacted {format(new Date(member.contactedAt), 'MMM d, yyyy')}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Member Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={Mail}     label="Email"           value={member.email} />
              <InfoRow icon={Phone}    label="Phone"           value={member.phone} />
              <InfoRow icon={MapPin}   label="LGA"             value={member.lga} />
              <InfoRow icon={MapPin}   label="Ward"            value={member.ward} />
              <InfoRow icon={Calendar} label="Registered"      value={format(new Date(member.createdAt), 'PPP')} />
              <InfoRow icon={Globe}    label="Referral Source" value={member.referralSource} />
            </div>
          </div>

          {/* Interests */}
          <div className="card p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Areas of Interest</h2>
            {member.interests?.length ? (
              <div className="flex flex-wrap gap-2">
                {member.interests.map((i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm font-medium rounded-full border border-brand-100"
                  >
                    <Tag size={12} />
                    {i}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No interests specified</p>
            )}
          </div>

          {/* Message */}
          {member.message && (
            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare size={16} />
                Member Message
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-xl p-4">
                {member.message}
              </p>
            </div>
          )}
        </div>

        {/* Right: Actions panel */}
        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Update Status</h2>

            <div className="space-y-4">
              {/* Status selector — visual radio-style buttons */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                    <button
                      key={val}
                      type="button"
                      disabled={!canEdit}
                      onClick={() => handleStatusChange(val)}
                      className={`
                        px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-150
                        ${selectedStatus === val
                          ? `${cfg.cls} border-current shadow-sm scale-[1.02]`
                          : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
                        }
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                    >
                      {cfg.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Also keep a <select> for accessibility */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Or select from dropdown
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="input"
                  disabled={!canEdit}
                >
                  {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                    <option key={val} value={val}>{cfg.label}</option>
                  ))}
                </select>
              </div>

              {/* Admin notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Admin Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  rows={4}
                  placeholder="Add internal notes about this member..."
                  className="input resize-none"
                  disabled={!canEdit}
                />
              </div>

              {canEdit && (
                <button
                  onClick={handleUpdate}
                  disabled={updateMutation.isPending || !hasChanges}
                  className={`btn-primary w-full justify-center transition-all ${
                    !hasChanges ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Save size={15} />
                  {updateMutation.isPending ? 'Saving...' : hasChanges ? 'Save Changes' : 'No Changes'}
                </button>
              )}

              {/* Current saved status reminder */}
              <p className="text-xs text-center text-gray-400">
                Saved status: <span className="font-semibold capitalize text-gray-600">{member.status}</span>
              </p>
            </div>
          </div>

          {/* Assigned to */}
          {member.assignedTo && (
            <div className="card p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Last updated by</p>
              <p className="text-sm font-medium text-gray-800">{member.assignedTo.name}</p>
              <p className="text-xs text-gray-400">{member.assignedTo.email}</p>
            </div>
          )}

          {/* Danger zone */}
          {admin?.role === 'super_admin' && (
            <div className="card p-4 border border-red-100">
              <h3 className="text-sm font-semibold text-red-600 mb-2">Danger Zone</h3>
              {!showDelete ? (
                <button
                  onClick={() => setShowDelete(true)}
                  className="w-full text-sm text-red-500 border border-red-200 rounded-lg py-2 hover:bg-red-50 transition-colors"
                >
                  Delete Member
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">This cannot be undone.</p>
                  <button
                    onClick={() => deleteMutation.mutate()}
                    disabled={deleteMutation.isPending}
                    className="btn-danger w-full justify-center text-sm"
                  >
                    <Trash2 size={14} />
                    {deleteMutation.isPending ? 'Deleting...' : 'Confirm Delete'}
                  </button>
                  <button
                    onClick={() => setShowDelete(false)}
                    className="w-full text-sm text-gray-500 py-1.5 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
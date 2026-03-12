



import React, { useState, useEffect, useCallback } from 'react';
import {
  Calendar, Clock, User, Phone, Mail, Building2,
  CheckCircle, XCircle, Trash2, Search,
  ChevronLeft, ChevronRight, RefreshCw, Eye,
  TrendingUp, AlertCircle, X,
} from 'lucide-react';
import useAuthStore from '../store/authStore.js';

/* ── TOKENS (matches AdminLayout) ────────── */
const C = {
  bg:       '#0b0f0e',
  surface:  '#0e1511',
  card:     '#111815',
  sidebar:  '#0d1410',
  border:   '#1a2820',
  borderHi: '#243630',
  green:    '#22c55e',
  muted:    '#4b6357',
  text:     '#e8f0eb',
  textDim:  '#7a9e84',
  hover:    '#141d18',
  gold:     '#f59e0b',
  blue:     '#38bdf8',
  red:      '#f87171',
  redDim:   'rgba(248,113,113,0.08)',
};

const STATUS_META = {
  pending:  { color: C.gold,  bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)', label: 'Pending'  },
  approved: { color: C.green, bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.25)',  label: 'Approved' },
  rejected: { color: C.red,   bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.25)',label: 'Rejected' },
};

const PURPOSE_OPTIONS = [
  'Party Affairs & Governance', 'Community Development',
  'Business & Investment', 'Media & Press',
  'Youth & Women Affairs', 'Official Delegation',
  'Personal Matter', 'Other',
];


/* ── API HELPER ─────────────────────────── */
// Reads accessToken directly from the Zustand store (persisted under 'apc-admin-auth')
/* ── API HELPER ─────────────────────────── */
const _raw = import.meta.env.VITE_API_URL;
const API_URL = (_raw && _raw !== 'undefined')
  ? _raw.replace(/\/$/, '')
  : 'https://apcbackend.vercel.app/api';

const api = async (path, options = {}) => {
  const token = useAuthStore.getState().accessToken;
  
  // Normalize: path may be '/api/admin/...' or just '/admin/...'
  // Strip leading '/api' since API_URL already ends with '/api'
  const normalizedPath = path.replace(/^\/api/, '');
  
  const res = await fetch(`${API_URL}${normalizedPath}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    credentials: 'include',
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};
/* ── STAT CARD ──────────────────────────── */
const StatCard = ({ label, value, color, icon: Icon }) => (
  <div style={{
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 12, padding: '16px 20px',
    display: 'flex', alignItems: 'center', gap: 14,
  }}>
    <div style={{
      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
      background: `${color}15`, border: `1px solid ${color}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon size={18} color={color} />
    </div>
    <div>
      <p style={{ color: C.muted, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
      <p style={{ color: C.text, fontSize: 22, fontWeight: 800, margin: '2px 0 0', fontFamily: 'DM Mono,monospace' }}>{value ?? '—'}</p>
    </div>
  </div>
);

/* ── STATUS BADGE ───────────────────────── */
const StatusBadge = ({ status }) => {
  const m = STATUS_META[status] || STATUS_META.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
      background: m.bg, border: `1px solid ${m.border}`, color: m.color,
      letterSpacing: '0.04em',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
      {m.label}
    </span>
  );
};

/* ── DETAIL MODAL ───────────────────────── */
const DetailModal = ({ appt, onClose, onStatusUpdate, onDelete, isAdmin }) => {
  const [note, setNote] = useState(appt.adminNote || '');
  const [loading, setLoading] = useState('');

  const handleStatus = async (status) => {
    setLoading(status);
    try {
      const data = await api(`/api/admin/appointments/${appt._id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, adminNote: note }),
      });
      onStatusUpdate(data.data);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading('');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Permanently delete this appointment?')) return;
    setLoading('delete');
    try {
      await api(`/api/admin/appointments/${appt._id}`, { method: 'DELETE' });
      onDelete(appt._id);
      onClose();
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading('');
    }
  };

  const Row = ({ icon: Icon, label, value }) => value ? (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
      <Icon size={14} color={C.muted} style={{ marginTop: 2, flexShrink: 0 }} />
      <div>
        <p style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
        <p style={{ color: C.text, fontSize: 13, fontWeight: 500, margin: '2px 0 0' }}>{value}</p>
      </div>
    </div>
  ) : null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.surface, border: `1px solid ${C.borderHi}`,
          borderRadius: 16, width: '100%', maxWidth: 520,
          maxHeight: '90vh', overflowY: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 20px', borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <StatusBadge status={appt.status} />
            <span style={{ color: C.muted, fontSize: 11, fontFamily: 'DM Mono,monospace' }}>
              #{appt._id.slice(-6).toUpperCase()}
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: 20 }}>
          {/* Requester info */}
          <Row icon={User}     label="Full Name"     value={appt.fullName} />
          <Row icon={Phone}    label="Phone"         value={appt.phone} />
          <Row icon={Mail}     label="Email"         value={appt.email} />
          <Row icon={Building2}label="Organization"  value={appt.organization} />
          <Row icon={AlertCircle} label="Purpose"    value={appt.purpose} />
          <Row icon={Calendar} label="Preferred Date" value={appt.preferredDate} />
          <Row icon={Clock}    label="Preferred Time" value={appt.preferredTime} />

          {appt.message && (
            <div style={{ padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
              <p style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px' }}>Message</p>
              <p style={{ color: C.textDim, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{appt.message}</p>
            </div>
          )}

          {/* Admin note */}
          <div style={{ marginTop: 16 }}>
            <p style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Admin Note</p>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Optional internal note..."
              rows={2}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 8, color: C.text, padding: '9px 12px',
                fontSize: 13, fontFamily: 'DM Sans,sans-serif',
                resize: 'vertical', outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = C.borderHi}
              onBlur={e => e.target.style.borderColor = C.border}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            {appt.status !== 'approved' && (
              <button
                onClick={() => handleStatus('approved')}
                disabled={!!loading}
                style={{
                  flex: 1, minWidth: 100,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '10px 16px', borderRadius: 8, border: `1px solid rgba(34,197,94,0.3)`,
                  background: 'rgba(34,197,94,0.1)', color: C.green,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 700, fontSize: 12, fontFamily: 'DM Sans,sans-serif',
                  opacity: loading ? 0.6 : 1, transition: 'opacity 0.15s',
                }}
              >
                <CheckCircle size={14} />
                {loading === 'approved' ? 'Approving…' : 'Approve'}
              </button>
            )}
            {appt.status !== 'rejected' && (
              <button
                onClick={() => handleStatus('rejected')}
                disabled={!!loading}
                style={{
                  flex: 1, minWidth: 100,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '10px 16px', borderRadius: 8, border: `1px solid rgba(248,113,113,0.3)`,
                  background: C.redDim, color: C.red,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 700, fontSize: 12, fontFamily: 'DM Sans,sans-serif',
                  opacity: loading ? 0.6 : 1, transition: 'opacity 0.15s',
                }}
              >
                <XCircle size={14} />
                {loading === 'rejected' ? 'Rejecting…' : 'Reject'}
              </button>
            )}
            {isAdmin && (
              <button
                onClick={handleDelete}
                disabled={!!loading}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '10px 14px', borderRadius: 8,
                  border: `1px solid ${C.border}`, background: 'transparent', color: C.muted,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 700, fontSize: 12, fontFamily: 'DM Sans,sans-serif',
                  opacity: loading ? 0.6 : 1, transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.redDim; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)'; e.currentTarget.style.color = C.red; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
              >
                <Trash2 size={14} />
                {loading === 'delete' ? '…' : 'Delete'}
              </button>
            )}
          </div>

          {/* Reviewed by */}
          {appt.reviewedBy && (
            <p style={{ color: C.muted, fontSize: 11, marginTop: 14, textAlign: 'center' }}>
              Reviewed by <strong style={{ color: C.textDim }}>{appt.reviewedBy.name}</strong>
              {appt.reviewedAt && ` · ${new Date(appt.reviewedAt).toLocaleDateString()}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── MAIN PAGE ──────────────────────────── */
const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [purposeFilter, setPurposeFilter] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const LIMIT = 15;

  const { admin, accessToken } = useAuthStore();
  const isSuperAdmin = admin?.role === 'super_admin';

  /* fetch stats */
  const fetchStats = useCallback(async () => {
    try {
      const data = await api('/api/admin/appointments/stats');
      setStats(data.data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  /* fetch list */
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page, limit: LIMIT });
      if (statusFilter)  params.set('status', statusFilter);
      if (purposeFilter) params.set('purpose', purposeFilter);
      if (search.trim()) params.set('search', search.trim());

      const data = await api(`/api/admin/appointments?${params}`);
      setAppointments(data.data);
      setPagination(data.pagination);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, purposeFilter, search]);

  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  /* reset page when filters change */
  useEffect(() => { setPage(1); }, [statusFilter, purposeFilter, search]);

  const handleStatusUpdate = (updated) => {
    setAppointments(prev => prev.map(a => a._id === updated._id ? updated : a));
    setSelected(updated);
    fetchStats();
  };

  const handleDelete = (id) => {
    setAppointments(prev => prev.filter(a => a._id !== id));
    fetchStats();
  };

  /* ── RENDER ───────────────────────────── */
  return (
    <div style={{ padding: '24px', minHeight: '100%', background: C.bg }}>

      {/* Page title */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: C.text, fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
          Appointments
        </h1>
        <p style={{ color: C.muted, fontSize: 13, margin: '4px 0 0' }}>
          Review and manage all appointment requests
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 12, marginBottom: 24,
      }}>
        <StatCard label="Total"    value={stats?.total}    color={C.textDim}  icon={TrendingUp} />
        <StatCard label="Pending"  value={stats?.pending}  color={C.gold}     icon={Clock} />
        <StatCard label="Approved" value={stats?.approved} color={C.green}    icon={CheckCircle} />
        <StatCard label="Rejected" value={stats?.rejected} color={C.red}      icon={XCircle} />
      </div>

      {/* Filters row */}
      <div style={{
        display: 'flex', gap: 10, flexWrap: 'wrap',
        marginBottom: 16, alignItems: 'center',
      }}>
        {/* Search */}
        <div style={{
          flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: 8,
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 10, padding: '0 12px', minWidth: 180,
        }}>
          <Search size={14} color={C.muted} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, phone, email…"
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              color: C.text, fontSize: 13, padding: '9px 0',
              fontFamily: 'DM Sans,sans-serif',
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 0 }}>
              <X size={12} />
            </button>
          )}
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 10, color: statusFilter ? C.text : C.muted,
            padding: '9px 12px', fontSize: 13, outline: 'none',
            fontFamily: 'DM Sans,sans-serif', cursor: 'pointer', minWidth: 130,
          }}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* Purpose filter */}
        <select
          value={purposeFilter}
          onChange={e => setPurposeFilter(e.target.value)}
          style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 10, color: purposeFilter ? C.text : C.muted,
            padding: '9px 12px', fontSize: 13, outline: 'none',
            fontFamily: 'DM Sans,sans-serif', cursor: 'pointer', minWidth: 160,
          }}
        >
          <option value="">All Purposes</option>
          {PURPOSE_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        {/* Refresh */}
        <button
          onClick={() => { fetchAppointments(); fetchStats(); }}
          style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: C.card, border: `1px solid ${C.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: C.muted, transition: 'all .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.color = C.textDim; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
          title="Refresh"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Table */}
      <div style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 12, overflow: 'hidden',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 120px 160px 110px 90px 52px',
          gap: 0, padding: '10px 16px',
          borderBottom: `1px solid ${C.border}`,
          background: C.surface,
        }}>
          {['Name / Contact', 'Purpose', 'Preferred Date', 'Submitted', 'Status', ''].map((h, i) => (
            <span key={i} style={{ color: C.muted, fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {h}
            </span>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', color: C.muted, fontSize: 13 }}>
            Loading appointments…
          </div>
        ) : error ? (
          <div style={{ padding: '48px', textAlign: 'center', color: C.red, fontSize: 13 }}>{error}</div>
        ) : appointments.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: C.muted, fontSize: 13 }}>
            No appointments found.
          </div>
        ) : (
          appointments.map((appt, idx) => (
            <div
              key={appt._id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 160px 110px 90px 52px',
                gap: 0, padding: '12px 16px', alignItems: 'center',
                borderBottom: idx < appointments.length - 1 ? `1px solid ${C.border}` : 'none',
                transition: 'background 0.1s',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.hover}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Name + contact */}
              <div style={{ minWidth: 0 }}>
                <p style={{ color: C.text, fontSize: 13, fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {appt.fullName}
                </p>
                <p style={{ color: C.muted, fontSize: 11, margin: '2px 0 0', fontFamily: 'DM Mono,monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {appt.phone}
                </p>
              </div>

              {/* Purpose */}
              <span style={{ color: C.textDim, fontSize: 11, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {appt.purpose}
              </span>

              {/* Preferred date + time */}
              <span style={{ color: C.textDim, fontSize: 11, fontFamily: 'DM Mono,monospace' }}>
                {appt.preferredDate || '—'}
                {appt.preferredTime && <span style={{ color: C.muted }}> · {appt.preferredTime}</span>}
              </span>

              {/* Submitted */}
              <span style={{ color: C.muted, fontSize: 11, fontFamily: 'DM Mono,monospace' }}>
                {new Date(appt.createdAt).toLocaleDateString()}
              </span>

              {/* Status */}
              <div><StatusBadge status={appt.status} /></div>

              {/* View button */}
              <button
                onClick={() => setSelected(appt)}
                style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: 'transparent', border: `1px solid ${C.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: C.muted, transition: 'all .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.color = C.textDim; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
                title="View details"
              >
                <Eye size={13} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 16, flexWrap: 'wrap', gap: 10,
        }}>
          <span style={{ color: C.muted, fontSize: 12 }}>
            Showing {((page - 1) * LIMIT) + 1}–{Math.min(page * LIMIT, pagination.total)} of {pagination.total}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <PageBtn disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft size={14} />
            </PageBtn>
            {Array.from({ length: pagination.pages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === pagination.pages || Math.abs(p - page) <= 1)
              .reduce((acc, p, i, arr) => {
                if (i > 0 && p - arr[i - 1] > 1) acc.push('…');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === '…' ? (
                  <span key={`ellipsis-${i}`} style={{ color: C.muted, padding: '0 4px', display: 'flex', alignItems: 'center', fontSize: 13 }}>…</span>
                ) : (
                  <PageBtn key={p} active={p === page} onClick={() => setPage(p)}>{p}</PageBtn>
                )
              )}
            <PageBtn disabled={page === pagination.pages} onClick={() => setPage(p => p + 1)}>
              <ChevronRight size={14} />
            </PageBtn>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <DetailModal
          appt={selected}
          onClose={() => setSelected(null)}
          onStatusUpdate={handleStatusUpdate}
          onDelete={handleDelete}
          isAdmin={isSuperAdmin}
        />
      )}
    </div>
  );
};

/* ── PAGINATION BUTTON ──────────────────── */
const PageBtn = ({ children, active, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      minWidth: 32, height: 32, borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700, fontFamily: 'DM Sans,sans-serif',
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: `1px solid ${active ? C.borderHi : C.border}`,
      background: active ? C.surface : 'transparent',
      color: active ? C.text : C.muted,
      opacity: disabled ? 0.4 : 1,
      transition: 'all .15s',
    }}
  >
    {children}
  </button>
);

export default Appointment;
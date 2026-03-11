
import React, { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Download, ChevronLeft, ChevronRight,
  Users, Mail, Phone,
} from 'lucide-react';
import { format } from 'date-fns';
import debounce from 'lodash/debounce';
import api from '../utils/api';
import toast from 'react-hot-toast';

/* ── TOKENS ─────────────────────────────── */
const C = {
  bg: '#0b0f0e', surface: '#111815', card: '#141c18',
  border: '#1e2b24', borderHi: '#2a3d32',
  green: '#22c55e', greenDim: '#16a34a',
  amber: '#f59e0b', blue: '#38bdf8',
  muted: '#4b6357', text: '#e8f0eb', textDim: '#8aaa96',
  hover: '#172219',
};

const STATUS = {
  active:    { color: C.green, bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.25)' },
  pending:   { color: C.amber, bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  contacted: { color: C.blue,  bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.25)' },
  inactive:  { color: C.muted, bg: 'rgba(75,99,87,0.12)',  border: 'rgba(75,99,87,0.3)' },
};

const LGAS = [
  '', 'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja',
  'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo',
  'Oshodi-Isolo', 'Somolu', 'Surulere',
];

const AVATAR_COLORS = [C.green, C.blue, C.amber, '#a78bfa', '#fb7185', '#34d399'];

/* ── COMPONENTS ─────────────────────────── */
const StatusBadge = ({ status }) => {
  const s = STATUS[status] || STATUS.inactive;
  return (
    <span style={{
      color: s.color, background: s.bg, border: `1px solid ${s.border}`,
      borderRadius: 20, padding: '3px 10px', fontSize: 10,
      fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
      display: 'inline-block', whiteSpace: 'nowrap',
    }}>{status}</span>
  );
};

const Avatar = ({ f, l, i }) => {
  const col = AVATAR_COLORS[i % AVATAR_COLORS.length];
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      background: `${col}18`, border: `1px solid ${col}35`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 900, color: col, fontFamily: 'DM Mono,monospace',
    }}>
      {f?.[0]}{l?.[0]}
    </div>
  );
};

const Pill = ({ children, accent }) => (
  <span style={{
    background: accent ? `${C.green}15` : C.surface,
    border: `1px solid ${accent ? `${C.green}30` : C.border}`,
    color: accent ? C.green : C.textDim,
    borderRadius: 6, padding: '2px 8px',
    fontSize: 10, fontWeight: 700, textTransform: 'capitalize',
  }}>{children}</span>
);

const StyledSelect = ({ value, onChange, icon: Icon, children }) => (
  <div style={{ position: 'relative' }}>
    {Icon && <Icon size={13} color={C.muted} style={{
      position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none',
    }} />}
    <select value={value} onChange={onChange} style={{
      background: C.surface, border: `1px solid ${C.border}`,
      borderRadius: 10, padding: Icon ? '9px 14px 9px 28px' : '9px 14px',
      color: C.textDim, fontSize: 12, fontWeight: 700, outline: 'none',
      appearance: 'none', cursor: 'pointer', fontFamily: 'DM Sans,sans-serif',
    }}>{children}</select>
  </div>
);

/* ── MAIN ────────────────────────────────── */
const Members = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ status: '', lga: '', search: '', page: 1, limit: 20 });
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useMemo(
    () => debounce((v) => setFilters(p => ({ ...p, search: v, page: 1 })), 400), []
  );
  const handleSearchChange = (e) => { setSearchTerm(e.target.value); debouncedSearch(e.target.value); };
  const setFilter = useCallback((k, v) => setFilters(p => ({ ...p, [k]: v, page: 1 })), []);

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['members', filters],
    queryFn: async () => {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ''));
      const { data } = await api.get('/admin/members', { params });
      return data.data;
    },
    placeholderData: (prev) => prev,
  });

  const handleExport = async () => {
    const t = toast.loading('Preparing export…');
    try {
      const res = await api.get('/admin/members/export', {
        params: { status: filters.status, lga: filters.lga }, responseType: 'blob',
      });
      const url = URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url; a.download = `apc-registry-${format(new Date(), 'yyyy-MM-dd')}.csv`; a.click();
      toast.success('Export ready', { id: t });
    } catch { toast.error('Export failed', { id: t }); }
  };

  const { members = [], pagination = {} } = data || {};

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: "'DM Sans',sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:${C.bg}}
        ::-webkit-scrollbar-thumb{background:${C.borderHi};border-radius:4px}
        .mrow{transition:background .12s}
        .mrow:hover{background:${C.hover}!important}
        .mrow:hover .mname{color:${C.green}!important}
        .mrow:hover .marrow{opacity:1!important;color:${C.green}!important}
        .msearch:focus{border-color:${C.green}!important;outline:none}
        @media(max-width:900px){.hide-md{display:none!important}}
        @media(max-width:640px){.hide-sm{display:none!important}.mpanel{padding:20px!important}.mhead{flex-direction:column!important;align-items:flex-start!important}.mfilt{flex-wrap:wrap!important}}
        @keyframes skel{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}
      `}</style>

      <div className="mpanel" style={{ padding: '36px 40px', maxWidth: 1600, margin: '0 auto' }}>

        {/* HEADER */}
        <motion.div className="mhead" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>
              Member Registry
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.green, boxShadow: `0 0 6px ${C.green}` }} />
              <span style={{ color: C.textDim, fontSize: 13 }}>
                {pagination.total?.toLocaleString() ?? '0'} total registered members
              </span>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleExport}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: C.card, border: `1px solid ${C.borderHi}`,
              borderRadius: 12, padding: '11px 20px',
              color: C.textDim, fontSize: 13, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
            }}>
            <Download size={15} /> Export CSV
          </motion.button>
        </motion.div>

        {/* FILTER BAR */}
        <motion.div className="mfilt" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 14, padding: '12px 14px', marginBottom: 18,
          }}>
          <div style={{ flex: 1, position: 'relative', minWidth: 200 }}>
            <Search size={14} color={C.muted} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" placeholder="Search name, ID, phone…" value={searchTerm}
              onChange={handleSearchChange} className="msearch"
              style={{
                width: '100%', background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: '8px 12px 8px 34px', color: C.text,
                fontSize: 13, fontFamily: 'inherit', transition: 'border-color .15s',
              }} />
          </div>
          <div style={{ width: 1, height: 24, background: C.border }} />
          <StyledSelect icon={Filter} value={filters.status} onChange={e => setFilter('status', e.target.value)}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="contacted">Contacted</option>
            <option value="inactive">Inactive</option>
          </StyledSelect>
          <StyledSelect value={filters.lga} onChange={e => setFilter('lga', e.target.value)}>
            {LGAS.map(l => <option key={l} value={l}>{l || 'All LGAs'}</option>)}
          </StyledSelect>
        </motion.div>

        {/* TABLE */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.11 }}
          style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
              <thead>
                <tr style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}>
                  {[['Member',''], ['Contact','hide-sm'], ['LGA / Ward','hide-md'], ['Interests','hide-md'], ['Status',''], ['','']].map(([h, cls], i) => (
                    <th key={i} className={cls} style={{
                      padding: '13px 18px', textAlign: 'left',
                      fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: C.muted, whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {isLoading && !isPlaceholderData
                    ? [...Array(7)].map((_, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td colSpan={6} style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.border, animation: 'skel 1.5s infinite' }} />
                            <div>
                              <div style={{ width: 130, height: 9, background: C.border, borderRadius: 4, animation: 'skel 1.5s infinite', marginBottom: 6 }} />
                              <div style={{ width: 80, height: 7, background: C.surface, borderRadius: 4, animation: 'skel 1.5s infinite' }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                    : members.length === 0
                    ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '72px 20px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 52, height: 52, borderRadius: 14, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Users size={22} color={C.muted} />
                            </div>
                            <p style={{ color: C.text, fontWeight: 700, fontSize: 15, margin: 0 }}>No members found</p>
                            <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>Try adjusting your filters</p>
                          </div>
                        </td>
                      </tr>
                    )
                    : members.map((m, idx) => (
                      <motion.tr key={m._id} className="mrow"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.018 }}
                        onClick={() => navigate(`/members/${m._id}`)}
                        style={{ borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}>
                        {/* name */}
                        <td style={{ padding: '13px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Avatar f={m.firstName} l={m.lastName} i={idx} />
                            <div>
                              <p className="mname" style={{ color: C.text, fontWeight: 700, fontSize: 13, margin: 0, transition: 'color .12s' }}>
                                {m.firstName} {m.lastName}
                              </p>
                              <p style={{ color: C.muted, fontSize: 10, margin: '2px 0 0', fontFamily: 'DM Mono,monospace' }}>
                                #{m._id.slice(-8).toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </td>
                        {/* contact */}
                        <td className="hide-sm" style={{ padding: '13px 18px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                              <Mail size={10} color={C.muted} />
                              <span style={{ color: C.textDim, fontSize: 12 }}>{m.email}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                              <Phone size={10} color={C.muted} />
                              <span style={{ color: C.textDim, fontSize: 12 }}>{m.phone}</span>
                            </div>
                          </div>
                        </td>
                        {/* lga */}
                        <td className="hide-md" style={{ padding: '13px 18px' }}>
                          <p style={{ color: C.text, fontSize: 13, fontWeight: 600, margin: 0 }}>{m.lga}</p>
                          <p style={{ color: C.muted, fontSize: 11, margin: '2px 0 0' }}>Ward {m.ward || '—'}</p>
                        </td>
                        {/* interests */}
                        <td className="hide-md" style={{ padding: '13px 18px' }}>
                          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                            {(m.interests || []).slice(0, 1).map(int => <Pill key={int}>{int}</Pill>)}
                            {m.interests?.length > 1 && <Pill accent>+{m.interests.length - 1}</Pill>}
                          </div>
                        </td>
                        {/* status */}
                        <td style={{ padding: '13px 18px' }}><StatusBadge status={m.status} /></td>
                        {/* arrow */}
                        <td style={{ padding: '13px 14px', width: 36 }}>
                          <ChevronRight size={15} className="marrow" style={{ color: C.muted, opacity: 0, transition: 'all .12s' }} />
                        </td>
                      </motion.tr>
                    ))
                  }
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {pagination.totalPages > 1 && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 22px', borderTop: `1px solid ${C.border}`, background: C.surface,
            }}>
              <span style={{ color: C.muted, fontSize: 11, fontFamily: 'DM Mono,monospace', fontWeight: 600 }}>
                PAGE {pagination.page} / {pagination.totalPages}
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { Icon: ChevronLeft, fn: () => setFilters(p => ({ ...p, page: p.page - 1 })), dis: pagination.page <= 1 },
                  { Icon: ChevronRight, fn: () => setFilters(p => ({ ...p, page: p.page + 1 })), dis: !pagination.hasNext },
                ].map(({ Icon, fn, dis }, i) => (
                  <button key={i} onClick={fn} disabled={dis} style={{
                    width: 32, height: 32, borderRadius: 9,
                    background: dis ? 'transparent' : C.card, border: `1px solid ${C.border}`,
                    color: dis ? C.muted : C.text, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: dis ? 'not-allowed' : 'pointer', opacity: dis ? 0.35 : 1, transition: 'all .12s',
                  }}><Icon size={15} /></button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Members;
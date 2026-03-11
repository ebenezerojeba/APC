

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Mail, Phone, MapPin, MessageSquare,
  Calendar, Globe, CheckCircle, Trash2, Save, Clock,
  ShieldAlert, UserCheck, AlertCircle, ExternalLink,
} from 'lucide-react';
import { format } from 'date-fns';
import api from '../utils/api.js';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore.js';

/* ── TOKENS ─────────────────────────────── */
const C = {
  bg: '#0b0f0e', surface: '#111815', card: '#141c18',
  border: '#1e2b24', borderHi: '#2a3d32',
  green: '#22c55e', greenDim: '#16a34a',
  amber: '#f59e0b', blue: '#38bdf8', red: '#f87171',
  muted: '#4b6357', text: '#e8f0eb', textDim: '#8aaa96',
};

const STATUS_CFG = {
  pending:   { label: 'Pending',   color: C.amber, icon: Clock },
  contacted: { label: 'Contacted', color: C.blue,  icon: MessageSquare },
  active:    { label: 'Active',    color: C.green, icon: UserCheck },
  inactive:  { label: 'Inactive',  color: C.muted, icon: AlertCircle },
};

/* ── STATUS BADGE ───────────────────────── */
const StatusBadge = ({ status }) => {
  const cfg = STATUS_CFG[status] || STATUS_CFG.inactive;
  const Icon = cfg.icon;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      color: cfg.color, background: `${cfg.color}18`,
      border: `1px solid ${cfg.color}35`, borderRadius: 20,
      padding: '5px 12px', fontSize: 11, fontWeight: 800,
      letterSpacing: '0.08em', textTransform: 'uppercase',
    }}>
      <Icon size={12} /> {cfg.label}
    </span>
  );
};

/* ── DATA FIELD ─────────────────────────── */
const DataField = ({ icon: Icon, label, value, href }) => {
  if (!value) return null;
  const inner = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: C.surface, border: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .15s',
      }} className="dfield-icon">
        <Icon size={16} color={C.muted} />
      </div>
      <div>
        <p style={{ color: C.muted, fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
        <p style={{ color: C.text, fontSize: 13, fontWeight: 600, margin: '3px 0 0', display: 'flex', alignItems: 'center', gap: 5 }}>
          {value}
          {href && <ExternalLink size={11} color={C.muted} style={{ opacity: 0 }} className="dfield-ext" />}
        </p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer"
      style={{ textDecoration: 'none', display: 'block' }}
      className="dfield-wrap">{inner}</a>
  ) : <div className="dfield-wrap">{inner}</div>;
};

/* ── SECTION WRAPPER ────────────────────── */
const Section = ({ title, icon: Icon, children }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 28 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
      <div style={{ width: 3, height: 20, background: C.green, borderRadius: 2 }} />
      {Icon && <Icon size={16} color={C.green} />}
      <h3 style={{ color: C.text, fontSize: 14, fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>{title}</h3>
    </div>
    {children}
  </div>
);

/* ── MAIN ────────────────────────────────── */
const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { admin } = useAuthStore();

  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [notes, setNotes] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { data: member, isLoading } = useQuery({
    queryKey: ['member', id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/members/${id}`);
      return data.data.member;
    },
  });

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
      queryClient.setQueryData(['member', id], res.data.data.member);
      queryClient.invalidateQueries({ queryKey: ['members'] });
      setIsDirty(false);
      toast.success('Member updated');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/admin/members/${id}`),
    onSuccess: () => { toast.success('Member removed'); navigate('/members'); },
  });

  if (isLoading) return <DetailSkeleton />;

  const initials = `${member.firstName?.[0] ?? ''}${member.lastName?.[0] ?? ''}`;

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: "'DM Sans',sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.borderHi};border-radius:4px}
        .dfield-wrap:hover .dfield-icon{background:${C.card}!important;border-color:${C.borderHi}!important}
        .dfield-wrap:hover .dfield-ext{opacity:1!important}
        .status-btn:hover{border-color:${C.borderHi}!important}
        @media(max-width:1024px){.detail-grid{grid-template-columns:1fr!important}.action-panel{position:relative!important}}
        @media(max-width:640px){.detail-wrap{padding:20px!important}.cred-grid{grid-template-columns:1fr!important}.prof-flex{flex-direction:column!important;align-items:flex-start!important}}
      `}</style>

      <div className="detail-wrap" style={{ padding: '36px 40px', maxWidth: 1200, margin: '0 auto' }}>

        {/* NAV */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <button onClick={() => navigate('/members')}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: C.card, border: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color .15s',
            }}>
              <ArrowLeft size={15} color={C.textDim} />
            </div>
            <span style={{ color: C.textDim, fontSize: 13, fontWeight: 700 }}>Back to Registry</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Profile Integrity</span>
            <div style={{ width: 80, height: 4, background: C.border, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: C.green, borderRadius: 4 }} />
            </div>
          </div>
        </motion.div>

        {/* PROFILE HERO */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 20, padding: 28, marginBottom: 20, position: 'relative', overflow: 'hidden',
          }}>
          {/* ambient glow */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 200, height: 200, borderRadius: '50%',
            background: `${C.green}08`, filter: 'blur(60px)', pointerEvents: 'none',
          }} />
          <div className="prof-flex" style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative' }}>
            <div style={{
              width: 72, height: 72, borderRadius: 18, flexShrink: 0,
              background: `${C.green}20`, border: `2px solid ${C.green}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 900, color: C.green, fontFamily: 'DM Mono,monospace',
              boxShadow: `0 0 30px ${C.green}20`,
            }}>
              {initials}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <h1 style={{ fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>
                  {member.firstName} {member.lastName}
                </h1>
                <StatusBadge status={member.status} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.textDim, fontSize: 12 }}>
                  <Calendar size={13} color={C.green} />
                  Joined {format(new Date(member.createdAt), 'MMM dd, yyyy')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.textDim, fontSize: 12 }}>
                  <ShieldAlert size={13} color={C.green} />
                  Ref: {member.referralSource || 'Organic'}
                </div>
                {member.welcomeEmailSent && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: C.green, fontSize: 12, fontWeight: 700,
                    background: `${C.green}12`, border: `1px solid ${C.green}25`,
                    borderRadius: 20, padding: '3px 10px',
                  }}>
                    <CheckCircle size={12} /> Onboarded
                  </div>
                )}
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Member ID</p>
              <p style={{ color: C.textDim, fontSize: 13, fontFamily: 'DM Mono,monospace', margin: '4px 0 0' }}>
                #{member._id.slice(-12).toUpperCase()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* BODY GRID */}
        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>

          {/* LEFT CONTENT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Section title="Core Credentials">
                <div className="cred-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <DataField icon={Mail} label="Email" value={member.email} href={`mailto:${member.email}`} />
                  <DataField icon={Phone} label="Phone" value={member.phone} href={`tel:${member.phone}`} />
                  <DataField icon={MapPin} label="LGA" value={member.lga} />
                  <DataField icon={Globe} label="Ward" value={member.ward || 'Not Assigned'} />
                </div>
              </Section>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
              <Section title="Campaign Interests">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {member.interests?.map(i => (
                    <span key={i} style={{
                      background: C.surface, border: `1px solid ${C.border}`,
                      borderRadius: 8, padding: '6px 14px',
                      color: C.textDim, fontSize: 11, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      transition: 'all .15s', cursor: 'default',
                    }}
                      onMouseEnter={e => { e.target.style.borderColor = C.green; e.target.style.color = C.green; e.target.style.background = `${C.green}10`; }}
                      onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.textDim; e.target.style.background = C.surface; }}
                    >{i}</span>
                  ))}
                </div>
              </Section>
            </motion.div>

            {member.message && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                <Section title="Member Message" icon={MessageSquare}>
                  <div style={{
                    background: C.surface, borderLeft: `3px solid ${C.green}`,
                    borderRadius: '0 12px 12px 0', padding: '16px 20px',
                  }}>
                    <p style={{ color: C.textDim, fontSize: 14, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                      "{member.message}"
                    </p>
                  </div>
                </Section>
              </motion.div>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Action Panel */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              style={{
                background: C.surface, border: `1px solid ${C.borderHi}`,
                borderRadius: 18, padding: 24,
              }}>
              <h3 style={{ color: C.text, fontSize: 14, fontWeight: 800, margin: '0 0 20px', letterSpacing: '-0.01em' }}>
                Action Panel
              </h3>

              {/* status buttons */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ color: C.muted, fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Lifecycle Status
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {Object.entries(STATUS_CFG).map(([val, cfg]) => {
                    const active = selectedStatus === val;
                    const Icon = cfg.icon;
                    return (
                      <button key={val} className="status-btn"
                        onClick={() => { setSelectedStatus(val); setIsDirty(true); }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          padding: '9px 8px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                          fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                          transition: 'all .15s',
                          background: active ? `${cfg.color}20` : 'transparent',
                          border: `1px solid ${active ? cfg.color : C.border}`,
                          color: active ? cfg.color : C.muted,
                        }}>
                        <Icon size={11} /> {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* notes */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ color: C.muted, fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Admin Notes
                </p>
                <textarea value={notes} rows={4}
                  onChange={e => { setNotes(e.target.value); setIsDirty(true); }}
                  placeholder="Record interaction history…"
                  style={{
                    width: '100%', background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: 12, padding: '12px 14px', color: C.text,
                    fontSize: 13, fontFamily: 'inherit', resize: 'none', outline: 'none',
                    transition: 'border-color .15s', lineHeight: 1.6,
                  }}
                  onFocus={e => e.target.style.borderColor = C.green}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
              </div>

              {/* save */}
              <motion.button
                whileHover={{ scale: isDirty ? 1.02 : 1 }} whileTap={{ scale: isDirty ? 0.97 : 1 }}
                onClick={() => updateMutation.mutate({ status: selectedStatus, adminNotes: notes })}
                disabled={!isDirty || updateMutation.isPending}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: isDirty ? C.green : C.card,
                  border: `1px solid ${isDirty ? C.green : C.border}`,
                  borderRadius: 12, padding: '13px', fontFamily: 'inherit',
                  color: isDirty ? '#030a06' : C.muted,
                  fontSize: 12, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
                  cursor: isDirty ? 'pointer' : 'not-allowed',
                  transition: 'all .15s',
                  boxShadow: isDirty ? `0 4px 20px ${C.green}30` : 'none',
                }}>
                <Save size={14} />
                {updateMutation.isPending ? 'Saving…' : 'Commit Changes'}
              </motion.button>
            </motion.div>

            {/* Danger zone */}
            {admin?.role === 'super_admin' && (
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                style={{
                  background: 'rgba(248,113,113,0.05)',
                  border: `1px solid rgba(248,113,113,0.2)`,
                  borderRadius: 18, padding: 20,
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                  <ShieldAlert size={13} color={C.red} />
                  <span style={{ color: C.red, fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    Privilege Actions
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  {!showDelete ? (
                    <motion.button key="del" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={() => setShowDelete(true)}
                      style={{
                        width: '100%', background: 'transparent', border: `1px solid rgba(248,113,113,0.3)`,
                        borderRadius: 10, padding: '10px', color: C.red, fontSize: 12,
                        fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
                      }}
                      onMouseEnter={e => { e.target.style.background = 'rgba(248,113,113,0.1)'; }}
                      onMouseLeave={e => { e.target.style.background = 'transparent'; }}>
                      Request Deletion
                    </motion.button>
                  ) : (
                    <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p style={{ color: C.red, fontSize: 11, fontWeight: 700, textAlign: 'center', marginBottom: 12, opacity: 0.8 }}>
                        Confirm permanent removal?
                      </p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => deleteMutation.mutate()}
                          style={{
                            flex: 1, background: C.red, border: 'none', borderRadius: 10, padding: '10px',
                            color: '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
                          }}>Confirm</button>
                        <button onClick={() => setShowDelete(false)}
                          style={{
                            flex: 1, background: C.card, border: `1px solid ${C.border}`,
                            borderRadius: 10, padding: '10px', color: C.textDim,
                            fontSize: 11, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
                          }}>Abort</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailSkeleton = () => (
  <div style={{ padding: 40, background: '#0b0f0e', minHeight: '100vh' }}>
    <style>{`@keyframes skel{0%{opacity:.4}50%{opacity:.8}100%{opacity:.4}}`}</style>
    {[{ w: '20%', h: 34 }, { w: '100%', h: 90 }, { w: '100%', h: 200 }, { w: '100%', h: 120 }].map((s, i) => (
      <div key={i} style={{ width: s.w, height: s.h, borderRadius: 14, background: '#141c18', animation: 'skel 1.5s infinite', marginBottom: 20 }} />
    ))}
  </div>
);

export default MemberDetail;
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, UserCheck, Clock, TrendingUp, Download,
  MapPin, Activity, Calendar, ChevronRight, ArrowUpRight,
  Zap, Shield, BarChart2, Globe
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { format, parseISO } from 'date-fns';
import api from '../utils/api';
import toast from 'react-hot-toast';

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const C = {
  bg:       '#0b0f0e',
  surface:  '#111815',
  card:     '#141c18',
  border:   '#1e2b24',
  borderHi: '#2a3d32',
  green:    '#22c55e',
  greenDim: '#16a34a',
  greenGlow:'rgba(34,197,94,0.12)',
  amber:    '#f59e0b',
  blue:     '#38bdf8',
  muted:    '#4b6357',
  text:     '#e8f0eb',
  textDim:  '#8aaa96',
  textFaint:'#3d5547',
};

const STATUS_MAP = {
  active:    { color: C.green,    label: 'Active' },
  pending:   { color: C.amber,    label: 'Pending' },
  contacted: { color: C.blue,     label: 'Contacted' },
  inactive:  { color: C.muted,    label: 'Inactive' },
};

/* ─────────────────────────────────────────────
   TOOLTIP
───────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#0f1a14',
      border: `1px solid ${C.borderHi}`,
      borderRadius: 10,
      padding: '10px 16px',
      fontFamily: 'inherit',
    }}>
      <p style={{ color: C.textDim, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>
      <p style={{ color: C.green, fontSize: 22, fontWeight: 900, lineHeight: 1 }}>
        {payload[0].value?.toLocaleString()}
        <span style={{ color: C.muted, fontSize: 11, fontWeight: 500, marginLeft: 6 }}>members</span>
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, sub, accent, trend, index }) => {
  const accentColor = accent || C.green;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* accent glow strip */}
      <div style={{
        position: 'absolute', top: 0, left: 24, right: 24, height: 2,
        background: `linear-gradient(90deg, transparent, ${accentColor}55, transparent)`,
        borderRadius: '0 0 4px 4px',
      }} />

      {/* top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: `${accentColor}15`,
          border: `1px solid ${accentColor}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={18} color={accentColor} />
        </div>
        {trend && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: `${C.green}15`, border: `1px solid ${C.green}25`,
            borderRadius: 20, padding: '3px 10px',
          }}>
            <ArrowUpRight size={12} color={C.green} />
            <span style={{ color: C.green, fontSize: 11, fontWeight: 800 }}>{trend}%</span>
          </div>
        )}
      </div>

      {/* value */}
      <div style={{ marginBottom: 6 }}>
        <span style={{
          fontSize: 36, fontWeight: 900, color: C.text,
          letterSpacing: '-0.03em', lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {value?.toLocaleString() ?? '—'}
        </span>
      </div>

      {/* label */}
      <div>
        <p style={{ color: C.textDim, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</p>
        {sub && <p style={{ color: C.muted, fontSize: 10, marginTop: 2 }}>{sub}</p>}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
const SectionHeader = ({ title, action }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
    <h3 style={{ color: C.text, fontSize: 16, fontWeight: 800, letterSpacing: '-0.01em', margin: 0 }}>{title}</h3>
    {action && (
      <button style={{
        color: C.green, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
        textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 4, opacity: 0.8,
      }}
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
      >
        {action} <ChevronRight size={12} />
      </button>
    )}
  </div>
);

/* ─────────────────────────────────────────────
   PANEL WRAPPER
───────────────────────────────────────────── */
const Panel = ({ children, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 20,
      padding: '28px',
      ...style,
    }}
  >
    {children}
  </motion.div>
);

/* ─────────────────────────────────────────────
   INTEREST BAR
───────────────────────────────────────────── */
const InterestBar = ({ item, total, index }) => {
  const pct = Math.round((item.count / (total || 1)) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 + 0.3 }}
      style={{ marginBottom: 16 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ color: C.textDim, fontSize: 12, fontWeight: 600 }}>{item._id}</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
            {item.count?.toLocaleString()}
          </span>
          <span style={{ color: C.muted, fontSize: 10, fontWeight: 600 }}>{pct}%</span>
        </div>
      </div>
      <div style={{ height: 4, background: C.border, borderRadius: 4, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay: index * 0.08 + 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${C.green}, ${C.greenDim})`,
            borderRadius: 4,
            boxShadow: `0 0 8px ${C.green}40`,
          }}
        />
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   SKELETON
───────────────────────────────────────────── */
const Skeleton = ({ style = {} }) => (
  <div style={{
    background: `linear-gradient(90deg, ${C.card} 25%, ${C.border} 50%, ${C.card} 75%)`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: 16,
    ...style,
  }} />
);

const DashboardSkeleton = () => (
  <div style={{ padding: '40px', background: C.bg, minHeight: '100vh' }}>
    <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    <Skeleton style={{ height: 44, width: '30%', marginBottom: 40 }} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 24 }}>
      {[...Array(4)].map((_, i) => <Skeleton key={i} style={{ height: 140 }} />)}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
      <Skeleton style={{ height: 320 }} />
      <Skeleton style={{ height: 320 }} />
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────── */
const Dashboard = () => {
  const [exporting, setExporting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data } = await api.get('/admin/members/stats');
      return data.data;
    },
  });

  const handleExport = async () => {
    setExporting(true);
    const t = toast.loading('Preparing export…');
    try {
      const res = await api.get('/admin/members/export', { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url; a.download = `apc-members-${format(new Date(), 'yyyy-MM-dd')}.csv`; a.click();
      toast.success('Export ready', { id: t });
    } catch {
      toast.error('Export failed', { id: t });
    } finally {
      setExporting(false);
    }
  };

  if (isLoading) return <DashboardSkeleton />;

  const trendData = (data?.registrationTrend || []).map(d => ({
    date: format(parseISO(d._id), 'MMM d'),
    count: d.count,
  }));

  const statusData = (data?.statusBreakdown || []).map(d => ({
    name: STATUS_MAP[d._id]?.label || d._id,
    value: d.count,
    fill: STATUS_MAP[d._id]?.color || C.muted,
  }));

  const lgaData = (data?.lgaBreakdown || []).slice(0, 8);

  return (
    <div style={{
      background: C.bg,
      minHeight: '100vh',
      fontFamily: "'DM Sans', 'Sora', sans-serif",
      color: C.text,
    }}>
      {/* inject google fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,800;0,9..40,900&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.borderHi}; border-radius: 4px; }
        button:focus { outline: 2px solid ${C.green}40; outline-offset: 2px; }

        @media (max-width: 1024px) {
          .dash-grid-main { grid-template-columns: 1fr !important; }
          .dash-grid-bottom { grid-template-columns: 1fr !important; }
          .dash-kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .dash-kpi-grid { grid-template-columns: 1fr !important; }
          .dash-header { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .dash-inner { padding: 20px !important; }
        }
      `}</style>

      <div className="dash-inner" style={{ padding: '36px 40px', maxWidth: 1600, margin: '0 auto' }}>

        {/* ── HEADER ── */}
        <motion.div
          className="dash-header"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', background: C.green,
                boxShadow: `0 0 8px ${C.green}`,
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.15)}}`}</style>
              <span style={{ color: C.green, fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Live</span>
            </div>
            <h1 style={{
              fontSize: 'clamp(24px, 4vw, 40px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: C.text,
              margin: 0,
              lineHeight: 1,
            }}>
              APC Lagos Registry
            </h1>
            <p style={{ color: C.muted, fontSize: 13, marginTop: 6, fontWeight: 500 }}>
              Command & Analytics Center · {format(new Date(), 'EEEE, dd MMMM yyyy')}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* live time badge */}
            <div style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: '10px 16px',
              fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 500,
              color: C.textDim,
            }}>
              {format(new Date(), 'HH:mm')}
            </div>

            {/* export button */}
            <motion.button
              onClick={handleExport}
              disabled={exporting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: C.green, color: '#030a06',
                border: 'none', borderRadius: 12,
                padding: '12px 22px', fontWeight: 800, fontSize: 13,
                cursor: 'pointer', letterSpacing: '0.01em',
                boxShadow: `0 4px 24px ${C.green}35`,
                opacity: exporting ? 0.7 : 1,
                fontFamily: 'inherit',
              }}
            >
              <Download size={16} />
              Export Registry
            </motion.button>
          </div>
        </motion.div>

        {/* ── KPI GRID ── */}
        <div
          className="dash-kpi-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}
        >
          <StatCard icon={Users}    label="Total Registry"    value={data?.totals?.total}    accent={C.green} trend={12} index={0} />
          <StatCard icon={Clock}    label="Pending Review"    value={data?.totals?.pending}   sub="Awaiting verification" accent={C.amber} index={1} />
          <StatCard icon={UserCheck} label="Verified Members" value={data?.totals?.active}    accent={C.blue}  index={2} />
          <StatCard icon={Calendar} label="New This Week"     value={data?.totals?.thisWeek}  accent={C.green} index={3} />
        </div>

        {/* ── CHARTS ROW ── */}
        <div
          className="dash-grid-main"
          style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, marginBottom: 20 }}
        >
          {/* registration velocity */}
          <Panel>
            <SectionHeader title="Registration Velocity" action="View Report" />
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.green} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={C.green} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="1 4" stroke={C.border} vertical={false} />
                  <XAxis
                    dataKey="date" axisLine={false} tickLine={false}
                    tick={{ fill: C.muted, fontSize: 10, fontWeight: 600, fontFamily: 'DM Mono, monospace' }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false} tickLine={false}
                    tick={{ fill: C.muted, fontSize: 10, fontWeight: 600, fontFamily: 'DM Mono, monospace' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone" dataKey="count"
                    stroke={C.green} strokeWidth={2.5}
                    fillOpacity={1} fill="url(#gGreen)"
                    dot={false} animationDuration={1200}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          {/* status distribution */}
          <Panel style={{ display: 'flex', flexDirection: 'column' }}>
            <SectionHeader title="Verification Status" />
            <div style={{ flex: 1, minHeight: 200 }}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={statusData} innerRadius={65} outerRadius={90}
                    paddingAngle={6} dataKey="value" stroke="none"
                    animationBegin={200}
                  >
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} cornerRadius={6} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: C.card, border: `1px solid ${C.borderHi}`, borderRadius: 10, fontFamily: 'inherit' }}
                    itemStyle={{ color: C.text, fontSize: 12 }}
                    labelStyle={{ display: 'none' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {statusData.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.fill, flexShrink: 0 }} />
                    <span style={{ color: C.textDim, fontSize: 12, fontWeight: 600 }}>{s.name}</span>
                  </div>
                  <span style={{ color: C.text, fontSize: 13, fontWeight: 800, fontFamily: 'DM Mono, monospace' }}>
                    {s.value?.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* ── BOTTOM ROW ── */}
        <div
          className="dash-grid-bottom"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
        >
          {/* LGA Performance */}
          <Panel>
            <SectionHeader
              title={<span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Globe size={16} color={C.green} />Top LGA Performance</span>}
              action="View All"
            />
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lgaData} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="_id" type="category" axisLine={false} tickLine={false}
                    tick={{ fill: C.textDim, fontSize: 11, fontWeight: 600 }}
                    width={90}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: C.surface }}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={14}>
                    {lgaData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={`rgba(34,197,94,${1 - i * 0.09})`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          {/* Membership Interests */}
          <Panel>
            <SectionHeader title="Membership Interests" />
            <div style={{ overflowY: 'auto', maxHeight: 290, paddingRight: 4 }}>
              {(data?.interestBreakdown || []).map((item, i) => (
                <InterestBar key={item._id} item={item} total={data?.totals?.total} index={i} />
              ))}
            </div>
          </Panel>
        </div>

      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SKELETON (same export)
───────────────────────────────────────────── */
// const DashboardSkeleton = () => (
//   <div style={{ padding: '40px', background: C.bg, minHeight: '100vh' }}>
//     <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
//     {[...Array(5)].map((_, i) => (
//       <div key={i} style={{
//         height: i === 0 ? 48 : 160,
//         borderRadius: 16,
//         background: `linear-gradient(90deg, ${C.card} 25%, ${C.border} 50%, ${C.card} 75%)`,
//         backgroundSize: '200% 100%',
//         animation: 'shimmer 1.5s infinite',
//         marginBottom: 20,
//         width: i === 0 ? '35%' : '100%',
//       }} />
//     ))}
//   </div>
// );

export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Users, UserCheck, Clock, Download,
//   MapPin, Calendar, ChevronRight, ArrowUpRight,
//   CalendarClock, CalendarCheck, CalendarX, Inbox,
//   Globe, MoreHorizontal, ExternalLink,
// } from 'lucide-react';
// import {
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
//   ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
// } from 'recharts';
// import { format, parseISO, formatDistanceToNow } from 'date-fns';
// import api from '../utils/api';
// import toast from 'react-hot-toast';

// /* ═══════════════════════════════════════════════════════
//    DESIGN TOKENS
// ═══════════════════════════════════════════════════════ */
// const C = {
//   bg:        '#09100d',
//   surface:   '#0d1610',
//   card:      '#111a15',
//   cardHi:    '#162010',
//   border:    '#1a2820',
//   borderHi:  '#243828',

//   green:     '#22c55e',
//   greenDim:  '#16a34a',
//   greenGlow: 'rgba(34,197,94,0.10)',
//   greenFaint:'rgba(34,197,94,0.06)',

//   amber:     '#f59e0b',
//   amberDim:  '#b45309',
//   amberFaint:'rgba(245,158,11,0.08)',

//   blue:      '#38bdf8',
//   blueFaint: 'rgba(56,189,248,0.08)',

//   red:       '#f87171',
//   redFaint:  'rgba(248,113,113,0.08)',

//   violet:    '#a78bfa',
//   violetFaint:'rgba(167,139,250,0.08)',

//   muted:     '#3d5a47',
//   text:      '#ddeee5',
//   textDim:   '#7a9e8a',
//   textFaint: '#3a5244',
// };

// const MEMBER_STATUS = {
//   active:    { color: C.green,  label: 'Active' },
//   pending:   { color: C.amber,  label: 'Pending' },
//   contacted: { color: C.blue,   label: 'Contacted' },
//   inactive:  { color: C.muted,  label: 'Inactive' },
// };

// const APPT_STATUS = {
//   pending:  { color: C.amber,  label: 'Pending',  icon: '◷' },
//   approved: { color: C.green,  label: 'Approved', icon: '✓' },
//   rejected: { color: C.red,    label: 'Declined', icon: '✕' },
// };

// /* ═══════════════════════════════════════════════════════
//    SHARED PRIMITIVES
// ═══════════════════════════════════════════════════════ */
// const Panel = ({ children, style = {}, delay = 0 }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 14 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
//     style={{
//       background: C.card,
//       border: `1px solid ${C.border}`,
//       borderRadius: 18,
//       padding: 28,
//       ...style,
//     }}
//   />
// );

// const SectionLabel = ({ children, icon: Icon, color = C.textDim }) => (
//   <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
//     {Icon && <Icon size={14} color={color} />}
//     <span style={{
//       color,
//       fontSize: 11,
//       fontWeight: 800,
//       letterSpacing: '0.14em',
//       textTransform: 'uppercase',
//     }}>
//       {children}
//     </span>
//   </div>
// );

// const Divider = ({ style = {} }) => (
//   <div style={{ height: 1, background: C.border, margin: '20px 0', ...style }} />
// );

// /* ═══════════════════════════════════════════════════════
//    CUSTOM TOOLTIP
// ═══════════════════════════════════════════════════════ */
// const ChartTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <div style={{
//       background: '#0a1410',
//       border: `1px solid ${C.borderHi}`,
//       borderRadius: 10,
//       padding: '10px 14px',
//     }}>
//       <p style={{ color: C.textDim, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</p>
//       <p style={{ color: C.green, fontSize: 20, fontWeight: 900, lineHeight: 1 }}>
//         {payload[0].value?.toLocaleString()}
//         <span style={{ color: C.muted, fontSize: 10, fontWeight: 600, marginLeft: 5 }}>
//           {payload[0].name === 'count' ? 'members' : payload[0].name}
//         </span>
//       </p>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════
//    KPI STAT CARD  (members section)
// ═══════════════════════════════════════════════════════ */
// const StatCard = ({ icon: Icon, label, value, sub, accentColor = C.green, trend, index }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 18 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
//     whileHover={{ y: -2, transition: { duration: 0.18 } }}
//     style={{
//       background: C.card,
//       border: `1px solid ${C.border}`,
//       borderRadius: 18,
//       padding: 24,
//       position: 'relative',
//       overflow: 'hidden',
//       cursor: 'default',
//     }}
//   >
//     {/* top accent line */}
//     <div style={{
//       position: 'absolute', top: 0, left: 20, right: 20, height: 1,
//       background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)`,
//     }} />

//     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
//       <div style={{
//         width: 38, height: 38, borderRadius: 11,
//         background: `${accentColor}12`,
//         border: `1px solid ${accentColor}25`,
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//       }}>
//         <Icon size={17} color={accentColor} />
//       </div>
//       {trend != null && (
//         <div style={{
//           display: 'flex', alignItems: 'center', gap: 3,
//           background: `${C.green}12`, border: `1px solid ${C.green}22`,
//           borderRadius: 20, padding: '3px 9px',
//         }}>
//           <ArrowUpRight size={11} color={C.green} />
//           <span style={{ color: C.green, fontSize: 10, fontWeight: 800 }}>{trend}%</span>
//         </div>
//       )}
//     </div>

//     <div style={{ marginBottom: 5 }}>
//       <span style={{
//         fontSize: 34,
//         fontWeight: 900,
//         color: C.text,
//         letterSpacing: '-0.04em',
//         lineHeight: 1,
//         fontVariantNumeric: 'tabular-nums',
//       }}>
//         {value?.toLocaleString() ?? '—'}
//       </span>
//     </div>
//     <p style={{ color: C.textDim, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
//       {label}
//     </p>
//     {sub && <p style={{ color: C.muted, fontSize: 10, marginTop: 3 }}>{sub}</p>}
//   </motion.div>
// );

// /* ═══════════════════════════════════════════════════════
//    APPOINTMENT KPI STRIP
//    Distinct from member cards — uses a horizontal pipeline layout
//    to show the appointment funnel: received → pending → approved/declined
// ═══════════════════════════════════════════════════════ */
// const ApptFunnelStrip = ({ totals, delay }) => {
//   const stats = [
//     { label: 'Total Received',  value: totals?.total,    icon: Inbox,         color: C.violet,  faint: C.violetFaint },
//     { label: 'Awaiting Review', value: totals?.pending,  icon: CalendarClock, color: C.amber,   faint: C.amberFaint  },
//     { label: 'Approved',        value: totals?.approved, icon: CalendarCheck, color: C.green,   faint: C.greenFaint  },
//     { label: 'Declined',        value: totals?.rejected, icon: CalendarX,     color: C.red,     faint: C.redFaint    },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 14 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
//       style={{
//         background: C.card,
//         border: `1px solid ${C.border}`,
//         borderRadius: 18,
//         padding: '22px 28px',
//         display: 'grid',
//         gridTemplateColumns: 'repeat(4, 1fr)',
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >
//       {/* Subtle header band */}
//       <div style={{
//         position: 'absolute', top: 0, left: 0, right: 0, height: 1,
//         background: `linear-gradient(90deg, transparent, ${C.violet}40, ${C.amber}40, ${C.green}40, ${C.red}40, transparent)`,
//       }} />

//       {stats.map((s, i) => (
//         <React.Fragment key={s.label}>
//           <motion.div
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: delay + i * 0.06 }}
//             style={{
//               display: 'flex', flexDirection: 'column', gap: 10,
//               padding: '0 20px',
//               borderRight: i < stats.length - 1 ? `1px solid ${C.border}` : 'none',
//             }}
//           >
//             <div style={{
//               width: 34, height: 34, borderRadius: 10,
//               background: s.faint,
//               border: `1px solid ${s.color}22`,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}>
//               <s.icon size={15} color={s.color} />
//             </div>
//             <div>
//               <p style={{
//                 margin: 0,
//                 fontSize: 28, fontWeight: 900,
//                 color: C.text, letterSpacing: '-0.04em',
//                 fontVariantNumeric: 'tabular-nums', lineHeight: 1,
//               }}>
//                 {s.value?.toLocaleString() ?? '—'}
//               </p>
//               <p style={{
//                 margin: '5px 0 0',
//                 fontSize: 10, fontWeight: 700,
//                 textTransform: 'uppercase', letterSpacing: '0.1em',
//                 color: C.textDim,
//               }}>
//                 {s.label}
//               </p>
//             </div>
//           </motion.div>
//         </React.Fragment>
//       ))}
//     </motion.div>
//   );
// };

// /* ═══════════════════════════════════════════════════════
//    APPOINTMENT PIPELINE VIEW
//    Kanban-style 3-column status breakdown with recent items
// ═══════════════════════════════════════════════════════ */
// const ApptPipeline = ({ appointments = [], delay }) => {
//   // Group by status
//   const grouped = { pending: [], approved: [], rejected: [] };
//   appointments.forEach((a) => {
//     if (grouped[a.status]) grouped[a.status].push(a);
//   });

//   const cols = [
//     { key: 'pending',  label: 'Pending Review', ...APPT_STATUS.pending  },
//     { key: 'approved', label: 'Approved',        ...APPT_STATUS.approved },
//     { key: 'rejected', label: 'Declined',        ...APPT_STATUS.rejected },
//   ];

//   return (
//     <Panel delay={delay} style={{ padding: 0, overflow: 'hidden' }}>
//       {/* Panel header */}
//       <div style={{
//         display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//         padding: '22px 28px 0',
//       }}>
//         <SectionLabel icon={Calendar} color={C.violet}>
//           Appointment Pipeline
//         </SectionLabel>
//         <button style={{
//           display: 'flex', alignItems: 'center', gap: 4,
//           color: C.textDim, fontSize: 11, fontWeight: 700,
//           background: 'none', border: 'none', cursor: 'pointer',
//           letterSpacing: '0.06em', textTransform: 'uppercase',
//         }}>
//           View All <ChevronRight size={11} />
//         </button>
//       </div>

//       {/* 3-column pipeline */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(3, 1fr)',
//         gap: 1,
//         background: C.border,
//         margin: '16px 0 0',
//         borderTop: `1px solid ${C.border}`,
//       }}>
//         {cols.map((col) => (
//           <div key={col.key} style={{ background: C.card, padding: '18px 20px' }}>
//             {/* column header */}
//             <div style={{
//               display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//               marginBottom: 14,
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
//                 <div style={{ width: 6, height: 6, borderRadius: '50%', background: col.color }} />
//                 <span style={{ color: C.textDim, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
//                   {col.label}
//                 </span>
//               </div>
//               <span style={{
//                 background: `${col.color}15`,
//                 color: col.color,
//                 fontSize: 10, fontWeight: 800,
//                 padding: '2px 8px', borderRadius: 20,
//                 fontVariantNumeric: 'tabular-nums',
//               }}>
//                 {grouped[col.key].length}
//               </span>
//             </div>

//             {/* items */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//               {grouped[col.key].length === 0 ? (
//                 <p style={{ color: C.textFaint, fontSize: 11, fontStyle: 'italic', margin: 0 }}>
//                   No {col.label.toLowerCase()} requests
//                 </p>
//               ) : (
//                 grouped[col.key].slice(0, 4).map((appt, i) => (
//                   <motion.div
//                     key={appt._id}
//                     initial={{ opacity: 0, x: -6 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: delay + i * 0.05 }}
//                     style={{
//                       background: C.surface,
//                       border: `1px solid ${C.border}`,
//                       borderLeft: `2px solid ${col.color}`,
//                       borderRadius: 8,
//                       padding: '10px 12px',
//                       cursor: 'default',
//                     }}
//                   >
//                     <p style={{ margin: '0 0 3px', color: C.text, fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>
//                       {appt.fullName}
//                     </p>
//                     <p style={{ margin: 0, color: C.textDim, fontSize: 10, fontWeight: 500 }}>
//                       {appt.purpose}
//                     </p>
//                     {appt.preferredDate && (
//                       <p style={{ margin: '5px 0 0', color: C.muted, fontSize: 9, fontWeight: 600, letterSpacing: '0.04em' }}>
//                         📅 {appt.preferredDate}
//                       </p>
//                     )}
//                   </motion.div>
//                 ))
//               )}
//               {grouped[col.key].length > 4 && (
//                 <p style={{ color: C.muted, fontSize: 10, textAlign: 'center', margin: '2px 0 0' }}>
//                   +{grouped[col.key].length - 4} more
//                 </p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </Panel>
//   );
// };

// /* ═══════════════════════════════════════════════════════
//    RECENT APPOINTMENTS TABLE
//    Shows last N appointments with status chips + action hint
// ═══════════════════════════════════════════════════════ */
// const RecentApptTable = ({ appointments = [], delay }) => (
//   <Panel delay={delay} style={{ padding: 0, overflow: 'hidden' }}>
//     <div style={{ padding: '22px 28px 16px' }}>
//       <SectionLabel icon={Clock} color={C.amber}>Recent Requests</SectionLabel>
//     </div>

//     {appointments.length === 0 ? (
//       <div style={{ padding: '20px 28px 28px', color: C.muted, fontSize: 13, fontStyle: 'italic' }}>
//         No appointment requests yet.
//       </div>
//     ) : (
//       <div style={{ overflowX: 'auto' }}>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               {['Requester', 'Purpose', 'Preferred Date', 'Status', 'Submitted'].map((h) => (
//                 <th key={h} style={{
//                   padding: '8px 16px',
//                   textAlign: 'left',
//                   fontSize: 9,
//                   fontWeight: 800,
//                   letterSpacing: '0.12em',
//                   textTransform: 'uppercase',
//                   color: C.muted,
//                   borderBottom: `1px solid ${C.border}`,
//                   whiteSpace: 'nowrap',
//                 }}>
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.slice(0, 8).map((appt, i) => {
//               const st = APPT_STATUS[appt.status] || { color: C.muted, label: appt.status, icon: '·' };
//               return (
//                 <motion.tr
//                   key={appt._id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: delay + i * 0.04 }}
//                   style={{ borderBottom: `1px solid ${C.border}` }}
//                   onMouseEnter={e => {
//                     e.currentTarget.style.background = C.surface;
//                   }}
//                   onMouseLeave={e => {
//                     e.currentTarget.style.background = 'transparent';
//                   }}
//                 >
//                   <td style={{ padding: '12px 16px' }}>
//                     <div>
//                       <p style={{ margin: 0, color: C.text, fontSize: 12, fontWeight: 700 }}>{appt.fullName}</p>
//                       {appt.organization && (
//                         <p style={{ margin: '2px 0 0', color: C.muted, fontSize: 10 }}>{appt.organization}</p>
//                       )}
//                     </div>
//                   </td>
//                   <td style={{ padding: '12px 16px' }}>
//                     <span style={{ color: C.textDim, fontSize: 12 }}>{appt.purpose}</span>
//                   </td>
//                   <td style={{ padding: '12px 16px' }}>
//                     <span style={{
//                       color: appt.preferredDate ? C.textDim : C.textFaint,
//                       fontSize: 12,
//                       fontFamily: "'DM Mono', monospace",
//                     }}>
//                       {appt.preferredDate ?? '—'}
//                     </span>
//                   </td>
//                   <td style={{ padding: '12px 16px' }}>
//                     <span style={{
//                       display: 'inline-flex', alignItems: 'center', gap: 5,
//                       background: `${st.color}14`,
//                       border: `1px solid ${st.color}30`,
//                       color: st.color,
//                       fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
//                       padding: '3px 10px', borderRadius: 20,
//                     }}>
//                       <span>{st.icon}</span>
//                       {st.label}
//                     </span>
//                   </td>
//                   <td style={{ padding: '12px 16px' }}>
//                     <span style={{ color: C.muted, fontSize: 11, fontFamily: "'DM Mono', monospace" }}>
//                       {appt.createdAt
//                         ? formatDistanceToNow(new Date(appt.createdAt), { addSuffix: true })
//                         : '—'
//                       }
//                     </span>
//                   </td>
//                 </motion.tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     )}
//   </Panel>
// );

// /* ═══════════════════════════════════════════════════════
//    INTEREST BAR (members section)
// ═══════════════════════════════════════════════════════ */
// const InterestBar = ({ item, total, index }) => {
//   const pct = Math.round((item.count / (total || 1)) * 100);
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -8 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ delay: index * 0.06 + 0.3 }}
//       style={{ marginBottom: 14 }}
//     >
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
//         <span style={{ color: C.textDim, fontSize: 12, fontWeight: 600 }}>{item._id}</span>
//         <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
//           <span style={{ color: C.text, fontSize: 12, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
//             {item.count?.toLocaleString()}
//           </span>
//           <span style={{ color: C.muted, fontSize: 9, fontWeight: 700 }}>{pct}%</span>
//         </div>
//       </div>
//       <div style={{ height: 3, background: C.border, borderRadius: 3, overflow: 'hidden' }}>
//         <motion.div
//           initial={{ width: 0 }}
//           animate={{ width: `${pct}%` }}
//           transition={{ duration: 1, delay: index * 0.08 + 0.4, ease: [0.22, 1, 0.36, 1] }}
//           style={{
//             height: '100%',
//             background: `linear-gradient(90deg, ${C.green}, ${C.greenDim})`,
//             borderRadius: 3,
//             boxShadow: `0 0 6px ${C.green}35`,
//           }}
//         />
//       </div>
//     </motion.div>
//   );
// };

// /* ═══════════════════════════════════════════════════════
//    SKELETON
// ═══════════════════════════════════════════════════════ */
// const Sk = ({ h = 140, w = '100%', r = 16 }) => (
//   <div style={{
//     height: h, width: w, borderRadius: r,
//     background: `linear-gradient(90deg, ${C.card} 0%, ${C.border} 50%, ${C.card} 100%)`,
//     backgroundSize: '200% 100%',
//     animation: 'shimmer 1.6s infinite',
//   }} />
// );

// const DashboardSkeleton = () => (
//   <div style={{ padding: '36px 40px', background: C.bg, minHeight: '100vh' }}>
//     <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
//     <Sk h={40} w="28%" r={10} />
//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, margin: '32px 0 16px' }}>
//       {[...Array(4)].map((_, i) => <Sk key={i} />)}
//     </div>
//     <Sk h={76} r={18} />
//     <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, margin: '16px 0' }}>
//       <Sk h={300} />
//       <Sk h={300} />
//     </div>
//     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '16px 0' }}>
//       <Sk h={260} />
//       <Sk h={260} />
//     </div>
//     <Sk h={340} r={18} />
//     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
//       <Sk h={200} />
//       <Sk h={200} />
//     </div>
//   </div>
// );

// /* ═══════════════════════════════════════════════════════
//    MAIN DASHBOARD
// ═══════════════════════════════════════════════════════ */
// const Dashboard = () => {
//   const [exporting, setExporting] = useState(false);
//   const [clockStr, setClockStr]   = useState(format(new Date(), 'HH:mm:ss'));

//   // Live clock
//   useEffect(() => {
//     const t = setInterval(() => setClockStr(format(new Date(), 'HH:mm:ss')), 1000);
//     return () => clearInterval(t);
//   }, []);

//   // Member stats
//   const { data: memberData, isLoading: memberLoading } = useQuery({
//     queryKey: ['memberStats'],
//     queryFn: async () => {
//       const { data } = await api.get('/admin/members/stats');
//       return data.data;
//     },
//     refetchInterval: 60_000,
//   });

//   // Appointment stats + recent list
//   const { data: apptData, isLoading: apptLoading } = useQuery({
//     queryKey: ['apptStats'],
//     queryFn: async () => {
//       const [statsRes, listRes] = await Promise.all([
//         api.get('/appointments/stats'),
//         api.get('/appointments?limit=20&sort=-createdAt'),
//       ]);
//       return {
//         totals: statsRes.data.data?.totals,
//         recent: listRes.data.data?.appointments ?? [],
//       };
//     },
//     refetchInterval: 60_000,
//   });

//   const handleExport = async () => {
//     setExporting(true);
//     const t = toast.loading('Preparing export…');
//     try {
//       const res = await api.get('/admin/members/export', { responseType: 'blob' });
//       const url = URL.createObjectURL(new Blob([res.data]));
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `apc-members-${format(new Date(), 'yyyy-MM-dd')}.csv`;
//       a.click();
//       URL.revokeObjectURL(url);
//       toast.success('Export ready', { id: t });
//     } catch {
//       toast.error('Export failed', { id: t });
//     } finally {
//       setExporting(false);
//     }
//   };

//   if (memberLoading || apptLoading) return <DashboardSkeleton />;

//   const trendData = (memberData?.registrationTrend || []).map((d) => ({
//     date: format(parseISO(d._id), 'MMM d'),
//     count: d.count,
//   }));

//   const statusData = (memberData?.statusBreakdown || []).map((d) => ({
//     name: MEMBER_STATUS[d._id]?.label || d._id,
//     value: d.count,
//     fill: MEMBER_STATUS[d._id]?.color || C.muted,
//   }));

//   const lgaData = (memberData?.lgaBreakdown || []).slice(0, 8);

//   return (
//     <div style={{
//       background: C.bg,
//       minHeight: '100vh',
//       fontFamily: "'DM Sans', system-ui, sans-serif",
//       color: C.text,
//     }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&family=DM+Mono:wght@400;500&display=swap');
//         *, *::before, *::after { box-sizing: border-box; }
//         ::-webkit-scrollbar { width: 5px; height: 5px; }
//         ::-webkit-scrollbar-track { background: ${C.bg}; }
//         ::-webkit-scrollbar-thumb { background: ${C.borderHi}; border-radius: 4px; }
//         @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
//         @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.2)} }
//         @media (max-width: 1280px) {
//           .grid-main { grid-template-columns: 1fr !important; }
//           .grid-bottom { grid-template-columns: 1fr !important; }
//         }
//         @media (max-width: 900px) {
//           .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
//           .appt-funnel { grid-template-columns: repeat(2, 1fr) !important; }
//           .pipeline-grid { grid-template-columns: 1fr !important; }
//         }
//         @media (max-width: 600px) {
//           .kpi-grid { grid-template-columns: 1fr !important; }
//           .appt-funnel { grid-template-columns: 1fr !important; }
//           .dash-wrap { padding: 20px !important; }
//           .dash-header { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
//         }
//       `}</style>

//       <div className="dash-wrap" style={{ padding: '36px 40px', maxWidth: 1600, margin: '0 auto' }}>

//         {/* ── HEADER ─────────────────────────────────────────────── */}
//         <motion.div
//           className="dash-header"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45 }}
//           style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}
//         >
//           <div>
//             {/* live indicator */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
//               <div style={{
//                 width: 7, height: 7, borderRadius: '50%',
//                 background: C.green,
//                 boxShadow: `0 0 10px ${C.green}`,
//                 animation: 'pulse-dot 2.5s ease-in-out infinite',
//               }} />
//               <span style={{
//                 color: C.green, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
//               }}>
//                 Live Dashboard
//               </span>
//             </div>

//             <h1 style={{
//               margin: 0,
//               fontSize: 'clamp(22px, 3.5vw, 38px)',
//               fontWeight: 900,
//               letterSpacing: '-0.04em',
//               color: C.text,
//               lineHeight: 1,
//             }}>
//               APC Lagos Registry
//             </h1>
//             <p style={{ margin: '7px 0 0', color: C.muted, fontSize: 12, fontWeight: 500 }}>
//               Command & Analytics · {format(new Date(), 'EEEE, dd MMMM yyyy')}
//             </p>
//           </div>

//           <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//             {/* clock */}
//             <div style={{
//               background: C.card, border: `1px solid ${C.border}`,
//               borderRadius: 10, padding: '9px 16px',
//               fontFamily: "'DM Mono', monospace", fontSize: 13,
//               color: C.textDim, letterSpacing: '0.05em',
//             }}>
//               {clockStr}
//             </div>

//             {/* export */}
//             <motion.button
//               onClick={handleExport}
//               disabled={exporting}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.97 }}
//               style={{
//                 display: 'flex', alignItems: 'center', gap: 7,
//                 background: C.green, color: '#030a06',
//                 border: 'none', borderRadius: 10,
//                 padding: '10px 20px', fontWeight: 800, fontSize: 13,
//                 cursor: exporting ? 'not-allowed' : 'pointer',
//                 letterSpacing: '0.01em',
//                 boxShadow: `0 4px 20px ${C.green}30`,
//                 opacity: exporting ? 0.65 : 1,
//                 fontFamily: 'inherit',
//                 transition: 'opacity 0.2s',
//               }}
//             >
//               <Download size={15} />
//               Export CSV
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* ══════════════════════════════════════════════════════
//             SECTION A — MEMBER REGISTRY
//         ══════════════════════════════════════════════════════ */}

//         {/* Section divider label */}
//         <div style={{
//           display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
//         }}>
//           <span style={{ color: C.textFaint, fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
//             Member Registry
//           </span>
//           <div style={{ flex: 1, height: 1, background: C.border }} />
//         </div>

//         {/* KPI Cards */}
//         <div
//           className="kpi-grid"
//           style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 14 }}
//         >
//           <StatCard icon={Users}     label="Total Registry"    value={memberData?.totals?.total}    accentColor={C.green}  trend={12} index={0} />
//           <StatCard icon={Clock}     label="Pending Review"    value={memberData?.totals?.pending}   accentColor={C.amber}             index={1} sub="Awaiting verification" />
//           <StatCard icon={UserCheck} label="Active Members"    value={memberData?.totals?.active}    accentColor={C.blue}              index={2} />
//           <StatCard icon={Calendar}  label="New This Week"     value={memberData?.totals?.thisWeek}  accentColor={C.green}             index={3} />
//         </div>

//         {/* Charts row */}
//         <div
//           className="grid-main"
//           style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 14, marginBottom: 14 }}
//         >
//           {/* Registration velocity */}
//           <Panel delay={0.1}>
//             <SectionLabel icon={TrendingUpIcon} color={C.green}>Registration Velocity</SectionLabel>
//             <div style={{ height: 248 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
//                   <defs>
//                     <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor={C.green} stopOpacity={0.2} />
//                       <stop offset="95%" stopColor={C.green} stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="1 6" stroke={C.border} vertical={false} />
//                   <XAxis
//                     dataKey="date" axisLine={false} tickLine={false}
//                     tick={{ fill: C.muted, fontSize: 9, fontWeight: 700, fontFamily: 'DM Mono, monospace' }}
//                     dy={8}
//                   />
//                   <YAxis
//                     axisLine={false} tickLine={false}
//                     tick={{ fill: C.muted, fontSize: 9, fontWeight: 700, fontFamily: 'DM Mono, monospace' }}
//                   />
//                   <Tooltip content={<ChartTooltip />} />
//                   <Area
//                     type="monotone" dataKey="count"
//                     stroke={C.green} strokeWidth={2.5}
//                     fill="url(#gGreen)"
//                     dot={false} animationDuration={1200}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </Panel>

//           {/* Verification status donut */}
//           <Panel delay={0.15} style={{ display: 'flex', flexDirection: 'column' }}>
//             <SectionLabel icon={UserCheck} color={C.blue}>Verification Status</SectionLabel>
//             <ResponsiveContainer width="100%" height={200}>
//               <PieChart>
//                 <Pie
//                   data={statusData} innerRadius={58} outerRadius={82}
//                   paddingAngle={5} dataKey="value" stroke="none" animationBegin={300}
//                 >
//                   {statusData.map((entry, i) => (
//                     <Cell key={i} fill={entry.fill} cornerRadius={5} />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{ background: C.surface, border: `1px solid ${C.borderHi}`, borderRadius: 10, fontFamily: 'inherit' }}
//                   itemStyle={{ color: C.text, fontSize: 11 }}
//                   labelStyle={{ display: 'none' }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//             <Divider style={{ margin: '12px 0' }} />
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
//               {statusData.map((s, i) => (
//                 <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//                     <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.fill }} />
//                     <span style={{ color: C.textDim, fontSize: 11, fontWeight: 600 }}>{s.name}</span>
//                   </div>
//                   <span style={{ color: C.text, fontSize: 12, fontWeight: 800, fontFamily: 'DM Mono, monospace' }}>
//                     {s.value?.toLocaleString()}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </Panel>
//         </div>

//         {/* LGA + Interests row */}
//         <div
//           className="grid-bottom"
//           style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 36 }}
//         >
//           {/* LGA bar chart */}
//           <Panel delay={0.2}>
//             <SectionLabel icon={Globe} color={C.textDim}>Top LGA Performance</SectionLabel>
//             <div style={{ height: 260 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={lgaData} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
//                   <XAxis type="number" hide />
//                   <YAxis
//                     dataKey="_id" type="category" axisLine={false} tickLine={false}
//                     tick={{ fill: C.textDim, fontSize: 10, fontWeight: 600 }}
//                     width={90}
//                   />
//                   <Tooltip content={<ChartTooltip />} cursor={{ fill: `${C.green}08` }} />
//                   <Bar dataKey="count" radius={[0, 5, 5, 0]} barSize={11}>
//                     {lgaData.map((_, i) => (
//                       <Cell key={i} fill={`rgba(34,197,94,${1 - i * 0.09})`} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </Panel>

//           {/* Interests breakdown */}
//           <Panel delay={0.22}>
//             <SectionLabel icon={BarChart2Icon} color={C.textDim}>Membership Interests</SectionLabel>
//             <div style={{ overflowY: 'auto', maxHeight: 268, paddingRight: 4 }}>
//               {(memberData?.interestBreakdown || []).map((item, i) => (
//                 <InterestBar key={item._id} item={item} total={memberData?.totals?.total} index={i} />
//               ))}
//             </div>
//           </Panel>
//         </div>

//         {/* ══════════════════════════════════════════════════════
//             SECTION B — APPOINTMENTS
//             Visual language is intentionally different:
//             violet accent, pipeline/table layout vs grid cards
//         ══════════════════════════════════════════════════════ */}

//         {/* Section divider label */}
//         <div style={{
//           display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
//         }}>
//           <span style={{ color: C.textFaint, fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
//             Appointments
//           </span>
//           <div style={{ flex: 1, height: 1, background: C.border }} />
//           {apptData?.totals?.pending > 0 && (
//             <motion.span
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               style={{
//                 background: C.amber,
//                 color: '#030a06',
//                 fontSize: 10, fontWeight: 800,
//                 borderRadius: 20, padding: '2px 10px',
//               }}
//             >
//               {apptData.totals.pending} need review
//             </motion.span>
//           )}
//         </div>

//         {/* Appointment funnel KPIs */}
//         <div style={{ marginBottom: 14 }}>
//           <ApptFunnelStrip totals={apptData?.totals} delay={0.28} />
//         </div>

//         {/* Pipeline kanban + recent table */}
//         <div
//           className="grid-bottom"
//           style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 }}
//         >
//           <ApptPipeline
//             appointments={apptData?.recent ?? []}
//             delay={0.32}
//           />
//           <RecentApptTable
//             appointments={apptData?.recent ?? []}
//             delay={0.36}
//           />
//         </div>

//       </div>
//     </div>
//   );
// };

// /* Inline icon refs to avoid import name collisions */
// const TrendingUpIcon = ({ size, color }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
//     stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
//     <polyline points="16 7 22 7 22 13" />
//   </svg>
// );

// const BarChart2Icon = ({ size, color }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
//     stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="18" y1="20" x2="18" y2="10" />
//     <line x1="12" y1="20" x2="12" y2="4" />
//     <line x1="6" y1="20" x2="6" y2="14" />
//   </svg>
// );

// export default Dashboard;
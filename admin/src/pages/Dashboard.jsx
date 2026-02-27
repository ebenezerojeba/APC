// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { motion } from 'framer-motion';
// import { 
//   Users, UserCheck, Clock, TrendingUp, Download, 
//   MapPin, Activity, Calendar, ChevronRight 
// } from 'lucide-react';
// import {
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
//   ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar
// } from 'recharts';
// import { format, parseISO } from 'date-fns';
// import api from '../utils/api';
// import toast from 'react-hot-toast';

// // --- Theme Configuration ---
// const BRAND_COLORS = {
//   primary: '#15803d',   // APC Green
//   secondary: '#3b82f6', // Blue
//   accent: '#f59e0b',    // Amber
//   muted: '#64748b',     // Slate
// };

// const STATUS_MAP = {
//   active: { color: BRAND_COLORS.primary, label: 'Active' },
//   pending: { color: BRAND_COLORS.accent, label: 'Pending' },
//   contacted: { color: BRAND_COLORS.secondary, label: 'Contacted' },
//   inactive: { color: BRAND_COLORS.muted, label: 'Inactive' },
// };

// // --- Sub-Components ---

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-3 shadow-xl rounded-xl">
//         <p className="text-xs font-bold text-slate-500 uppercase mb-1">{label}</p>
//         <p className="text-lg font-black text-emerald-900">
//           {payload[0].value.toLocaleString()} <span className="text-xs font-medium text-slate-400">Members</span>
//         </p>
//       </div>
//     );
//   }
//   return null;
// };

// const StatCard = ({ icon: Icon, label, value, subLabel, trend, colorClass }) => (
//   <motion.div 
//     whileHover={{ y: -4 }}
//     className="bg-white rounded-4xl p-6 border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col justify-between relative overflow-hidden group"
//   >
//     <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-[0.03] group-hover:scale-110 transition-transform duration-500 ${colorClass.split(' ')[0]}`} />
    
//     <div className="flex items-center gap-4 mb-4">
//       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${colorClass}`}>
//         <Icon size={22} className="text-white" />
//       </div>
//       <div>
//         <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</p>
//         {subLabel && <p className="text-[10px] text-slate-400 font-medium">{subLabel}</p>}
//       </div>
//     </div>
    
//     <div className="flex items-end justify-between">
//       <h3 className="text-3xl font-black text-slate-900 tracking-tight">
//         {value?.toLocaleString() ?? '—'}
//       </h3>
//       {trend && (
//         <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
//           <TrendingUp size={12} className="mr-1" /> {trend}%
//         </span>
//       )}
//     </div>
//   </motion.div>
// );

// const Dashboard = () => {
//   const { data, isLoading } = useQuery({
//     queryKey: ['stats'],
//     queryFn: async () => {
//       const { data } = await api.get('/admin/members/stats');
//       return data.data;
//     },
//   });

//   const handleExport = async () => {
//     const loadingToast = toast.loading('Preparing CSV export...');
//     try {
//       const response = await api.get('/admin/members/export', { responseType: 'blob' });
//       const url = URL.createObjectURL(new Blob([response.data]));
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `apc-lagos-members-${format(new Date(), 'yyyy-MM-dd')}.csv`;
//       a.click();
//       toast.success('Database exported successfully', { id: loadingToast });
//     } catch {
//       toast.error('Export failed. Check permissions.', { id: loadingToast });
//     }
//   };

//   if (isLoading) return <DashboardSkeleton />;

//   // Data Formatting
//   const trendData = (data?.registrationTrend || []).map(d => ({
//     date: format(parseISO(d._id), 'MMM dd'),
//     count: d.count,
//   }));

//   const statusData = (data?.statusBreakdown || []).map(d => ({
//     name: STATUS_MAP[d._id]?.label || d._id,
//     value: d.count,
//     fill: STATUS_MAP[d._id]?.color || BRAND_COLORS.muted,
//   }));

//   return (
//     <div className="p-6 lg:p-10 space-y-8 bg-[#f8fafc] min-h-screen">
      
//       {/* 1. TOP NAVIGATION & ACTION BAR */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-[0.2em] mb-1">
//             <Activity size={14} />
//             Live System Overview
//           </div>
//           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Command Center</h1>
//         </div>
        
//         <div className="flex items-center gap-3">
//           <div className="hidden lg:flex flex-col items-end mr-4 text-right">
//             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Update</p>
//             <p className="text-sm font-bold text-slate-700">{format(new Date(), 'HH:mm:ss a')}</p>
//           </div>
//           <button 
//             onClick={handleExport}
//             className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-2xl font-bold transition-all shadow-xl shadow-slate-200"
//           >
//             <Download size={18} />
//             <span>Export Registry</span>
//           </button>
//         </div>
//       </div>

//       {/* 2. KPI GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard 
//           icon={Users} 
//           label="Total Registry" 
//           value={data?.totals?.total} 
//           colorClass="bg-emerald-600 shadow-emerald-200/50"
//           trend={12}
//         />
//         <StatCard 
//           icon={Clock} 
//           label="Pending Review" 
//           value={data?.totals?.pending} 
//           subLabel="Awaiting verification"
//           colorClass="bg-amber-500 shadow-amber-200/50"
//         />
//         <StatCard 
//           icon={UserCheck} 
//           label="Verified Members" 
//           value={data?.totals?.active} 
//           colorClass="bg-blue-600 shadow-blue-200/50"
//         />
//         <StatCard 
//           icon={Calendar} 
//           label="New This Week" 
//           value={data?.totals?.thisWeek} 
//           colorClass="bg-slate-800 shadow-slate-200/50"
//         />
//       </div>

//       {/* 3. CHARTING SECTION */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* Registration Velocity */}
//         <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
//           <div className="flex items-center justify-between mb-8">
//             <h3 className="text-xl font-black text-slate-900 tracking-tight">Registration Velocity</h3>
//             <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg px-3 py-2 outline-none">
//               <option>Last 30 Days</option>
//               <option>Last 7 Days</option>
//             </select>
//           </div>
//           <div className="h-75 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={trendData}>
//                 <defs>
//                   <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                 <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} dy={10} />
//                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Area 
//                   type="monotone" 
//                   dataKey="count" 
//                   stroke="#10b981" 
//                   strokeWidth={4} 
//                   fillOpacity={1} 
//                   fill="url(#colorCount)" 
//                   animationDuration={1500}
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Status Distribution */}
//         <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col">
//           <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Verification Status</h3>
//           <div className="flex-1 min-h-62.5">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={statusData}
//                   innerRadius={70}
//                   outerRadius={100}
//                   paddingAngle={8}
//                   dataKey="value"
//                   stroke="none"
//                 >
//                   {statusData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.fill} cornerRadius={10} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '20px', fontWeight: 600, fontSize: '12px' }} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* 4. GEOGRAPHIC & INTERESTS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
//         {/* LGA Performance */}
//         <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center gap-2">
//               <MapPin className="text-emerald-600" size={20} />
//               <h3 className="text-xl font-black text-slate-900 tracking-tight">Top LGA Performance</h3>
//             </div>
//             <button className="text-xs font-bold text-emerald-600 hover:underline">View All</button>
//           </div>
//           <div className="h-87.5">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data?.lgaBreakdown?.slice(0, 8)} layout="vertical" margin={{ left: 20 }}>
//                 <XAxis type="number" hide />
//                 <YAxis dataKey="_id" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11, fontWeight: 700}} width={100} />
//                 <Tooltip cursor={{fill: '#f8fafc'}} content={<CustomTooltip />} />
//                 <Bar dataKey="count" fill="#1e293b" radius={[0, 8, 8, 0]} barSize={20} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Interests Progress */}
//         <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
//           <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Membership Interests</h3>
//           <div className="space-y-6">
//             {(data?.interestBreakdown || []).map((item, i) => {
//               const pct = Math.round((item.count / (data?.totals?.total || 1)) * 100);
//               return (
//                 <div key={item._id} className="group">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">{item._id}</span>
//                     <div className="text-right">
//                        <span className="text-sm font-black text-slate-900">{item.count.toLocaleString()}</span>
//                        <span className="text-[10px] ml-1 font-bold text-slate-400">{pct}%</span>
//                     </div>
//                   </div>
//                   <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
//                     <motion.div
//                       initial={{ width: 0 }}
//                       animate={{ width: `${pct}%` }}
//                       transition={{ duration: 1, delay: i * 0.1 }}
//                       className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Simple Skeleton UI
// const DashboardSkeleton = () => (
//   <div className="p-10 space-y-8 animate-pulse">
//     <div className="h-12 bg-slate-200 rounded-2xl w-1/4" />
//     <div className="grid grid-cols-4 gap-6">
//       {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-slate-200 rounded-4xl" />)}
//     </div>
//     <div className="grid grid-cols-3 gap-6">
//       <div className="col-span-2 h-100 bg-slate-200 rounded-[2.5rem]" />
//       <div className="h-100 bg-slate-200 rounded-[2.5rem]" />
//     </div>
//   </div>
// );

// export default Dashboard;






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

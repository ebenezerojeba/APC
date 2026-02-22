// // src/pages/Dashboard.jsx
// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import {
//   Users, UserCheck, Clock, TrendingUp,
//   Calendar, MapPin, Download, ArrowRight
// } from 'lucide-react';
// import {
//   AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
//   ResponsiveContainer, PieChart, Pie, Cell, Legend
// } from 'recharts';
// import { format } from 'date-fns';
// import api from '../utils/api';
// import { useAuth } from '../context/AuthContext';

// const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

// const StatCard = ({ icon: Icon, label, value, sub, color = 'emerald', trend }) => {
//   const colors = {
//     emerald: 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50',
//     blue: 'bg-blue-900/30 text-blue-400 border-blue-800/50',
//     amber: 'bg-amber-900/30 text-amber-400 border-amber-800/50',
//     green: 'bg-green-900/30 text-green-400 border-green-800/50',
//   };
//   return (
//     <div className={`rounded-2xl border p-5 ${colors[color]}`}>
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-gray-400 text-sm font-medium">{label}</p>
//           <p className="text-3xl font-bold text-white mt-1">
//             {typeof value === 'number' ? value.toLocaleString() : value}
//           </p>
//           {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
//         </div>
//         <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5`}>
//           <Icon className="w-5 h-5" />
//         </div>
//       </div>
//       {trend !== undefined && (
//         <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs">
//           <TrendingUp className="w-3 h-3 text-emerald-400" />
//           <span className="text-emerald-400">+{trend} this week</span>
//         </div>
//       )}
//     </div>
//   );
// };

// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <div className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm">
//       <p className="text-gray-400 mb-1">{label}</p>
//       {payload.map((p, i) => (
//         <p key={i} style={{ color: p.color }} className="font-semibold">
//           {p.name}: {p.value?.toLocaleString()}
//         </p>
//       ))}
//     </div>
//   );
// };

// export default function Dashboard() {
//   const { admin, isSuperAdmin } = useAuth();
//   const navigate = useNavigate();

//   const { data, isLoading, error } = useQuery({
//     queryKey: ['analytics'],
//     queryFn: () => api.get('/admin/analytics').then(r => r.data.data),
//     refetchInterval: 60000, // auto-refresh every minute
//     staleTime: 30000,
//   });

//   if (isLoading) return (
//     <div className="flex items-center justify-center h-64">
//       <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
//     </div>
//   );

//   if (error) return (
//     <div className="text-center py-20 text-red-400">
//       Failed to load dashboard. {error.message}
//     </div>
//   );

//   const { overview, lgaBreakdown = [], registrationTrend = [], interestBreakdown = [] } = data;

//   // Fill missing dates in trend
//   const trendData = registrationTrend.map(d => ({
//     date: format(new Date(d.date), 'MMM d'),
//     Registrations: parseInt(d.count),
//   }));

//   const interestData = interestBreakdown.map(d => ({
//     name: d.interest,
//     value: parseInt(d.count),
//   }));

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-white">Dashboard</h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Welcome back, {admin?.fullName?.split(' ')[0]}
//             {admin?.lgaScope ? ` · ${admin.lgaScope} LGA` : ''}
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => navigate('/members')}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-sm transition"
//           >
//             <Users className="w-4 h-4" /> View Members
//           </button>
//           {isSuperAdmin && (
//             <button
//               onClick={() => api.get('/admin/members/export/csv', { responseType: 'blob' }).then(r => {
//                 const url = URL.createObjectURL(r.data);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = `lagos-apc-members-${format(new Date(), 'yyyy-MM-dd')}.csv`;
//                 a.click();
//               })}
//               className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm transition"
//             >
//               <Download className="w-4 h-4" /> Export CSV
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Stats row */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard
//           icon={Users} label="Total Members" color="emerald"
//           value={overview?.total_members || 0}
//           trend={overview?.new_this_week || 0}
//         />
//         <StatCard
//           icon={UserCheck} label="Verified" color="blue"
//           value={overview?.verified_members || 0}
//           sub="Fully confirmed"
//         />
//         <StatCard
//           icon={Clock} label="Pending Review" color="amber"
//           value={overview?.pending_members || 0}
//           sub="Awaiting action"
//         />
//         <StatCard
//           icon={Calendar} label="Today" color="green"
//           value={overview?.new_today || 0}
//           sub={`${overview?.new_this_month || 0} this month`}
//         />
//       </div>

//       {/* Charts row */}
//       <div className="grid lg:grid-cols-3 gap-4">
//         {/* Registration trend */}
//         <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-5">
//           <h3 className="text-white font-semibold mb-4">Registrations — Last 30 Days</h3>
//           {trendData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={220}>
//               <AreaChart data={trendData}>
//                 <defs>
//                   <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
//                     <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
//                 <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Area type="monotone" dataKey="Registrations" stroke="#10b981" fill="url(#regGrad)" strokeWidth={2} dot={false} />
//               </AreaChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="h-[220px] flex items-center justify-center text-gray-600 text-sm">
//               No registrations in the last 30 days
//             </div>
//           )}
//         </div>

//         {/* Interest breakdown */}
//         <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
//           <h3 className="text-white font-semibold mb-4">Volunteer Interests</h3>
//           {interestData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={220}>
//               <PieChart>
//                 <Pie
//                   data={interestData} cx="50%" cy="50%"
//                   innerRadius={55} outerRadius={85}
//                   paddingAngle={3} dataKey="value"
//                 >
//                   {interestData.map((_, i) => (
//                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(val) => val.toLocaleString()} />
//                 <Legend
//                   iconType="circle" iconSize={8}
//                   formatter={(val) => <span style={{ color: '#9ca3af', fontSize: 11 }}>{val}</span>}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="h-[220px] flex items-center justify-center text-gray-600 text-sm">No data</div>
//           )}
//         </div>
//       </div>

//       {/* LGA Breakdown table */}
//       {isSuperAdmin && lgaBreakdown.length > 0 && (
//         <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-white font-semibold flex items-center gap-2">
//               <MapPin className="w-4 h-4 text-emerald-400" /> LGA Breakdown
//             </h3>
//             <button
//               onClick={() => navigate('/analytics')}
//               className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1"
//             >
//               Full report <ArrowRight className="w-3 h-3" />
//             </button>
//           </div>

//           {/* Top LGAs bar chart */}
//           <ResponsiveContainer width="100%" height={200}>
//             <BarChart data={lgaBreakdown.slice(0, 10)} layout="vertical" margin={{ left: 20 }}>
//               <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
//               <YAxis type="category" dataKey="lga" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
//               <Tooltip content={<CustomTooltip />} />
//               <Bar dataKey="total" name="Members" fill="#10b981" radius={[0, 4, 4, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// }








import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, UserCheck, Clock, TrendingUp, Download } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { format, parseISO } from 'date-fns';
import api from '../utils/api';
import toast from 'react-hot-toast';

const COLORS = ['#15803d', '#3b82f6', '#f59e0b', '#6b7280'];
const STATUS_COLORS = {
  pending: '#f59e0b',
  contacted: '#3b82f6',
  active: '#15803d',
  inactive: '#9ca3af',
};

const StatCard = ({ icon: Icon, label, value, subLabel, color }) => (
  <div className="card p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value?.toLocaleString() ?? '—'}</p>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      {subLabel && <p className="text-xs text-gray-400 mt-0.5">{subLabel}</p>}
    </div>
  </div>
);

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data } = await api.get('/admin/members/stats');
      return data.data;
    },
  });

  const handleExport = async () => {
    try {
      const response = await api.get('/admin/members/export', { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `apc-members-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Export downloaded!');
    } catch {
      toast.error('Export failed. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-gray-200 rounded-2xl" />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="h-72 bg-gray-200 rounded-2xl" />
            <div className="h-72 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const trendData = (data?.registrationTrend || []).map(d => ({
    date: format(parseISO(d._id), 'MMM d'),
    registrations: d.count,
  }));

  const statusData = (data?.statusBreakdown || []).map(d => ({
    name: d._id.charAt(0).toUpperCase() + d._id.slice(1),
    value: d.count,
    fill: STATUS_COLORS[d._id] || '#9ca3af',
  }));

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Lagos APC Member Registration Overview</p>
        </div>
        <button onClick={handleExport} className="btn-secondary">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Members"
          value={data?.totals?.total}
          color="bg-brand-700"
        />
        <StatCard
          icon={Clock}
          label="Pending"
          value={data?.totals?.pending}
          subLabel="Awaiting contact"
          color="bg-amber-500"
        />
        <StatCard
          icon={UserCheck}
          label="Active Members"
          value={data?.totals?.active}
          color="bg-blue-600"
        />
        <StatCard
          icon={TrendingUp}
          label="This Week"
          value={data?.totals?.thisWeek}
          subLabel="New registrations"
          color="bg-purple-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Registration Trend */}
        <div className="card p-5 lg:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-4">Registration Trend (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#15803d" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#15803d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="registrations"
                stroke="#15803d"
                strokeWidth={2.5}
                fill="url(#areaGreen)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Breakdown */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(v, n) => [v.toLocaleString(), n]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LGA + Interests Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top LGAs */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Members by LGA (Top 10)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={(data?.lgaBreakdown || []).map(d => ({ lga: d._id, count: d.count }))}
              layout="vertical"
              margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
              <YAxis dataKey="lga" type="category" tick={{ fontSize: 11, fill: '#555' }} tickLine={false} width={100} />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="count" fill="#15803d" radius={[0, 4, 4, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Interest Breakdown */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Areas of Interest</h3>
          <div className="space-y-3">
            {(data?.interestBreakdown || []).map((item, i) => {
              const pct = Math.round((item.count / (data?.totals?.total || 1)) * 100);
              return (
                <div key={item._id}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">{item._id}</span>
                    <span className="text-gray-500">{item.count.toLocaleString()} <span className="text-gray-400 text-xs">({pct}%)</span></span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-600 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {!data?.interestBreakdown?.length && (
              <p className="text-gray-400 text-sm text-center py-6">No interest data yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
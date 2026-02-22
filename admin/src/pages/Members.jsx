// // src/pages/Members.jsx
// import { useState, useCallback } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { format } from 'date-fns';
// import {
//   Search, Filter, Download, ChevronLeft, ChevronRight,
//   CheckCircle, Clock, XCircle, Eye, Trash2, X, RefreshCw
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import api from '../utils/api';
// import { useAuth } from '../context/AuthContext';

// const LGAS = [
//   'All LGAs', 'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
//   'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
//   'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
//   'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere'
// ];

// const STATUSES = ['All', 'pending', 'active', 'verified', 'suspended', 'duplicate'];
// const INTERESTS = ['All', 'Volunteer', 'Grassroots Support', 'Media & Comms', 'Polling Agent', 'PVC'];

// const statusConfig = {
//   pending: { icon: Clock, color: 'text-amber-400 bg-amber-900/30 border-amber-800/50', label: 'Pending' },
//   active: { icon: CheckCircle, color: 'text-blue-400 bg-blue-900/30 border-blue-800/50', label: 'Active' },
//   verified: { icon: CheckCircle, color: 'text-emerald-400 bg-emerald-900/30 border-emerald-800/50', label: 'Verified' },
//   suspended: { icon: XCircle, color: 'text-red-400 bg-red-900/30 border-red-800/50', label: 'Suspended' },
//   duplicate: { icon: XCircle, color: 'text-gray-400 bg-gray-800/50 border-gray-700', label: 'Duplicate' },
// };

// const StatusBadge = ({ status }) => {
//   const cfg = statusConfig[status] || statusConfig.pending;
//   const Icon = cfg.icon;
//   return (
//     <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
//       <Icon className="w-3 h-3" /> {cfg.label}
//     </span>
//   );
// };

// // Member detail modal
// const MemberModal = ({ member, onClose, onStatusUpdate, canEdit }) => {
//   const [newStatus, setNewStatus] = useState(member.status);
//   const [notes, setNotes] = useState(member.notes || '');
//   const [saving, setSaving] = useState(false);

//   const handleUpdate = async () => {
//     setSaving(true);
//     try {
//       await onStatusUpdate(member.id, newStatus, notes);
//       toast.success('Member updated');
//       onClose();
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Update failed');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="fixed inset-0 bg-black/70" onClick={onClose} />
//       <div className="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl z-10">
//         <div className="flex items-start justify-between mb-5">
//           <div>
//             <h3 className="text-white font-bold text-lg">{member.first_name} {member.last_name}</h3>
//             <p className="text-gray-500 text-sm">{member.lga} LGA {member.ward ? `· ${member.ward} Ward` : ''}</p>
//           </div>
//           <button onClick={onClose} className="text-gray-500 hover:text-white">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="space-y-3 text-sm mb-6">
//           <Row label="Email" value={member.email || '—'} />
//           <Row label="Phone" value={member.phone} />
//           <Row label="Interests" value={member.interests?.join(', ') || '—'} />
//           <Row label="Registered" value={format(new Date(member.registered_at), 'PPpp')} />
//           {member.message && <Row label="Message" value={member.message} />}
//           <Row label="Status">
//             <StatusBadge status={member.status} />
//           </Row>
//         </div>

//         {canEdit && (
//           <div className="border-t border-gray-800 pt-5 space-y-3">
//             <div>
//               <label className="block text-gray-400 text-xs mb-1.5">Update Status</label>
//               <select
//                 value={newStatus}
//                 onChange={e => setNewStatus(e.target.value)}
//                 className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
//               >
//                 {STATUSES.filter(s => s !== 'All').map(s => (
//                   <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-400 text-xs mb-1.5">Internal Notes</label>
//               <textarea
//                 value={notes}
//                 onChange={e => setNotes(e.target.value)}
//                 rows={3}
//                 className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 resize-none"
//                 placeholder="Add internal notes..."
//               />
//             </div>
//             <button
//               onClick={handleUpdate}
//               disabled={saving}
//               className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition"
//             >
//               {saving ? 'Saving...' : 'Save Changes'}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const Row = ({ label, value, children }) => (
//   <div className="flex gap-3">
//     <span className="text-gray-500 w-24 flex-shrink-0">{label}</span>
//     <span className="text-white flex-1">{children || value}</span>
//   </div>
// );

// export default function Members() {
//   const { canEdit, isSuperAdmin } = useAuth();
//   const queryClient = useQueryClient();

//   const [filters, setFilters] = useState({
//     search: '', lga: '', status: '', interest: '',
//     page: 1, limit: 25
//   });
//   const [selectedMember, setSelectedMember] = useState(null);

//   const { data, isLoading, isFetching } = useQuery({
//     queryKey: ['members', filters],
//     queryFn: () => api.get('/admin/members', {
//       params: {
//         search: filters.search || undefined,
//         lga: filters.lga || undefined,
//         status: filters.status || undefined,
//         interest: filters.interest || undefined,
//         page: filters.page,
//         limit: filters.limit,
//       }
//     }).then(r => r.data.data),
//     keepPreviousData: true,
//     staleTime: 30000,
//   });

//   const statusMutation = useMutation({
//     mutationFn: ({ id, status, notes }) =>
//       api.patch(`/admin/members/${id}/status`, { status, notes }),
//     onSuccess: () => queryClient.invalidateQueries(['members']),
//   });

//   const deleteMutation = useMutation({
//     mutationFn: (id) => api.delete(`/admin/members/${id}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['members']);
//       toast.success('Member deleted');
//     },
//     onError: (err) => toast.error(err.response?.data?.message || 'Delete failed'),
//   });

//   const handleDelete = (member) => {
//     if (!window.confirm(`Delete ${member.first_name} ${member.last_name}? This cannot be undone.`)) return;
//     deleteMutation.mutate(member.id);
//   };

//   const handleExport = async () => {
//     try {
//       const res = await api.get('/admin/members/export/csv', {
//         responseType: 'blob',
//         params: { lga: filters.lga || undefined, status: filters.status || undefined }
//       });
//       const url = URL.createObjectURL(res.data);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `lagos-apc-members-${format(new Date(), 'yyyy-MM-dd')}.csv`;
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       toast.error('Export failed');
//     }
//   };

//   const setFilter = useCallback((key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
//   }, []);

//   const members = data?.members || [];
//   const pagination = data?.pagination;

//   return (
//     <div className="space-y-5">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-white">Members</h1>
//           {pagination && (
//             <p className="text-gray-500 text-sm mt-0.5">
//               {pagination.total.toLocaleString()} total records
//             </p>
//           )}
//         </div>
//         <button
//           onClick={handleExport}
//           className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm transition"
//         >
//           <Download className="w-4 h-4" /> Export CSV
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//           {/* Search */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
//             <input
//               type="text"
//               value={filters.search}
//               onChange={e => setFilter('search', e.target.value)}
//               placeholder="Search by name..."
//               className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
//             />
//           </div>

//           {/* LGA filter */}
//           <select
//             value={filters.lga}
//             onChange={e => setFilter('lga', e.target.value === 'All LGAs' ? '' : e.target.value)}
//             className="bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
//           >
//             {LGAS.map(l => <option key={l} value={l === 'All LGAs' ? '' : l}>{l}</option>)}
//           </select>

//           {/* Status filter */}
//           <select
//             value={filters.status}
//             onChange={e => setFilter('status', e.target.value === 'All' ? '' : e.target.value)}
//             className="bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
//           >
//             {STATUSES.map(s => <option key={s} value={s === 'All' ? '' : s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
//           </select>

//           {/* Interest filter */}
//           <select
//             value={filters.interest}
//             onChange={e => setFilter('interest', e.target.value === 'All' ? '' : e.target.value)}
//             className="bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
//           >
//             {INTERESTS.map(i => <option key={i} value={i === 'All' ? '' : i}>{i}</option>)}
//           </select>
//         </div>

//         {/* Active filters */}
//         {(filters.search || filters.lga || filters.status || filters.interest) && (
//           <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-800">
//             <span className="text-gray-500 text-xs">Active filters:</span>
//             {filters.search && <FilterChip label={`"${filters.search}"`} onRemove={() => setFilter('search', '')} />}
//             {filters.lga && <FilterChip label={filters.lga} onRemove={() => setFilter('lga', '')} />}
//             {filters.status && <FilterChip label={filters.status} onRemove={() => setFilter('status', '')} />}
//             {filters.interest && <FilterChip label={filters.interest} onRemove={() => setFilter('interest', '')} />}
//             <button onClick={() => setFilters({ search: '', lga: '', status: '', interest: '', page: 1, limit: 25 })}
//               className="text-gray-500 hover:text-white text-xs ml-auto">
//               Clear all
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
//         {isLoading ? (
//           <div className="flex items-center justify-center h-64">
//             <div className="animate-spin w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full" />
//           </div>
//         ) : members.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-48 text-gray-500">
//             <Users className="w-10 h-10 mb-3 opacity-30" />
//             <p>No members found</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-800">
//                   {['Name', 'Contact', 'LGA', 'Ward', 'Interests', 'Status', 'Registered', 'Actions'].map(h => (
//                     <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-800/50">
//                 {members.map(m => (
//                   <tr key={m.id} className="hover:bg-gray-800/30 transition group">
//                     <td className="px-4 py-3">
//                       <p className="text-white font-medium text-sm">{m.first_name} {m.last_name}</p>
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-400">
//                       <p>{m.phone}</p>
//                       {m.email && <p className="text-xs text-gray-600 truncate max-w-[160px]">{m.email}</p>}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-300">{m.lga}</td>
//                     <td className="px-4 py-3 text-sm text-gray-500">{m.ward || '—'}</td>
//                     <td className="px-4 py-3 text-sm text-gray-400">
//                       <span className="truncate block max-w-[140px]">
//                         {Array.isArray(m.interests) ? m.interests.join(', ') : '—'}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
//                     <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
//                       {format(new Date(m.registered_at), 'MMM d, yyyy')}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
//                         <button
//                           onClick={() => setSelectedMember(m)}
//                           className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
//                           title="View / Edit"
//                         >
//                           <Eye className="w-3.5 h-3.5" />
//                         </button>
//                         {isSuperAdmin && (
//                           <button
//                             onClick={() => handleDelete(m)}
//                             className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition"
//                             title="Delete"
//                           >
//                             <Trash2 className="w-3.5 h-3.5" />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination */}
//         {pagination && pagination.totalPages > 1 && (
//           <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800">
//             <p className="text-sm text-gray-500">
//               Showing {((pagination.page - 1) * pagination.limit) + 1}–
//               {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total.toLocaleString()}
//             </p>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setFilter('page', filters.page - 1)}
//                 disabled={!pagination.hasPrev}
//                 className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <span className="text-sm text-gray-400">
//                 Page {pagination.page} / {pagination.totalPages}
//               </span>
//               <button
//                 onClick={() => setFilter('page', filters.page + 1)}
//                 disabled={!pagination.hasNext}
//                 className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Member modal */}
//       {selectedMember && (
//         <MemberModal
//           member={selectedMember}
//           canEdit={canEdit}
//           onClose={() => setSelectedMember(null)}
//           onStatusUpdate={async (id, status, notes) => {
//             await statusMutation.mutateAsync({ id, status, notes });
//           }}
//         />
//       )}
//     </div>
//   );
// }

// // eslint-disable-next-line react/prop-types
// import { Users } from 'lucide-react';
// const FilterChip = ({ label, onRemove }) => (
//   <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-900/30 text-emerald-400 border border-emerald-800/50 rounded-full text-xs">
//     {label}
//     <button onClick={onRemove} className="hover:text-white">
//       <X className="w-3 h-3" />
//     </button>
//   </span>
// );


import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, ChevronLeft, ChevronRight, Eye, Users } from 'lucide-react';
import { format } from 'date-fns';
import api from '../utils/api';
import toast from 'react-hot-toast';

const LGAS = [
  '', 'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
  'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
  'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere'
];

const StatusBadge = ({ status }) => {
  const cls = {
    pending: 'badge-pending',
    contacted: 'badge-contacted',
    active: 'badge-active',
    inactive: 'badge-inactive',
  }[status] || 'badge-inactive';

  return <span className={cls}>{status}</span>;
};

const Members = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ status: '', lga: '', search: '', page: 1, limit: 20 });

  const setFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['members', filters],
    queryFn: async () => {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      );
      const { data } = await api.get('/admin/members', { params });
      return data.data;
    },
    keepPreviousData: true,
  });

  const handleExport = async () => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.lga) params.lga = filters.lga;
      const response = await api.get('/admin/members/export', { params, responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `apc-members-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('CSV exported!');
    } catch {
      toast.error('Export failed.');
    }
  };

  const { members = [], pagination = {} } = data || {};

  return (
    <div className="p-6 lg:p-8 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {pagination.total ? `${pagination.total.toLocaleString()} total registrations` : 'Manage member registrations'}
          </p>
        </div>
        <button onClick={handleExport} className="btn-secondary">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              className="input pl-9"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilter('status', e.target.value)}
            className="input w-full sm:w-40"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* LGA Filter */}
          <select
            value={filters.lga}
            onChange={(e) => setFilter('lga', e.target.value)}
            className="input w-full sm:w-44"
          >
            {LGAS.map(lga => (
              <option key={lga} value={lga}>{lga || 'All LGAs'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">Failed to load members. Please refresh.</div>
        ) : members.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No members found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Name</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Contact</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">LGA</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Interests</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Registered</th>
                  <th className="px-4 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {members.map((member) => (
                  <tr
                    key={member._id}
                    className="hover:bg-gray-50/60 transition-colors cursor-pointer group"
                    onClick={() => navigate(`/members/${member._id}`)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-brand-700 font-semibold text-xs">
                            {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{member.firstName} {member.lastName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-xs text-gray-400">{member.phone}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-gray-700">{member.lga}</p>
                      {member.ward && <p className="text-xs text-gray-400">{member.ward}</p>}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(member.interests || []).slice(0, 2).map(i => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{i}</span>
                        ))}
                        {(member.interests || []).length > 2 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                            +{member.interests.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={member.status} />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-400">
                      {format(new Date(member.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-gray-300 group-hover:text-brand-600 transition-colors">
                        <Eye size={16} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50">
            <p className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilters(p => ({ ...p, page: p.page - 1 }))}
                disabled={pagination.page <= 1}
                className="btn-secondary px-3 py-2 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setFilters(p => ({ ...p, page: p.page + 1 }))}
                disabled={!pagination.hasNext}
                className="btn-secondary px-3 py-2 disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
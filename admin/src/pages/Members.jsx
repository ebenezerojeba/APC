import React, { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Download, ChevronLeft, ChevronRight, 
  Eye, Users, MoreHorizontal, UserMinus, ShieldCheck, Mail, Phone
} from 'lucide-react';
import { format } from 'date-fns';
import debounce from 'lodash/debounce'; // Recommended: npm install lodash
import api from '../utils/api';
import toast from 'react-hot-toast';

const LGAS = [
  '', 'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
  'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
  'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere'
];

// --- Sophisticated Status Badge ---
const StatusBadge = ({ status }) => {
  const styles = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    pending: 'bg-amber-50 text-amber-700 border-amber-100',
    contacted: 'bg-blue-50 text-blue-700 border-blue-100',
    inactive: 'bg-slate-50 text-slate-600 border-slate-200',
  }[status] || 'bg-slate-50 text-slate-600 border-slate-200';

  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${styles}`}>
      {status}
    </span>
  );
};

const Members = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ status: '', lga: '', search: '', page: 1, limit: 20 });
  
  // Debounced search to optimize API calls
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useMemo(
    () => debounce((val) => setFilters(prev => ({ ...prev, search: val, page: 1 })), 400),
    []
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const setFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['members', filters],
    queryFn: async () => {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      );
      const { data } = await api.get('/admin/members', { params });
      return data.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const handleExport = async () => {
    const loadId = toast.loading('Preparing data export...');
    try {
      const { status, lga } = filters;
      const response = await api.get('/admin/members/export', { 
        params: { status, lga }, 
        responseType: 'blob' 
      });
      const url = URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `apc-registry-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      a.click();
      toast.success('Registry exported successfully', { id: loadId });
    } catch {
      toast.error('Export failed', { id: loadId });
    }
  };

  const { members = [], pagination = {} } = data || {};

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-[#f8fafc] min-h-screen">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Member Registry</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-slate-500 text-sm font-medium">
              {pagination.total?.toLocaleString() || '0'} Total Registered Members
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleExport} 
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* 2. Advanced Filtering Bar */}
      <div className="bg-white rounded-[1.5rem] p-4 border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
          <input
            type="text"
            placeholder="Search by name, ID, or phone..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/10 focus:bg-white transition-all text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={filters.status}
              onChange={(e) => setFilter('status', e.target.value)}
              className="bg-slate-50 border-none rounded-xl pl-9 pr-8 py-3 text-sm font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500/10"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="contacted">Contacted</option>
            </select>
          </div>

          <select
            value={filters.lga}
            onChange={(e) => setFilter('lga', e.target.value)}
            className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500/10"
          >
            {LGAS.map(lga => (
              <option key={lga} value={lga}>{lga || 'All LGAs'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Members Table Component */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-6 py-5">Full Name</th>
                <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-6 py-5">Contact Details</th>
                <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-6 py-5">LGA / Ward</th>
                <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-6 py-5">Interests</th>
                <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-6 py-5">Status</th>
                <th className="px-6 py-5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {isLoading && !isPlaceholderData ? (
                   <TableSkeleton />
                ) : members.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-20 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                          <Users size={32} className="text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No members found</h3>
                        <p className="text-slate-400 text-sm">Try adjusting your filters or search keywords.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  members.map((member, idx) => (
                    <motion.tr
                      key={member._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      onClick={() => navigate(`/members/${member._id}`)}
                      className="group hover:bg-emerald-50/30 transition-all cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center border border-emerald-200/50">
                            <span className="text-emerald-700 font-black text-xs">
                              {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                              {member.firstName} {member.lastName}
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">ID: {member._id.slice(-8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Mail size={12} className="text-slate-300" />
                            <span className="text-xs font-medium">{member.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Phone size={12} className="text-slate-300" />
                            <span className="text-xs font-medium">{member.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-700">{member.lga}</p>
                        <p className="text-[11px] font-medium text-slate-400">Ward: {member.ward || 'N/A'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {(member.interests || []).slice(0, 1).map(i => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md capitalize">{i}</span>
                          ))}
                          {member.interests?.length > 1 && (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md">
                              +{member.interests.length - 1} More
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={member.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-300 group-hover:text-emerald-600">
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* 4. Refined Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-8 py-5 border-t border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Page {pagination.page} <span className="mx-1 text-slate-300">/</span> {pagination.totalPages}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilters(p => ({ ...p, page: p.page - 1 }))}
                disabled={pagination.page <= 1}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setFilters(p => ({ ...p, page: p.page + 1 }))}
                disabled={!pagination.hasNext}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Skeleton Loader for smooth data transitions
const TableSkeleton = () => (
  <>
    {[...Array(6)].map((_, i) => (
      <tr key={i} className="animate-pulse">
        <td colSpan="6" className="px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-xl" />
            <div className="space-y-2">
              <div className="h-3 bg-slate-100 rounded w-32" />
              <div className="h-2 bg-slate-50 rounded w-20" />
            </div>
          </div>
        </td>
      </tr>
    ))}
  </>
);

export default Members;
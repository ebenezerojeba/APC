import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Mail, Phone, MapPin, Tag, MessageSquare,
  Calendar, Globe, CheckCircle, Trash2, Save, Clock,
  ShieldAlert, UserCheck, ExternalLink, AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import api from '../utils/api.js';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore.js';

// --- Configuration ---
const STATUS_CONFIG = {
  pending:   { label: 'Pending',   color: 'amber', icon: Clock },
  contacted: { label: 'Contacted', color: 'blue',  icon: MessageSquare },
  active:    { label: 'Active',    color: 'emerald', icon: UserCheck },
  inactive:  { label: 'Inactive',  color: 'slate', icon: AlertCircle },
};

// --- Sub-Components ---

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.inactive;
  const colorMap = {
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    slate: 'bg-slate-50 text-slate-600 border-slate-200',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${colorMap[cfg.color]}`}>
      <cfg.icon size={12} />
      {cfg.label}
    </span>
  );
};

const DataField = ({ icon: Icon, label, value, href }) => {
  if (!value) return null;
  const Content = () => (
    <div className="flex items-center gap-4 group cursor-default">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-white group-hover:border-emerald-200 transition-all">
        <Icon size={18} className="text-slate-400 group-hover:text-emerald-600" />
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{label}</p>
        <p className="text-sm font-bold text-slate-700 flex items-center gap-1">
          {value}
          {href && <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
        </p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block"><Content /></a>
  ) : <Content />;
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
    onSuccess: () => {
      toast.success('Member purged from registry');
      navigate('/members');
    },
  });

  if (isLoading) return <DetailSkeleton />;

  const canEdit = admin?.role !== 'viewer';

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 bg-[#f8fafc] min-h-screen">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/members')}
          className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-700 transition-all"
        >
          <div className="p-2 rounded-lg bg-white border border-slate-200 group-hover:border-emerald-200 shadow-sm">
            <ArrowLeft size={16} />
          </div>
          Back to Registry
        </button>
        
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-slate-400 uppercase">Profile Integrity: Verified</span>
          <div className="h-1.5 w-24 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[100%]" />
          </div>
        </div>
      </div>

      {/* Primary Profile Card */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 opacity-40" />
        
        <div className="relative flex flex-col md:flex-row md:items-center gap-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-200 text-white text-3xl font-black">
            {member.firstName.charAt(0)}{member.lastName.charAt(0)}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                {member.firstName} {member.lastName}
              </h1>
              <StatusBadge status={member.status} />
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-emerald-600" />
                Joined {format(new Date(member.createdAt), 'MMM dd, yyyy')}
              </div>
              <div className="flex items-center gap-2">
                <ShieldAlert size={16} className="text-emerald-600" />
                Ref: {member.referralSource || 'Organic'}
              </div>
              {member.welcomeEmailSent && (
                <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                  <CheckCircle size={14} /> Onboarded
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Information Grid */}
        <div className="lg:col-span-8 space-y-8">
          
          <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-500 rounded-full" />
              Core Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-6">
              <DataField icon={Mail} label="Primary Email" value={member.email} href={`mailto:${member.email}`} />
              <DataField icon={Phone} label="Contact Number" value={member.phone} href={`tel:${member.phone}`} />
              <DataField icon={MapPin} label="LGA Jurisdiction" value={member.lga} />
              <DataField icon={Globe} label="Political Ward" value={member.ward || 'Not Assigned'} />
            </div>
          </section>

          <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-500 rounded-full" />
              Campaign Interests
            </h3>
            <div className="flex flex-wrap gap-3">
              {member.interests?.map((i) => (
                <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 text-slate-700 text-xs font-black uppercase tracking-widest rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                  {i}
                </span>
              ))}
            </div>
          </section>

          {member.message && (
            <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <MessageSquare size={20} className="text-emerald-600" />
                Original Intent / Message
              </h3>
              <blockquote className="text-slate-600 italic leading-relaxed bg-slate-50 rounded-[1.5rem] p-6 border-l-4 border-emerald-500 font-medium">
                "{member.message}"
              </blockquote>
            </section>
          )}
        </div>

        {/* Administration Actions */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-300">
            <h3 className="text-lg font-black mb-6">Action Panel</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Lifecycle Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                    <button
                      key={val}
                      onClick={() => { setSelectedStatus(val); setIsDirty(true); }}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter border-2 transition-all ${
                        selectedStatus === val 
                        ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {cfg.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Administrative Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => { setNotes(e.target.value); setIsDirty(true); }}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                  placeholder="Record interaction history..."
                />
              </div>

              <button
                onClick={() => updateMutation.mutate({ status: selectedStatus, adminNotes: notes })}
                disabled={!isDirty || updateMutation.isPending}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:hover:bg-emerald-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-900/20 transition-all"
              >
                <Save size={16} />
                {updateMutation.isPending ? 'Syncing...' : 'Commit Changes'}
              </button>
            </div>
          </div>

          {/* Super Admin Zone */}
          {admin?.role === 'super_admin' && (
            <div className="bg-red-50/50 rounded-[2rem] p-6 border border-red-100">
              <h4 className="text-red-700 text-xs font-black uppercase mb-4 flex items-center gap-2">
                <ShieldAlert size={14} /> Privilege Actions
              </h4>
              {!showDelete ? (
                <button
                  onClick={() => setShowDelete(true)}
                  className="w-full py-3 bg-white text-red-600 border border-red-200 rounded-xl font-bold text-xs hover:bg-red-600 hover:text-white transition-all shadow-sm"
                >
                  Request Deletion
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-red-400 text-center uppercase tracking-wider">Confirm permanent removal?</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => deleteMutation.mutate()}
                      className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700"
                    >
                      Confirm
                    </button>
                    <button 
                      onClick={() => setShowDelete(false)}
                      className="flex-1 bg-white text-slate-400 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-200"
                    >
                      Abort
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Loading State ---
const DetailSkeleton = () => (
  <div className="p-10 space-y-8 animate-pulse">
    <div className="h-10 w-32 bg-slate-200 rounded-xl" />
    <div className="h-48 w-full bg-slate-200 rounded-[2.5rem]" />
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8 h-96 bg-slate-100 rounded-4xl" />
      <div className="col-span-4 h-96 bg-slate-900 rounded-4xl" />
    </div>
  </div>
);

export default MemberDetail;
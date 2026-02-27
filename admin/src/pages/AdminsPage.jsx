// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { Shield, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
// import { format } from 'date-fns';
// import api from '../utils/api';
// import toast from 'react-hot-toast';
// import useAuthStore from '../store/authStore';

// const LGAS = [
//   'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
//   'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
//   'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
//   'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere'
// ];

// const ROLE_LABELS = {
//   super_admin: { label: 'Super Admin', color: 'bg-purple-100 text-purple-700' },
//   lga_admin: { label: 'LGA Admin', color: 'bg-blue-100 text-blue-700' },
//   viewer: { label: 'Viewer', color: 'bg-gray-100 text-gray-600' },
// };

// const AdminModal = ({ onClose, onSubmit, loading }) => {
//   const [form, setForm] = useState({ name: '', email: '', password: '', role: 'viewer', assignedLGA: '' });
//   const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(form);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
//         <div className="flex items-center justify-between p-5 border-b border-gray-100">
//           <h2 className="font-bold text-gray-900">Create Admin User</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
//         </div>
//         <form onSubmit={handleSubmit} className="p-5 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
//             <input className="input" placeholder="John Doe" value={form.name} onChange={e => set('name', e.target.value)} required />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
//             <input className="input" type="email" placeholder="admin@apclagos.com" value={form.email} onChange={e => set('email', e.target.value)} required />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
//             <input className="input" type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => set('password', e.target.value)} required minLength={8} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
//             <select className="input" value={form.role} onChange={e => set('role', e.target.value)}>
//               <option value="viewer">Viewer</option>
//               <option value="lga_admin">LGA Admin</option>
//               <option value="super_admin">Super Admin</option>
//             </select>
//           </div>
//           {form.role === 'lga_admin' && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned LGA</label>
//               <select className="input" value={form.assignedLGA} onChange={e => set('assignedLGA', e.target.value)} required>
//                 <option value="">Select LGA</option>
//                 {LGAS.map(lga => <option key={lga} value={lga}>{lga}</option>)}
//               </select>
//             </div>
//           )}
//           <div className="flex gap-3 pt-2">
//             <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
//             <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
//               {loading ? 'Creating...' : 'Create Admin'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const AdminsPage = () => {
//   const [showModal, setShowModal] = useState(false);
//   const queryClient = useQueryClient();
//   const { admin: currentAdmin } = useAuthStore();

//   const { data, isLoading } = useQuery({
//     queryKey: ['admins'],
//     queryFn: async () => {
//       const { data } = await api.get('/auth/admins');
//       return data.data.admins;
//     },
//   });

//   const createMutation = useMutation({
//     mutationFn: (form) => api.post('/auth/admins', form),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['admins']);
//       setShowModal(false);
//       toast.success('Admin created successfully!');
//     },
//     onError: (err) => toast.error(err.response?.data?.message || 'Create failed'),
//   });

//   const toggleActiveMutation = useMutation({
//     mutationFn: ({ id, isActive }) => api.patch(`/auth/admins/${id}`, { isActive }),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['admins']);
//       toast.success('Admin status updated');
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: (id) => api.delete(`/auth/admins/${id}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['admins']);
//       toast.success('Admin deleted');
//     },
//     onError: (err) => toast.error(err.response?.data?.message || 'Delete failed'),
//   });

//   return (
//     <div className="p-6 lg:p-8 space-y-5">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Admin Users</h1>
//           <p className="text-gray-500 text-sm mt-0.5">Manage access to the admin portal</p>
//         </div>
//         <button onClick={() => setShowModal(true)} className="btn-primary">
//           <Plus size={16} />
//           Add Admin
//         </button>
//       </div>

//       <div className="card overflow-hidden">
//         {isLoading ? (
//           <div className="p-8 space-y-3">
//             {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />)}
//           </div>
//         ) : (
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-100 bg-gray-50">
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Admin</th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Role</th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">LGA</th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Last Login</th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Status</th>
//                 <th className="px-4 py-3.5" />
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {(data || []).map((admin) => {
//                 const roleInfo = ROLE_LABELS[admin.role] || ROLE_LABELS.viewer;
//                 const isSelf = admin._id === currentAdmin?.id;
//                 return (
//                   <tr key={admin._id} className="hover:bg-gray-50/60 transition-colors">
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
//                           <Shield size={14} className="text-gray-500" />
//                         </div>
//                         <div>
//                           <p className="font-semibold text-gray-900 text-sm">
//                             {admin.name}
//                             {isSelf && <span className="ml-2 text-xs text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded">You</span>}
//                           </p>
//                           <p className="text-xs text-gray-400">{admin.email}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${roleInfo.color}`}>
//                         {roleInfo.label}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4 text-sm text-gray-600">{admin.assignedLGA || '—'}</td>
//                     <td className="px-4 py-4 text-sm text-gray-400">
//                       {admin.lastLogin ? format(new Date(admin.lastLogin), 'MMM d, yyyy') : 'Never'}
//                     </td>
//                     <td className="px-4 py-4">
//                       <button
//                         onClick={() => !isSelf && toggleActiveMutation.mutate({ id: admin._id, isActive: !admin.isActive })}
//                         disabled={isSelf}
//                         className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors ${
//                           admin.isActive
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                             : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
//                         } disabled:cursor-not-allowed`}
//                       >
//                         {admin.isActive ? <><Check size={11} /> Active</> : 'Inactive'}
//                       </button>
//                     </td>
//                     <td className="px-4 py-4">
//                       {!isSelf && (
//                         <button
//                           onClick={() => {
//                             if (confirm(`Delete ${admin.name}?`)) deleteMutation.mutate(admin._id);
//                           }}
//                           className="text-gray-300 hover:text-red-500 transition-colors"
//                         >
//                           <Trash2 size={15} />
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {showModal && (
//         <AdminModal
//           onClose={() => setShowModal(false)}
//           onSubmit={(form) => createMutation.mutate(form)}
//           loading={createMutation.isPending}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminsPage;


import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Plus, Trash2, X, Check, AlertCircle, User, Mail, Lock, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import api from '../utils/api';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

/* ── TOKENS ─────────────────────────────── */
const C = {
  bg: '#0b0f0e', surface: '#111815', card: '#141c18',
  border: '#1e2b24', borderHi: '#2a3d32',
  green: '#22c55e', amber: '#f59e0b', blue: '#38bdf8', red: '#f87171',
  purple: '#a78bfa',
  muted: '#4b6357', text: '#e8f0eb', textDim: '#8aaa96',
  hover: '#172219',
};

const LGAS = [
  'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja',
  'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo',
  'Oshodi-Isolo', 'Somolu', 'Surulere',
];

const ROLES = {
  super_admin: { label: 'Super Admin', color: C.amber },
  lga_admin:   { label: 'LGA Admin',   color: C.blue },
  viewer:      { label: 'Viewer',       color: C.muted },
};

/* ── SHARED INPUT ────────────────────────── */
const FormField = ({ label, children }) => (
  <div>
    <label style={{
      display: 'block', color: C.muted, fontSize: 10, fontWeight: 800,
      letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8,
    }}>{label}</label>
    {children}
  </div>
);

const inputStyle = {
  width: '100%', background: C.surface, border: `1px solid ${C.border}`,
  borderRadius: 10, padding: '11px 14px', color: C.text,
  fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: 'none',
  transition: 'border-color .15s',
};

const iconInputStyle = { ...inputStyle, paddingLeft: 38 };

const IconInput = ({ icon: Icon, ...props }) => (
  <div style={{ position: 'relative' }}>
    <Icon size={14} color={C.muted} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
    <input {...props} style={iconInputStyle}
      onFocus={e => e.target.style.borderColor = C.green}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  </div>
);

const StyledSelect = ({ icon: Icon, children, ...props }) => (
  <div style={{ position: 'relative' }}>
    {Icon && <Icon size={14} color={C.muted} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }} />}
    <ChevronDown size={13} color={C.muted} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
    <select {...props} style={{ ...inputStyle, paddingLeft: Icon ? 38 : 14, paddingRight: 32, appearance: 'none', cursor: 'pointer' }}
      onFocus={e => e.target.style.borderColor = C.green}
      onBlur={e => e.target.style.borderColor = C.border}
    >
      {children}
    </select>
  </div>
);

/* ── ROLE BADGE ─────────────────────────── */
const RoleBadge = ({ role }) => {
  const r = ROLES[role] || ROLES.viewer;
  return (
    <span style={{
      color: r.color, background: `${r.color}15`, border: `1px solid ${r.color}30`,
      borderRadius: 20, padding: '3px 10px',
      fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
      display: 'inline-block', whiteSpace: 'nowrap',
    }}>{r.label}</span>
  );
};

/* ── ADMIN INITIALS AVATAR ───────────────── */
const AdminAvatar = ({ name, role }) => {
  const color = ROLES[role]?.color || C.muted;
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      background: `${color}15`, border: `1px solid ${color}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 900, color, fontFamily: 'DM Mono,monospace',
    }}>{initials}</div>
  );
};

/* ── CREATE MODAL ────────────────────────── */
const AdminModal = ({ onClose, onSubmit, loading }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'viewer', assignedLGA: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{
          width: '100%', maxWidth: 440,
          background: C.card, border: `1px solid ${C.borderHi}`,
          borderRadius: 20, overflow: 'hidden',
        }}
      >
        {/* modal header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', borderBottom: `1px solid ${C.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: `${C.green}15`, border: `1px solid ${C.green}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Plus size={15} color={C.green} />
            </div>
            <h2 style={{ color: C.text, fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em' }}>
              Create Admin User
            </h2>
          </div>
          <button onClick={onClose} style={{
            width: 30, height: 30, borderRadius: 8, background: C.surface,
            border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: C.muted, transition: 'all .15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
          >
            <X size={14} />
          </button>
        </div>

        {/* modal body */}
        <form onSubmit={e => { e.preventDefault(); onSubmit(form); }}
          style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>

          <FormField label="Full Name">
            <IconInput icon={User} type="text" placeholder="John Doe"
              value={form.name} onChange={e => set('name', e.target.value)} required />
          </FormField>

          <FormField label="Email Address">
            <IconInput icon={Mail} type="email" placeholder="admin@apclagos.com"
              value={form.email} onChange={e => set('email', e.target.value)} required />
          </FormField>

          <FormField label="Password">
            <IconInput icon={Lock} type="password" placeholder="Min. 8 characters"
              value={form.password} onChange={e => set('password', e.target.value)} required minLength={8} />
          </FormField>

          <FormField label="Role">
            <StyledSelect value={form.role} onChange={e => set('role', e.target.value)}>
              <option value="viewer">Viewer</option>
              <option value="lga_admin">LGA Admin</option>
              <option value="super_admin">Super Admin</option>
            </StyledSelect>
          </FormField>

          <AnimatePresence>
            {form.role === 'lga_admin' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}
              >
                <FormField label="Assigned LGA">
                  <StyledSelect value={form.assignedLGA} onChange={e => set('assignedLGA', e.target.value)} required>
                    <option value="">Select LGA…</option>
                    {LGAS.map(lga => <option key={lga} value={lga}>{lga}</option>)}
                  </StyledSelect>
                </FormField>
              </motion.div>
            )}
          </AnimatePresence>

          {/* actions */}
          <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
            <button type="button" onClick={onClose} style={{
              flex: 1, background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 10, padding: '12px', color: C.textDim,
              fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all .15s',
            }}>Cancel</button>
            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }} whileTap={{ scale: loading ? 1 : 0.97 }}
              style={{
                flex: 1, background: C.green, border: 'none',
                borderRadius: 10, padding: '12px', color: '#030a06',
                fontSize: 13, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', opacity: loading ? 0.7 : 1,
                boxShadow: `0 4px 16px ${C.green}30`, transition: 'opacity .15s',
              }}
            >
              {loading ? 'Creating…' : 'Create Admin'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

/* ── DELETE CONFIRM INLINE ───────────────── */
const DeleteButton = ({ onConfirm }) => {
  const [confirming, setConfirming] = useState(false);
  return confirming ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <button onClick={onConfirm} style={{
        background: `${C.red}18`, border: `1px solid ${C.red}35`, borderRadius: 7,
        padding: '4px 10px', color: C.red, fontSize: 11, fontWeight: 800,
        cursor: 'pointer', fontFamily: 'inherit',
      }}>Confirm</button>
      <button onClick={() => setConfirming(false)} style={{
        background: C.surface, border: `1px solid ${C.border}`, borderRadius: 7,
        padding: '4px 10px', color: C.muted, fontSize: 11, fontWeight: 700,
        cursor: 'pointer', fontFamily: 'inherit',
      }}>No</button>
    </div>
  ) : (
    <button onClick={() => setConfirming(true)} style={{
      background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 7,
      color: C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all .15s',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = `${C.red}10`; e.currentTarget.style.color = C.red; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.muted; }}
    >
      <Trash2 size={14} />
    </button>
  );
};

/* ── MAIN PAGE ───────────────────────────── */
const AdminsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const { admin: currentAdmin } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['admins'],
    queryFn: async () => {
      const { data } = await api.get('/auth/admins');
      return data.data.admins;
    },
  });

  const createMutation = useMutation({
    mutationFn: (form) => api.post('/auth/admins', form),
    onSuccess: () => {
      queryClient.invalidateQueries(['admins']);
      setShowModal(false);
      toast.success('Admin created');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Create failed'),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }) => api.patch(`/auth/admins/${id}`, { isActive }),
    onSuccess: () => { queryClient.invalidateQueries(['admins']); toast.success('Status updated'); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/auth/admins/${id}`),
    onSuccess: () => { queryClient.invalidateQueries(['admins']); toast.success('Admin removed'); },
    onError: (err) => toast.error(err.response?.data?.message || 'Delete failed'),
  });

  const admins = data || [];

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: "'DM Sans',sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:${C.bg}}
        ::-webkit-scrollbar-thumb{background:${C.borderHi};border-radius:4px}
        .arow:hover{background:${C.hover}!important}
        select option{background:${C.card};color:${C.text}}
        @media(max-width:768px){.awrap{padding:20px!important}.ahead{flex-direction:column!important;align-items:flex-start!important;gap:16px!important}.hide-mob{display:none!important}}
        @keyframes skel{0%{opacity:.4}50%{opacity:.8}100%{opacity:.4}}
      `}</style>

      <div className="awrap" style={{ padding: '36px 40px', maxWidth: 1200, margin: '0 auto' }}>

        {/* HEADER */}
        <motion.div className="ahead" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>
              Admin Users
            </h1>
            <p style={{ color: C.muted, fontSize: 13, marginTop: 8 }}>
              Manage access to the admin portal
            </p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: C.green, border: 'none', borderRadius: 12,
              padding: '12px 20px', color: '#030a06',
              fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: `0 4px 20px ${C.green}30`, flexShrink: 0,
            }}>
            <Plus size={16} /> Add Admin
          </motion.button>
        </motion.div>

        {/* STATS ROW */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          {[
            { label: 'Total Admins', value: admins.length },
            { label: 'Active', value: admins.filter(a => a.isActive).length, color: C.green },
            { label: 'Super Admins', value: admins.filter(a => a.role === 'super_admin').length, color: C.amber },
            { label: 'LGA Admins', value: admins.filter(a => a.role === 'lga_admin').length, color: C.blue },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
              padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: 2, minWidth: 110,
            }}>
              <span style={{ color: color || C.textDim, fontSize: 20, fontWeight: 900, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                {isLoading ? '—' : value}
              </span>
              <span style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* TABLE */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
              <thead>
                <tr style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}>
                  {[['Admin',''], ['Role',''], ['LGA','hide-mob'], ['Last Login','hide-mob'], ['Status',''], ['','']].map(([h, cls], i) => (
                    <th key={i} className={cls} style={{
                      padding: '13px 18px', textAlign: 'left',
                      fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: C.muted, whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? [...Array(5)].map((_, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td colSpan={6} style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: C.border, animation: 'skel 1.5s infinite' }} />
                          <div>
                            <div style={{ width: 120, height: 9, background: C.border, borderRadius: 4, animation: 'skel 1.5s infinite', marginBottom: 6 }} />
                            <div style={{ width: 80, height: 7, background: C.surface, borderRadius: 4, animation: 'skel 1.5s infinite' }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                  : admins.map((admin, idx) => {
                    const isSelf = admin._id === currentAdmin?.id;
                    return (
                      <motion.tr key={admin._id} className="arow"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                        style={{ borderBottom: `1px solid ${C.border}`, transition: 'background .12s' }}>

                        {/* ADMIN */}
                        <td style={{ padding: '13px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <AdminAvatar name={admin.name} role={admin.role} />
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <p style={{ color: C.text, fontWeight: 700, fontSize: 13, margin: 0 }}>
                                  {admin.name}
                                </p>
                                {isSelf && (
                                  <span style={{
                                    color: C.green, background: `${C.green}15`,
                                    border: `1px solid ${C.green}30`, borderRadius: 20,
                                    padding: '1px 7px', fontSize: 9, fontWeight: 800, letterSpacing: '0.08em',
                                  }}>YOU</span>
                                )}
                              </div>
                              <p style={{ color: C.muted, fontSize: 11, margin: '2px 0 0', fontFamily: 'DM Mono,monospace' }}>
                                {admin.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* ROLE */}
                        <td style={{ padding: '13px 18px' }}>
                          <RoleBadge role={admin.role} />
                        </td>

                        {/* LGA */}
                        <td className="hide-mob" style={{ padding: '13px 18px' }}>
                          <span style={{ color: admin.assignedLGA ? C.textDim : C.muted, fontSize: 13 }}>
                            {admin.assignedLGA || '—'}
                          </span>
                        </td>

                        {/* LAST LOGIN */}
                        <td className="hide-mob" style={{ padding: '13px 18px' }}>
                          <span style={{ color: C.muted, fontSize: 12, fontFamily: 'DM Mono,monospace' }}>
                            {admin.lastLogin ? format(new Date(admin.lastLogin), 'MMM d, yyyy') : 'Never'}
                          </span>
                        </td>

                        {/* STATUS TOGGLE */}
                        <td style={{ padding: '13px 18px' }}>
                          <button
                            onClick={() => !isSelf && toggleMutation.mutate({ id: admin._id, isActive: !admin.isActive })}
                            disabled={isSelf}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 5,
                              padding: '4px 10px', borderRadius: 20, cursor: isSelf ? 'not-allowed' : 'pointer',
                              fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                              border: `1px solid ${admin.isActive ? `${C.green}30` : `${C.muted}30`}`,
                              background: admin.isActive ? `${C.green}12` : `${C.muted}10`,
                              color: admin.isActive ? C.green : C.muted,
                              opacity: isSelf ? 0.5 : 1, transition: 'all .15s', fontFamily: 'inherit',
                            }}
                          >
                            {admin.isActive
                              ? <><Check size={10} /> Active</>
                              : 'Inactive'
                            }
                          </button>
                        </td>

                        {/* DELETE */}
                        <td style={{ padding: '13px 14px', width: 80, textAlign: 'right' }}>
                          {!isSelf && (
                            <DeleteButton onConfirm={() => deleteMutation.mutate(admin._id)} />
                          )}
                        </td>
                      </motion.tr>
                    );
                  })
                }

                {/* EMPTY STATE */}
                {!isLoading && admins.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: '72px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 52, height: 52, borderRadius: 14, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Shield size={22} color={C.muted} />
                        </div>
                        <p style={{ color: C.text, fontWeight: 700, fontSize: 15, margin: 0 }}>No admins yet</p>
                        <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>Create the first admin user to get started</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <AdminModal
            onClose={() => setShowModal(false)}
            onSubmit={(form) => createMutation.mutate(form)}
            loading={createMutation.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminsPage;
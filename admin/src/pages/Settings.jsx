// import React, { useState } from 'react';
// import { useMutation } from '@tanstack/react-query';
// import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
// import api from '../utils/api';
// import toast from 'react-hot-toast';
// import useAuthStore from '../store/authStore';
// import { useNavigate } from 'react-router-dom';

// const Settings = () => {
//   const { admin, logout } = useAuthStore();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
//   const [show, setShow] = useState({ current: false, new: false, confirm: false });
//   const [error, setError] = useState('');

//   const toggle = (k) => setShow(p => ({ ...p, [k]: !p[k] }));
//   const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

//   const mutation = useMutation({
//     mutationFn: (data) => api.patch('/auth/change-password', data),
//     onSuccess: () => {
//       toast.success('Password changed. Please log in again.');
//       logout();
//       navigate('/login');
//     },
//     onError: (err) => setError(err.response?.data?.message || 'Password change failed'),
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     if (form.newPassword !== form.confirmPassword) {
//       return setError('New passwords do not match.');
//     }
//     if (form.newPassword.length < 8) {
//       return setError('New password must be at least 8 characters.');
//     }
//     mutation.mutate({ currentPassword: form.currentPassword, newPassword: form.newPassword });
//   };

//   return (
//     <div className="p-6 lg:p-8 space-y-5">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
//         <p className="text-gray-500 text-sm mt-0.5">Manage your account preferences</p>
//       </div>

//       {/* Profile Card */}
//       <div className="card p-6">
//         <h2 className="font-semibold text-gray-900 mb-4">Account Information</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="sm:col-span-1">
//             <div className="w-20 h-20 bg-brand-100 rounded-2xl flex items-center justify-center">
//               <span className="text-brand-700 font-black text-2xl">
//                 {admin?.name?.charAt(0)?.toUpperCase()}
//               </span>
//             </div>
//           </div>
//           <div className="sm:col-span-2 space-y-1">
//             <p className="font-bold text-gray-900 text-lg">{admin?.name}</p>
//             <p className="text-gray-500 text-sm">{admin?.email}</p>
//             <span className="inline-flex px-2.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full capitalize">
//               {admin?.role?.replace('_', ' ')}
//             </span>
//             {admin?.assignedLGA && (
//               <p className="text-gray-400 text-sm">Assigned LGA: {admin.assignedLGA}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Change Password */}
//       <div className="card p-6 max-w-lg">
//         <div className="flex items-center gap-2 mb-5">
//           <Lock size={18} className="text-brand-700" />
//           <h2 className="font-semibold text-gray-900">Change Password</h2>
//         </div>

//         {error && (
//           <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm mb-4">
//             <AlertCircle size={15} className="shrink-0" />
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {[
//             { key: 'currentPassword', label: 'Current Password', showKey: 'current' },
//             { key: 'newPassword', label: 'New Password', showKey: 'new' },
//             { key: 'confirmPassword', label: 'Confirm New Password', showKey: 'confirm' },
//           ].map(({ key, label, showKey }) => (
//             <div key={key}>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
//               <div className="relative">
//                 <input
//                   type={show[showKey] ? 'text' : 'password'}
//                   value={form[key]}
//                   onChange={(e) => set(key, e.target.value)}
//                   className="input pr-10"
//                   placeholder="••••••••"
//                   required
//                   minLength={key !== 'currentPassword' ? 8 : 1}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => toggle(showKey)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {show[showKey] ? <EyeOff size={15} /> : <Eye size={15} />}
//                 </button>
//               </div>
//             </div>
//           ))}

//           <button
//             type="submit"
//             disabled={mutation.isPending}
//             className="btn-primary"
//           >
//             {mutation.isPending ? 'Updating...' : 'Update Password'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Settings;


import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, Shield, User } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const C = {
  bg: '#0b0f0e', surface: '#111815', card: '#141c18',
  border: '#1e2b24', borderHi: '#2a3d32',
  green: '#22c55e', amber: '#f59e0b', blue: '#38bdf8',
  muted: '#4b6357', text: '#e8f0eb', textDim: '#8aaa96',
  red: '#f87171',
};

const ROLE_COLOR = {
  super_admin: C.amber, admin: C.blue, viewer: C.muted,
};

const PasswordInput = ({ label, value, onChange, visible, onToggle, placeholder }) => (
  <div>
    <label style={{ display: 'block', color: C.muted, fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      <Lock size={14} color={C.muted} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      <input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder || '••••••••'}
        style={{
          width: '100%', background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 12, padding: '12px 44px 12px 40px', color: C.text,
          fontSize: 14, fontFamily: 'DM Sans,sans-serif', outline: 'none',
          transition: 'border-color .15s',
        }}
        onFocus={e => e.target.style.borderColor = C.green}
        onBlur={e => e.target.style.borderColor = C.border}
        required
      />
      <button type="button" onClick={onToggle}
        style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: C.muted,
          transition: 'color .15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = C.green}
        onMouseLeave={e => e.currentTarget.style.color = C.muted}
      >
        {visible ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  </div>
);

const Settings = () => {
  const { admin, logout } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [error, setError] = useState('');
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const strength = (() => {
    const p = form.newPassword;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', C.red, C.amber, C.blue, C.green][strength];

  const mutation = useMutation({
    mutationFn: (data) => api.patch('/auth/change-password', data),
    onSuccess: () => {
      toast.success('Password updated. Please log in again.');
      logout();
      navigate('/login');
    },
    onError: (err) => setError(err.response?.data?.message || 'Password change failed'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.newPassword !== form.confirmPassword) return setError('Passwords do not match.');
    if (form.newPassword.length < 8) return setError('Minimum 8 characters required.');
    mutation.mutate({ currentPassword: form.currentPassword, newPassword: form.newPassword });
  };

  const roleColor = ROLE_COLOR[admin?.role] || C.muted;
  const initials = admin?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: "'DM Sans',sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.borderHi};border-radius:4px}
        @media(max-width:768px){.settings-grid{grid-template-columns:1fr!important}.settings-wrap{padding:20px!important}}
      `}</style>

      <div className="settings-wrap" style={{ padding: '36px 40px', maxWidth: 960, margin: '0 auto' }}>

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>
            Settings
          </h1>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 8 }}>Manage your account and security preferences</p>
        </motion.div>

        <div className="settings-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

          {/* PROFILE CARD */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
            style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <div style={{ width: 3, height: 20, background: C.green, borderRadius: 2 }} />
              <User size={15} color={C.green} />
              <h2 style={{ color: C.text, fontSize: 14, fontWeight: 800, margin: 0 }}>Account Information</h2>
            </div>

            {/* avatar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28, paddingBottom: 28, borderBottom: `1px solid ${C.border}` }}>
              <div style={{
                width: 72, height: 72, borderRadius: 20, marginBottom: 16,
                background: `${C.green}20`, border: `2px solid ${C.green}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, fontWeight: 900, color: C.green, fontFamily: 'DM Mono,monospace',
                boxShadow: `0 0 30px ${C.green}15`,
              }}>
                {initials}
              </div>
              <p style={{ color: C.text, fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>{admin?.name}</p>
              <p style={{ color: C.muted, fontSize: 13, margin: '4px 0 12px', fontFamily: 'DM Mono,monospace' }}>{admin?.email}</p>
              <span style={{
                background: `${roleColor}18`, border: `1px solid ${roleColor}35`,
                color: roleColor, borderRadius: 20, padding: '4px 12px',
                fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                {admin?.role?.replace('_', ' ')}
              </span>
            </div>

            {/* meta fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Assigned LGA', value: admin?.assignedLGA || 'All LGAs' },
                { label: 'Account Status', value: 'Active & Verified' },
                { label: 'Last Login', value: 'Today' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: C.muted, fontSize: 12, fontWeight: 600 }}>{label}</span>
                  <span style={{ color: C.textDim, fontSize: 12, fontWeight: 700 }}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CHANGE PASSWORD CARD */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <div style={{ width: 3, height: 20, background: C.green, borderRadius: 2 }} />
              <Shield size={15} color={C.green} />
              <h2 style={{ color: C.text, fontSize: 14, fontWeight: 800, margin: 0 }}>Change Password</h2>
            </div>

            {/* error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    background: 'rgba(248,113,113,0.08)', borderLeft: `3px solid ${C.red}`,
                    borderRadius: '0 10px 10px 0', padding: '12px 14px', marginBottom: 20,
                    color: C.red, fontSize: 13,
                  }}>
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <PasswordInput
                label="Current Password" value={form.currentPassword}
                onChange={e => set('currentPassword', e.target.value)}
                visible={show.current} onToggle={() => setShow(p => ({ ...p, current: !p.current }))}
              />
              <PasswordInput
                label="New Password" value={form.newPassword}
                onChange={e => set('newPassword', e.target.value)}
                visible={show.new} onToggle={() => setShow(p => ({ ...p, new: !p.new }))}
                placeholder="Min. 8 characters"
              />

              {/* password strength */}
              {form.newPassword && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginTop: -8 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{
                        flex: 1, height: 3, borderRadius: 2,
                        background: i <= strength ? strengthColor : C.border,
                        transition: 'background .2s',
                      }} />
                    ))}
                  </div>
                  <p style={{ color: strengthColor, fontSize: 11, fontWeight: 700, margin: 0 }}>
                    {strengthLabel}
                  </p>
                </motion.div>
              )}

              <PasswordInput
                label="Confirm New Password" value={form.confirmPassword}
                onChange={e => set('confirmPassword', e.target.value)}
                visible={show.confirm} onToggle={() => setShow(p => ({ ...p, confirm: !p.confirm }))}
              />

              {/* match indicator */}
              {form.newPassword && form.confirmPassword && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: -8 }}>
                  {form.newPassword === form.confirmPassword
                    ? <><CheckCircle size={13} color={C.green} /><span style={{ color: C.green, fontSize: 11, fontWeight: 700 }}>Passwords match</span></>
                    : <><AlertCircle size={13} color={C.red} /><span style={{ color: C.red, fontSize: 11, fontWeight: 700 }}>Passwords don't match</span></>
                  }
                </div>
              )}

              <motion.button type="submit" disabled={mutation.isPending}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: C.green, border: 'none', borderRadius: 12, padding: '14px',
                  color: '#030a06', fontSize: 13, fontWeight: 800, letterSpacing: '0.04em',
                  cursor: mutation.isPending ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                  opacity: mutation.isPending ? 0.7 : 1,
                  boxShadow: `0 4px 20px ${C.green}30`, transition: 'opacity .15s',
                }}>
                <Lock size={14} />
                {mutation.isPending ? 'Updating…' : 'Update Password'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
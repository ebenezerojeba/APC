// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
// import useAuthStore from '../store/authStore.js';
// import toast from 'react-hot-toast';
// import apcLogo from '../assets/apc2.jpeg'; // <--- Path to your actual APC Logo SVG/PNG

// // 1. REUSABLE INPUT COMPONENT
// const InputField = ({ label, icon: Icon, value, onChange, placeholder, ...props }) => (
//   <div className="space-y-1.5 w-full">
//     <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest ml-1 opacity-70">
//       {label}
//     </label>
//     <div className="relative group">
//       <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 text-brand-600/40 group-focus-within:text-brand-600">
//         <Icon size={18} />
//       </div>
//       <input
//         {...props}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="w-full pl-12 pr-12 py-3.5 bg-white/60 border border-slate-200 rounded-2xl outline-none transition-all duration-300 
//                    focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
//       />
//     </div>
//   </div>
// );

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   const { login } = useAuthStore();
//   const navigate = useNavigate();

//   // Optimized Input Handler
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const admin = await login(formData.email, formData.password);
//       toast.success(`Access Granted: Welcome, ${admin.name.split(' ')[0]}!`, {
//         duration: 4000,
//         position: 'top-center',
//         style: { 
//           borderRadius: '16px', 
//           background: '#15803d', // Green background
//           color: '#fff', 
//           fontWeight: 'bold', 
//           fontSize: '14px',
//           padding: '16px',
//           boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
//         },
//       });
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-[#0a2e1c] flex items-center justify-center p-6 antialiased">
      
//       {/* 2. ENHANCED BRAND BACKGROUND ENVIRONMENT */}
//       <div className="absolute inset-0 pointer-events-none select-none z-0">
//         {/* Layer 1: Dark Base Gradient */}
//         <div className="absolute inset-0 bg-linear-to-br from-[#0a2e1c] via-[#083a21] to-[#011c0f]" />
        
//         {/* Layer 2: Massive Faded Logo Watermark */}
//         <motion.img 
//           initial={{ opacity: 0, scale: 1.2 }}
//           animate={{ opacity: 0.02, scale: 1 }}
//           transition={{ duration: 1.5, ease: 'easeOut' }}
//           src={apcLogo} // <--- Path to your actual APC Logo SVG/PNG
//           alt="APC Watermark"
//           className="absolute -bottom-1/4 -right-1/4 w-[110%] h-auto max-w-300"
//         />

//         {/* Layer 3: Subtle Dynamic Glass Orbs */}
//         <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-brand-500/10 blur-[150px] animate-pulse" />
//         <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[180px]" />

//         {/* Layer 4: Abstract Geometric SVG Overlay (Very Subtle) */}
//         <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="dotPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
//               <circle cx="2" cy="2" r="1.5" fill="#ffffff" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#dotPattern)" />
//         </svg>
//       </div>

//       {/* 3. LOGIN CONTAINER (Glassmorphism) */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         className="w-full max-w-[460px] z-10"
//       >
//         {/* LOGO HEADER */}
//         <div className="flex flex-col items-center mb-10">
//           <motion.div 
//             whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
//             transition={{ duration: 0.4 }}
//             className="w-24 h-24 bg-white/95 backdrop-blur-sm rounded-[2.5rem] shadow-2xl flex items-center justify-center mb-6 border-4 border-white/20 p-4"
//           >
//             <img 
//               src={apcLogo} // <--- Path to your actual APC Logo SVG/PNG
//               alt="APC Lagos Logo"
//               className="w-full h-auto object-contain"
//             />
//           </motion.div>
//           <h1 className="text-3xl font-extrabold text-white tracking-tighter">Admin Control Center</h1>
//           <p className="text-emerald-100/60 text-sm mt-1.5 font-medium tracking-wide">Lagos State Chapter Official Portal</p>
//         </div>

//         {/* GLASS CARD */}
//         <div className="bg-white/85 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] p-9 md:p-12 border border-white/20">
//           <h2 className="text-xl font-bold text-slate-950 mb-1.5 tracking-tight">System Authentication</h2>
//           <p className="text-slate-600 text-sm mb-8">Enter your security credentials to initialize session</p>

//           <AnimatePresence mode="wait">
//             {error && (
//               <motion.div 
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-400 rounded-xl text-red-800 text-sm mb-8 font-medium"
//               >
//                 <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-500" />
//                 <div className="flex-1">
//                   <span className="font-bold">Access Denied: </span>
//                   {error}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <InputField 
//               label="Official Admin Email"
//               name="email"
//               icon={Mail}
//               type="email"
//               placeholder="name@apclagos.com"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />

//             <div className="relative">
//               <InputField 
//                 label="Secure Passkey"
//                 name="password"
//                 icon={Lock}
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 bottom-3.5 text-slate-400 hover:text-brand-600 p-1.5 rounded-lg transition-colors duration-200"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="relative w-full group overflow-hidden bg-slate-950 text-white rounded-[1.25rem] py-4.5 font-bold text-base tracking-wider uppercase transition-all duration-300 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/10 disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               <div className="relative z-10 flex items-center justify-center gap-2.5">
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin" size={20} />
//                     <span>Verifying...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Initialize Secure Login</span>
//                     <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
//                   </>
//                 )}
//               </div>
//             </button>
//           </form>
//         </div>

//         {/* 4. FOOTER */}
//         <footer className="mt-12 text-center">
//           <p className="text-emerald-100/30 text-xs font-semibold tracking-wider">
//             © {new Date().getFullYear()} APC Lagos State. Internal System.
//           </p>
//           <p className="text-emerald-100/20 text-[10px] mt-2 font-mono uppercase tracking-widest">
//             Unauthorized Access is Monitored and Prohibited
//           </p>
//         </footer>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import useAuthStore from '../store/authStore.js';
import toast from 'react-hot-toast';
import apcLogo from '../assets/apc2.jpeg';

const C = {
  bg:      '#070d09',
  surface: '#0c1410',
  card:    '#101a12',
  border:  '#192519',
  green:   '#22c55e',
  greenDi: '#16a34a',
  muted:   '#3d5b45',
  text:    '#e8f0eb',
  textDim: '#7a9e84',
};

/* ── INPUT FIELD ─────────────────────────── */
const Field = ({ label, name, icon: Icon, value, onChange, type = 'text', children, ...rest }) => (
  <div>
    <label style={{
      display: 'block', color: C.textDim, fontSize: 10, fontWeight: 800,
      letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8,
    }}>{label}</label>
    <div style={{ position: 'relative' }}>
      <Icon size={15} color={C.muted} style={{
        position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none',
      }} />
      <input
        name={name} type={type} value={value} onChange={onChange} {...rest}
        style={{
          width: '100%', background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 12, padding: '13px 44px 13px 42px', color: C.text,
          fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: 'none',
          transition: 'border-color .15s, background .15s',
        }}
        onFocus={e => { e.target.style.borderColor = C.green; e.target.style.background = '#0d1a0f'; }}
        onBlur={e => { e.target.style.borderColor = C.border; e.target.style.background = C.surface; }}
      />
      {children}
    </div>
  </div>
);

/* ── MAIN ────────────────────────────────── */
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const admin = await login(formData.email, formData.password);
      toast.success(`Welcome, ${admin.name.split(' ')[0]}`, {
        style: { background: '#0f1a12', color: C.text, border: `1px solid ${C.border}`, borderRadius: 12, fontFamily: 'DM Sans,sans-serif' },
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: C.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, fontFamily: "'DM Sans',sans-serif", position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box}
        input::placeholder{color:${C.muted}}
        @keyframes rotGrid{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}
      `}</style>

      {/* ── BACKGROUND ── */}
      {/* dot grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.025, pointerEvents: 'none' }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill={C.green} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* ambient glows */}
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%',
        width: '50vw', height: '50vw', borderRadius: '50%',
        background: `${C.green}`, opacity: 0.03,
        filter: 'blur(120px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-10%',
        width: '40vw', height: '40vw', borderRadius: '50%',
        background: `${C.green}`, opacity: 0.025,
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      {/* decorative vertical lines */}
      {[-30, -15, 15, 30].map((pct, i) => (
        <div key={i} style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `${50 + pct}%`, width: 1,
          background: `linear-gradient(180deg, transparent, ${C.border} 30%, ${C.border} 70%, transparent)`,
          opacity: 0.5, pointerEvents: 'none',
        }} />
      ))}

      {/* ── CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 10 }}
      >
        {/* logo block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <motion.div
            whileHover={{ scale: 1.04 }}
            style={{
              width: 80, height: 80, borderRadius: 22,
              background: C.card, border: `2px solid ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20, overflow: 'hidden',
              boxShadow: `0 0 40px ${C.green}15`,
            }}
          >
            <img src={apcLogo} alt="APC Lagos" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
          </motion.div>

          <h1 style={{
            fontSize: 28, fontWeight: 900, letterSpacing: '-0.05em', color: C.text,
            margin: '0 0 6px', lineHeight: 1, textAlign: 'center',
          }}>
            Admin Control Center
          </h1>
          <p style={{ color: C.muted, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>
            Lagos State Chapter · Restricted Access
          </p>
        </div>

        {/* form card */}
        <div style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 20, padding: '32px 28px',
        }}>
          {/* error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  background: 'rgba(248,113,113,0.07)',
                  borderLeft: '3px solid rgba(248,113,113,0.7)',
                  borderRadius: '0 10px 10px 0',
                  padding: '12px 14px', color: '#f87171', fontSize: 13,
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field
              label="Admin Email" name="email" icon={Mail}
              type="email" value={formData.email}
              onChange={handleChange} placeholder="name@apclagos.com" required
            />

            <Field
              label="Password" name="password" icon={Lock}
              type={showPassword ? 'text' : 'password'}
              value={formData.password} onChange={handleChange}
              placeholder="••••••••" required
            >
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                  color: C.muted, transition: 'color .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = C.green}
                onMouseLeave={e => e.currentTarget.style.color = C.muted}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </Field>

            <motion.button
              type="submit" disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              style={{
                marginTop: 8, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: C.green, border: 'none', borderRadius: 12, padding: '15px',
                color: '#030a06', fontSize: 14, fontWeight: 800, letterSpacing: '0.02em',
                cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                opacity: loading ? 0.75 : 1, transition: 'opacity .15s',
                boxShadow: `0 6px 28px ${C.green}30`,
              }}
            >
              {loading
                ? <><Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} /> Verifying…</>
                : <><span>Initialize Session</span><ArrowRight size={17} /></>
              }
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </motion.button>
          </form>
        </div>

        {/* footer */}
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: C.muted, fontSize: 11, fontFamily: 'DM Mono,monospace', letterSpacing: '0.06em' }}>
            © {new Date().getFullYear()} APC Lagos State · Internal System
          </p>
          <p style={{ color: C.border, fontSize: 10, marginTop: 4, fontFamily: 'DM Mono,monospace', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Unauthorized access is monitored
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
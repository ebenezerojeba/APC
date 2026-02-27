// import React, { useState } from 'react';
// import { Outlet, NavLink, useNavigate } from 'react-router-dom';
// import {
//   LayoutDashboard, Users, Shield, Settings, LogOut,
//   Menu, X, ChevronDown, Bell
// } from 'lucide-react';
// import useAuthStore from '../store/authStore';
// import toast from 'react-hot-toast';

// const navItems = [
//   { to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
//   { to: '/members', label: 'Members', icon: Users },
//   { to: '/admins', label: 'Admin Users', icon: Shield, role: 'super_admin' },
//   { to: '/settings', label: 'Settings', icon: Settings },
// ];

// const NavItem = ({ to, label, icon: Icon, exact, onClick }) => (
//   <NavLink
//     to={to}
//     end={exact}
//     onClick={onClick}
//     className={({ isActive }) =>
//       `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
//         isActive
//           ? 'bg-brand-700 text-white shadow-sm'
//           : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//       }`
//     }
//   >
//     <Icon size={18} />
//     {label}
//   </NavLink>
// );

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { admin, logout } = useAuthStore();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//     toast.success('Logged out successfully');
//   };

//   const visibleNav = navItems.filter(
//     (item) => !item.role || item.role === admin?.role
//   );

//   const Sidebar = ({ mobile = false }) => (
//     <aside className={`
//       flex flex-col h-full bg-white border-r border-gray-100
//       ${mobile ? 'w-72' : 'w-64'}
//     `}>
//       {/* Logo */}
//       <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 bg-brand-700 rounded-xl flex items-center justify-center">
//             <span className="text-white font-bold text-sm">APC</span>
//           </div>
//           <div>
//             <p className="font-bold text-gray-900 text-sm leading-tight">Lagos APC</p>
//             <p className="text-xs text-gray-400">Admin Portal</p>
//           </div>
//         </div>
//         {mobile && (
//           <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
//             <X size={20} />
//           </button>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
//         <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
//           Navigation
//         </p>
//         {visibleNav.map((item) => (
//           <NavItem
//             key={item.to}
//             {...item}
//             onClick={mobile ? () => setSidebarOpen(false) : undefined}
//           />
//         ))}
//       </nav>

//       {/* Admin profile */}
//       <div className="px-4 py-4 border-t border-gray-100">
//         <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50">
//           <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center shrink-0">
//             <span className="text-brand-700 font-bold text-xs">
//               {admin?.name?.charAt(0)?.toUpperCase()}
//             </span>
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-semibold text-gray-900 truncate">{admin?.name}</p>
//             <p className="text-xs text-gray-400 truncate capitalize">
//               {admin?.role?.replace('_', ' ')}
//               {admin?.assignedLGA ? ` · ${admin.assignedLGA}` : ''}
//             </p>
//           </div>
//         </div>
//         <button
//           onClick={handleLogout}
//           className="w-full mt-2 flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors"
//         >
//           <LogOut size={16} />
//           Sign Out
//         </button>
//       </div>
//     </aside>
//   );

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       {/* Desktop Sidebar */}
//       <div className="hidden lg:flex lg:shrink-0">
//         <Sidebar />
//       </div>

//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-50 flex lg:hidden">
//           <div
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm"
//             onClick={() => setSidebarOpen(false)}
//           />
//           <div className="relative z-10 flex">
//             <Sidebar mobile />
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         {/* Top Nav */}
//         <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-4 flex items-center justify-between shrink-0">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
//           >
//             <Menu size={22} />
//           </button>

//           <div className="hidden lg:flex items-center gap-2 text-sm text-gray-400">
//             {/* Breadcrumb placeholder - components can override */}
//           </div>

//           <div className="flex items-center gap-3 ml-auto">
//             <button className="relative text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-50">
//               <Bell size={18} />
//             </button>
//             <div className="hidden sm:flex items-center gap-2 text-sm">
//               <span className="text-gray-500">Hi,</span>
//               <span className="font-semibold text-gray-800">{admin?.name?.split(' ')[0]}</span>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;













import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Shield, Settings, LogOut,
  Menu, X, Bell, ChevronRight,
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

/* ── TOKENS ─────────────────────────────── */
const C = {
  bg:       '#0b0f0e',
  surface:  '#0e1511',
  card:     '#111815',
  sidebar:  '#0d1410',
  border:   '#1a2820',
  borderHi: '#243630',
  green:    '#22c55e',
  muted:    '#4b6357',
  text:     '#e8f0eb',
  textDim:  '#7a9e84',
  hover:    '#141d18',
  active:   '#162019',
};

const ROLE_COLOR = {
  super_admin: '#f59e0b',
  admin:       '#38bdf8',
  viewer:      C.muted,
};

const navItems = [
  { to: '/',        label: 'Dashboard',   icon: LayoutDashboard, exact: true },
  { to: '/members', label: 'Members',     icon: Users },
  { to: '/admins',  label: 'Admin Users', icon: Shield, role: 'super_admin' },
  { to: '/settings',label: 'Settings',    icon: Settings },
];

/* ── NAV ITEM ────────────────────────────── */
const NavItem = ({ to, label, icon: Icon, exact, onClick }) => (
  <NavLink to={to} end={exact} onClick={onClick}>
    {({ isActive }) => (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 12px', borderRadius: 10, cursor: 'pointer',
        background: isActive ? C.active : 'transparent',
        border: `1px solid ${isActive ? C.borderHi : 'transparent'}`,
        transition: 'all .15s', position: 'relative',
        textDecoration: 'none',
      }}
        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = C.hover; }}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
      >
        {/* active indicator */}
        {isActive && (
          <div style={{
            position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
            width: 3, height: 18, background: C.green,
            borderRadius: '0 2px 2px 0',
          }} />
        )}
        <Icon size={16} color={isActive ? C.green : C.muted} style={{ flexShrink: 0 }} />
        <span style={{
          fontSize: 13, fontWeight: isActive ? 700 : 600,
          color: isActive ? C.text : C.textDim,
          transition: 'color .15s',
        }}>
          {label}
        </span>
        {isActive && (
          <ChevronRight size={12} color={C.green} style={{ marginLeft: 'auto', opacity: 0.6 }} />
        )}
      </div>
    )}
  </NavLink>
);

/* ── SIDEBAR CONTENT ─────────────────────── */
const SidebarContent = ({ admin, visibleNav, onClose, onLogout }) => {
  const roleColor = ROLE_COLOR[admin?.role] || C.muted;
  const initials = admin?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: C.sidebar, borderRight: `1px solid ${C.border}`,
      width: 224,
    }}>
      {/* LOGO */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `${C.green}18`, border: `1px solid ${C.green}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: C.green, fontWeight: 900, fontSize: 11, fontFamily: 'DM Mono,monospace', letterSpacing: '0.05em' }}>
              APC
            </span>
          </div>
          <div>
            <p style={{ color: C.text, fontWeight: 800, fontSize: 13, margin: 0, letterSpacing: '-0.02em' }}>Lagos APC</p>
            <p style={{ color: C.muted, fontSize: 10, margin: '1px 0 0', fontWeight: 600, letterSpacing: '0.05em' }}>Admin Portal</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: C.muted,
          }}>
            <X size={17} />
          </button>
        )}
      </div>

      {/* LIVE STATUS STRIP */}
      <div style={{
        margin: '12px 16px 0',
        background: `${C.green}0c`, border: `1px solid ${C.green}20`,
        borderRadius: 8, padding: '7px 10px',
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: C.green, boxShadow: `0 0 6px ${C.green}`,
          animation: 'liveP 2s ease-in-out infinite',
          flexShrink: 0,
        }} />
        <span style={{ color: C.textDim, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          System Live
        </span>
      </div>

      {/* NAV */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{
          color: C.muted, fontSize: 9, fontWeight: 800, letterSpacing: '0.18em',
          textTransform: 'uppercase', padding: '0 4px', marginBottom: 8,
        }}>Navigation</p>
        {visibleNav.map(item => (
          <NavItem key={item.to} {...item} onClick={onClose} />
        ))}
      </nav>

      {/* PROFILE */}
      <div style={{ padding: '12px 12px 16px', borderTop: `1px solid ${C.border}` }}>
        {/* admin info */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 10px', borderRadius: 10,
          background: C.card, border: `1px solid ${C.border}`,
          marginBottom: 8,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: `${roleColor}18`, border: `1px solid ${roleColor}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 900, color: roleColor, fontFamily: 'DM Mono,monospace',
          }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: C.text, fontSize: 12, fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {admin?.name}
            </p>
            <p style={{ color: C.muted, fontSize: 10, margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {admin?.role?.replace('_', ' ')}
              {admin?.assignedLGA ? ` · ${admin.assignedLGA}` : ''}
            </p>
          </div>
        </div>

        {/* logout */}
        <button onClick={onLogout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 12px', borderRadius: 10, cursor: 'pointer',
            background: 'transparent', border: `1px solid transparent`,
            color: C.muted, fontSize: 12, fontWeight: 700, fontFamily: 'inherit',
            transition: 'all .15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(248,113,113,0.07)';
            e.currentTarget.style.borderColor = 'rgba(248,113,113,0.2)';
            e.currentTarget.style.color = '#f87171';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.color = C.muted;
          }}
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

/* ── BREADCRUMB ─────────────────────────── */
const Breadcrumb = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const labels = { members: 'Members', admins: 'Admin Users', settings: 'Settings' };

  if (segments.length === 0) return (
    <span style={{ color: C.textDim, fontSize: 12, fontWeight: 600 }}>Dashboard</span>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ color: C.muted, fontSize: 12, fontWeight: 600 }}>Dashboard</span>
      {segments.map((seg, i) => (
        <React.Fragment key={seg}>
          <ChevronRight size={12} color={C.muted} style={{ opacity: 0.5 }} />
          <span style={{
            color: i === segments.length - 1 ? C.text : C.muted,
            fontSize: 12, fontWeight: i === segments.length - 1 ? 700 : 600,
          }}>
            {labels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1)}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

/* ── MAIN LAYOUT ─────────────────────────── */
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    toast.success('Signed out', {
      style: { background: C.card, color: C.text, border: `1px solid ${C.border}`, borderRadius: 12, fontFamily: 'DM Sans,sans-serif' },
    });
  };

  const visibleNav = navItems.filter(item => !item.role || item.role === admin?.role);
  const roleColor = ROLE_COLOR[admin?.role] || C.muted;
  const initials = admin?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: C.bg, fontFamily: "'DM Sans',sans-serif", color: C.text,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:${C.bg}}
        ::-webkit-scrollbar-thumb{background:${C.borderHi};border-radius:4px}
        a{text-decoration:none;color:inherit}
        @keyframes liveP{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.2)}}
        @media(max-width:1024px){.desktop-sidebar{display:none!important}}
        @media(min-width:1025px){.mobile-header-menu{display:none!important}}
      `}</style>

      {/* DESKTOP SIDEBAR */}
      <div className="desktop-sidebar" style={{ flexShrink: 0 }}>
        <SidebarContent
          admin={admin}
          visibleNav={visibleNav}
          onLogout={handleLogout}
        />
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 40,
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
              }}
            />
            <motion.div
              key="drawer"
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50 }}
            >
              <SidebarContent
                admin={admin}
                visibleNav={visibleNav}
                onClose={() => setSidebarOpen(false)}
                onLogout={handleLogout}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>

        {/* TOP HEADER */}
        <header style={{
          height: 56, flexShrink: 0,
          background: C.sidebar, borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center',
          padding: '0 20px', gap: 12,
        }}>
          {/* mobile menu button */}
          <button
            className="mobile-header-menu"
            onClick={() => setSidebarOpen(true)}
            style={{
              width: 34, height: 34, borderRadius: 9, flexShrink: 0,
              background: C.card, border: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: C.textDim, transition: 'all .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textDim; }}
          >
            <Menu size={16} />
          </button>

          {/* breadcrumb */}
          <div style={{ flex: 1 }}>
            <Breadcrumb />
          </div>

          {/* right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* notification bell */}
            <button style={{
              width: 34, height: 34, borderRadius: 9,
              background: 'transparent', border: `1px solid transparent`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: C.muted, transition: 'all .15s', position: 'relative',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = C.card; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textDim; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = C.muted; }}
            >
              <Bell size={15} />
              {/* notification dot */}
              <div style={{
                position: 'absolute', top: 7, right: 7,
                width: 6, height: 6, borderRadius: '50%',
                background: C.green, border: `1.5px solid ${C.sidebar}`,
              }} />
            </button>

            {/* divider */}
            <div style={{ width: 1, height: 20, background: C.border }} />

            {/* user chip */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '5px 10px 5px 5px',
              borderRadius: 10, background: C.card, border: `1px solid ${C.border}`,
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                background: `${roleColor}18`, border: `1px solid ${roleColor}35`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 900, color: roleColor, fontFamily: 'DM Mono,monospace',
              }}>
                {initials}
              </div>
              <span style={{ color: C.text, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
                {admin?.name?.split(' ')[0]}
              </span>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
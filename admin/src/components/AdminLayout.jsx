import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Shield, Settings, LogOut,
  Menu, X, ChevronDown, Bell
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/members', label: 'Members', icon: Users },
  { to: '/admins', label: 'Admin Users', icon: Shield, role: 'super_admin' },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const NavItem = ({ to, label, icon: Icon, exact, onClick }) => (
  <NavLink
    to={to}
    end={exact}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
        isActive
          ? 'bg-brand-700 text-white shadow-sm'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`
    }
  >
    <Icon size={18} />
    {label}
  </NavLink>
);

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const visibleNav = navItems.filter(
    (item) => !item.role || item.role === admin?.role
  );

  const Sidebar = ({ mobile = false }) => (
    <aside className={`
      flex flex-col h-full bg-white border-r border-gray-100
      ${mobile ? 'w-72' : 'w-64'}
    `}>
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-700 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">APC</span>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm leading-tight">Lagos APC</p>
            <p className="text-xs text-gray-400">Admin Portal</p>
          </div>
        </div>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
          Navigation
        </p>
        {visibleNav.map((item) => (
          <NavItem
            key={item.to}
            {...item}
            onClick={mobile ? () => setSidebarOpen(false) : undefined}
          />
        ))}
      </nav>

      {/* Admin profile */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50">
          <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center shrink-0">
            <span className="text-brand-700 font-bold text-xs">
              {admin?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{admin?.name}</p>
            <p className="text-xs text-gray-400 truncate capitalize">
              {admin?.role?.replace('_', ' ')}
              {admin?.assignedLGA ? ` · ${admin.assignedLGA}` : ''}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-2 flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10 flex">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Nav */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-4 flex items-center justify-between shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-400">
            {/* Breadcrumb placeholder - components can override */}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button className="relative text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-50">
              <Bell size={18} />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-gray-500">Hi,</span>
              <span className="font-semibold text-gray-800">{admin?.name?.split(' ')[0]}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { admin, logout } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [error, setError] = useState('');

  const toggle = (k) => setShow(p => ({ ...p, [k]: !p[k] }));
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const mutation = useMutation({
    mutationFn: (data) => api.patch('/auth/change-password', data),
    onSuccess: () => {
      toast.success('Password changed. Please log in again.');
      logout();
      navigate('/login');
    },
    onError: (err) => setError(err.response?.data?.message || 'Password change failed'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.newPassword !== form.confirmPassword) {
      return setError('New passwords do not match.');
    }
    if (form.newPassword.length < 8) {
      return setError('New password must be at least 8 characters.');
    }
    mutation.mutate({ currentPassword: form.currentPassword, newPassword: form.newPassword });
  };

  return (
    <div className="p-6 lg:p-8 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your account preferences</p>
      </div>

      {/* Profile Card */}
      <div className="card p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Account Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <div className="w-20 h-20 bg-brand-100 rounded-2xl flex items-center justify-center">
              <span className="text-brand-700 font-black text-2xl">
                {admin?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="sm:col-span-2 space-y-1">
            <p className="font-bold text-gray-900 text-lg">{admin?.name}</p>
            <p className="text-gray-500 text-sm">{admin?.email}</p>
            <span className="inline-flex px-2.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full capitalize">
              {admin?.role?.replace('_', ' ')}
            </span>
            {admin?.assignedLGA && (
              <p className="text-gray-400 text-sm">Assigned LGA: {admin.assignedLGA}</p>
            )}
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="card p-6 max-w-lg">
        <div className="flex items-center gap-2 mb-5">
          <Lock size={18} className="text-brand-700" />
          <h2 className="font-semibold text-gray-900">Change Password</h2>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm mb-4">
            <AlertCircle size={15} className="shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'currentPassword', label: 'Current Password', showKey: 'current' },
            { key: 'newPassword', label: 'New Password', showKey: 'new' },
            { key: 'confirmPassword', label: 'Confirm New Password', showKey: 'confirm' },
          ].map(({ key, label, showKey }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
              <div className="relative">
                <input
                  type={show[showKey] ? 'text' : 'password'}
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  className="input pr-10"
                  placeholder="••••••••"
                  required
                  minLength={key !== 'currentPassword' ? 8 : 1}
                />
                <button
                  type="button"
                  onClick={() => toggle(showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {show[showKey] ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn-primary"
          >
            {mutation.isPending ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
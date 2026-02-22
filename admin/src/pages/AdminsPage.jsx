import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Shield, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { format } from 'date-fns';
import api from '../utils/api';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const LGAS = [
  'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
  'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
  'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere'
];

const ROLE_LABELS = {
  super_admin: { label: 'Super Admin', color: 'bg-purple-100 text-purple-700' },
  lga_admin: { label: 'LGA Admin', color: 'bg-blue-100 text-blue-700' },
  viewer: { label: 'Viewer', color: 'bg-gray-100 text-gray-600' },
};

const AdminModal = ({ onClose, onSubmit, loading }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'viewer', assignedLGA: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Create Admin User</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input className="input" placeholder="John Doe" value={form.name} onChange={e => set('name', e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input className="input" type="email" placeholder="admin@apclagos.com" value={form.email} onChange={e => set('email', e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input className="input" type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => set('password', e.target.value)} required minLength={8} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
            <select className="input" value={form.role} onChange={e => set('role', e.target.value)}>
              <option value="viewer">Viewer</option>
              <option value="lga_admin">LGA Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
          {form.role === 'lga_admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned LGA</label>
              <select className="input" value={form.assignedLGA} onChange={e => set('assignedLGA', e.target.value)} required>
                <option value="">Select LGA</option>
                {LGAS.map(lga => <option key={lga} value={lga}>{lga}</option>)}
              </select>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
              {loading ? 'Creating...' : 'Create Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
      toast.success('Admin created successfully!');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Create failed'),
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, isActive }) => api.patch(`/auth/admins/${id}`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries(['admins']);
      toast.success('Admin status updated');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/auth/admins/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['admins']);
      toast.success('Admin deleted');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Delete failed'),
  });

  return (
    <div className="p-6 lg:p-8 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Users</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage access to the admin portal</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus size={16} />
          Add Admin
        </button>
      </div>

      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />)}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Admin</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Role</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">LGA</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Last Login</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(data || []).map((admin) => {
                const roleInfo = ROLE_LABELS[admin.role] || ROLE_LABELS.viewer;
                const isSelf = admin._id === currentAdmin?.id;
                return (
                  <tr key={admin._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Shield size={14} className="text-gray-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {admin.name}
                            {isSelf && <span className="ml-2 text-xs text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded">You</span>}
                          </p>
                          <p className="text-xs text-gray-400">{admin.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${roleInfo.color}`}>
                        {roleInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{admin.assignedLGA || '—'}</td>
                    <td className="px-4 py-4 text-sm text-gray-400">
                      {admin.lastLogin ? format(new Date(admin.lastLogin), 'MMM d, yyyy') : 'Never'}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => !isSelf && toggleActiveMutation.mutate({ id: admin._id, isActive: !admin.isActive })}
                        disabled={isSelf}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors ${
                          admin.isActive
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        } disabled:cursor-not-allowed`}
                      >
                        {admin.isActive ? <><Check size={11} /> Active</> : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      {!isSelf && (
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${admin.name}?`)) deleteMutation.mutate(admin._id);
                          }}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <AdminModal
          onClose={() => setShowModal(false)}
          onSubmit={(form) => createMutation.mutate(form)}
          loading={createMutation.isPending}
        />
      )}
    </div>
  );
};

export default AdminsPage;
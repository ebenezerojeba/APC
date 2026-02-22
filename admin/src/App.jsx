// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Dashboard from './pages/Dashboard'
// import Ananlytics from './pages/Ananlytics'
// import Members from './pages/Members'

// const App = () => {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Dashboard/>} />
//         <Route path="/analytics" element={<Ananlytics/>} />
//         <Route path="/users" element={<AdminUsers/>} />
//         <Route path="/audit-logs" element={<AuditLogs/>} />
//         <Route path="/members" element={<Members/>} />
//       </Routes>
//     </div>
//   )
// }

// export default App


import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';

// Layouts
import AdminLayout from './components/AdminLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import MemberDetail from './pages/MemberDetail';
import AdminsPage from './pages/AdminsPage';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<PublicRoute><Login /></PublicRoute>}
      />
      <Route
        path="/"
        element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
      >
        <Route index element={<Dashboard />} />
        <Route path="members" element={<Members />} />
        <Route path="members/:id" element={<MemberDetail />} />
        <Route path="admins" element={<AdminsPage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
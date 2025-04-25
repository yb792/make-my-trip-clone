import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateAdminRoute = ({ children }) => {
  const isAdminLoggedIn = !!localStorage.getItem('adminToken');
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" />;
};

export default PrivateAdminRoute;

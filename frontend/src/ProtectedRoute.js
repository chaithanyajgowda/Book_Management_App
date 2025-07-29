// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role: requiredRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // get role stored after login
  console.log("ProtectedRoute token:", token, "| userRole:", userRole, "| requiredRole:", requiredRole);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <p>⛔ Unauthorized: You do not have permission to access this page.</p>;
  }

  return children;
};

export default ProtectedRoute;

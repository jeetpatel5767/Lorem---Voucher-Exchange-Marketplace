// src/Components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  
  // Check for user data and login timestamp
  const currentUser = localStorage.getItem('currentUser');
  const loginTimestamp = localStorage.getItem('loginTimestamp');

  // Check if login is recent (e.g., within 24 hours)
  const isLoginRecent = loginTimestamp 
    ? (Date.now() - parseInt(loginTimestamp)) < 24 * 60 * 60 * 1000 
    : false;

  if (!currentUser || !isLoginRecent) {
    // Redirect to login, maintaining the current location they were trying to access
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Protected Route Component
const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    // If authenticated, render the Outlet, otherwise redirect to login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

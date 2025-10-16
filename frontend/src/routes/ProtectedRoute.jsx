import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children, requiredRole, redirectTo = '/login' }) => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    if (!user) {
        return <Navigate to={redirectTo} replace state={{ from: location }} />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

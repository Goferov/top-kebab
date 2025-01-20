import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
    const { user, loading } = useUser();

    if (loading) return <p>Ładowanie...</p>;

    if (!user) {
        return <Navigate to="/" />;
    }

    if (adminOnly && user.role_id !== 1) {
        return <Navigate to="/panel" />;
    }

    return children;
}

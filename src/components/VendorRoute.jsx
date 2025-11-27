import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VendorRoute = ({ children }) => {
    const { usuarioLogueado } = useAuth();

    if (!usuarioLogueado) {
        return <Navigate to="/login" replace />;
    }
    const roles = usuarioLogueado.roles || [];
    const esVendedor = roles.includes('ROLE_VENDEDOR');
    const esAdmin = roles.includes('ROLE_ADMIN');

    if (!esVendedor && !esAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default VendorRoute;
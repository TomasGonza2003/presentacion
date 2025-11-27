import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

import Header from './components/Header';
import Footer from './components/Footer';

import Index from './pages/Index';
import Catalogo from './pages/Catalogo';
import Compatibilidad from './pages/Compatibilidad';
import Carrito from './pages/Carrito';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';

import Checkout from './pages/Checkout';
import CompraExitosa from './pages/CompraExitosa';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductos from './pages/AdminProductos';
import VendorDashboard from './pages/VendorDashboard';
import VendorRoute from './components/VendorRoute';

// Ruta Protegida para Usuarios Logueados
const ProtectedRoute = ({ children }) => {
  const { usuarioLogueado } = useAuth();
  if (!usuarioLogueado) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
// Ruta Protegida para Administradores
const AdminRoute = ({ children }) => {
  const { usuarioLogueado } = useAuth();

  // Verificamos si existe el usuario, si tiene roles y si incluye ROLE_ADMIN
  const esAdmin = usuarioLogueado &&
    usuarioLogueado.roles &&
    usuarioLogueado.roles.includes('ROLE_ADMIN');

  if (!esAdmin) {
    // Si no es admin, lo mandamos al home
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

function AppContent() {
  return (
    <>
      <Header />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Index />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/compatibilidad" element={<Compatibilidad />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas Protegidas (Usuarios) */}
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/compra-exitosa" element={<ProtectedRoute><CompraExitosa /></ProtectedRoute>} />

        {/* Rutas Protegidas (Administrador) */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/productos" element={<AdminRoute><AdminProductos /></AdminRoute>} />

        {/* Rutas Protegidas (Vendedor) */}
        <Route path="/vendor" element={<VendorRoute><VendorDashboard /></VendorRoute>} />

        {/* Redirigir cualquier otra ruta a Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
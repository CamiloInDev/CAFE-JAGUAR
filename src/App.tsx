import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore, useCartStore } from './store';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Tienda from './pages/Tienda';
import ProductDetail from './pages/ProductDetail';
import Experiencias from './pages/Experiencias';
import ExperienciaDetail from './pages/ExperienciaDetail';
import Turismo from './pages/Turismo';
import Academia from './pages/Academia';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import MiCuenta from './pages/MiCuenta';
import Admin from './pages/Admin';

export default function App() {
  const { checkAuth, loading } = useAuthStore();
  const { loadCartFromStorage } = useCartStore();

  useEffect(() => {
    // Check credentials session cookie on page load
    checkAuth();
    // Re-instantiate local shopping cart items
    loadCartFromStorage();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center space-y-4">
        <div className="p-3 bg-amber-900 rounded-2xl text-white animate-bounce">
          ☕
        </div>
        <div className="w-8 h-8 border-4 border-amber-800 border-t-transparent rounded-full animate-spin" />
        <p className="text-stone-500 text-xs font-mono tracking-widest uppercase">Jaguar Coffee Inc.</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
        <Navbar />

        {/* Core dynamic route display panel */}
        <main className="flex-grow">
          <Routes>
            {/* Public Access Paths */}
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda/:slug" element={<ProductDetail />} />
            <Route path="/experiencias" element={<Experiencias />} />
            <Route path="/experiencias/:slug" element={<ExperienciaDetail />} />
            <Route path="/turismo" element={<Turismo />} />
            <Route path="/academia" element={<Academia />} />
            <Route path="/contacto" element={<Contacto />} />
            
            {/* Authentication Entries */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/registro" element={<Register />} />
            
            {/* Purchase cart flows */}
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/confirmacion" element={<ConfirmationPage />} />
            
            {/* Secure Customer dash panel */}
            <Route path="/mi-cuenta" element={<MiCuenta />} />
            
            {/* Administration portal */}
            <Route path="/admin" element={<Admin />} />

            {/* General Fallbacks */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

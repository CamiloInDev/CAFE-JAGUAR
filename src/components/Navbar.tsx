import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore, useCartStore } from '../store';
import { ShoppingCart, User as UserIcon, LogOut, ShieldCheck, Menu, X, Coffee } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = items.reduce((acc, item) => acc + item.cantidad, 0);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Tienda', path: '/tienda' },
    { name: 'Experiencias', path: '/experiencias' },
    { name: 'Haciendas', path: '/turismo' },
    { name: 'Academia', path: '/academia' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav id="app-navbar" className="bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#2A1A12]/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-all">
              <div className="w-10 h-10 bg-[#2A1A12] rounded-full flex items-center justify-center shadow-md">
                <Coffee className="w-5 h-5 text-[#F27D26]" />
              </div>
              <span className="text-2xl font-bold tracking-tighter uppercase text-[#2A1A12]">
                JAGUAR<span className="text-[#F27D26]">COFFEE</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans text-xs font-bold uppercase tracking-widest transition-colors pb-1 mt-[2px] ${
                  isActive(link.path) 
                    ? 'text-[#F27D26] border-b-2 border-[#F27D26]' 
                    : 'text-[#2A1A12]/75 hover:text-[#F27D26]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Shopping Cart Trigger */}
            <Link
              to="/carrito"
              id="nav-cart-btn"
              className="relative p-2.5 text-[#2A1A12] hover:text-[#F27D26] transition-colors bg-[#2A1A12]/5 hover:bg-[#2A1A12]/10 rounded-full"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#F27D26] text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/mi-cuenta"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2A1A12] hover:text-[#F27D26] bg-[#2A1A12]/5 hover:bg-[#2A1A12]/10 px-4 py-2 rounded-full border border-[#2A1A12]/10 transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-[#2A1A12]/70" />
                  <span>{user.nombre}</span>
                </Link>

                {user.rol === 'admin' && (
                  <Link
                    to="/admin"
                    title="Panel Administrativo"
                    className="p-2.5 text-[#F27D26] hover:text-white bg-[#F27D26]/10 hover:bg-[#F27D26] border border-[#F27D26]/20 rounded-full transition-colors"
                  >
                    <ShieldCheck className="w-5 h-5" />
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  title="Cerrar Sesión"
                  className="p-2.5 text-[#2A1A12]/60 hover:text-rose-600 bg-[#2A1A12]/5 hover:bg-rose-50 border border-[#2A1A12]/10 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/auth/login"
                  className="text-[#2A1A12] hover:text-[#F27D26] text-xs font-bold uppercase tracking-wider px-4 py-2 transition-colors"
                >
                  Ingresar
                </Link>
                <Link
                  to="/auth/registro"
                  className="bg-[#2A1A12] hover:bg-[#F27D26] text-white text-xs font-bold px-6 py-2.5 rounded-full uppercase tracking-wider transition-all duration-200 shadow-sm"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link
              to="/carrito"
              className="relative p-2.5 text-[#2A1A12] bg-[#2A1A12]/5 rounded-full"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#F27D26] text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2A1A12] hover:text-[#F27D26] transition-colors rounded-lg bg-[#2A1A12]/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-[#FDFBF7] border-t border-[#2A1A12]/10 py-4 px-6 space-y-4 shadow-inner">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-sans text-xs font-bold uppercase tracking-widest leading-relaxed ${
                  isActive(link.path) ? 'text-[#F27D26]' : 'text-[#2A1A12]/75'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <hr className="border-[#2A1A12]/10" />

          {/* User Profile Controls in Mobile Drawer */}
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-[#2A1A12]/5 p-3 rounded-xl border border-[#2A1A12]/10">
                <UserIcon className="w-5 h-5 text-[#2A1A12]/70" />
                <div>
                  <p className="text-xs font-bold text-[#2A1A12] uppercase tracking-wider leading-none">{user.nombre} {user.apellido}</p>
                  <p className="text-[10px] font-mono text-[#2A1A12]/60 mt-1">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  to="/mi-cuenta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 bg-[#2A1A12]/5 hover:bg-[#2A1A12]/10 text-[#2A1A12] font-bold uppercase tracking-wider text-[11px] rounded-full transition-colors border border-[#2A1A12]/10"
                >
                  Mi Cuenta / Pedidos
                </Link>
                {user.rol === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 bg-[#F27D26]/10 hover:bg-[#F27D26]/20 text-[#F27D26] font-bold uppercase tracking-wider text-[11px] rounded-full transition-colors border border-[#F27D26]/10"
                  >
                    Panel Admin (Rol: Admin)
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold border border-rose-200 rounded-full text-xs uppercase tracking-wider transition-all"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-[#2A1A12] bg-[#2A1A12]/5 hover:bg-[#2A1A12]/10 font-bold uppercase tracking-wider text-xs rounded-full transition-all border border-[#2A1A12]/10"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/auth/registro"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-[#2A1A12] hover:bg-[#F27D26] text-white font-bold uppercase tracking-wider text-xs rounded-full transition-all"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

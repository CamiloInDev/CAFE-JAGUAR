import React from 'react';
import { Coffee, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="app-footer" className="bg-[#122C9B] text-stone-300 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <Coffee className="w-5 h-5 text-[#FFA42C]" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase">
              JAGUAR<span className="text-[#FFA42C]">COFFEE</span>
            </span>
          </div>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            Plataforma cafetera transaccional premium de especialidad. Cosechado a mano en el Huila, Quindío y Sierra Nevada de Santa Marta. Obra y orgullo de Colombia.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-stone-400 font-mono tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-[#F27D26]" />
            <span>WooMPI Secure Payments</span>
          </div>
        </div>

        {/* Business Lines Section */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs tracking-widest uppercase font-mono">Líneas de Negocio</h4>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li><a href="/tienda" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">E-commerce de Grano y Molido</a></li>
            <li><a href="/experiencias" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">Reserva de Catas & Talleres</a></li>
            <li><a href="/turismo" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">Haciendas Cafeteras Airbnb</a></li>
            <li><a href="/academia" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">Academia de Barismo Digital</a></li>
          </ul>
        </div>

        {/* Help / Client Dashboard Section */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs tracking-widest uppercase font-mono">Atención al Cliente</h4>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li><a href="/contacto" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">Contacto de Soporte</a></li>
            <li><a href="/mi-cuenta" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">Mi Perfil y Pedidos</a></li>
            <li><a href="/carrito" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">Carrito de Compra</a></li>
            <li><a href="/auth/login" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">Acceso de Portal</a></li>
          </ul>
        </div>

        {/* Colombia / Certification Section */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs tracking-widest uppercase font-mono">Origen y Sello</h4>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3">
            <p className="text-xs text-stone-400 leading-normal font-light">
              Todos nuestros cafés cuentan con denominación de origen y comercio justo certificado, cultivados de forma sostenible a más de 1,700 metros de altura.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFA42C]/10 border border-[#FFA42C]/20 rounded-full text-[10px] font-semibold text-[#FFA42C] font-mono uppercase tracking-wider">
              ☕ Hecho en Colombia
            </div>
          </div>
        </div>
      </div>

      <hr className="border-white/5 max-w-7xl mx-auto my-10" />

      {/* Tech Bar / Credits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-widest uppercase text-stone-400 border-b border-white/5 pb-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span>Node.js v20</span>
            <span className="opacity-40">|</span>
            <span>React 18 + Vite</span>
            <span className="opacity-40">|</span>
            <span>MySQL 8.x Hostinger</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> WooMPI Checkout Connected</span>
            <span className="opacity-30">/</span>
            <span>V1.0.0 Build: 25.05.26</span>
          </div>
        </div>
        
        <div className="text-center text-[10px] text-stone-500 flex flex-col md:flex-row justify-between items-center gap-2">
          <span>© {new Date().getFullYear()} Jaguar Coffee S.A.S. Todos los derechos reservados.</span>
            <span className="flex items-center gap-1">
              Desarrollado con <Heart className="w-3 h-3 text-[#FFA42C] fill-[#FFA42C]" /> para los apasionados del café de especialidad.
            </span>
        </div>
      </div>
    </footer>
  );
}

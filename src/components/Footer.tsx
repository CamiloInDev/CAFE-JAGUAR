import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="app-footer" className="bg-[#122C9B] text-stone-300 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Section */}
        <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3 text-white">
            <img
              src="/images/logo-color.png"
              alt="Jaguar Coffee"
              className="h-12 w-auto"
            />
          </div>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            Reconocidos como el mejor café de Cundinamarca. Planta de trilla y tostión en Silvania con certificaciones SCA y CQI. Obra y orgullo de Colombia.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-stone-400 font-mono tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-[#FFA42C]" />
            <span>WooMPI Secure Payments</span>
          </div>
        </div>

        {/* Business Lines Section */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs tracking-widest uppercase font-mono">Líneas de Negocio</h4>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li><a href="/tienda" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">E-commerce de Grano y Molido</a></li>
            <li><a href="/experiencias" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">Reserva de Catas & Talleres</a></li>
            <li><a href="/turismo" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">Estadías Cafeteras en Airbnb</a></li>
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

        {/* Servicios Section */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs tracking-widest uppercase font-mono">Servicios</h4>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li><a href="/contacto" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">Trilla y Tostión</a></li>
            <li><a href="/contacto" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">Perfilación de Taza</a></li>
            <li><a href="/contacto" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">Logística Exportadora</a></li>
            <li><a href="/academia" className="hover:text-[#FFA42C] transition-colors uppercase tracking-wider font-mono">Certificaciones SCA & CQI</a></li>
          </ul>
        </div>

        {/* Contacto Info */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs tracking-widest uppercase font-mono">Contacto</h4>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li className="uppercase tracking-wider font-mono">cafejaguarcolombia@gmail.com</li>
            <li className="uppercase tracking-wider font-mono">(+57) 315 7307016</li>
            <li className="font-light">Cra 4 # 12 – 78, La Candelaria, Bogotá</li>
          </ul>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFA42C]/10 border border-[#FFA42C]/20 rounded-full text-[10px] font-semibold text-[#FFA42C] font-mono uppercase tracking-wider">
            ☕ Hecho en Colombia
          </div>
        </div>
      </div>

      {/* Credits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

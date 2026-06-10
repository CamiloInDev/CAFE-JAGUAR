import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Coffee, TreePine, Sunrise, Moon, Users, Calendar, ArrowRight } from 'lucide-react';

interface Estadia {
  id: string;
  tipo: 'glamping' | 'eco-hostal';
  nombre: string;
  capacidad: number;
  precio: number;
  imagen_principal: string;
  imagenes?: string[];
  descripcion?: string;
}

const estadias: Estadia[] = [
  {
    id: 'glamping-familiar',
    tipo: 'glamping',
    nombre: 'Glamping Familiar',
    capacidad: 8,
    precio: 350000,
    imagen_principal: '/images/TURISMO/GLAMP1.webp',
  },
  {
    id: 'eco-hostal',
    tipo: 'eco-hostal',
    nombre: 'ECO Hostal',
    capacidad: 8,
    precio: 350000,
    imagen_principal: '/images/TURISMO/HOSTAL1.webp',
  },
];

export default function Turismo() {
  return (
    <div id="turismo-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFA42C]/10 text-[#FFA42C] border border-[#FFA42C]/20 rounded-full text-xs font-mono font-black tracking-widest uppercase">
          <Coffee className="w-4 h-4" />
          Estadías
        </span>
        <h1 className="font-sans text-4xl md:text-5xl font-extrabold text-[#122C9B] tracking-tighter uppercase leading-[0.9]">
          Descubre un refugio natural<br />en el corazón de las montañas
        </h1>
        <p className="text-[#122C9B]/70 text-sm max-w-2xl mx-auto leading-relaxed">
          Un eco hotel y glamping donde el aroma del café recién tostado se mezcla con el aire puro y la tranquilidad del campo. Vive una experiencia auténtica en una finca cafetera tradicional.
        </p>
      </div>

      {/* Description Blocks */}
      <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-8 space-y-4 shadow-sm">
        <p className="text-[#122C9B]/80 text-sm leading-relaxed">
          Aquí, el descanso se conecta con la naturaleza. Disfruta de cómodas y exclusivas unidades de glamping, diseñadas para brindarte confort sin perder el encanto rústico del entorno. Despierta con el canto de las aves, recorre nuestros cultivos de café y conoce de cerca el proceso artesanal, desde la semilla hasta la taza.
        </p>
        <p className="text-[#122C9B]/60 text-xs font-medium">
          Ya sea para una escapada romántica, un descanso en familia o una experiencia de conexión interior, nuestro eco hotel y glamping es el destino perfecto para desconectarte de la rutina y reconectarte con lo esencial.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-[#122C9B]/10">
          <span className="flex items-center gap-2 text-[#FFA42C] text-sm font-bold">
            <Coffee className="w-4 h-4" /> Vive el café
          </span>
          <span className="flex items-center gap-2 text-[#FFA42C] text-sm font-bold">
            <TreePine className="w-4 h-4" /> Respira naturaleza
          </span>
          <span className="flex items-center gap-2 text-[#FFA42C] text-sm font-bold">
            <Moon className="w-4 h-4" /> Siente la tranquilidad
          </span>
        </div>
      </div>

      {/* Estadías Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {estadias.map((estadia) => (
          <Link
            key={estadia.id}
            to={estadia.tipo === 'glamping' ? '/turismo/glamping' : '/turismo/eco-hostal'}
            className="bg-white border border-[#122C9B]/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#122C9B]/5 transition-all duration-300 group"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] bg-[#122C9B]/5 overflow-hidden">
              <img
                src={estadia.imagen_principal}
                alt={estadia.nombre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#122C9B] text-white text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {estadia.tipo === 'glamping' ? 'Glamping' : 'ECO Hostal'}
              </div>
            </div>

            {/* Info */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-sans text-xl font-bold text-[#122C9B]">
                  Estadías ECO Hotel Glamping
                </h3>
                <p className="font-sans text-lg font-semibold text-[#122C9B]/80">
                  {estadia.nombre}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#122C9B]/60 font-mono">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#FFA42C]" />
                  Capacidad máxima para {estadia.capacidad} personas
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#122C9B]/10">
                <div className="space-y-1">
                  <p className="text-xs text-[#122C9B]/50 font-mono uppercase tracking-wider">Desde</p>
                  <p className="text-2xl font-extrabold text-[#122C9B]">
                    ${estadia.precio.toLocaleString('es-CO')} COP
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#122C9B]/10 group-hover:bg-[#FFA42C]/10 text-[#122C9B] text-xs font-bold rounded-xl uppercase tracking-wider transition-all">
                  Ver más
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 text-center space-y-3 shadow-sm">
          <span className="p-4 bg-[#FFA42C]/10 rounded-full inline-block text-[#FFA42C]">
            <Sunrise className="w-8 h-8" />
          </span>
          <h3 className="font-sans text-sm font-bold text-[#122C9B]">Amaneceres dorados</h3>
          <p className="text-xs text-[#122C9B]/60">Paisajes verdes y luz natural</p>
        </div>
        <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 text-center space-y-3 shadow-sm">
          <span className="p-4 bg-[#FFA42C]/10 rounded-full inline-block text-[#FFA42C]">
            <Moon className="w-8 h-8" />
          </span>
          <h3 className="font-sans text-sm font-bold text-[#122C9B]">Noches estrelladas</h3>
          <p className="text-xs text-[#122C9B]/60">Cielo despejado y silencio</p>
        </div>
        <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 text-center space-y-3 shadow-sm">
          <span className="p-4 bg-[#FFA42C]/10 rounded-full inline-block text-[#FFA42C]">
            <Coffee className="w-8 h-8" />
          </span>
          <h3 className="font-sans text-sm font-bold text-[#122C9B]">Cultura cafetera</h3>
          <p className="text-xs text-[#122C9B]/60">De la semilla a la taza</p>
        </div>
        <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 text-center space-y-3 shadow-sm">
          <span className="p-4 bg-[#FFA42C]/10 rounded-full inline-block text-[#FFA42C]">
            <TreePine className="w-8 h-8" />
          </span>
          <h3 className="font-sans text-sm font-bold text-[#122C9B]">Entorno natural</h3>
          <p className="text-xs text-[#122C9B]/60">Aire puro y naturaleza</p>
        </div>
      </div>

      {/* Location Note */}
      <div className="bg-[#122C9B] text-white rounded-2xl p-8 text-center space-y-3">
        <h3 className="font-sans text-xl font-bold">¿Cómo llegar?</h3>
        <p className="text-white/70 text-sm">
          Ubicado en Silvania, Cundinamarca — a solo 45 minutos de Bogotá
        </p>
      </div>

    </div>
  );
}
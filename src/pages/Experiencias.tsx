import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, ChevronRight, Award } from 'lucide-react';

export default function Experiencias() {
  const experiences = [
    {
      id: 1,
      nombre: 'Catación de Café de Especialidad',
      descripcion: 'Aprende a identificar notas, aromas, acidez y cuerpo del café. Sesión guiada por catadores certificados Q-Grader con protocolos SCA.',
      duracion_min: 90,
      capacidad_max: 8,
      precio: 85000,
      imagen_url: 'https://cafejaguar.com/wp-content/uploads/2026/01/Experiencia-de-cataciones-684x1024.webp',
      slug: 'catacion'
    },
    {
      id: 2,
      nombre: 'Taller de Barismo',
      descripcion: 'Domina el arte del espresso perfecto, lances de leche y latte art. Practica con máquinas profesionales bajo la guía de instructores certificados.',
      duracion_min: 120,
      capacidad_max: 6,
      precio: 120000,
      imagen_url: 'https://cafejaguar.com/wp-content/uploads/2026/01/Experiencia-de-filtrados-685x1024.webp',
      slug: 'barismo'
    },
    {
      id: 3,
      nombre: 'Experiencia de Tostión',
      descripcion: 'Descubre el proceso de tueste del café verde al grano tostado. Controla curvas de temperatura y aprende a desarrollar perfiles de sabor únicos.',
      duracion_min: 90,
      capacidad_max: 6,
      precio: 95000,
      imagen_url: 'https://cafejaguar.com/wp-content/uploads/2026/01/Experiencia-de-tueste-685x1024.webp',
      slug: 'tueste'
    },
    {
      id: 4,
      nombre: 'Coffee Tour — Finca y Beneficio',
      descripcion: 'Recorre los cafetales, conoce el proceso de beneficio y participar en la cosecha. Una inmersión completa en el origen del café.',
      duracion_min: 180,
      capacidad_max: 10,
      precio: 150000,
      imagen_url: 'https://cafejaguar.com/wp-content/uploads/2026/01/Tour-cafetero-684x1024.webp',
      slug: 'coffee-tour'
    },
    {
      id: 5,
      nombre: 'Glamping entre Cafetales',
      descripcion: 'Vive una noche única en nuestras fincas cafeteras con alojamiento glamping. Despierta entre cafetales con una taza de café de origen preparada en el sitio.',
      duracion_min: 1440,
      capacidad_max: 4,
      precio: 350000,
      imagen_url: 'https://cafejaguar.com/wp-content/uploads/2026/01/Tour-cafetero-684x1024.webp',
      slug: 'glamping'
    },
    {
      id: 6,
      nombre: 'Scooter Tour — Ruta Histórica',
      descripcion: 'Recorre en scooter eléctrico la ruta histórica del café en Colombia. Descubre haciendas coloniales, miradores naturales y pequeños pueblos cafeteros.',
      duracion_min: 240,
      capacidad_max: 8,
      precio: 180000,
      imagen_url: 'https://cafejaguar.com/wp-content/uploads/2026/01/tour-historico-en-scooter-685x1024.webp',
      slug: 'scooter-tour'
    }
  ];

  return (
    <div id="experiences-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 bg-[#FFA42C]/10 text-[#122C9B] rounded-full text-xs font-bold font-mono tracking-wider uppercase">
          Línea Experiencias
        </span>
        <h1 className="font-display text-4xl font-extrabold text-[#122C9B] tracking-tight">
          Experiencias Dedicadas al Café
        </h1>
        <p className="text-[#122C9B]/60 font-light text-base leading-relaxed">
          Conecta con el origen, descubre el sabor, vive la tradición. Todas las experiencias incluyen certificado de participación y material de apoyo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <Link
            key={exp.id}
            to={`/experiencias/${exp.slug}`}
            className="group bg-white border border-[#122C9B]/10 hover:border-[#FFA42C]/30 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#122C9B]/5">
              <img
                src={exp.imagen_url}
                alt={exp.nombre}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-4 right-4 bg-[#122C9B]/90 text-white text-xs font-bold font-mono px-3 py-1.5 rounded-lg">
                ${exp.precio.toLocaleString('es-CO')} COP
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-display text-lg font-bold text-[#122C9B] group-hover:text-[#FFA42C] transition-colors line-clamp-2">
                  {exp.nombre}
                </h3>
                <p className="text-xs text-[#122C9B]/60 leading-relaxed font-light line-clamp-2">
                  {exp.descripcion}
                </p>
              </div>

              <div className="pt-3 border-t border-[#122C9B]/5 flex items-center justify-between text-xs text-[#122C9B]/60 font-mono">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#FFA42C]" />
                  <span>{exp.duracion_min >= 60 ? `${Math.round(exp.duracion_min / 60)}h` : `${exp.duracion_min} min`}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#FFA42C]" />
                  <span>Máx {exp.capacidad_max}</span>
                </div>
              </div>

              <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#122C9B]/5 hover:bg-[#122C9B] text-[#122C9B] hover:text-white rounded-xl text-sm font-semibold transition-all">
                <span>Ver Detalles</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-6 bg-[#122C9B]/5 border border-[#122C9B]/10 rounded-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <span className="p-3 bg-white text-[#122C9B] border border-[#122C9B]/10 rounded-xl inline-block shadow-sm">
          <Calendar className="w-6 h-6" />
        </span>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-[#122C9B]">Reservas a través de Booking.com</h4>
          <p className="text-xs text-[#122C9B]/60 leading-normal font-light">
            Al presionar reservar, se cargará el widget dinámico oficial de <strong>Booking.com Experiences</strong> para que elijas tu fecha preferida.
          </p>
        </div>
      </div>

    </div>
  );
}

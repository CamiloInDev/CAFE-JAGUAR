import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, ChevronRight, Award } from 'lucide-react';
import { Experience } from '../types';
import axios from 'axios';

export default function Experiencias() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/experiencias')
      .then(res => {
        setExperiences(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching experiences index', err);
        setLoading(false);
      });
  }, []);

  return (
    <div id="experiences-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold font-mono tracking-wider uppercase">
          Línea Experiencias
        </span>
        <h1 className="font-display text-4xl font-extrabold text-stone-900 tracking-tight">
          Talleres de Barismo, Cataciones & Inmersiones
        </h1>
        <p className="text-stone-500 font-light text-base leading-relaxed">
          Descubre de manera lúdica el fascinante mundo detrás de cada taza. Reserva tu cupo en línea de manera segura a través de nuestro integrador oficial aliado en Booking.com.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map(n => (
            <div key={n} className="bg-white border border-stone-200 rounded-3xl h-96 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group bg-white border border-stone-200 hover:border-amber-700/20 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Media banner */}
              <div className="relative aspect-video w-full overflow-hidden bg-stone-100 leading-none">
                <img
                  src={exp.imagen_url}
                  alt={exp.nombre}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute bottom-4 right-4 bg-stone-900/90 text-white text-xs font-bold font-mono px-3 py-1.5 rounded-lg">
                  ${exp.precio.toLocaleString('es-CO')} COP
                </span>
              </div>

              {/* Body particulars */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-display text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {exp.nombre}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-light line-clamp-3">
                    {exp.descripcion}
                  </p>
                </div>

                {/* Meta details (Duration, Capacity) */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-700" />
                    <span>{exp.duracion_min} mins</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber-700" />
                    <span>Máx {exp.capacidad_max} personas</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                    <Award className="w-4 h-4 text-amber-700" />
                    <span>Certificado</span>
                  </div>
                </div>

                {/* Redirection Link */}
                <div className="pt-2">
                  <Link
                    to={`/experiencias/${exp.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-stone-900 hover:bg-amber-900 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
                  >
                    <span>Ver Fechas & Reservar</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Assurance Panel */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <span className="p-3 bg-white text-slate-700 border border-slate-150 rounded-xl inline-block shadow-sm">
          <Calendar className="w-6 h-6" />
        </span>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900">Pasarela de Reservas Integrada</h4>
          <p className="text-xs text-slate-500 leading-normal font-light">
            Al presionar reservar, se cargará el widget dinámico oficial de **Booking.com** para que elijas tu fecha preferida de inmediato. Ningún dato sensible de reserva es captado localmente.
          </p>
        </div>
      </div>

    </div>
  );
}

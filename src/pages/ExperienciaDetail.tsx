import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Coffee, Tag, ShieldCheck } from 'lucide-react';
import { Experience } from '../types';
import axios from 'axios';

export default function ExperienciaDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    axios.get(`/api/experiencias/${slug}`)
      .then(res => {
        setExperience(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching detail of experience', err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-stone-500 text-sm">Cargando widget de Booking.com...</p>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold">Experiencia no encontrada</h2>
        <p className="text-sm text-stone-500">La experiencia seleccionada no existe o ha sido desprogramada.</p>
        <Link to="/experiencias" className="inline-block px-4 py-2 bg-stone-900 text-white rounded-lg text-sm">
          Atrás a Experiencias
        </Link>
      </div>
    );
  }

  return (
    <div id="experience-detail-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/experiencias')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-stone-800 transition-colors pointer cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Experiencias</span>
        </button>
      </div>

      {/* Main Experience Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Editorial descriptive column (8 Grid columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-amber-700 font-mono tracking-widest uppercase">
              RESERVA GARANTIZADA DE TALLER
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
              {experience.nombre}
            </h1>
            
            {/* Metadata badges container */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-stone-500 font-mono font-medium">
              <span className="flex items-center gap-1 bg-stone-100 px-2.5 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5 text-amber-800" />
                {experience.duracion_min} minutos de duración
              </span>
              <span className="flex items-center gap-1 bg-stone-100 px-2.5 py-1 rounded-md">
                <Users className="w-3.5 h-3.5 text-amber-800" />
                Hasta {experience.capacidad_max} cata-participantes
              </span>
            </div>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-stone-100 leading-none">
            <img
              src={experience.imagen_url}
              alt={experience.nombre}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-stone-900">Sobre la Actividad</h3>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              {experience.descripcion}
            </p>
          </div>

          {/* Guidelines info */}
          <div className="p-5 bg-[#FAF8F5] border border-stone-200 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-stone-800 uppercase font-mono tracking-wider">Anotaciones de Asistencia</h4>
            <ul className="text-xs text-stone-500 space-y-1.5 list-disc pl-4 font-light">
              <li>Llegar 10 minutos antes para el registro y desinfección preventiva.</li>
              <li>No requiere conocimientos previos, nuestros baristas le guiarán paso a paso.</li>
              <li>Recomendamos no usar fragancias densas o perfumes para apreciar la fragancia de los granos.</li>
            </ul>
          </div>
        </div>

        {/* Right Side: Embedded Booking.com Transactional Portal (5 Grid columns) */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-3xl p-6 shadow-md space-y-6 sticky top-24">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-stone-500">Precio de Venta</span>
            <span className="text-2xl font-black text-stone-950">
              ${experience.precio.toLocaleString('es-CO')} <span className="text-xs text-stone-500 font-normal font-mono">COP</span>
            </span>
          </div>

          <hr className="border-stone-100" />

          {/* Renders the embedded script or container HTML from Booking.com widget embed */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-wider text-stone-400 uppercase">
              Operador Aliado Integrado
            </h4>
            
            <div
              className="booking-widget-render-container"
              dangerouslySetInnerHTML={{ __html: experience.booking_widget }}
            />
          </div>

          <hr className="border-stone-100" />

          <div className="space-y-3">
            <div className="flex items-start gap-2 text-xs text-stone-500 leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <span>
                Garantía oficial Booking.com. Modificaciones gratuitas hasta con 24 horas de antelación llamando a la mesa de asistencia de Jaguar Coffee.
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

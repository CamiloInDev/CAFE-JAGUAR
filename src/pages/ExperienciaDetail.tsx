import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Award, ShieldCheck, CheckCircle2, Loader2, MapPin, Coffee, Flame, Bike, ChevronLeft, ChevronRight, MessageCircle, Instagram } from 'lucide-react';
import { Experience } from '../types';
import axios from 'axios';

export default function ExperienciaDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setCurrentImageIndex(0);
    axios.get(`/api/experiencias/${slug}`)
      .then(res => {
        setExperience(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching experience detail', err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <Loader2 className="w-10 h-10 border-4 border-[#FFA42C] border-t-transparent rounded-full animate-spin mx-auto text-[#122C9B]" />
        <p className="text-[#122C9B]/60 text-sm">Cargando experiencia...</p>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-[#122C9B]/10 rounded-full flex items-center justify-center mx-auto">
          <Coffee className="w-8 h-8 text-[#122C9B]/40" />
        </div>
        <h2 className="font-display text-2xl font-bold text-[#122C9B]">Experiencia no encontrada</h2>
        <p className="text-sm text-[#122C9B]/60">La experiencia seleccionada no existe o ha sido desprogramada.</p>
        <Link to="/experiencias" className="inline-block px-6 py-3 bg-[#122C9B] hover:bg-[#FFA42C] text-white rounded-xl font-semibold transition-all">
          Volver a Experiencias
        </Link>
      </div>
    );
  }

  const imagenes = experience.imagenes && experience.imagenes.length > 0 
    ? experience.imagenes 
    : [experience.imagen_url];

  const getExperienceIcon = () => {
    switch (experience.slug) {
      case 'catacion': return <Coffee className="w-6 h-6" />;
      case 'barismo': return <Award className="w-6 h-6" />;
      case 'tueste': return <Flame className="w-6 h-6" />;
      case 'coffee-tour': return <MapPin className="w-6 h-6" />;
      case 'glamping': return <MapPin className="w-6 h-6" />;
      case 'scooter-tour': return <Bike className="w-6 h-6" />;
      default: return <Coffee className="w-6 h-6" />;
    }
  };

  return (
    <div id="experience-detail-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div>
        <button
          onClick={() => navigate('/experiencias')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#122C9B]/60 hover:text-[#122C9B] hover:gap-3 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Experiencias</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#FFA42C]/10 rounded-xl text-[#FFA42C]">
                {getExperienceIcon()}
              </span>
              <span className="text-xs font-bold text-[#FFA42C] font-mono tracking-widest uppercase">
                Experiencia Premium
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#122C9B] leading-tight">
              {experience.nombre}
            </h1>
            
            <div className="flex flex-wrap gap-3 pt-2 text-xs text-[#122C9B]/70 font-mono font-medium">
              <span className="flex items-center gap-1.5 bg-[#122C9B]/5 px-3 py-1.5 rounded-lg">
                <Clock className="w-4 h-4 text-[#FFA42C]" />
                {experience.duracion_min >= 60 ? `${Math.round(experience.duracion_min / 60)} hora(s)` : `${experience.duracion_min} minutos`}
              </span>
              <span className="flex items-center gap-1.5 bg-[#122C9B]/5 px-3 py-1.5 rounded-lg">
                <Users className="w-4 h-4 text-[#FFA42C]" />
                Máx {experience.capacidad_max} personas
              </span>
            </div>
          </div>

          {imagenes.length > 1 && (
            <div className="space-y-3">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#122C9B]/5 shadow-lg leading-none group">
                <img
                  src={imagenes[currentImageIndex]}
                  alt={`${experience.nombre} - Imagen ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  referrerPolicy="no-referrer"
                />
                
                {imagenes.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5 text-[#122C9B]" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5 text-[#122C9B]" />
                    </button>
                    
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {imagenes.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                            idx === currentImageIndex ? 'bg-[#FFA42C] scale-125' : 'bg-white/70 hover:bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {imagenes.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      idx === currentImageIndex ? 'border-[#FFA42C]' : 'border-transparent hover:border-[#122C9B]/30'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {imagenes.length === 1 && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#122C9B]/5 shadow-lg leading-none">
              <img
                src={imagenes[0]}
                alt={experience.nombre}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-[#122C9B]">Sobre la Experiencia</h3>
            <p className="text-sm text-[#122C9B]/70 leading-relaxed font-light">
              {experience.descripcion}
            </p>
          </div>

          {slug === 'catacion' && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-[#122C9B] flex items-center gap-2">
                <Instagram className="w-5 h-5 text-[#FFA42C]" />
                <span>Así vivimos la cata</span>
              </h3>
              <div className="w-full max-w-[400px] aspect-[9/16] rounded-2xl overflow-hidden border border-[#122C9B]/10 shadow-md">
                <iframe
                  src="https://www.instagram.com/p/DZP3PQfRFnj/embed/"
                  className="w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                  title="Experiencia de Catación Jaguar Coffee"
                />
              </div>
              <p className="text-xs text-[#122C9B]/60 font-light">
                Mira un resumen de nuestra experiencia de catación guiada en Instagram.
              </p>
            </div>
          )}

          {experience.detalles_incluidos && experience.detalles_incluidos.length > 0 && (
            <div className="p-6 bg-white border border-[#122C9B]/10 rounded-2xl space-y-3">
              <h4 className="text-sm font-bold text-[#122C9B] uppercase font-mono tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFA42C]" />
                Qué está incluido
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {experience.detalles_incluidos.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-[#122C9B]/70">
                    <span className="w-1.5 h-1.5 bg-[#FFA42C] rounded-full flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-5 bg-[#FFA42C]/5 border border-[#FFA42C]/20 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-[#122C9B] uppercase font-mono tracking-wider">Recomendaciones</h4>
            <ul className="text-xs text-[#122C9B]/60 space-y-1.5 list-disc pl-4 font-light">
              {experience.recomendaciones && experience.recomendaciones.length > 0 ? (
                experience.recomendaciones.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))
              ) : (
                <>
                  <li>Llegar 10 minutos antes para el registro.</li>
                  <li>No requiere conocimientos previos, nuestros instructores le guiarán paso a paso.</li>
                  <li>Recomendamos no usar fragancias densas para apreciar los aromas del café.</li>
                  <li>Usar ropa cómoda y calzado apropiado para caminatas si aplica.</li>
                </>
              )}
            </ul>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#122C9B]/5 rounded-xl">
            <div className="p-2 bg-[#FFA42C]/10 rounded-lg">
              <Award className="w-5 h-5 text-[#FFA42C]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#122C9B]">Certificado de Participación</h4>
              <p className="text-[10px] text-[#122C9B]/60 font-light">Incluido con todas nuestras experiencias</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white border border-[#122C9B]/10 rounded-3xl p-6 shadow-lg space-y-6 sticky top-24">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#122C9B]/60">Precio por persona</span>
              <div className="text-right">
                <span className="text-3xl font-black text-[#122C9B]">
                  ${experience.precio.toLocaleString('es-CO')}
                </span>
                <span className="text-xs text-[#122C9B]/50 font-mono ml-1">COP</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#122C9B]/5 rounded-xl">
              <Clock className="w-5 h-5 text-[#FFA42C]" />
              <div>
                <p className="text-xs font-bold text-[#122C9B]">Duración</p>
                <p className="text-[10px] text-[#122C9B]/60">{experience.duracion_min >= 60 ? `${Math.round(experience.duracion_min / 60)} hora(s)` : `${experience.duracion_min} minutos`}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#122C9B]/5 rounded-xl">
              <Users className="w-5 h-5 text-[#FFA42C]" />
              <div>
                <p className="text-xs font-bold text-[#122C9B]">Capacidad</p>
                <p className="text-[10px] text-[#122C9B]/60">Máximo {experience.capacidad_max} participantes</p>
              </div>
            </div>

            <hr className="border-[#122C9B]/10" />

            <div className="space-y-4">
              <h4 className="text-xs font-bold font-mono tracking-wider text-[#122C9B]/60 uppercase text-center">
                Reservar por WhatsApp
              </h4>

              <a
                href={`https://wa.me/573157307016?text=${encodeURIComponent(`Hola Jaguar Coffee, quiero reservar la experiencia: ${experience.nombre}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl text-sm font-bold transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Reservar ahora</span>
              </a>
            </div>

            <hr className="border-[#122C9B]/10" />

            <div className="flex items-start gap-3 text-xs text-[#122C9B]/60 leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-[#FFA42C] flex-shrink-0 mt-0.5" />
              <span>
                Un asesor de Jaguar Coffee te confirmará disponibilidad, te ayudará a separar tu fecha y resolverá cualquier duda antes de tu experiencia.
              </span>
            </div>

            <Link
              to="/contacto"
              className="block w-full text-center py-3 bg-[#122C9B]/10 hover:bg-[#122C9B] text-[#122C9B] hover:text-white rounded-xl text-sm font-semibold transition-all"
            >
              ¿Preguntas? Contáctanos
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

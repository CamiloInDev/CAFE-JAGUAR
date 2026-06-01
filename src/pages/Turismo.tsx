import React, { useState, useEffect } from 'react';
import { MapPin, ExternalLink, Calendar, Compass, Shield } from 'lucide-react';
import { Hacienda } from '../types';
import axios from 'axios';

export default function Turismo() {
  const [haciendas, setHaciendas] = useState<Hacienda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/haciendas')
      .then(res => {
        setHaciendas(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching haciendas', err);
        setLoading(false);
      });
  }, []);

  return (
    <div id="turismo-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Editorial Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="px-3 py-1 bg-[#FFA42C]/10 text-[#122C9B] rounded-full text-xs font-bold font-mono tracking-wider uppercase">
          Línea Turismo
        </span>
        <h1 className="font-display text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Hospédate en las Estadías Cafeteras Históricas
        </h1>
        <p className="text-stone-500 font-light text-base leading-relaxed">
          Vive la magia de despertar flotando sobre las montañas de Antioquia y el Caldas colonial. Te abrimos las puertas de nuestras fincas tradicionales con reservas 100% garantizadas a través de Airbnb.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-12">
          {[1, 2].map(n => (
            <div key={n} className="bg-white border border-stone-200 rounded-3xl h-80 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-16">
          {haciendas.map((hac) => (
            <div
              key={hac.id}
              className="bg-white border border-stone-200 rounded-3xl overflow-hidden hover:shadow-md transition-all flex flex-col lg:flex-row gap-8 p-6 lg:p-8"
            >
              {/* Image banner (takes 5 cols in large) */}
              <div className="lg:w-[45%] aspect-video lg:aspect-auto h-auto rounded-2xl overflow-hidden bg-stone-100 leading-none flex-shrink-0">
                <img
                  src={hac.imagen_url}
                  alt={hac.nombre}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Informational Column (takes 55% space) */}
              <div className="flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#122C9B] font-bold font-mono">
                    <MapPin className="w-4 h-4 text-[#FFA42C]" />
                    <span>{hac.ubicacion}</span>
                  </div>
                  
                  <h3 className="font-display text-2xl font-black text-stone-950 leading-tight">
                    {hac.nombre}
                  </h3>
                  
                  <p className="text-sm text-stone-500 font-light leading-relaxed">
                    {hac.descripcion}
                  </p>
                </div>

                {/* Local highlight banners */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2 text-xs font-mono text-stone-500">
                  <span className="flex items-center gap-1.5 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <Compass className="w-3.5 h-3.5 text-[#FFA42C]" />
                    Senderos ecológicos
                  </span>
                  <span className="flex items-center gap-1.5 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    ☕ Cosecha manual
                  </span>
                  <span className="flex items-center gap-1.5 bg-stone-50 p-2.5 rounded-lg border border-stone-100 col-span-2 md:col-span-1">
                    🌳 Sombra nativa
                  </span>
                </div>

                {/* CTA Action Bar containing direct external links opened in new tabs */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-4 items-center">
                  <a
                    href={hac.airbnb_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF5A5F] hover:bg-[#E04B50] text-[#FAF8F5] text-sm font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <span>Ver disponibilidad en Airbnb</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  
                  <a
                    href={hac.booking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-sm font-semibold rounded-xl transition-all"
                  >
                    <span>Ver en Booking.com</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Redirection Notice */}
      <div className="p-5 bg-amber-50/50 border border-amber-200/50 rounded-2xl max-w-4xl mx-auto flex items-start gap-4">
        <Shield className="w-5 h-5 text-[#FFA42C] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider font-mono">Nota sobre las reservaciones de estadías</h4>
          <p className="text-xs text-amber-800 leading-relaxed font-light">
            Las Estadías son operadas directamente bajo el sello oficial Jaguar Coffee. Al hacer clic, se abre una ventana segura de Airbnb o Booking.com para confirmar las noches preferidas.
          </p>
        </div>
      </div>

    </div>
  );
}

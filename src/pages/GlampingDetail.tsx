import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, Calendar, ArrowLeft, Coffee, TreePine, Sunrise, Moon } from 'lucide-react';

const images = [
  '/images/TURISMO/GLAMP1.webp',
  '/images/TURISMO/GLAMP2.webp',
  '/images/TURISMO/GLAMP3.webp',
  '/images/TURISMO/GLAMP4.webp',
  '/images/TURISMO/GLAMP5.webp',
];

export default function GlampingDetail() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div id="glamping-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Back Button */}
      <Link to="/turismo" className="inline-flex items-center gap-2 text-[#122C9B]/60 hover:text-[#FFA42C] text-sm font-bold transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Volver a Estadías
      </Link>

      {/* Header */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFA42C]/10 text-[#FFA42C] border border-[#FFA42C]/20 rounded-full text-xs font-mono font-black tracking-widest uppercase">
          <Coffee className="w-4 h-4" />
          Estadías ECO Hotel Glamping
        </span>
        <h1 className="font-sans text-4xl md:text-5xl font-extrabold text-[#122C9B] tracking-tighter uppercase leading-[0.9]">
          Glamping Familiar
        </h1>
        <p className="text-[#122C9B]/70 text-sm max-w-2xl mx-auto">
          Un refugio natural en el corazón de las montañas de Silvania. Descubre el encanto rústico sin perder el confort.
        </p>
      </div>

      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-[16/9] bg-[#122C9B]/5 rounded-2xl overflow-hidden group">
          <img
            src={images[currentImage]}
            alt={`Glamping ${currentImage + 1}`}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-[#122C9B] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-[#122C9B] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImage === idx ? 'bg-[#FFA42C] w-6' : 'bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                currentImage === idx ? 'border-[#FFA42C]' : 'border-transparent hover:border-[#122C9B]/20'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Info + Booking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-8 space-y-4 shadow-sm">
            <h2 className="font-sans text-2xl font-bold text-[#122C9B]">Sobre esta experiencia</h2>
            <p className="text-[#122C9B]/70 text-sm leading-relaxed">
              Despierta con el canto de las aves, recorre nuestros cultivos de café y conoce de cerca el proceso artesanal, desde la semilla hasta la taza. Nuestras unidades de glamping están diseñadas para brindarte confort sin perder el encanto rústico del entorno.
            </p>
            <p className="text-[#122C9B]/70 text-sm leading-relaxed">
              Ya sea para una escapada romántica, un descanso en familia o una experiencia de conexión interior, nuestro glamping es el destino perfecto para desconectarte de la rutina y reconectarte con lo esencial.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <Sunrise className="w-6 h-6 text-[#FFA42C] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">Amaneceres dorados</p>
            </div>
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <Moon className="w-6 h-6 text-[#FFA42C] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">Noches estrelladas</p>
            </div>
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <Coffee className="w-6 h-6 text-[#FFA42C] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">Cultura cafetera</p>
            </div>
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <TreePine className="w-6 h-6 text-[#FFA42C] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">Entorno natural</p>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="space-y-4">
          <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 space-y-6 shadow-sm sticky top-24">
            <div className="space-y-2 text-center">
              <p className="text-xs text-[#122C9B]/50 font-mono uppercase tracking-wider">Precio por noche</p>
              <p className="text-4xl font-extrabold text-[#122C9B]">$350.000</p>
              <p className="text-xs text-[#122C9B]/50 font-mono">COP</p>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-[#122C9B]/60 font-mono">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#FFA42C]" />
                Máx 8 personas
              </span>
            </div>

            <button className="w-full py-4 bg-[#122C9B] hover:bg-[#FFA42C] text-white text-sm font-bold rounded-xl uppercase tracking-wider transition-all shadow-lg">
              Reservar ahora
            </button>

            <div className="text-center text-xs text-[#122C9B]/50">
              Ubicación: Silvania, Cundinamarca
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
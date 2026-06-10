import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, ChevronLeft, ChevronRight, Coffee } from 'lucide-react';

export default function CasaJaguar() {
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    '/images/CASA-JAGUAR/casajaguar1.webp',
    '/images/CASA-JAGUAR/casajaguar2.webp',
    '/images/CASA-JAGUAR/casajaguar3.webp',
  ];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div id="casa-jaguar-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFA42C]/10 text-[#FFA42C] border border-[#FFA42C]/20 rounded-full text-xs font-mono font-black tracking-widest uppercase">
          <Coffee className="w-4 h-4" />
          Casa Jaguar
        </span>
        <h1 className="font-sans text-4xl md:text-5xl font-extrabold text-[#122C9B] tracking-tighter uppercase leading-[0.9]">
          Visítanos en<br />La Candelaria
        </h1>
        <p className="text-[#122C9B]/70 text-sm max-w-2xl mx-auto">
          Una experiencia inmersiva de café de especialidad en el corazón histórico de Bogotá. Descubre nuestros espacios, disfruta una taza preparada por baristas certificados y lleva la esencia de Jaguar Coffee a casa.
        </p>
      </div>

      {/* Image Gallery + Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] bg-[#122C9B]/5 rounded-2xl overflow-hidden group">
            <img
              src={images[currentImage]}
              alt={`Casa Jaguar ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />
            {images.every(img => !img.includes('placeholder')) && (
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
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  currentImage === idx ? 'border-[#FFA42C]' : 'border-transparent hover:border-[#122C9B]/20'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          
          {/* Location Card */}
          <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-sans text-xl font-bold text-[#122C9B] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FFA42C]" />
              Ubicación
            </h3>
            <div className="space-y-2">
              <p className="text-[#122C9B]/80 text-sm">Cra 4 # 12 – 78, La Candelaria</p>
              <p className="text-[#122C9B]/60 text-xs">Bogotá, Colombia</p>
            </div>
            <a
              href="https://www.google.com/maps/place/Jaguar+Coffee+Bogota:+Productores+y+Tostadores+de+café+exótico/@4.5974649,-74.0705758,17z/data=!3m1!4b1!4m6!3m5!1s0x8e3f99664d003de3:0x7aa83e1159297c8e!8m2!3d4.5974649!4d-74.0705758!16s%2Fg%2F11fqxyg8sx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#122C9B] hover:bg-[#FFA42C] text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all"
            >
              <Navigation className="w-4 h-4" />
              Abrir en Google Maps
            </a>
          </div>

          {/* Hours Card */}
          <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-sans text-xl font-bold text-[#122C9B] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FFA42C]" />
              Horarios
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#122C9B]/70">Lunes — Viernes</span>
                <span className="text-[#122C9B] font-semibold">8:00 AM — 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#122C9B]/70">Sábados</span>
                <span className="text-[#122C9B] font-semibold">9:00 AM — 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#122C9B]/70">Domingos</span>
                <span className="text-[#122C9B] font-semibold">10:00 AM — 3:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-sans text-xl font-bold text-[#122C9B] flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#FFA42C]" />
              Contacto
            </h3>
            <div className="space-y-2 text-sm">
              <a href="tel:+573157307016" className="flex items-center gap-2 text-[#122C9B]/80 hover:text-[#FFA42C] transition-colors">
                <Phone className="w-4 h-4" />
                (+57) 315 7307016
              </a>
              <a href="mailto:cafejaguarcolombia@gmail.com" className="flex items-center gap-2 text-[#122C9B]/80 hover:text-[#FFA42C] transition-colors">
                cafejaguarcolombia@gmail.com
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="space-y-4">
        <h2 className="font-sans text-2xl font-bold text-[#122C9B] tracking-tight">Cómo Llegar</h2>
        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-[#122C9B]/10 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6!2d-74.068!3d4.5981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99664d003de3%3A0x7aa83e1159297c8e!2sJaguar+Coffee+Bogota!5e0!3m2!1ses!2sco!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Casa Jaguar"
          />
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 text-center space-y-3 shadow-sm">
          <span className="p-4 bg-[#FFA42C]/10 rounded-full inline-block text-[#FFA42C]">
            <Coffee className="w-8 h-8" />
          </span>
          <h3 className="font-sans text-lg font-bold text-[#122C9B]">Barismo Profesional</h3>
          <p className="text-xs text-[#122C9B]/60">Cafés preparados por baristas SCA Certified</p>
        </div>
        <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 text-center space-y-3 shadow-sm">
          <span className="p-4 bg-[#FFA42C]/10 rounded-full inline-block text-[#FFA42C]">
            <MapPin className="w-8 h-8" />
          </span>
          <h3 className="font-sans text-lg font-bold text-[#122C9B]">Cata de Origen</h3>
          <p className="text-xs text-[#122C9B]/60">Sesiones de catación todos los viernes</p>
        </div>
        <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 text-center space-y-3 shadow-sm">
          <span className="p-4 bg-[#FFA42C]/10 rounded-full inline-block text-[#FFA42C]">
            <Navigation className="w-8 h-8" />
          </span>
          <h3 className="font-sans text-lg font-bold text-[#122C9B]">Accesible</h3>
          <p className="text-xs text-[#122C9B]/60">Ubicación céntrica con transporte público</p>
        </div>
      </div>

    </div>
  );
}
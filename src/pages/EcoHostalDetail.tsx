import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, Calendar, ArrowLeft, Coffee, TreePine, Sunrise, Moon, MapPin, Wifi, PawPrint } from 'lucide-react';
import BookingCalendar from '../components/BookingCalendar';

const images = [
  '/images/TURISMO/HOSTAL1.webp',
  '/images/TURISMO/HOSTAL2.webp',
  '/images/TURISMO/HOSTAL3.webp',
  '/images/TURISMO/HOSTAL4.webp',
];

const AIRBNB_URL = 'https://www.airbnb.es/h/jaguarhostal';
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/ekvGgp5soN9PfTr86?g_st=aw';

export default function EcoHostalDetail() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div id="eco-hostal-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Back Button */}
      <Link to="/turismo" className="inline-flex items-center gap-2 text-[#122C9B]/60 hover:text-[#FFA42C] text-sm font-bold transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Volver a Estadías
      </Link>

      {/* Header */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#122C9B]/10 text-[#122C9B] border border-[#122C9B]/20 rounded-full text-xs font-mono font-black tracking-widest uppercase">
          <TreePine className="w-4 h-4" />
          Estadías ECO Hotel Glamping
        </span>
        <h1 className="font-sans text-4xl md:text-5xl font-extrabold text-[#122C9B] tracking-tighter uppercase leading-[0.9]">
          ECO Hostal
        </h1>
        <p className="text-[#122C9B]/70 text-sm max-w-2xl mx-auto">
          Alojamiento eco-amigable en Finca la Esperanza, Silvania. Confort y sostenibilidad en perfecta armonía con la naturaleza.
        </p>
      </div>

      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-[16/9] bg-[#122C9B]/5 rounded-2xl overflow-hidden group">
          <img
            src={images[currentImage]}
            alt={`ECO Hostal ${currentImage + 1}`}
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
              Un espacio diseñado para quienes buscan reconectarse con la naturaleza sin sacrificar comodidad. Nuestro ECO Hostal ofrece una experiencia de alojamiento sostenible en Finca la Esperanza, en medio de los cultivos de café de Silvania.
            </p>
            <p className="text-[#122C9B]/70 text-sm leading-relaxed">
              Perfecto para grupos, familias o viajeros que buscan una experiencia auténtica y eco-friendly. Disfruta de espacios comunes, zonas verdes, WiFi gratuito y la calidez de la cultura cafetera colombiana. A solo 42 km de Bogotá.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <TreePine className="w-6 h-6 text-[#122C9B] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">Eco-sostenible</p>
            </div>
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <Users className="w-6 h-6 text-[#122C9B] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">Hasta 8 personas</p>
            </div>
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <Wifi className="w-6 h-6 text-[#122C9B] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">WiFi gratuito</p>
            </div>
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <Moon className="w-6 h-6 text-[#122C9B] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">Noches tranquilas</p>
            </div>
          </div>
        </div>

        {/* Booking + Airbnb */}
        <div className="space-y-4">
          <BookingCalendar
            tipo="estadia"
            itemId="eco-hostal"
            itemNombre="ECO Hostal"
            itemSlug="eco-hostal"
            maxPeople={8}
          />

          <div className="bg-[#122C9B] border border-[#122C9B]/20 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="space-y-2 text-center">
              <p className="text-xs text-white/50 font-mono uppercase tracking-wider">Precio por noche</p>
              <p className="text-3xl font-extrabold text-white">$350.000</p>
              <p className="text-xs text-white/50 font-mono">COP</p>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-white/60 font-mono">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#FFA42C]" />
                Máx 8 personas
              </span>
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs text-white/50 hover:text-[#FFA42C] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              Silvania, Cundinamarca
            </a>
          </div>

          {/* Airbnb CTA */}
          <a
            href={AIRBNB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3.5 bg-[#FFA42C] hover:bg-[#122C9B] text-white text-sm font-bold rounded-xl transition-colors text-center"
          >
            Reservar en Airbnb
          </a>
        </div>
      </div>

    </div>
  );
}

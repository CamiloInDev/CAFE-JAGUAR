import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, Calendar, ArrowLeft, Coffee, TreePine, Sunrise, Moon, MapPin, Car, Wifi, PawPrint, ExternalLink } from 'lucide-react';
import BookingCalendar from '../components/BookingCalendar';

const images = [
  '/images/TURISMO/GLAMP1.webp',
  '/images/TURISMO/GLAMP2.webp',
  '/images/TURISMO/GLAMP3.webp',
  '/images/TURISMO/GLAMP4.webp',
  '/images/TURISMO/GLAMP5.webp',
];

const AIRBNB_URL = 'https://www.airbnb.es/h/jaguarglampibg';
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/ekvGgp5soN9PfTr86?g_st=aw';

export default function GlampingDetail() {
  const [currentImage, setCurrentImage] = useState(0);
  const [bookingMode, setBookingMode] = useState<'directo' | 'airbnb'>('directo');

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
        <div className="flex items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFA42C]/10 text-[#FFA42C] border border-[#FFA42C]/20 rounded-full text-xs font-mono font-black tracking-widest uppercase">
            <Coffee className="w-4 h-4" />
            Estadías ECO Hotel Glamping
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-mono font-black tracking-widest uppercase">
            <PawPrint className="w-3.5 h-3.5" />
            Pet Friendly
          </span>
        </div>
        <h1 className="font-sans text-4xl md:text-5xl font-extrabold text-[#122C9B] tracking-tighter uppercase leading-[0.9]">
          Glamping Finca Cafetera
        </h1>
        <p className="text-[#122C9B]/70 text-sm max-w-2xl mx-auto">
          Finca la Esperanza — Silvania, Cundinamarca. Una experiencia ecológica de tranquilidad y agro turismo en medio de la naturaleza.
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
              Brindamos una experiencia ecológica de tranquilidad y agro turismo en medio de la naturaleza; se podrá hacer caminatas ecológicas al aire libre, disfrutar de un bello atardecer y compartir de una calurosa fogata mientras se contempla la grandeza de nuestras montañas cafeteras.
            </p>
            <p className="text-[#122C9B]/70 text-sm leading-relaxed">
              El Glamping, Finca Cafetera Jaguar se encuentra en Silvania y ofrece parqueadero, jardín, WiFi gratuito y vistas a las montañas cafeteras. El alojamiento está a 42 km de Bogotá. Somos pet friendly!
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <Sunrise className="w-6 h-6 text-[#FFA42C] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">Atardeceres y fogata</p>
            </div>
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <TreePine className="w-6 h-6 text-[#FFA42C] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">Caminatas ecológicas</p>
            </div>
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <Coffee className="w-6 h-6 text-[#FFA42C] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">Cultura cafetera</p>
            </div>
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <Car className="w-6 h-6 text-[#FFA42C] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">Parqueadero</p>
            </div>
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <Wifi className="w-6 h-6 text-[#FFA42C] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">WiFi gratuito</p>
            </div>
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-4 text-center space-y-2 shadow-sm">
              <PawPrint className="w-6 h-6 text-[#FFA42C] mx-auto" />
              <p className="text-xs text-[#122C9B]/70">Pet friendly</p>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="space-y-4">
          {/* Price Card */}
          <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="space-y-2 text-center">
              <p className="text-xs text-[#122C9B]/50 font-mono uppercase tracking-wider">Precio por noche</p>
              <p className="text-3xl font-extrabold text-[#122C9B]">$350.000</p>
              <p className="text-xs text-[#122C9B]/50 font-mono">COP</p>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-[#122C9B]/60 font-mono">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#FFA42C]" />
                Máx 8 personas
              </span>
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs text-[#122C9B]/50 hover:text-[#FFA42C] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              Silvania, Cundinamarca — 42 km de Bogotá
            </a>
          </div>

          {/* Booking Method Tabs */}
          <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-1.5 shadow-sm">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setBookingMode('directo')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  bookingMode === 'directo'
                    ? 'bg-[#122C9B] text-white shadow-md'
                    : 'text-[#122C9B]/60 hover:text-[#122C9B] hover:bg-[#122C9B]/5'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Reserva directa
              </button>
              <button
                onClick={() => setBookingMode('airbnb')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  bookingMode === 'airbnb'
                    ? 'bg-[#FFA42C] text-white shadow-md'
                    : 'text-[#122C9B]/60 hover:text-[#122C9B] hover:bg-[#122C9B]/5'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                Airbnb
              </button>
            </div>
          </div>

          {/* Booking Content */}
          {bookingMode === 'directo' ? (
            <BookingCalendar
              tipo="estadia"
              itemId="glamping-familiar"
              itemNombre="Glamping Finca Cafetera"
              itemSlug="glamping-familiar"
              maxPeople={8}
            />
          ) : (
            <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 space-y-4 shadow-sm text-center">
              <div className="w-14 h-14 bg-[#FFA42C]/10 rounded-full flex items-center justify-center mx-auto">
                <ExternalLink className="w-7 h-7 text-[#FFA42C]" />
              </div>
              <h3 className="font-sans text-lg font-bold text-[#122C9B]">Reserva en Airbnb</h3>
              <p className="text-xs text-[#122C9B]/60 leading-relaxed">
                Reserva al instante con pago seguro a través de Airbnb. Sin esperas ni formularios.
              </p>
              <a
                href={AIRBNB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3.5 bg-[#FFA42C] hover:bg-[#122C9B] text-white text-sm font-bold rounded-xl transition-colors"
              >
                Ir a Airbnb
              </a>
              <p className="text-[10px] text-[#122C9B]/40">
                Serás redirigido a airbnb.es para completar tu reserva
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store';
import { Coffee, Award, Calendar, Home as HomeIcon, GraduationCap, ChevronRight, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { Product } from '../types';
import axios from 'axios';

export default function Home() {
  const { addToCart } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Cafés de Especialidad de la Selva Jaguar",
      subtitle: "Un tributo floral y exótico cosechado en el Huila a más de 1,900 metros.",
      buttonText: "Explorar Cosechas",
      link: "/tienda",
      bgImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=85&w=1200"
    },
    {
      title: "Talleres y Catas Sensoriales Exclusivas",
      subtitle: "Aprende el arte de barismo y la catación con campeones nacionales en Colombia.",
      buttonText: "Reservar Experiencia",
      link: "/experiencias",
      bgImage: "https://images.unsplash.com/photo-1541170155377-5091f3b2b044?auto=format&fit=crop&q=85&w=1200"
    },
    {
      title: "Hospedaje de Ensueño en Haciendas",
      subtitle: "Despierta entre cafetales coloniales en Venecia y Jericó a través de Airbnb.",
      buttonText: "Ver Haciendas",
      link: "/turismo",
      bgImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1200"
    }
  ];

  useEffect(() => {
    axios.get('/api/productos')
      .then(res => {
        setProducts(res.data.slice(0, 3)); // show top 3 featured
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching featured products', err);
        setLoading(false);
      });
  }, []);

  // Soft slow auto play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div id="home-view" className="space-y-16 pb-20">
      
      {/* 1. HERO CAROUSEL PORTAL */}
      <div id="hero-carousel" className="relative h-[560px] md:h-[620px] bg-[#2A1A12] overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Graphic */}
            <div
              className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-50 transform scale-105 transition-transform duration-[6000ms]"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            />
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A12] via-[#2A1A12]/40 to-transparent" />
 
            {/* Carousel Content */}
            <div className="absolute inset-0 flex items-center justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
              <div className="max-w-2xl space-y-6 text-[#FDFBF7]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F27D26]/20 text-[#F27D26] rounded-full text-xs font-black font-mono tracking-widest uppercase">
                  ⭐ Cosecha Seleccionada 2026
                </span>
                <h1 className="font-sans text-4xl sm:text-6xl font-extrabold tracking-tighter leading-[0.9]">
                  {slide.title.toUpperCase()}
                </h1>
                <p className="text-sm sm:text-base text-[#FDFBF7]/80 font-light leading-relaxed max-w-lg">
                  {slide.subtitle}
                </p>
                <div className="pt-4 flex items-center gap-4">
                  <Link
                    to={slide.link}
                    className="px-8 py-3 bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-bold rounded-full text-xs uppercase tracking-widest shadow-lg shadow-[#F27D26]/30 transition-all cursor-pointer"
                  >
                    {slide.buttonText}
                  </Link>
                  <Link
                    to="/contacto"
                    className="px-8 py-3 border border-[#FDFBF7]/40 hover:border-white text-white font-bold rounded-full text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Ver Reservas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
 
        {/* Carousel Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'bg-[#F27D26] w-8' : 'bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. VALUE PROPOSITIONS BENTO GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="brand-values" className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white border border-[#2A1A12]/10 shadow-sm rounded-3xl p-8 -mt-24 relative z-30">
          <div className="flex items-start gap-4 p-4">
            <span className="p-3 bg-[#F27D26]/10 rounded-full text-[#F27D26]">
              <Coffee className="w-6 h-6" />
            </span>
            <div className="space-y-1">
              <h3 className="font-sans text-lg font-bold text-[#2A1A12]">Tueste sobre pedido</h3>
              <p className="text-xs text-[#2A1A12]/70 font-light leading-relaxed">
                Tostamos lotes micro-controlados semanalmente para asegurar una taza fresca con notas vivas e intactas.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 border-t md:border-t-0 md:border-x border-[#2A1A12]/10">
            <span className="p-3 bg-[#F27D26]/10 rounded-full text-[#F27D26]">
              <Award className="w-6 h-6" />
            </span>
            <div className="space-y-1">
              <h3 className="font-sans text-lg font-bold text-[#2A1A12]">Trazabilidad 100%</h3>
              <p className="text-xs text-[#2A1A12]/70 font-light leading-relaxed">
                Conectamos directamente con fincas cafeteras lideradas por familias con más de 4 generaciones de tradición.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 border-t md:border-t-0 border-[#2A1A12]/10">
            <span className="p-3 bg-[#F27D26]/10 rounded-full text-[#F27D26]">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div className="space-y-1">
              <h3 className="font-sans text-lg font-bold text-[#2A1A12]">Transacción Segura</h3>
              <p className="text-xs text-[#2A1A12]/70 font-light leading-relaxed">
                Tus compras de especialidad son procesadas directamente vía WooMPI, la pasarela de pagos líder en Colombia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FEATURED PRODUCTS PREVIEW (Tienda Line) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#2A1A12]/10 pb-5">
          <div className="space-y-2">
            <h2 className="font-sans text-3xl font-extrabold text-[#2A1A12] tracking-tighter uppercase">Cosechas más vendidas</h2>
            <p className="text-xs text-[#2A1A12]/60 uppercase tracking-widest font-mono">Nuestro e-commerce de café especial, tostado en origen listo para moler e infusionar.</p>
          </div>
          <Link
            to="/tienda"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F27D26] hover:text-[#2A1A12] uppercase tracking-wider group"
          >
            <span>Ver todo el catálogo</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-white border border-[#2A1A12]/10 rounded-3xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white border border-[#2A1A12]/10 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-[#2A1A12]/5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Media */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#2A1A12]/5">
                  <img
                    src={prod.imagen_url}
                    alt={prod.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {prod.precio_antes && (
                    <span className="absolute top-4 left-4 bg-[#F27D26] text-white text-[9px] font-mono font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                      Oferta especial
                    </span>
                  )}
                </div>

                {/* Info and Purchase */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-[#2A1A12]/60 font-mono uppercase tracking-wider">
                      <span>{prod.origen}</span>
                      <span>Tueste: {prod.tueste}</span>
                    </div>
                    <Link to={`/tienda/${prod.slug}`} className="block">
                      <h3 className="font-sans text-lg font-bold text-[#2A1A12] group-hover:text-[#F27D26] transition-colors leading-tight">
                        {prod.nombre}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#2A1A12]/70 font-light line-clamp-2 leading-relaxed">
                      {prod.descripcion}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#2A1A12]/5">
                    <div>
                      {prod.precio_antes && (
                        <span className="block text-[10px] text-[#2A1A12]/45 line-through">
                          ${prod.precio_antes.toLocaleString('es-CO')} COP
                        </span>
                      )}
                      <span className="text-sm font-extrabold text-[#2A1A12]">
                        ${prod.precio.toLocaleString('es-CO')} COP
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(prod, 1);
                        alert(`¡"${prod.nombre}" agregado con éxito al carrito!`);
                      }}
                      className="px-4 py-2 bg-[#2A1A12] hover:bg-[#F27D26] text-white text-[10px] font-bold rounded-full uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. EXPERIENCES PREVIEW (Catas Line) */}
      <div className="bg-[#2A1A12] text-stone-200 py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20 rounded-full text-[10px] font-mono font-black tracking-widest uppercase">
              Actividades y Cataciones
            </span>
            <h2 className="font-sans text-4xl font-extrabold text-[#FDFBF7] tracking-tighter uppercase leading-[0.9]">
              Aprende de primera mano con Catas en Booking.com
            </h2>
            <p className="text-[#FDFBF7]/70 font-light text-sm leading-relaxed">
              Organizamos sesiones exclusivas de degustación física y entrenamiento barista. Toda la reserva de cupos e inventarios se encuentra administrada directamente a través de nuestro canal premium oficial de <strong>Booking.com Experiences</strong> para su máxima conveniencia y seguridad.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pb-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="block font-sans text-lg font-bold text-white mb-1">120 mins</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Duración promedio</span>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="block font-sans text-lg font-bold text-white mb-1">Máx 10 pax</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Cupos por sesión</span>
              </div>
            </div>

            <Link
              to="/experiencias"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#F27D26] hover:bg-[#F27D26]/90 text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg shadow-[#F27D26]/30 transition-colors"
            >
              <span>Ver Catas Disponibles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden bg-white/5 leading-none shadow-2xl border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600"
              alt="Cata Sensorial"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            {/* Ambient gold glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F27D26]/10 to-transparent" />
          </div>
        </div>
      </div>

      {/* 5. TURISMO / HACIENDAS + ACADEMIA DOUBLE PROMOS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Turismo Card */}
        <div className="bg-white border border-[#2A1A12]/10 rounded-3xl p-8 flex flex-col justify-between space-y-6 md:p-10 shadow-sm hover:shadow-md transition-all">
          <div className="space-y-4">
            <span className="p-3 bg-[#F27D26]/10 border border-[#F27D26]/25 text-[#F27D26] rounded-full inline-block shadow-sm">
              <HomeIcon className="w-5 h-5" />
            </span>
            <h3 className="font-sans text-2xl font-bold text-[#2A1A12] leading-tight">Turismo y Estadías de Ensueño</h3>
            <p className="text-xs text-[#2A1A12]/70 leading-relaxed font-light">
              Desconéctate y hospédate en nuestras haciendas cafeteras tradicionales del departamento de Antioquia y Caldas. Todas las reservas redirigen a anuncios verificados de <strong>Airbnb</strong> de alta reputación.
            </p>
          </div>
          <Link
            to="/turismo"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#F27D26] hover:text-[#2A1A12] uppercase tracking-wider group"
          >
            <span>Explorar alojamiento colonial</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Academia Card */}
        <div className="bg-white border border-[#2A1A12]/10 rounded-3xl p-8 flex flex-col justify-between space-y-6 md:p-10 shadow-sm hover:shadow-md transition-all">
          <div className="space-y-4">
            <span className="p-3 bg-[#F27D26]/10 border border-[#F27D26]/25 text-[#F27D26] rounded-full inline-block shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h3 className="font-sans text-2xl font-bold text-[#2A1A12] leading-tight">Academia de Barismo Digital</h3>
            <p className="text-xs text-[#2A1A12]/70 leading-relaxed font-light">
              Capacítate en barismo profesional, molienda, tostado e introducción a la economía del café. Accede a nuestros certificados curriculares vinculados a <strong>LinkedIn Learning</strong>.
            </p>
          </div>
          <Link
            to="/academia"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#F27D26] hover:text-[#2A1A12] uppercase tracking-wider group"
          >
            <span>Ver sílabo del curso</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
}

import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Beaker,
  Award,
  Coffee,
  GraduationCap,
  ShieldCheck,
  Star,
  MapPin,
  MessageCircle,
  ArrowRight,
  Flame,
  Thermometer,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Leaf,
  Truck,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=85&w=1600',
    alt: 'Tostadora de café de especialidad',
  },
  {
    src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=85&w=1600',
    alt: 'Granos de café tostándose',
  },
  {
    src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=85&w=1600',
    alt: 'Preparación de café de especialidad',
  },
  {
    src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=85&w=1600',
    alt: 'Catación de café en laboratorio',
  },
];

const SERVICES = [
  {
    icon: <Beaker className="w-6 h-6" />,
    title: 'Tueste personalizado',
    desc: 'Perfiles de tueste adaptados a tu marca, método de extracción y preferencias de sabor.',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Desarrollo de perfiles',
    desc: 'Diseñamos curvas de tueste que resaltan las notas más características de cada origen.',
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    title: 'Consultoría para cafeterías',
    desc: 'Acompañamiento en selección de café, ajuste de extracción y experiencia en taza.',
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: 'Capacitación técnica',
    desc: 'Formación en tueste, catación, control de calidad y operación de planta.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Control de calidad',
    desc: 'Evaluación sensorial, análisis de defectos y trazabilidad en cada lote tostado.',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Empaque y distribución',
    desc: 'Empaque al vacío, etiquetado personalizado y logística para puntos de venta.',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Recepción',
    desc: 'Verificación de humedad, olor y estado físico del café verde proveniente de nuestras fincas aliadas.',
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
  {
    step: '02',
    title: 'Clasificación',
    desc: 'Selección por densidad, tamaño y defectos para garantizar lotes homogéneos.',
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    step: '03',
    title: 'Tueste',
    desc: 'Aplicación de perfiles controlados con registro de tiempo, temperatura y tasa de aumento de calor.',
    icon: <Flame className="w-5 h-5" />,
  },
  {
    step: '04',
    title: 'Enfriamiento',
    desc: 'Enfriamiento rápido para detener el tueste en el punto exacto y preservar los aromas.',
    icon: <Thermometer className="w-5 h-5" />,
  },
  {
    step: '05',
    title: 'Catación',
    desc: 'Evaluación sensorial del lote tostado para confirmar que cumple con nuestros estándares.',
    icon: <Coffee className="w-5 h-5" />,
  },
  {
    step: '06',
    title: 'Empaque',
    desc: 'Empaque al vacío inmediato con etiquetado de trazabilidad y fecha de tueste.',
    icon: <Star className="w-5 h-5" />,
  },
];

const STATS = [
  { value: '100%', label: 'Café de origen colombiano' },
  { value: 'Micro', label: 'Tostados controlados por lote' },
  { value: 'SCA', label: 'Protocolos de calidad' },
  { value: 'Trazable', label: 'De la finca a la taza' },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 md:mb-16">
      <span
        className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest ${
          light
            ? 'bg-[#FFA42C]/15 text-[#FFA42C] border border-[#FFA42C]/25'
            : 'bg-[#FFA42C]/10 text-[#122C9B]'
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight ${
          light ? 'text-[#FFF9F5]' : 'text-[#122C9B]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm md:text-base leading-relaxed ${
            light ? 'text-[#FFF9F5]/70' : 'text-[#122C9B]/60'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group bg-white rounded-2xl p-6 md:p-8 border border-[#122C9B]/10 shadow-sm hover:shadow-xl hover:shadow-[#122C9B]/5 hover:border-[#FFA42C]/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <span className="p-3 bg-[#FFA42C]/10 text-[#FFA42C] rounded-xl inline-block">
          {icon}
        </span>
        <ArrowUpRight className="w-5 h-5 text-[#122C9B]/20 group-hover:text-[#FFA42C] transition-colors" />
      </div>
      <h3 className="font-sans text-lg font-bold text-[#122C9B] mb-2">{title}</h3>
      <p className="text-sm text-[#122C9B]/60 font-light leading-relaxed">{desc}</p>
    </div>
  );
}

function ProcessStep({
  item,
  index,
}: {
  item: (typeof PROCESS_STEPS)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center">
      {/* Timeline center line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#122C9B]/10 -translate-x-1/2" />

      {/* Content side */}
      <div className={`${isEven ? 'md:pr-16 md:text-right' : 'md:col-start-2 md:pl-16'}`}>
        <div
          className={`inline-flex items-center gap-3 mb-3 ${
            isEven ? 'md:flex-row-reverse' : ''
          }`}
        >
          <span className="p-2.5 bg-[#FFA42C]/10 text-[#FFA42C] rounded-xl">{item.icon}</span>
          <span className="text-xs font-mono font-bold text-[#FFA42C] uppercase tracking-widest">
            Paso {item.step}
          </span>
        </div>
        <h3 className="font-sans text-xl md:text-2xl font-bold text-[#122C9B] mb-2">
          {item.title}
        </h3>
        <p className="text-sm text-[#122C9B]/60 font-light leading-relaxed">{item.desc}</p>
      </div>

      {/* Dot on timeline */}
      <div
        className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-[#FFF9F5] bg-[#FFA42C] z-10`}
      />

      {/* Empty side for layout */}
      <div className={`hidden md:block ${isEven ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`} />
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center px-4 py-6">
      <p className="font-sans text-3xl md:text-4xl font-black text-[#122C9B] mb-1">{value}</p>
      <p className="text-xs md:text-sm text-[#122C9B]/60 font-light uppercase tracking-wider">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                         */
/* ------------------------------------------------------------------ */

export default function NuestraPlanta() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % GALLERY_IMAGES.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, [nextImage]);

  return (
    <div id="nuestra-planta-view" className="bg-[#FFF9F5]">
      {/* Hero */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${GALLERY_IMAGES[0].src})` }}
        />
        <div className="absolute inset-0 bg-[#122C9B]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#122C9B] via-transparent to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 md:space-y-8 py-20">
          <span className="inline-block px-3 py-1 bg-[#FFA42C]/15 text-[#FFA42C] border border-[#FFA42C]/25 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">
            Silvania, Cundinamarca
          </span>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#FFF9F5] tracking-tight leading-[0.95]">
            Nuestra Planta
            <br />
            <span className="text-[#FFA42C]">de Tueste</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-[#FFF9F5]/80 font-light leading-relaxed">
            En el corazón de Cundinamarca transformamos café verde de origen en lotes de especialidad.
            Tecnología, protocolos de calidad y un equipo apasionado por cada grano.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/573157307016?text=Hola%20Jaguar%20Coffee,%20quiero%20conocer%20los%20servicios%20de%20tueste%20de%20la%20planta%20en%20Silvania"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFA42C] hover:bg-[#FFA42C]/90 text-[#122C9B] font-bold rounded-2xl text-xs uppercase tracking-widest shadow-lg shadow-[#FFA42C]/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Cotizar por WhatsApp</span>
            </a>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#FFF9F5]/30 hover:border-white text-[#FFF9F5] font-bold rounded-2xl text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              <span>Agendar visita</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative z-20 -mt-12 mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl shadow-[#122C9B]/5 border border-[#122C9B]/10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#122C9B]/10">
          {STATS.map((stat) => (
            <Fragment key={stat.label}>
              <StatItem value={stat.value} label={stat.label} />
            </Fragment>
          ))}
        </div>
      </section>

      {/* Intro + Gallery */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-[#FFA42C]/10 text-[#122C9B] rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">
                  Tecnología y pasión
                </span>
                <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#122C9B] tracking-tight">
                  Cada lote cuenta una historia de origen
                </h2>
                <p className="text-base text-[#122C9B]/70 font-light leading-relaxed">
                  Nuestra planta en Silvania está diseñada para garantizar la trazabilidad y reproducibilidad
                  de cada lote. Desde la recepción del café verde hasta el empaque final, cada etapa sigue
                  protocolos rigurosos que preservan la calidad y potencian los atributos sensoriales de cada origen.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-[#122C9B]/5 rounded-2xl border border-[#122C9B]/10">
                  <Leaf className="w-5 h-5 text-[#FFA42C] mt-0.5" />
                  <div>
                    <p className="font-bold text-[#122C9B] text-sm">Origen</p>
                    <p className="text-xs text-[#122C9B]/60 font-light">Fincas aliadas de Colombia</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[#122C9B]/5 rounded-2xl border border-[#122C9B]/10">
                  <Truck className="w-5 h-5 text-[#FFA42C] mt-0.5" />
                  <div>
                    <p className="font-bold text-[#122C9B] text-sm">Logística</p>
                    <p className="text-xs text-[#122C9B]/60 font-light">Empaque al vacío inmediato</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#122C9B]/10 shadow-lg group">
                <img
                  src={GALLERY_IMAGES[currentImage].src}
                  alt={GALLERY_IMAGES[currentImage].alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122C9B]/40 to-transparent" />
                <button
                  onClick={prevImage}
                  aria-label="Imagen anterior"
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/95 hover:bg-white text-[#122C9B] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Siguiente imagen"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/95 hover:bg-white text-[#122C9B] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-center gap-2">
                {GALLERY_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    aria-label={`Ver imagen ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      currentImage === idx ? 'bg-[#FFA42C] w-8' : 'bg-[#122C9B]/20 hover:bg-[#122C9B]/40 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Servicios"
            title="Lo que ofrecemos desde la planta"
            subtitle="Más que tueste: acompañamos a cafeterías, distribuidores y marcas en cada etapa del valor del café."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((service) => (
              <Fragment key={service.title}>
                <ServiceCard icon={service.icon} title={service.title} desc={service.desc} />
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Proceso"
            title="Del café verde al café tostado"
            subtitle="Seis etapas controladas que garantizan calidad, consistencia y trazabilidad en cada grano."
          />

          <div className="space-y-12 md:space-y-0">
            {PROCESS_STEPS.map((item, idx) => (
              <Fragment key={item.step}>
                <ProcessStep item={item} index={idx} />
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Location + CTA */}
      <section className="py-20 md:py-28 bg-[#122C9B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=85&w=1600')] bg-cover bg-center mix-blend-overlay opacity-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 text-[#FFF9F5]">
              <span className="inline-block px-3 py-1 bg-[#FFA42C]/15 text-[#FFA42C] border border-[#FFA42C]/25 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">
                Visítanos
              </span>
              <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                ¿Necesitas tueste o asesoría?
              </h2>
              <p className="text-base md:text-lg text-[#FFF9F5]/70 font-light leading-relaxed">
                Nuestra planta se encuentra en Silvania, Cundinamarca, a pocos minutos de Bogotá. Recibimos
                visitas previa coordinación para conocer el proceso de tueste, hacer cataciones y definir
                perfiles personalizados.
              </p>

              <div className="flex items-start gap-4 pt-2">
                <div className="p-3 bg-[#FFA42C]/10 rounded-xl">
                  <MapPin className="w-5 h-5 text-[#FFA42C]" />
                </div>
                <div>
                  <p className="font-bold text-[#FFF9F5]">Silvania, Cundinamarca</p>
                  <p className="text-sm text-[#FFF9F5]/60 font-light">Lunes a Viernes, 8:00 a.m. - 5:00 p.m.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 space-y-6">
              <h3 className="font-sans text-xl font-bold text-[#FFF9F5]">Hablemos de tu proyecto</h3>
              <p className="text-sm text-[#FFF9F5]/70 font-light leading-relaxed">
                Escríbenos por WhatsApp y agenda una visita. Un asesor te ayudará a definir el mejor perfil
                para tu marca.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/573157307016?text=Hola%20Jaguar%20Coffee,%20quiero%20conocer%20los%20servicios%20de%20tueste%20de%20la%20planta%20en%20Silvania"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-2xl text-xs uppercase tracking-widest transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotizar por WhatsApp</span>
                </a>
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/40 hover:border-white text-white font-bold rounded-2xl text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  <span>Formulario de contacto</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

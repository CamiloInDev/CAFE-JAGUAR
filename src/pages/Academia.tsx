import React, { useState } from 'react';
import { Award, BookOpen, Clock, GraduationCap, Star, BarChart, Users, MessageCircle } from 'lucide-react';
import BookingCalendar from '../components/BookingCalendar';

interface Course {
  id: string;
  title: string;
  duration: string;
  level: string;
  price: string;
  priceDetail: string;
  description: string;
  syllabus: string[];
}

export default function Academia() {
  const [selectedCourse, setSelectedCourse] = useState<string>('course_integral_basico');

  const courses: Course[] = [
    {
      id: 'course_integral_basico',
      title: 'Curso Integral de Barismo Básico',
      duration: '30 horas',
      level: 'Principiante',
      price: '$2.200.000',
      priceDetail: 'Curso completo · 5 módulos de 6 hrs c/u · Cada módulo $550.000 COP',
      description: 'Formación completa para iniciarse en el mundo del café de especialidad. Incluye Barista Espresso, Brewing, Tueste básico, Catación y Procesos de producción. Ideal para quienes quieren entender el café desde la semilla hasta la taza.',
      syllabus: [
        'Historia del café, origen, especies y variedades.',
        'Barista Espresso básico: principios de extracción, máquina y molino, organización.',
        'Barista Brewing básico: métodos de preparación, agua, descriptores, Golden Cup.',
        'Tueste básico: componentes de la tostadora, control del tueste, cambios físicos, seguridad industrial.',
        'Catación básica: análisis sensorial, sabores básicos, ácidos orgánicos del café.',
        'Procesos de producción: procesamiento, clasificación, buenas prácticas.',
        'Arte latte: texturización de leche y figuras básicas.'
      ]
    },
    {
      id: 'course_sca_intermedio',
      title: 'Curso de Certificación SCA Intermedio / Profesional',
      duration: 'Mínimo 14 horas',
      level: 'Intermedio a Profesional',
      price: 'Desde $3.800.000',
      priceDetail: 'Intermedio $3.800.000 COP · Profesional $4.000.000 COP',
      description: 'Certificación internacional de la Specialty Coffee Association (SCA) dirigida a baristas, tostadores y catadores con experiencia que buscan perfeccionar su técnica y alcanzar un nivel profesional avalado a nivel mundial.',
      syllabus: [
        'Inscripción a la Specialty Coffee Association (SCA).',
        'Examen teórico y práctico avalado por la SCA.',
        'Materiales de estudio especializados y materia prima para prácticas.',
        'Certificación oficial emitida por la SCA.',
        'Barista Skills Intermedio/Profesional: control del espresso, análisis sensorial, arte latte y flujo de trabajo.',
        'Brewing Intermedio/Profesional: variables de extracción, uso de refractómetro, Brewing Control Chart y métodos de filtrado.',
        'Café Verde Intermedio/Profesional: botánica, procesos, mercados, contratos, almacenamiento y clasificación.',
        'Tueste Intermedio/Profesional: perfiles de tueste, termodinámica, transferencia de calor y tueste de muestras.',
        'Sensory Skills Intermedio/Profesional: fisiología del gusto, pruebas triangulares, SCA Flavor Wheel y paneles sensoriales.'
      ]
    }
  ];

  const selected = courses.find(c => c.id === selectedCourse) || courses[0];

  return (
    <div id="academia-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* Visual Header */}
      <div className="bg-[#122C9B] rounded-3xl text-[#FFF9F5] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://cafejaguar.com/wp-content/uploads/2026/01/Academia-barismo-1-scaled-1-1024x576.webp')] bg-cover bg-center mix-blend-overlay opacity-20" />

        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="px-2.5 py-1 bg-[#FFA42C]/10 text-[#FFA42C] border border-[#FFA42C]/20 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
            SCA Premier Campus
          </span>
          <h1 className="font-display text-4xl font-extrabold text-[#FFF9F5] tracking-tight">
            Academia de Barismo Jaguar Coffee
          </h1>
          <p className="text-sm text-[#FFF9F5]/70 leading-relaxed font-light">
            En Jaguar Coffee creemos que el conocimiento transforma. Certificaciones internacionales <strong>SCA (Specialty Coffee Association)</strong> y <strong>CQI (Coffee Quality Institute)</strong>, reconocidas a nivel mundial. Instructores autorizados AST liderados por <strong>Mario Patiño</strong>.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFA42C]/15 border border-[#FFA42C]/25 rounded-full">
              <Award className="w-4 h-4 text-[#FFA42C]" />
              <span className="text-[10px] font-mono font-bold text-[#FFA42C] uppercase tracking-wider">SCA Aprobado</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFA42C]/15 border border-[#FFA42C]/25 rounded-full">
              <Star className="w-4 h-4 text-[#FFA42C]" />
              <span className="text-[10px] font-mono font-bold text-[#FFA42C] uppercase tracking-wider">Mario Patiño AST</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course List Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {courses.map((course) => (
          <details
            key={course.id}
            className="group bg-white border border-[#122C9B]/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#FFA42C]/20 transition-all duration-300"
          >
            <summary className="list-none cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <span className="p-2.5 bg-[#FFA42C]/10 text-[#FFA42C] rounded-xl inline-block shadow-inner leading-none">
                    <BookOpen className="w-5 h-5" />
                  </span>
                  <div className="text-right">
                    <p className="text-lg font-black text-[#122C9B]">{course.price}</p>
                    <p className="text-[10px] text-[#122C9B]/50 font-mono">COP</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-xl font-bold text-[#122C9B] leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#122C9B]/60 font-light">{course.priceDetail}</p>
                </div>

                <p className="text-sm text-[#122C9B]/70 leading-relaxed font-light">
                  {course.description}
                </p>

                <div className="pt-4 border-t border-[#122C9B]/5 flex items-center justify-between text-[11px] text-[#122C9B]/60 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#FFA42C]" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart className="w-3.5 h-3.5 text-[#FFA42C]" />
                    {course.level}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <span className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#122C9B]/5 group-hover:bg-[#122C9B]/10 text-[#122C9B] text-xs font-bold rounded-xl transition-all">
                    <span className="group-open:hidden">Ver temario</span>
                    <span className="hidden group-open:inline">Ocultar temario</span>
                  </span>
                  <a
                    href={`https://wa.me/573157307016?text=${encodeURIComponent(`Hola Jaguar Coffee, quiero reservar el curso: ${course.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Reservar por WhatsApp</span>
                  </a>
                </div>
              </div>
            </summary>

            <div className="pt-6 space-y-3">
              <h4 className="text-xs font-bold text-[#122C9B] uppercase font-mono tracking-wider">Temario</h4>
              <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {course.syllabus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#122C9B]/70 leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-[#FFA42C] rounded-full flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>

      {/* Instagram Barismo Reel */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 bg-[#FFA42C]/10 text-[#122C9B] rounded-full text-xs font-bold font-mono tracking-wider uppercase">
            En Instagram
          </span>
          <h2 className="font-display text-2xl font-extrabold text-[#122C9B]">Así vivimos el curso de barismo</h2>
          <p className="text-sm text-[#122C9B]/60 font-light max-w-2xl mx-auto">
            Un vistazo a nuestras clases prácticas en la Academia Jaguar Coffee.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-[400px] aspect-[9/16] rounded-2xl overflow-hidden border border-[#122C9B]/10 shadow-md">
            <iframe
              src="https://www.instagram.com/p/DWmjKCaCR-P/embed/"
              className="w-full h-full"
              frameBorder="0"
              scrolling="no"
              allowTransparency
              title="Curso de Barismo Jaguar Coffee"
            />
          </div>
        </div>
      </div>

      {/* Alliance Seals */}
      <div className="p-6 bg-[#122C9B]/5 border border-[#122C9B]/10 rounded-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <span className="p-3 bg-white text-[#122C9B] border border-[#122C9B]/10 rounded-xl inline-block shadow-sm">
          <GraduationCap className="w-6 h-6" />
        </span>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-[#122C9B]">Certificación Internacional SCA & CQI</h4>
          <p className="text-xs text-[#122C9B]/60 leading-normal font-light">
            Al culminar el programa con Mario Patiño AST, recibirás tu certificado avalado por la Specialty Coffee Association y el Coffee Quality Institute, reconocido a nivel mundial.
          </p>
        </div>
      </div>

      {/* Booking Calendar Section */}
      <div id="academia-reservas" className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 bg-[#FFA42C]/10 text-[#122C9B] rounded-full text-xs font-bold font-mono tracking-wider uppercase">
            Reserva tu cupo
          </span>
          <h2 className="font-display text-3xl font-extrabold text-[#122C9B]">Separa tu fecha en la Academia</h2>
          <p className="text-sm text-[#122C9B]/60 font-light max-w-2xl mx-auto">
            Selecciona el curso de tu interés y una fecha tentativa. Un asesor te confirmará por WhatsApp la programación oficial, disponibilidad y opciones de pago.
          </p>
        </div>

        <div className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 shadow-sm space-y-4">
          <label className="block text-sm font-bold text-[#122C9B] font-mono uppercase">Curso de interés</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-3 bg-[#FFF9F5] border border-[#122C9B]/20 rounded-lg text-sm text-[#122C9B] focus:outline-none focus:border-[#FFA42C]"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title} — {course.price} COP
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-4 text-xs text-[#122C9B]/60 font-mono">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#FFA42C]" />
              {selected.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart className="w-3.5 h-3.5 text-[#FFA42C]" />
              {selected.level}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#FFA42C]" />
              Máx 10 participantes
            </span>
          </div>
        </div>

        <BookingCalendar
          tipo="academia"
          itemId={selectedCourse}
          itemNombre={selected.title}
          itemSlug={selectedCourse}
          maxPeople={10}
        />
      </div>

    </div>
  );
}

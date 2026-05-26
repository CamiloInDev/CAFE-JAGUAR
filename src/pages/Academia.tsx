import React from 'react';
import { Award, BookOpen, Clock, GraduationCap, ExternalLink, ShieldAlert, BarChart } from 'lucide-react';

export default function Academia() {
  const courses = [
    {
      id: 'course_1',
      title: 'Diplomado Profesional en Barismo Inicial',
      duration: '42 horas',
      level: 'Principiante a Intermedio',
      syllabus: 'Fundamentos del grano, calibración de espresso en máquina italiana convencional, lances y emulsión de leche, elaboración de lattes clásicos y diseño conceptual de arte latte.',
      instructor: 'Lucía Benítez (Campeona Nacional de Baristas)',
      linkedinUrl: 'https://www.linkedin.com/learning/topics/coffee-education'
    },
    {
      id: 'course_2',
      title: 'Análisis Sensorial y Técnicas de Catación de Especialidad',
      duration: '28 horas',
      level: 'Intermedio a Avanzado',
      syllabus: 'Protocolo de catación SCA (Specialty Coffee Association), discriminación de acidez, cuerpo y dulzor; aromas de la rueda de sabores y metodología de emparejamiento.',
      instructor: 'Carlos Mario Ruiz (Q-Grader Certificado)',
      linkedinUrl: 'https://www.linkedin.com/learning/topics/sensory-analysis'
    },
    {
      id: 'course_3',
      title: 'Emprendimiento y Negocio de Coffeeshops de Especialidad',
      duration: '35 horas',
      level: 'Profesional / Negocios',
      syllabus: 'Estructuración de costos, flujos de suministro de café verde, elección de maquinaria, metodologías de mercadeo en origen, y entrenamiento del talento de barra.',
      instructor: 'Federico Restrepo (Socio Fundador Jaguar Coffee)',
      linkedinUrl: 'https://www.linkedin.com/learning/topics/retail-management'
    }
  ];

  return (
    <div id="academia-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Visual Header */}
      <div className="bg-stone-900 rounded-3xl text-stone-200 p-8 md:p-12 relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=40&w=400')] bg-cover bg-center mix-blend-overlay opacity-10" />
        
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="px-2.5 py-1 bg-[#FFA42C]/10 text-[#122C9B] border border-[#FFA42C]/20 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
            🎓 Escuela de Café Digital
          </span>
          <h1 className="font-display text-4xl font-extrabold text-[#FAF8F5] tracking-tight">
            Academia Jaguar & LinkedIn Learning
          </h1>
          <p className="text-sm text-stone-300 leading-relaxed font-light">
            Formando la próxima generación de baristas, catadores de especialidad y empresarios del café en Latinoamérica. Certifícate de forma remota y añade valor a tu perfil profesional.
          </p>
        </div>
      </div>

      {/* Course List Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
          >
            <div className="space-y-4 flex-grow">
              <span className="p-2.5 bg-[#FFA42C]/10 text-[#122C9B] rounded-xl inline-block shadow-inner leading-none">
                <BookOpen className="w-5 h-5" />
              </span>
              
              <div className="space-y-1">
                <h3 className="font-display text-lg font-bold text-stone-900 leading-tight">
                  {course.title}
                </h3>
                <p className="text-[10px] text-stone-400 font-mono">Impartido por: {course.instructor}</p>
              </div>

              <p className="text-xs text-stone-500 font-light leading-relaxed">
                {course.syllabus}
              </p>

              {/* Course Meta */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#FFA42C]" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart className="w-3.5 h-3.5 text-[#FFA42C]" />
                    {course.level}
                  </span>
              </div>
            </div>

            {/* Redirection CTA */}
            <div className="pt-6">
              <a
                href={course.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#122C9B] hover:bg-[#FFA42C] border border-[#122C9B] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <span>Ir al curso en LinkedIn Learning</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Alliance Seals */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <span className="p-3 bg-white text-slate-700 border border-slate-150 rounded-xl inline-block shadow-sm">
          <GraduationCap className="w-6 h-6" />
        </span>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900">Certificación Curricular</h4>
          <p className="text-xs text-slate-500 leading-normal font-light">
            Al culminar la visualización del sílabo en la pasarela de LinkedIn Learning, podrás reclamar automáticamente tu certificado para añadirlo de inmediato a tu perfil oficial de LinkedIn.
          </p>
        </div>
      </div>

    </div>
  );
}

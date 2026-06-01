import React from 'react';
import { Award, BookOpen, Clock, GraduationCap, ExternalLink, ShieldAlert, BarChart, Star } from 'lucide-react';

export default function Academia() {
  const courses = [
    {
      id: 'course_1',
      title: 'Fundamentos del Barismo SCA',
      duration: '40 horas',
      level: 'Principiante a Intermedio',
      syllabus: 'Fundamentos del grano, calibración de espresso, lances y emulsión de leche, latte art clásico y extracción de filtros manuales (V60, Chemex, Kalita).',
      instructor: 'Mario Patiño — AST (Authorized SCA Trainer)',
      linkedinUrl: 'https://www.sca.coffee/education'
    },
    {
      id: 'course_2',
      title: 'Análisis Sensorial y Certificación Q-Grader',
      duration: '50 horas',
      level: 'Intermedio a Avanzado',
      syllabus: 'Protocolo de catación SCA, discriminación de acidez, cuerpo y dulzor, aromas de la rueda de sabores SCA, preparación para el examen de certificación Q-Grader.',
      instructor: 'Mario Patiño — AST & CQI Instructor',
      linkedinUrl: 'https://www.sca.coffee/education'
    },
    {
      id: 'course_3',
      title: 'Tostión y Perfilado de Cafés de Especialidad',
      duration: '30 horas',
      level: 'Intermedio',
      syllabus: 'Curvas de tueste, desarrollo de perfiles sensoriales, control de temperatura y tiempo, emparejamiento de perfiles con orígenes y metodologías de muestreo.',
      instructor: 'Mario Patiño — AST (Authorized SCA Trainer)',
      linkedinUrl: 'https://www.sca.coffee/education'
    }
  ];

  return (
    <div id="academia-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Visual Header */}
      <div className="bg-[#122C9B] rounded-3xl text-[#FFF9F5] p-8 md:p-12 relative overflow-hidden">
        {/* Abstract background graphics */}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-[#122C9B]/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#FFA42C]/20 transition-all duration-300"
          >
            <div className="space-y-4 flex-grow">
              <span className="p-2.5 bg-[#FFA42C]/10 text-[#FFA42C] rounded-xl inline-block shadow-inner leading-none">
                <BookOpen className="w-5 h-5" />
              </span>

              <div className="space-y-1">
                <h3 className="font-display text-lg font-bold text-[#122C9B] leading-tight">
                  {course.title}
                </h3>
                <p className="text-[10px] text-[#122C9B]/50 font-mono">{course.instructor}</p>
              </div>

              <p className="text-xs text-[#122C9B]/60 font-light leading-relaxed">
                {course.syllabus}
              </p>

              {/* Course Meta */}
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
            </div>

            {/* Redirection CTA */}
            <div className="pt-6">
              <a
                href={course.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#122C9B] hover:bg-[#FFA42C] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <span>Certifícate con SCA</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
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

    </div>
  );
}

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('/api/contacto', formData);
      setSuccess(true);
      setFormData({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
      });
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'No pudimos registrar su mensaje. Verifique los datos.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div id="contacto-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Visual Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold font-mono tracking-wider uppercase animate-pulse">
          Mesa de Ayuda
        </span>
        <h1 className="font-display text-4xl font-extrabold text-stone-900 tracking-tight">
          Ponte en Contacto con Jaguar Coffee
        </h1>
        <p className="text-stone-500 font-light text-base leading-relaxed">
          ¿Deseas distribuir café de especialidad en tu negocio, tienes preguntas sobre las experiencias o quieres soporte de órdenes? Diligencia el formulario y te responderemos en menos de 12 horas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        
        {/* Left Side: Contact Information Cards (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-display text-xl font-bold text-stone-900">Oficinas Centrales</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              Nuestro laboratorio de catación principal y tostadora se encuentran en el corazón cafetalero del país.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-800 font-mono uppercase">Dirección</h4>
                  <p className="text-xs text-stone-500 mt-0.5 font-light">Calle 10 # 5-42, El Poblado, Medellín, Colombia</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-800 font-mono uppercase">Correo electrónico</h4>
                  <p className="text-xs text-stone-500 mt-0.5 font-light">hola@jaguarcoffee.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-800 font-mono uppercase">Canal de Whatsapp</h4>
                  <p className="text-xs text-stone-500 mt-0.5 font-light">+57 (300) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ info Card */}
          <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl flex items-start gap-3 leading-relaxed">
            <HelpCircle className="w-5 h-5 text-amber-750 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide font-mono">¿Eres Mayorista?</h4>
              <p className="text-xs text-stone-500 mt-1 font-light">
                Brindamos tarifas de saco verde o grano tostado especiales para cafeterías corporaciones y oficinas a nivel nacional. Escríbenos directamente con el asunto "Socio Mayorista".
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Working Contact Message Form (7 Columns) */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          {success ? (
            <div className="text-center py-10 space-y-4">
              <span className="p-3 bg-emerald-50 text-emerald-600 rounded-full inline-block">
                <CheckCircle className="w-8 h-8 mx-auto" />
              </span>
              <h3 className="font-display text-xl font-bold text-stone-900">¡Mensaje Recibido Correctamente!</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed font-light">
                Gracias por escribirnos. Uno de nuestros baristas o asesores de negocio se pondrá en contacto contigo a la mayor brevedad.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-5 py-2.5 bg-stone-900 text-[#FAF8F5] hover:bg-stone-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Enviar Otro Mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="block text-xs font-bold text-stone-700 font-mono uppercase">Nombre Completo</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Mateo Gómez"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-bold text-stone-700 font-mono uppercase">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ej. mateo@gmail.com"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="asunto" className="block text-xs font-bold text-stone-700 font-mono uppercase">Asunto o Categoría</label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  required
                  value={formData.asunto}
                  onChange={handleChange}
                  placeholder="Ej. Cotización de Café Mayorista"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="mensaje" className="block text-xs font-bold text-stone-700 font-mono uppercase">Detalles del Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  required
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Describe con libertad tu consulta o solicitud..."
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg text-sm resize-none"
                />
              </div>

              {error && (
                <p className="text-xs text-rose-600 font-semibold font-mono">
                  ⚠️ {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-900 border border-amber-950 text-[#FAF8F5] hover:bg-amber-800 text-sm font-bold rounded-lg transition-all shadow-md mt-4 cursor-pointer"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-[#FAF8F5] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensaje Seguro</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store';
import { UserPlus, User, Mail, KeyRound, Phone, AlertTriangle } from 'lucide-react';

export default function Register() {
  const { register, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Return url handling if they were redirected from checkout
  const returnUrl = searchParams.get('returnUrl') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearError();

    try {
      await register({
        nombre,
        apellido,
        email,
        password,
        telefono
      });
      setSuccess(true);
      setTimeout(() => {
        navigate(returnUrl);
      }, 800);
    } catch (err) {
      console.error('Registration prompt failure', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="register-view" className="max-w-md mx-auto my-12 px-4">
      <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-md space-y-6">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <span className="p-2.5 bg-[#FFA42C]/10 text-[#122C9B] rounded-xl inline-block shadow-inner">
            <UserPlus className="w-6 h-6" />
          </span>
          <h1 className="font-display text-2xl font-extrabold text-[#122C9B]">Crear Cuenta</h1>
          <p className="text-xs text-stone-500 font-light max-w-xs mx-auto leading-normal">
            Regístrate para realizar compras especiales, guardar tus direcciones y acumular puntos Jaguar.
          </p>
        </div>

        {success ? (
          <div className="bg-emerald-50 border border-emerald-250 rounded-2xl p-4 text-center text-emerald-800 text-xs font-semibold animate-bounce mt-4">
            ✓ ¡Registro Completado! Iniciando Sesión...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Row Name & Surname */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Nombre</label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Mateo"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Apellido</label>
                <input
                  type="text"
                  required
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Gómez"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Correo electrónico</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mateo@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900"
                />
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Teléfono (Móvil)</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="+57 315 987 6543"
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900"
                />
                <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Contraseña</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900"
                />
                <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs font-medium flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#122C9B] border border-[#122C9B] hover:bg-[#3D5FC9] text-white text-sm font-semibold rounded-xl shadow transition duration-200 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                'Registrarse y Continuar'
              )}
            </button>
          </form>
        )}

        <hr className="border-stone-200" />

        <div className="text-center text-xs text-stone-500">
          <span>¿Ya eres parte de Jaguar? </span>
          <Link to={`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`} className="text-amber-805 font-bold hover:underline">
            Inicia sesión aquí
          </Link>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'jaguar_privacy_consent';

export function getPrivacyConsent(): { accepted: boolean; date?: string } {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return { accepted: false };
    const parsed = JSON.parse(raw);
    return { accepted: parsed.accepted === true, date: parsed.date };
  } catch {
    return { accepted: false };
  }
}

export function setPrivacyConsent() {
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ accepted: true, date: new Date().toISOString() })
    );
  } catch (err) {
    console.warn('No se pudo guardar el consentimiento de privacidad', err);
  }
}

export default function PrivacyConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getPrivacyConsent();
    if (!consent.accepted) {
      // Pequeño retraso para no mostrarlo inmediatamente al cargar
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setPrivacyConsent();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#122C9B]/60 backdrop-blur-sm"
        onClick={() => {}}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#FFF9F5] rounded-2xl shadow-2xl border border-[#122C9B]/10 p-6 sm:p-8 space-y-5">
        <div className="flex items-start gap-3">
          <span className="p-2.5 bg-[#FFA42C]/10 rounded-xl text-[#FFA42C]">
            <ShieldCheck className="w-6 h-6" />
          </span>
          <div>
            <h2 className="font-sans text-lg font-bold text-[#122C9B] leading-tight">
              Tu privacidad es importante
            </h2>
            <p className="text-xs text-[#122C9B]/60 font-mono uppercase tracking-wider mt-0.5">
              Jaguar Coffee S.A.S.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-[#122C9B]/80 font-light leading-relaxed">
          <p>
            Para continuar navegando y usar nuestro sitio, necesitamos que aceptes nuestra{' '}
            <Link
              to="/privacidad"
              className="font-bold text-[#FFA42C] hover:text-[#3D5FC9] underline underline-offset-2"
            >
              Política de Tratamiento de Datos Personales
            </Link>
            .
          </p>
          <p>
            Solo recolectamos los datos necesarios para procesar tus pedidos, contactarte sobre tu compra y, si lo autorizas, enviarte novedades. No usamos cookies de terceros.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={handleAccept}
            className="w-full px-6 py-3 bg-[#122C9B] hover:bg-[#FFA42C] text-white text-xs font-bold rounded-xl uppercase tracking-widest transition-colors shadow-lg shadow-[#122C9B]/20 cursor-pointer"
          >
            Acepto la política de privacidad
          </button>
          <p className="text-center text-[10px] text-[#122C9B]/40 font-mono uppercase tracking-wider mt-3">
            Ley 1581 de 2012 · Decreto 1377 de 2013
          </p>
        </div>
      </div>
    </div>
  );
}

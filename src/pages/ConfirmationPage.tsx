import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ShieldCheck, Printer, FileText, MapPin, Eye } from 'lucide-react';
import { Order } from '../types';
import axios from 'axios';

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ref = searchParams.get('ref');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ref) {
      setLoading(false);
      return;
    }

    // Pull personal order logs to lookup our matching reference
    axios.get('/api/ordenes')
      .then(res => {
        const matching = res.data.find((o: Order) => o.id === ref);
        if (matching) {
          setOrder(matching);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error finding order validation details', err);
        setLoading(false);
      });
  }, [ref]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-stone-500 text-sm">Validando transacciones con el webhook de WooMPI...</p>
      </div>
    );
  }

  if (!ref || !order) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="font-display text-2xl font-bold text-stone-900">Referencia No Encontrada</h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed">
          No pudimos localizar un registro de orden asociado a esta confirmación o la transacción se encuentra pendiente de acreditación bancaria.
        </p>
        <Link to="/mi-cuenta" className="inline-block px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold">
          Ir a Mi Cuenta
        </Link>
      </div>
    );
  }

  return (
    <div id="confirmation-view" className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      
      {/* 1. Visually stunning success notice block */}
      <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm text-center space-y-5">
        <span className="p-4 bg-emerald-50 text-emerald-600 rounded-full inline-block animate-pulse">
          <CheckCircle2 className="w-12 h-12" />
        </span>
        
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-emerald-800 font-mono tracking-widest bg-emerald-100/60 px-3 py-1 rounded-full">
            Transacción Recibida
          </span>
          <h1 className="font-display text-3xl font-black text-stone-900 leading-tight">
            ¡Gracias por tu compra, {order.direccion_envio.telefono ? 'Caficultor' : 'Socio'}!
          </h1>
          <p className="text-sm text-stone-500 font-light max-w-sm mx-auto">
            Hemos procesado exitosamente tu pago de café de especialidad a través de la pasarela WooMPI.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/mi-cuenta"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-850 text-white rounded-xl text-xs font-semibold transition"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Mis Pedidos</span>
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xl text-xs font-semibold"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Factura</span>
          </button>
        </div>
      </div>

      {/* 2. Detailed Purchase Invoice Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-stone-150 pb-4">
          <div className="space-y-1">
            <span className="text-xs text-stone-400 font-mono uppercase">Detalles del Recibo</span>
            <h3 className="font-display font-black text-lg text-stone-950">
              Referencia: {order.id}
            </h3>
          </div>
          <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-850 font-mono font-bold text-xs rounded-lg uppercase">
            Estado: {order.estado.toUpperCase()}
          </span>
        </div>

        {/* Formulated List of Ordered Items */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold font-mono uppercase text-stone-400 tracking-wider flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Items Adquiridos</span>
          </h4>
          <div className="divide-y divide-stone-150 space-y-3.5">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs pt-3.5 first:pt-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-stone-105 border border-stone-205 text-stone-800 font-bold font-mono rounded">
                    x{item.cantidad}
                  </span>
                  <span className="font-semibold text-stone-900">{item.nombre}</span>
                </div>
                <span className="font-mono text-stone-500">
                  ${(item.precio_unit * item.cantidad).toLocaleString('es-CO')} COP
                </span>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-stone-150" />

        {/* Metadata section (Delivery address, transaction references) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-light">
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold font-mono uppercase text-[#44403C] tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Lugar de Envío</span>
            </h4>
            <div className="text-stone-500 space-y-1">
              <p className="font-semibold text-stone-900">{order.direccion_envio.direccion}</p>
              <p>{order.direccion_envio.ciudad}, {order.direccion_envio.departamento}</p>
              <p>Móvil: {order.direccion_envio.telefono}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[10px] font-bold font-mono uppercase text-[#44403C] tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Transacción WooMPI</span>
            </h4>
            <div className="text-stone-400 space-y-1 font-mono">
              <p className="text-stone-700">ID: {order.wompi_transaction_id}</p>
              <p>Comitente: {order.user_email || 'Cliente Verificado'}</p>
              <p>Fecha GTM: {new Date(order.created_at).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <hr className="border-stone-150" />

        {/* Invoice Total Footer */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-stone-800">Total Facturado</span>
          <span className="text-2xl font-black text-stone-950 font-sans">
            ${order.total.toLocaleString('es-CO')} <span className="text-xs text-stone-500 font-normal font-mono">COP</span>
          </span>
        </div>
      </div>

    </div>
  );
}

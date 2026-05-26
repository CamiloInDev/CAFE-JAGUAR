import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, useAuthStore } from '../store';
import { CreditCard, MapPin, ClipboardList, ShieldCheck, ArrowLeft, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import axios from 'axios';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, total, clearCart } = useCartStore();

  const [address, setAddress] = useState({
    direccion: '',
    ciudad: 'Bogotá',
    departamento: 'Cundinamarca',
    telefono: user?.telefono || ''
  });
  const [notas, setNotas] = useState('');
  const [wompiOpen, setWompiOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Wompi Modal State Simulators
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pse' | 'nequi'>('card');
  const [cardNumber, setCardNumber] = useState('4000 1234 5678 9010');
  const [cardHolder, setCardHolder] = useState(user ? `${user.nombre} ${user.apellido}` : 'Mateo Gomez');
  const [pseBank, setPseBank] = useState('Bancolombia');

  // Colombian departments and cities
  const departamentos = [
    'Antioquia', 'Cundinamarca', 'Valle del Cauca', 'Atlántico', 'Quindío', 'Risaralda', 'Caldas', 'Huila', 'Santander'
  ];

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="font-display text-xl font-bold">No hay artículos para pagar</h2>
        <button onClick={() => navigate('/tienda')} className="px-4 py-2 bg-stone-900 text-white rounded-lg">
          Dirigirse a la Tienda
        </button>
      </div>
    );
  }

  const handleOpenWompi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.direccion || !address.telefono) {
      alert('Por favor diligencie su dirección de envío y teléfono de contacto.');
      return;
    }
    setWompiOpen(true);
  };

  const handleSimulatePaymentSuccess = async () => {
    setLoading(true);
    try {
      // 1. Prepare payment details from Backend to secure signatures
      const prepRes = await axios.post('/api/ordenes/preparar-pago', { total });
      const { reference, signature } = prepRes.data;

      // 2. Submit order context as 'pendiente'
      const checkoutItems = items.map(item => ({
        product_id: item.product_id,
        nombre: item.product?.nombre || 'Producto',
        precio_unit: item.product?.precio || 0,
        cantidad: item.cantidad
      }));

      await axios.post('/api/ordenes/checkout', {
        reference,
        wompiTransactionId: `TX-WMP-${Date.now().toString(36).toUpperCase()}`,
        items: checkoutItems,
        total,
        direccion_envio: address,
        notas
      });

      // 3. Fire Sandbox Webhook to trigger instant approval State Transitions!
      await axios.post('/api/webhooks/wompi-test-trigger', {
        transactionId: `TX-WMP-${Date.now().toString(36).toUpperCase()}`,
        reference,
        status: 'APPROVED'
      });

      // Clean global cart state, close simulator, redirect
      clearCart();
      setWompiOpen(false);
      navigate(`/checkout/confirmacion?ref=${reference}`);
    } catch (err: any) {
      console.error(err);
      alert('Error en pasarela de pagos simulada: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="checkout-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Visual Navigation Bar */}
      <div>
        <button
          onClick={() => navigate('/carrito')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-[#1C1917] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Carrito</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Hand: Delivery Address Formulation (7 Columns) */}
        <form onSubmit={handleOpenWompi} className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="font-display text-2xl font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2.5">
            <MapPin className="w-6 h-6 text-[#FFA42C]" />
            <span>Detalles del Despacho</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Departamento</label>
              <select
                value={address.departamento}
                onChange={(e) => setAddress({ ...address, departamento: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 font-medium"
              >
                {departamentos.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Ciudad / Municipio</label>
              <input
                type="text"
                required
                value={address.ciudad}
                onChange={(e) => setAddress({ ...address, ciudad: e.target.value })}
                placeholder="Ej. Medellín, Bogotá"
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Dirección de Envío Completa</label>
            <input
              type="text"
              required
              value={address.direccion}
              onChange={(e) => setAddress({ ...address, direccion: e.target.value })}
              placeholder="Ej. Calle 10 Sur # 43A - 12 Apt 402"
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Teléfono de Entrega</label>
            <div className="relative">
              <input
                type="text"
                required
                value={address.telefono}
                onChange={(e) => setAddress({ ...address, telefono: e.target.value })}
                placeholder="+57 321 456 7890"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900"
              />
              <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Notas o Instrucciones para la cocina / transportador (Opcional)</label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Ej. Dejar en portería, moler bien fino para expreso..."
              rows={3}
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#122C9B] border border-[#122C9B] hover:bg-[#FFA42C] text-white text-sm font-bold rounded-lg cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>Validar Orden & Pagar con WooMPI</span>
          </button>
        </form>

        {/* Right Hand: Facturation Overviews (5 Columns) */}
        <div className="lg:col-span-5 bg-[#FFF9F5] border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="font-display text-lg font-bold text-stone-900 border-b border-stone-150 pb-2 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-[#FFA42C]" />
            <span>Resumen del Café</span>
          </h3>

          {/* Cart review scroll-panel */}
          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.product_id} className="flex items-center justify-between text-xs gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 bg-stone-200 text-stone-800 text-[10px] font-bold font-mono rounded flex items-center justify-center">
                    {item.cantidad}
                  </span>
                  <span className="font-semibold text-stone-900 truncate max-w-[160px] md:max-w-xs block">
                    {item.product?.nombre}
                  </span>
                </div>
                <span className="font-mono text-stone-605">
                  ${((item.product?.precio || 0) * item.cantidad).toLocaleString('es-CO')} COP
                </span>
              </div>
            ))}
          </div>

          <hr className="border-stone-200" />

          {/* Totals timeline */}
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between text-stone-500 font-light">
              <span>Subtotal del Carrito</span>
              <span className="font-mono">${total.toLocaleString('es-CO')} COP</span>
            </div>
            <div className="flex justify-between text-stone-500 font-light">
              <span>Envio Express</span>
              <span className="text-emerald-600 font-bold font-mono">GRATUITO</span>
            </div>
            <div className="flex justify-between text-stone-900 font-bold text-sm">
              <span>Monto Total a Pagar</span>
              <span className="font-sans text-base font-extrabold">${total.toLocaleString('es-CO')} COP</span>
            </div>
          </div>
        </div>

      </div>

      {/* ---------------------------------------------------------------------------- */}
      {/* HIGH FIDELITY WOOMPI MODAL CHECKOUT SANDBOX SIMULATOR */}
      {/* ---------------------------------------------------------------------------- */}
      {wompiOpen && (
        <div className="fixed inset-0 bg-[#1C1917]/85 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white border-2 border-stone-200 max-w-md w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between relative animate-scaleUp">
            
            {/* Header branding */}
            <div className="bg-[#122C9B] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FFA42C] text-white text-[9px] font-extrabold font-mono rounded">
                  SANDBOX
                </span>
                <span className="font-display text-lg font-extrabold tracking-tight">Pasarela WooMPI</span>
              </div>
              <button
                onClick={() => setWompiOpen(false)}
                className="text-stone-400 hover:text-white text-xs font-mono font-bold px-2 py-1 bg-white/5 border border-white/10 rounded cursor-pointer"
              >
                Cerrar
              </button>
            </div>

            {/* Simulated content body */}
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center bg-amber-50 p-3 rounded-xl border border-amber-100">
                <span className="text-xs font-mono text-amber-900">Total Transacción</span>
                <span className="text-base font-black text-amber-950 font-sans">
                  ${total.toLocaleString('es-CO')} COP
                </span>
              </div>

              {/* Selector methods */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold font-mono uppercase text-stone-400">Elegir Medio de Pago</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-1 text-center font-bold text-xs rounded-lg border transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#122C9B] text-white border-[#122C9B]'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-[#3D5FC9]'
                    }`}
                  >
                    💳 Tarjeta
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pse')}
                    className={`py-2 px-1 text-center font-bold text-xs rounded-lg border transition-all cursor-pointer ${
                      paymentMethod === 'pse'
                        ? 'bg-[#122C9B] text-white border-[#122C9B]'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-[#3D5FC9]'
                    }`}
                  >
                    🏦 PSE (PSE)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nequi')}
                    className={`py-2 px-1 text-center font-bold text-xs rounded-lg border transition-all cursor-pointer ${
                      paymentMethod === 'nequi'
                        ? 'bg-[#122C9B] text-white border-[#122C9B]'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-[#3D5FC9]'
                    }`}
                  >
                    📱 Nequi
                  </button>
                </div>
              </div>

              {/* Subview of fields based on chosen method */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold font-mono text-stone-500 uppercase">Número de Tarjeta (Pruebas)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold font-mono text-stone-500 uppercase">Vencimiento</label>
                      <input type="text" placeholder="12/28" className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold font-mono text-stone-500 uppercase">CVV</label>
                      <input type="text" placeholder="123" className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'pse' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold font-mono text-stone-500 uppercase">Acreditador Bancario</label>
                    <select
                      value={pseBank}
                      onChange={(e) => setPseBank(e.target.value)}
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                    >
                      <option value="Bancolombia">Bancolombia Ahorros</option>
                      <option value="Davivienda">Davivienda S.A.</option>
                      <option value="Banco de Bogota">Banco de Bogotá</option>
                      <option value="BBVA">BBVA Colombia</option>
                    </select>
                  </div>
                  <p className="text-[10px] text-stone-400 font-light font-mono leading-normal">
                    *Será redirigido al portal oficial PSE del banco correspondiente en ambiente Sandbox.
                  </p>
                </div>
              )}

              {paymentMethod === 'nequi' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold font-mono text-stone-500 uppercase">Número Cuenta Celular</label>
                    <input
                      type="text"
                      defaultValue={address.telefono}
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <p className="text-[10px] text-stone-400 font-light font-mono leading-normal">
                    *Recibirá una notificación push instantánea de aprobación dentro de su aplicación móvil Nequi.
                  </p>
                </div>
              )}

            </div>

            {/* Trigger simulator operations button */}
            <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-3">
              <button
                onClick={handleSimulatePaymentSuccess}
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-[#FAF8F5] text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-[#FAF8F5] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirmar Pago de Especialidad</span>
                  </>
                )}
              </button>

              <div className="flex justify-center items-center gap-1.5 text-[10px] text-[#122C9B] font-medium p-2 bg-[#FFA42C]/10 border border-[#FFA42C]/20 rounded-xl">
                <Sparkles className="w-3.5 h-3.5 text-[#FFA42C] font-bold" />
                <span>Modo Prueba Activo: No se debitará dinero real.</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

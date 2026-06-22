import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Plus, Trash2, Edit2, ShoppingBag, Landmark, MessageSquare, ClipboardList, PenTool, CheckCircle, RefreshCw, Calendar } from 'lucide-react';
import { Product, Order, Experience, ContactMessage, CoffeeCategory, OrderStatus, CarouselSlide, Reservation } from '../types';
import axios from 'axios';

export default function Admin() {
  const { user, loading: authLoading } = useAuthStore();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const [activeSegment, setActiveSegment] = useState<'productos' | 'ordenes' | 'mensajes' | 'slides' | 'reservas'>('productos');
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [isEditingSlide, setIsEditingSlide] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [slideForm, setSlideForm] = useState({
    title: '',
    subtitle: '',
    badge: '',
    buttonText: '',
    buttonLink: '',
    button2Text: '',
    button2Link: '',
    bgImage: '',
    orden: 1,
    activo: true
  });
  const [loading, setLoading] = useState(true);

  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#FFA42C] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-stone-500 text-sm">Verificando acceso...</p>
      </div>
    );
  }

  // CRUD Product Form States
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    precio_antes: '',
    stock: '',
    categoria: 'grano' as CoffeeCategory,
    origen: '',
    tueste: '',
    imagen_url: ''
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [pRes, oRes, mRes, sRes, rRes] = await Promise.allSettled([
        axios.get('/api/productos'),
        axios.get('/api/ordenes-todas'),
        axios.get('/api/contacto'),
        axios.get('/api/slides/all'),
        axios.get('/api/reservas')
      ]);
      if (pRes.status === 'fulfilled' && Array.isArray(pRes.value.data)) setProducts(pRes.value.data);
      if (oRes.status === 'fulfilled' && Array.isArray(oRes.value.data)) setOrders(oRes.value.data);
      if (mRes.status === 'fulfilled' && Array.isArray(mRes.value.data)) setMessages(mRes.value.data);
      if (sRes.status === 'fulfilled' && Array.isArray(sRes.value.data)) setSlides(sRes.value.data);
      if (rRes.status === 'fulfilled' && Array.isArray(rRes.value.data)) setReservations(rRes.value.data);
    } catch (err) {
      console.error('Error fetching admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.rol !== 'admin') {
      navigate('/auth/login?returnUrl=/admin');
      return;
    }
    loadData();
  }, [user, authLoading, navigate]);

  const handleCreateProductClick = () => {
    setIsEditingProduct(true);
    setEditingId(null);
    setProdForm({
      nombre: '',
      descripcion: '',
      precio: '',
      precio_antes: '',
      stock: '',
      categoria: 'grano',
      origen: '',
      tueste: '',
      imagen_url: 'https://images.unsplash.com/photo-1559056191-4819004e3827?auto=format&fit=crop&q=80&w=600'
    });
  };

  const handleEditProductClick = (p: Product) => {
    setIsEditingProduct(true);
    setEditingId(p.id);
    setProdForm({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio.toString(),
      precio_antes: p.precio_antes ? p.precio_antes.toString() : '',
      stock: p.stock.toString(),
      categoria: p.categoria,
      origen: p.origen,
      tueste: p.tueste,
      imagen_url: p.imagen_url
    });
  };

  const handleSaveProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...prodForm,
        precio: Number(prodForm.precio),
        precio_antes: prodForm.precio_antes ? Number(prodForm.precio_antes) : undefined,
        stock: Number(prodForm.stock),
        activo: true
      };

      if (editingId) {
        await axios.put(`/api/productos/${editingId}`, payload);
      } else {
        await axios.post('/api/productos', payload);
      }
      setIsEditingProduct(false);
      loadData();
    } catch (err: any) {
      alert('Error guardando producto: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Desea eliminar la cosecha seleccionada?')) return;
    try {
      await axios.delete(`/api/productos/${id}`);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateSlideClick = () => {
    setIsEditingSlide(true);
    setEditingSlideId(null);
    setSlideForm({
      title: '',
      subtitle: '',
      badge: '',
      buttonText: '',
      buttonLink: '/tienda',
      button2Text: '',
      button2Link: '',
      bgImage: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=85&w=1200',
      orden: slides.length + 1,
      activo: true
    });
  };

  const handleEditSlideClick = (s: CarouselSlide) => {
    setIsEditingSlide(true);
    setEditingSlideId(s.id);
    setSlideForm({
      title: s.title,
      subtitle: s.subtitle,
      badge: s.badge,
      buttonText: s.buttonText,
      buttonLink: s.buttonLink,
      button2Text: s.button2Text || '',
      button2Link: s.button2Link || '',
      bgImage: s.bgImage,
      orden: s.orden,
      activo: s.activo
    });
  };

  const handleSaveSlideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...slideForm,
        button2Text: slideForm.button2Text || null,
        button2Link: slideForm.button2Link || null
      };

      if (editingSlideId) {
        await axios.put(`/api/slides/${editingSlideId}`, payload);
      } else {
        await axios.post('/api/slides', payload);
      }
      setIsEditingSlide(false);
      loadData();
    } catch (err: any) {
      alert('Error guardando slide: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteSlide = async (id: string) => {
    if (!confirm('¿Desea eliminar este slide del carrusel?')) return;
    try {
      await axios.delete(`/api/slides/${id}`);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await axios.put(`/api/ordenes/${orderId}/estado`, { estado: status });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkMessageRead = async (msgId: string) => {
    try {
      await axios.put(`/api/contacto/${msgId}/leer`);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Metrics calculating
  const paidOrders = orders.filter(o => o.estado === 'pagado');
  const revenueTotal = paidOrders.reduce((sum, o) => sum + o.total, 0);
  const pendingInquiries = messages.filter(m => !m.respondido);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-amber-805 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-stone-500 text-sm">Cargando panel operacional...</p>
      </div>
    );
  }

  return (
    <div id="admin-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-5">
        <div className="space-y-1">
          <h1 className="font-display text-3xl font-extrabold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-[#FFA42C]" />
            <span>Mesa de Operaciones Jaguar</span>
          </h1>
          <p className="text-sm text-stone-500">Consola ejecutiva para CRUD de inventarios, despachos de transacciones y correspondencia.</p>
        </div>
        <button
          onClick={loadData}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-105 border border-stone-250 text-stone-700 text-xs font-semibold rounded-xl hover:bg-stone-50 transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refrescar Panel</span>
        </button>
      </div>

      {/* Analytics Bento metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-stone-200 p-6 rounded-2xl flex items-center gap-4">
          <span className="p-3 bg-emerald-50 text-emerald-800 rounded-xl leading-none">
            <Landmark className="w-6 h-6" />
          </span>
          <div>
            <span className="block text-xs uppercase text-stone-400 font-mono">Ventas Totales</span>
            <span className="text-lg font-black font-sans text-stone-900">${revenueTotal.toLocaleString('es-CO')} COP</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6 rounded-2xl flex items-center gap-4">
          <span className="p-3 bg-amber-50 text-amber-800 rounded-xl leading-none">
            <ClipboardList className="w-6 h-6" />
          </span>
          <div>
            <span className="block text-xs uppercase text-stone-400 font-mono font-mono">Pedidos Totales</span>
            <span className="text-lg font-black text-stone-900">{orders.length} órd.</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6 rounded-2xl flex items-center gap-4">
          <span className="p-3 bg-stone-50 text-stone-800 rounded-xl leading-none">
            <ShoppingBag className="w-6 h-6" />
          </span>
          <div>
            <span className="block text-xs uppercase text-stone-400 font-mono">Variedades Café</span>
            <span className="text-lg font-black text-stone-900">{products.length} réf.</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6 rounded-2xl flex items-center gap-4">
          <span className="p-3 bg-rose-50 text-rose-800 rounded-xl leading-none">
            <MessageSquare className="w-6 h-6" />
          </span>
          <div>
            <span className="block text-xs uppercase text-stone-400 font-mono">Contacto Activos</span>
            <span className="text-lg font-black text-stone-900">{pendingInquiries.length} pend.</span>
          </div>
        </div>
      </div>

      {/* Row tab selectors admin */}
      <div className="flex border-b border-stone-200 gap-6">
        <button
          onClick={() => { setActiveSegment('productos'); setIsEditingProduct(false); setIsEditingSlide(false); }}
          className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeSegment === 'productos' ? 'border-[#122C9B] text-[#122C9B] font-black' : 'border-transparent text-stone-500 hover:text-[#122C9B]'
          }`}
        >
          Cafés (CRUD)
        </button>
        <button
          onClick={() => { setActiveSegment('ordenes'); setIsEditingProduct(false); setIsEditingSlide(false); }}
          className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeSegment === 'ordenes' ? 'border-[#122C9B] text-[#122C9B] font-black' : 'border-transparent text-stone-500 hover:text-[#122C9B]'
          }`}
        >
          Despachar Pedidos
        </button>
        <button
          onClick={() => { setActiveSegment('mensajes'); setIsEditingProduct(false); setIsEditingSlide(false); }}
          className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeSegment === 'mensajes' ? 'border-[#122C9B] text-[#122C9B] font-black' : 'border-transparent text-stone-500 hover:text-[#122C9B]'
          }`}
        >
          Mensajes de Ayuda ({pendingInquiries.length})
        </button>
        <button
          onClick={() => { setActiveSegment('slides'); setIsEditingProduct(false); setIsEditingSlide(false); }}
          className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeSegment === 'slides' ? 'border-[#122C9B] text-[#122C9B] font-black' : 'border-transparent text-stone-500 hover:text-[#122C9B]'
          }`}
        >
          Banner Home
        </button>
        <button
          onClick={() => { setActiveSegment('reservas'); setIsEditingProduct(false); setIsEditingSlide(false); }}
          className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeSegment === 'reservas' ? 'border-[#122C9B] text-[#122C9B] font-black' : 'border-transparent text-stone-500 hover:text-[#122C9B]'
          }`}
        >
          Reservas ({reservations.length})
        </button>
      </div>

      {/* CRUD PANEL EXECUTION SECTIONS */}
      {isEditingProduct && !isEditingSlide ? (
        <form onSubmit={handleSaveProductSubmit} className="bg-white border border-stone-200 rounded-3xl p-8 shadow space-y-6 max-w-2xl">
          <h3 className="font-display text-xl font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <PenTool className="w-5 h-5 text-[#FFA42C]" />
            <span>{editingId ? 'Editar Cosecha Cafetera' : 'Añadir Nueva Cosecha o Café'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Nombre Producto</label>
              <input
                type="text"
                required
                value={prodForm.nombre}
                onChange={(e) => setProdForm({ ...prodForm, nombre: e.target.value })}
                placeholder="Ej. Jaguar Tabi Reserve"
                className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Categoría</label>
              <select
                value={prodForm.categoria}
                onChange={(e) => setProdForm({ ...prodForm, categoria: e.target.value as CoffeeCategory })}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              >
                <option value="grano">Café en Grano</option>
                <option value="molido">Café Molido</option>
                <option value="capsulas">Cápsulas compatibles</option>
                <option value="kit">Kits Barista</option>
                <option value="accesorio">Accesorio y vajilla</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-stone-700 font-mono uppercase font-semibold">Descripción o Reseña Sensorial</label>
            <textarea
              required
              value={prodForm.descripcion}
              onChange={(e) => setProdForm({ ...prodForm, descripcion: e.target.value })}
              placeholder="Notas de cata, perfil de taza, altitud de siembra..."
              rows={4}
              className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Precio Normal (COP)</label>
              <input
                type="number"
                required
                value={prodForm.precio}
                onChange={(e) => setProdForm({ ...prodForm, precio: e.target.value })}
                placeholder="45000"
                className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Precio Oferta (COP)</label>
              <input
                type="number"
                value={prodForm.precio_antes}
                onChange={(e) => setProdForm({ ...prodForm, precio_antes: e.target.value })}
                placeholder="55000"
                className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-light">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Stock Unidades</label>
              <input
                type="number"
                required
                value={prodForm.stock}
                onChange={(e) => setProdForm({ ...prodForm, stock: e.target.value })}
                placeholder="20"
                className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Origen Siembra</label>
              <input
                type="text"
                required
                value={prodForm.origen}
                onChange={(e) => setProdForm({ ...prodForm, origen: e.target.value })}
                placeholder="Huila"
                className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Nivel Tueste</label>
              <input
                type="text"
                required
                value={prodForm.tueste}
                onChange={(e) => setProdForm({ ...prodForm, tueste: e.target.value })}
                placeholder="Medio"
                className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Foto Url Referencia</label>
            <input
              type="text"
              required
              value={prodForm.imagen_url}
              onChange={(e) => setProdForm({ ...prodForm, imagen_url: e.target.value })}
              className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
            />
          </div>

          <div className="pt-2 flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-[#122C9B] hover:bg-[#FFA42C] text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              Guardar Cosecha
            </button>
            <button
              type="button"
              onClick={() => setIsEditingProduct(false)}
              className="px-6 py-3 bg-white border border-stone-300 text-stone-705 rounded-xl text-xs"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          
          {/* SEGMENT 1: PRODUCTOS LIST & OPTIONS */}
          {activeSegment === 'productos' && (
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 bg-stone-50 border-b border-stone-150 flex justify-between items-center">
                <h3 className="font-display font-bold text-stone-900 text-sm">Cosechas del Menú ({products.length})</h3>
                  <button
                    onClick={handleCreateProductClick}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#122C9B] text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Crear Cosecha</span>
                  </button>
              </div>

              {/* Grid tabular table products */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-105 border-b border-stone-150 text-stone-500 font-mono uppercase">
                      <th className="p-4 font-semibold">Cosecha / Descripción</th>
                      <th className="p-4 font-semibold">Sabor / Roast</th>
                      <th className="p-4 font-semibold">Stock</th>
                      <th className="p-4 font-semibold">Precio COP</th>
                      <th className="p-4 text-center font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-150">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span className="w-10 h-10 rounded-lg overflow-hidden bg-stone-105 flex-shrink-0 leading-none">
                              <img src={p.imagen_url} alt={p.nombre} className="w-full h-full object-cover" />
                            </span>
                            <div>
                              <p className="font-bold text-stone-900 text-sm">{p.nombre}</p>
                              <p className="text-[10px] text-stone-400 font-mono">Slug: {p.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-stone-700">{p.origen}</p>
                          <p className="text-[10px] text-stone-400 mt-0.5">Tueste: {p.tueste}</p>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                            p.stock === 0 ? 'bg-rose-50 text-rose-800' : 'bg-stone-100 text-stone-700'
                          }`}>
                            {p.stock} uds.
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold text-stone-900">
                          ${p.precio.toLocaleString('es-CO')}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEditProductClick(p)}
                              className="p-1 px-2.5 bg-stone-100 hover:bg-stone-250 border border-stone-200 rounded text-stone-700 cursor-pointer"
                              title="Editar producto"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1 px-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded text-rose-700 cursor-pointer"
                              title="Eliminar producto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SEGMENT 2: ORDENES / DESPACHOS LIST */}
          {activeSegment === 'ordenes' && (
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 bg-stone-50 border-b border-stone-150">
                <h3 className="font-display font-bold text-stone-900 text-sm">Gestionar Despachos de E-commerce</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-105 border-b border-stone-150 text-stone-500 font-mono uppercase">
                      <th className="p-4 font-semibold">Código Orden</th>
                      <th className="p-4 font-semibold">Cliente Correo</th>
                      <th className="p-4 font-semibold">Dirección Envío</th>
                      <th className="p-4 font-semibold font-mono">Total COP</th>
                      <th className="p-4 font-semibold text-center">Estado / Modificar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-150">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-stone-50/50">
                        <td className="p-4">
                          <p className="font-bold text-stone-900">{o.id}</p>
                          <p className="text-[10px] text-stone-400 mt-0.5">{new Date(o.created_at).toLocaleString()}</p>
                        </td>
                        <td className="p-4 font-mono text-stone-605">
                          {o.user_email || 'Cliente general'}
                        </td>
                        <td className="p-4 leading-normal">
                          <p className="font-semibold text-stone-800">{o.direccion_envio.direccion}</p>
                          <p className="text-[10px] text-stone-400">{o.direccion_envio.ciudad}, {o.direccion_envio.departamento}</p>
                        </td>
                        <td className="p-4 font-mono font-bold text-stone-950">
                          ${o.total.toLocaleString('es-CO')}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold ${
                              o.estado === 'pagado'
                                ? 'bg-emerald-50 text-emerald-800'
                                : o.estado === 'pendiente'
                                ? 'bg-amber-50 text-amber-800'
                                : o.estado === 'enviado'
                                ? 'bg-indigo-50 text-indigo-805'
                                : o.estado === 'entregado'
                                ? 'bg-slate-50 text-slate-808'
                                : 'bg-rose-50 text-rose-800'
                            }`}>
                              {o.estado}
                            </span>
                            
                            <select
                              value={o.estado}
                              onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as OrderStatus)}
                              className="px-2 py-1 bg-white border border-stone-300 text-[10px] rounded"
                            >
                              <option value="pendiente">Pendiente</option>
                              <option value="pagado">Pagado</option>
                              <option value="enviado">Enviado</option>
                              <option value="entregado">Entregado</option>
                              <option value="cancelado">Cancelado</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SEGMENT 3: MENSAJES DE SOPORTE */}
          {activeSegment === 'mensajes' && (
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm space-y-4">
              <div className="p-6 bg-stone-50 border-b border-stone-150">
                <h3 className="font-display font-bold text-stone-900 text-sm font-semibold">Correspondencia de Clientes ({messages.length})</h3>
              </div>

              {messages.length === 0 ? (
                <div className="p-8 text-center text-stone-500 font-light font-sans">No hay correspondencias cursadas.</div>
              ) : (
                <div className="divide-y divide-stone-150 px-6 pb-6">
                  {messages.map((m) => (
                    <div key={m.id} className="py-4 space-y-2 last:pb-0">
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-sm text-stone-900">{m.asunto}</h4>
                          <p className="text-[10px] text-stone-500 font-mono">Remitente: {m.nombre} ({m.email})</p>
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          {m.respondido ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold rounded-lg uppercase">
                              <CheckCircle className="w-3 h-3 text-emerald-700" />
                              <span>Revisado</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => handleMarkMessageRead(m.id)}
                              className="px-2.5 py-1.5 bg-[#122C9B] hover:bg-[#FFA42C] text-white text-[10px] font-mono font-bold rounded-xl transition cursor-pointer"
                            >
                              Marcar como Leído
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-105 leading-relaxed font-light font-sans">
                        {m.mensaje}
                      </p>
                    </div>
                  ))}
</div>
              )}
            </div>
          )}

          {/* SEGMENT 4: SLIDES / BANNER HOME */}
          {activeSegment === 'slides' && (
            <>
              {isEditingSlide ? (
                <form onSubmit={handleSaveSlideSubmit} className="bg-white border border-stone-200 rounded-2xl p-8 shadow space-y-6">
                  <h3 className="font-display text-xl font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-[#FFA42C]" />
                    <span>{editingSlideId ? 'Editar Slide del Banner' : 'Crear Nuevo Slide'}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Título (usa \n para salto de línea)</label>
                      <input
                        type="text"
                        required
                        value={slideForm.title}
                        onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                        placeholder="Café Exótico\nJaguar Coffee"
                        className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Badge / Etiqueta Superior</label>
                      <input
                        type="text"
                        required
                        value={slideForm.badge}
                        onChange={(e) => setSlideForm({ ...slideForm, badge: e.target.value })}
                        placeholder="Mejor Café de Cundinamarca"
                        className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Subtítulo / Descripción</label>
                    <textarea
                      required
                      value={slideForm.subtitle}
                      onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                      placeholder="Descripción breve del slide..."
                      rows={2}
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Texto Botón Principal</label>
                      <input
                        type="text"
                        required
                        value={slideForm.buttonText}
                        onChange={(e) => setSlideForm({ ...slideForm, buttonText: e.target.value })}
                        placeholder="Explorar Cosechas"
                        className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Link Botón Principal</label>
                      <input
                        type="text"
                        required
                        value={slideForm.buttonLink}
                        onChange={(e) => setSlideForm({ ...slideForm, buttonLink: e.target.value })}
                        placeholder="/tienda"
                        className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Texto Botón Secundario (opcional)</label>
                      <input
                        type="text"
                        value={slideForm.button2Text}
                        onChange={(e) => setSlideForm({ ...slideForm, button2Text: e.target.value })}
                        placeholder="Ver Academia"
                        className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Link Botón Secundario (opcional)</label>
                      <input
                        type="text"
                        value={slideForm.button2Link}
                        onChange={(e) => setSlideForm({ ...slideForm, button2Link: e.target.value })}
                        placeholder="/academia"
                        className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-stone-700 font-mono uppercase">URL de Imagen de Fondo</label>
                    <input
                      type="text"
                      required
                      value={slideForm.bgImage}
                      onChange={(e) => setSlideForm({ ...slideForm, bgImage: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                    />
                    {slideForm.bgImage && (
                      <div className="mt-2 rounded-lg overflow-hidden h-32 bg-stone-100">
                        <img src={slideForm.bgImage} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-700 font-mono uppercase">Orden</label>
                      <input
                        type="number"
                        min="1"
                        value={slideForm.orden}
                        onChange={(e) => setSlideForm({ ...slideForm, orden: parseInt(e.target.value) || 1 })}
                        className="w-20 px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-5">
                      <input
                        type="checkbox"
                        id="activo"
                        checked={slideForm.activo}
                        onChange={(e) => setSlideForm({ ...slideForm, activo: e.target.checked })}
                        className="w-4 h-4 rounded"
                      />
                      <label htmlFor="activo" className="text-xs font-medium text-stone-700">Slide activo</label>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#122C9B] hover:bg-[#FFA42C] text-white font-bold rounded-xl text-xs cursor-pointer transition-colors"
                    >
                      Guardar Slide
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingSlide(false)}
                      className="px-6 py-3 bg-white border border-stone-300 text-stone-700 rounded-xl text-xs"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-6 bg-stone-50 border-b border-stone-150 flex justify-between items-center">
                    <h3 className="font-display font-bold text-stone-900 text-sm">Slides del Banner Home ({(slides || []).length})</h3>
                    <button
                      onClick={handleCreateSlideClick}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#122C9B] text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Crear Slide</span>
                    </button>
                  </div>

                  <div className="divide-y divide-stone-150">
                    {(slides || []).map((s) => (
                      <div key={s.id} className="p-4 flex items-center gap-4 hover:bg-stone-50/50">
                        <div className="w-24 h-16 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                          <img src={s.bgImage} alt={s.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-stone-900 truncate">{s.title.replace(/\n/g, ' ')}</p>
                          <p className="text-[10px] text-stone-500 font-mono truncate">{s.badge} • Orden: {s.orden}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${s.activo ? 'bg-emerald-50 text-emerald-800' : 'bg-stone-100 text-stone-500'}`}>
                            {s.activo ? 'Activo' : 'Inactivo'}
                          </span>
                          <button
                            onClick={() => handleEditSlideClick(s)}
                            className="p-1.5 px-3 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg text-stone-700 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSlide(s.id)}
                            className="p-1.5 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* SEGMENT 5: RESERVAS / CALENDARIO */}
          {activeSegment === 'reservas' && (
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <h3 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#FFA42C]" />
                  <span>Solicitudes de Reserva</span>
                </h3>
                <button
                  onClick={loadData}
                  className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                  title="Recargar"
                >
                  <RefreshCw className="w-4 h-4 text-stone-500" />
                </button>
              </div>

              {reservations.length === 0 ? (
                <div className="text-center py-10 text-stone-500">
                  <Calendar className="w-10 h-10 mx-auto mb-3 text-stone-300" />
                  <p className="text-sm">No hay solicitudes de reserva aún.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-stone-500 border-b border-stone-100">
                        <th className="text-left py-2 px-3 font-mono uppercase">Fecha</th>
                        <th className="text-left py-2 px-3 font-mono uppercase">Tipo / Item</th>
                        <th className="text-left py-2 px-3 font-mono uppercase">Solicitante</th>
                        <th className="text-left py-2 px-3 font-mono uppercase">Contacto</th>
                        <th className="text-left py-2 px-3 font-mono uppercase">Personas</th>
                        <th className="text-left py-2 px-3 font-mono uppercase">Estado</th>
                        <th className="text-left py-2 px-3 font-mono uppercase">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((res) => (
                        <tr key={res.id} className="border-b border-stone-50 hover:bg-stone-50">
                          <td className="py-3 px-3 font-medium">{new Date(res.fecha + 'T00:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                          <td className="py-3 px-3">
                            <span className="block font-semibold text-stone-700">{res.item_nombre}</span>
                            <span className="text-stone-400 uppercase text-[10px]">{res.tipo}</span>
                          </td>
                          <td className="py-3 px-3">{res.nombre}</td>
                          <td className="py-3 px-3">
                            <span className="block">{res.telefono}</span>
                            <span className="text-stone-400">{res.email}</span>
                          </td>
                          <td className="py-3 px-3">{res.cantidad_personas}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                              res.estado === 'confirmada' ? 'bg-emerald-100 text-emerald-700' :
                              res.estado === 'cancelada' ? 'bg-rose-100 text-rose-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {res.estado}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              {res.estado !== 'confirmada' && (
                                <button
                                  onClick={async () => {
                                    try {
                                      await axios.put(`/api/reservas/${res.id}/estado`, { estado: 'confirmada' });
                                      loadData();
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  className="p-1.5 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                                  title="Confirmar"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {res.estado !== 'cancelada' && (
                                <button
                                  onClick={async () => {
                                    try {
                                      await axios.put(`/api/reservas/${res.id}/estado`, { estado: 'cancelada' });
                                      loadData();
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  className="p-1.5 bg-rose-100 text-rose-700 rounded hover:bg-rose-200 transition-colors"
                                  title="Cancelar"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}

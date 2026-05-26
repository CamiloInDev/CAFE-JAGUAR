import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Plus, Trash2, Edit2, ShoppingBag, Landmark, MessageSquare, ClipboardList, PenTool, CheckCircle, RefreshCw } from 'lucide-react';
import { Product, Order, Experience, ContactMessage, CoffeeCategory, OrderStatus } from '../types';
import axios from 'axios';

export default function Admin() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  const [activeSegment, setActiveSegment] = useState<'productos' | 'ordenes' | 'mensajes'>('productos');
  const [loading, setLoading] = useState(true);

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
      const [pRes, oRes, mRes] = await Promise.all([
        axios.get('/api/productos'),
        axios.get('/api/ordenes-todas'),
        axios.get('/api/contacto')
      ]);
      setProducts(pRes.data);
      setOrders(oRes.data);
      setMessages(mRes.data);
    } catch (err) {
      console.error('Error fetching admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.rol !== 'admin') {
      navigate('/auth/login?returnUrl=/admin');
      return;
    }
    loadData();
  }, [user, navigate]);

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
          onClick={() => { setActiveSegment('productos'); setIsEditingProduct(false); }}
          className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeSegment === 'productos' ? 'border-[#122C9B] text-[#122C9B] font-black' : 'border-transparent text-stone-500 hover:text-[#122C9B]'
          }`}
        >
          Cafés (CRUD)
        </button>
        <button
          onClick={() => { setActiveSegment('ordenes'); setIsEditingProduct(false); }}
          className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeSegment === 'ordenes' ? 'border-[#122C9B] text-[#122C9B] font-black' : 'border-transparent text-stone-500 hover:text-[#122C9B]'
          }`}
        >
          Despachar Pedidos
        </button>
        <button
          onClick={() => { setActiveSegment('mensajes'); setIsEditingProduct(false); }}
          className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeSegment === 'mensajes' ? 'border-[#122C9B] text-[#122C9B] font-black' : 'border-transparent text-stone-500 hover:text-[#122C9B]'
          }`}
        >
          Mensajes de Ayuda ({pendingInquiries.length})
        </button>
      </div>

      {/* CRUD PANEL EXECUTION SECTIONS */}
      {isEditingProduct ? (
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

        </div>
      )}

    </div>
  );
}

import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store';

export default function FloatingCart() {
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Link
      to="/carrito"
      className="fixed bottom-6 right-6 z-40 bg-[#FFA42C] text-white p-3.5 rounded-full shadow-lg hover:bg-[#e89420] transition-all hover:scale-110 active:scale-95"
      aria-label="Carrito de compras"
    >
      <ShoppingCart className="w-6 h-6" />
      {cartCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-[#122C9B] text-white rounded-full text-[11px] w-5.5 h-5.5 flex items-center justify-center font-bold ring-2 ring-white shadow-sm">
          {cartCount}
        </span>
      )}
    </Link>
  );
}

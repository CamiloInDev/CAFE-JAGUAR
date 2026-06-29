import { describe, it, expect, beforeEach, vi } from 'vitest';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

vi.mock('../src/store', async () => {
  const actual = await vi.importActual('../src/store');
  return actual;
});

describe('useCartStore', () => {
  let useCartStore: any;

  beforeEach(async () => {
    localStorageMock.clear();
    vi.clearAllMocks();
    const mod = await import('../../src/store');
    useCartStore = mod.useCartStore;
    useCartStore.setState({ items: [], total: 0 });
  });

  it('starts with empty cart', () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.total).toBe(0);
  });

  it('adds a product to cart', () => {
    const product = {
      id: 'prod_1',
      slug: 'test-coffee',
      nombre: 'Test Coffee',
      precio: 25000,
      stock: 10,
      categoria: 'grano' as const,
      origen: 'Test',
      tueste: 'Medio',
      imagen_url: 'https://example.com/img.jpg',
      descripcion: 'A test coffee',
      activo: true,
      created_at: new Date().toISOString(),
    };
    const store = useCartStore.getState();
    store.addToCart(product, 2);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product_id).toBe('prod_1');
    expect(state.items[0].cantidad).toBe(2);
    expect(state.total).toBe(50000);
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('increments quantity when adding existing product', () => {
    const product = {
      id: 'prod_1',
      slug: 'test-coffee',
      nombre: 'Test Coffee',
      precio: 25000,
      stock: 10,
      categoria: 'grano' as const,
      origen: 'Test',
      tueste: 'Medio',
      imagen_url: 'https://example.com/img.jpg',
      descripcion: 'A test coffee',
      activo: true,
      created_at: new Date().toISOString(),
    };
    const store = useCartStore.getState();
    store.addToCart(product, 2);
    store.addToCart(product, 1);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].cantidad).toBe(3);
    expect(state.total).toBe(75000);
  });

  it('throws error when exceeding stock', () => {
    const product = {
      id: 'prod_1',
      slug: 'test-coffee',
      nombre: 'Test Coffee',
      precio: 25000,
      stock: 3,
      categoria: 'grano' as const,
      origen: 'Test',
      tueste: 'Medio',
      imagen_url: 'https://example.com/img.jpg',
      descripcion: 'A test coffee',
      activo: true,
      created_at: new Date().toISOString(),
    };
    const store = useCartStore.getState();
    expect(() => store.addToCart(product, 5)).toThrow('quedan 3 unidades');
  });

  it('updates quantity', () => {
    const product = {
      id: 'prod_1',
      slug: 'test-coffee',
      nombre: 'Test Coffee',
      precio: 25000,
      stock: 10,
      categoria: 'grano' as const,
      origen: 'Test',
      tueste: 'Medio',
      imagen_url: 'https://example.com/img.jpg',
      descripcion: 'A test coffee',
      activo: true,
      created_at: new Date().toISOString(),
    };
    const store = useCartStore.getState();
    store.addToCart(product, 2);
    store.updateQuantity('prod_1', 5);

    const state = useCartStore.getState();
    expect(state.items[0].cantidad).toBe(5);
    expect(state.total).toBe(125000);
  });

  it('removes item when updating quantity to 0', () => {
    const product = {
      id: 'prod_1',
      slug: 'test-coffee',
      nombre: 'Test Coffee',
      precio: 25000,
      stock: 10,
      categoria: 'grano' as const,
      origen: 'Test',
      tueste: 'Medio',
      imagen_url: 'https://example.com/img.jpg',
      descripcion: 'A test coffee',
      activo: true,
      created_at: new Date().toISOString(),
    };
    const store = useCartStore.getState();
    store.addToCart(product, 2);
    store.updateQuantity('prod_1', 0);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.total).toBe(0);
  });

  it('removes item from cart', () => {
    const p1 = { id: 'prod_1', slug: 'a', nombre: 'A', precio: 10000, stock: 10, categoria: 'grano' as const, origen: 'T', tueste: 'M', imagen_url: '', descripcion: '', activo: true, created_at: '' };
    const p2 = { id: 'prod_2', slug: 'b', nombre: 'B', precio: 20000, stock: 10, categoria: 'molido' as const, origen: 'T', tueste: 'O', imagen_url: '', descripcion: '', activo: true, created_at: '' };
    const store = useCartStore.getState();
    store.addToCart(p1, 1);
    store.addToCart(p2, 1);
    store.removeFromCart('prod_1');

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product_id).toBe('prod_2');
    expect(state.total).toBe(20000);
  });

  it('clears the cart', () => {
    const p = { id: 'prod_1', slug: 'a', nombre: 'A', precio: 10000, stock: 10, categoria: 'grano' as const, origen: 'T', tueste: 'M', imagen_url: '', descripcion: '', activo: true, created_at: '' };
    const store = useCartStore.getState();
    store.addToCart(p, 1);
    store.clearCart();

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.total).toBe(0);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('jaguar_cart');
  });

  it('loads cart from localStorage', () => {
    const savedCart = JSON.stringify([
      { product_id: 'prod_1', cantidad: 3, product: { id: 'prod_1', precio: 10000 } },
    ]);
    localStorageMock.getItem.mockReturnValueOnce(savedCart);

    const store = useCartStore.getState();
    store.loadCartFromStorage();

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].cantidad).toBe(3);
    expect(state.total).toBe(30000);
  });
});

describe('useAuthStore', () => {
  let useAuthStore: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    const mod = await import('../../src/store');
    useAuthStore = mod.useAuthStore;
    useAuthStore.setState({ user: null, loading: false, error: null });
  });

  it('starts with no user', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('clears error', () => {
    useAuthStore.setState({ error: 'some error' });
    useAuthStore.getState().clearError();
    expect(useAuthStore.getState().error).toBeNull();
  });
});

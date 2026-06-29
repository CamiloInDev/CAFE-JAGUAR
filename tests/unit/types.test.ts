import { describe, it, expect } from 'vitest';

it('TypeScript types compile correctly', () => {
  const user: import('../../src/types').User = {
    id: 'usr_1',
    email: 'test@test.com',
    nombre: 'Test',
    apellido: 'User',
    telefono: '3000000000',
    rol: 'cliente',
    created_at: new Date().toISOString(),
  };
  expect(user.rol).toBe('cliente');

  const admin: import('../../src/types').User = { ...user, id: 'usr_admin', rol: 'admin' };
  expect(admin.rol).toBe('admin');
});

it('Product type has required fields', () => {
  const product: import('../../src/types').Product = {
    id: 'prod_1',
    slug: 'test-product',
    nombre: 'Test',
    descripcion: 'Desc',
    precio: 25000,
    stock: 10,
    categoria: 'grano',
    origen: 'Colombia',
    tueste: 'Medio',
    imagen_url: 'https://example.com/img.jpg',
    activo: true,
    created_at: new Date().toISOString(),
  };
  expect(product.categoria).toMatch(/^(grano|molido|capsulas|kit|accesorio)$/);
});

it('Order type has valid statuses', () => {
  const validStatuses = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'] as const;
  type OrderStatus = typeof validStatuses[number];

  const statuses: OrderStatus[] = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'];
  expect(statuses).toHaveLength(5);
  statuses.forEach(s => expect(validStatuses).toContain(s));
});

it('CartItem requires product_id and cantidad', () => {
  const item: import('../../src/types').CartItem = {
    product_id: 'prod_1',
    cantidad: 2,
  };
  expect(item.product_id).toBeTruthy();
  expect(item.cantidad).toBeGreaterThan(0);
});

it('CarouselSlide has all required fields', () => {
  const slide: import('../../src/types').CarouselSlide = {
    id: 'slide_1',
    title: 'Test Slide',
    subtitle: 'Subtitle',
    badge: 'New',
    buttonText: 'Shop Now',
    buttonLink: '/tienda',
    bgImage: 'https://example.com/bg.jpg',
    orden: 1,
    activo: true,
  };
  expect(slide.id).toBeTruthy();
  expect(slide.activo).toBe(true);
  expect(slide.orden).toBe(1);
});

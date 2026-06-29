import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { hashPassword } from '../server/db';

export const JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret_key_at_least_32_chars_long_12345';

export function createTestToken(overrides?: Partial<{ id: string; email: string; rol: 'cliente' | 'admin' }>) {
  return jwt.sign(
    { id: 'usr_test', email: 'test@test.com', rol: 'cliente', ...overrides },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export function createAdminToken() {
  return createTestToken({ id: 'usr_admin', email: 'admin@test.com', rol: 'admin' });
}

export function createUserToken() {
  return createTestToken({ id: 'usr_cliente', email: 'cliente@test.com', rol: 'cliente' });
}

export function getTestDbPath() {
  return path.join(process.cwd(), 'db.json');
}

export function writeTestDb(data: any) {
  fs.writeFileSync(getTestDbPath(), JSON.stringify(data, null, 2), 'utf-8');
}

export function backupRealDb() {
  const dbPath = getTestDbPath();
  if (fs.existsSync(dbPath)) {
    const backupPath = dbPath + '.bak';
    fs.copyFileSync(dbPath, backupPath);
  }
}

export function restoreRealDb() {
  const dbPath = getTestDbPath();
  const backupPath = dbPath + '.bak';
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, dbPath);
    fs.unlinkSync(backupPath);
  }
}

export function createTestDb() {
  const db: any = {
    users: [
      { id: 'usr_admin', email: 'admin@test.com', password_hash: hashPassword('admin123'), nombre: 'Admin', apellido: 'Test', telefono: '3000000000', rol: 'admin', created_at: new Date().toISOString() },
      { id: 'usr_cliente', email: 'cliente@test.com', password_hash: hashPassword('cliente123'), nombre: 'Cliente', apellido: 'Test', telefono: '3000000001', rol: 'cliente', created_at: new Date().toISOString() },
    ],
    products: [
      { id: 'prod_1', slug: 'test-product', nombre: 'Test Product', descripcion: 'A test product', precio: 25000, precio_antes: 30000, stock: 50, categoria: 'grano', origen: 'Test', tueste: 'Medio', imagen_url: 'https://example.com/img.jpg', activo: true, created_at: new Date().toISOString() },
      { id: 'prod_2', slug: 'inactive-product', nombre: 'Inactive Product', descripcion: 'An inactive product', precio: 10000, stock: 10, categoria: 'molido', origen: 'Test', tueste: 'Oscuro', imagen_url: 'https://example.com/img2.jpg', activo: false, created_at: new Date().toISOString() },
    ],
    experiences: [
      { id: 'exp_1', slug: 'test-experience', nombre: 'Test Experience', descripcion: 'A test experience', duracion_min: 60, precio: 50000, capacidad_max: 10, booking_widget: '<p>Booking</p>', imagen_url: 'https://example.com/exp.jpg', imagenes: [], activo: true },
    ],
    haciendas: [
      { id: 'hac_1', nombre: 'Test Hacienda', descripcion: 'A test hacienda', ubicacion: 'Test location', imagen_url: 'https://example.com/hac.jpg', airbnb_url: 'https://airbnb.com/test', booking_url: 'https://booking.com/test' },
    ],
    orders: [],
    contactMessages: [],
    slides: [],
    reservations: [],
    loginAttempts: {},
  };
  writeTestDb(db);
  return db;
}

export async function createTestApp() {
  const express = await import('express');
  const cookieParser = await import('cookie-parser');
  const helmet = await import('helmet');
  const app = express.default();

  app.use(helmet.default({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
  app.use(express.default.json());
  app.use(cookieParser.default());

  const authRoutes = (await import('../server/routes/auth')).default;
  const productRoutes = (await import('../server/routes/products')).default;
  const experienceRoutes = (await import('../server/routes/experiences')).default;
  const slideRoutes = (await import('../server/routes/slides')).default;
  const orderRoutes = (await import('../server/routes/orders')).default;
  const contactRoutes = (await import('../server/routes/contact')).default;
  const reservationRoutes = (await import('../server/routes/reservations')).default;

  app.get('/api/health', (_req: any, res: any) => res.json({ status: 'ok' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/productos', productRoutes);
  app.use('/api/experiencias', experienceRoutes);
  app.use('/api/slides', slideRoutes);
  app.use('/api/ordenes', orderRoutes);
  app.use('/api/contacto', contactRoutes);
  app.use('/api/reservas', reservationRoutes);

  return app;
}

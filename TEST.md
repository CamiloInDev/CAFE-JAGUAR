# Tests - Café Jaguar

## Estado Actual

**✅ 117 tests pasando — 10 archivos — 0 fallas**

```bash
npm test                 # Unit + Integration (vitest)
npm run test:coverage    # Con reporte de cobertura
npm run test:e2e         # E2E con Playwright (requiere servidor)
npm run test:all         # Unit + Integration + E2E
```

---

## Unit Tests (`tests/unit/`)

| Archivo | Tests | Que cubre |
|---------|-------|-----------|
| `store.test.ts` | 11 | Carrito Zustand: agregar, incrementar, límite de stock, eliminar, limpiar, localStorage |
| `types.test.ts` | 5 | Validación de formas de tipos TypeScript (Product, Order, CarouselSlide, etc.) |

## Integration Tests — DB (`tests/integration/db.test.ts`)

| Sección | Tests | Que cubre |
|---------|-------|-----------|
| Users | 8 | CRUD usuarios, búsqueda por email (case-insensitive), perfil, exclusión de password_hash |
| Products | 6 | CRUD productos, filtro por activos, búsqueda por slug |
| Login Attempts | 4 | Bloqueo tras 5 intentos, reinicio, decremento |
| Orders | 5 | Creación, deducción de stock al pagar, órdenes por usuario |
| Reservations | 2 | Creación, ordenamiento por fecha |
| Slides | 4 | Filtro activos, getAll, getById, delete |
| Contact | 2 | Creación de mensaje, listar todos |

## Integration Tests — API (`tests/integration/api/`)

| Archivo | Tests | Que cubre |
|---------|-------|-----------|
| `auth.test.ts` | 13 | Registro, login, perfil, logout, recuperación, bloqueo por intentos |
| `products.test.ts` | 13 | Listar, filtrar, buscar, CRUD admin, 403 para usuarios normales |
| `experiences.test.ts` | 6 | GET público, CRUD admin, 403 para usuarios |
| `slides.test.ts` | 10 | GET público, CRUD admin, 403 para usuarios, validación de campos |
| `orders.test.ts` | 12 | Firma Wompi, checkout, listar, cambio de estado admin, webhook simulado |
| `contact.test.ts` | 4 | Envío, listar admin, marcar como leído |
| `reservations.test.ts` | 10 | Crear con validación, fechas ocupadas, listar admin, cambio de estado |

## E2E Tests (`e2e/`)

| Archivo | Que cubre |
|---------|-----------|
| `auth.setup.ts` | Autenticación administrador (session storage) |
| `home.spec.ts` | Navegación首页, hero, secciones |
| `auth.spec.ts` | Login válido/inválido, registro, logout |
| `tienda.spec.ts` | Listado de productos, filtros |
| `cart.spec.ts` | Agregar al carrito, ver carrito |
| `checkout.spec.ts` | Protección de ruta (requiere auth), formulario, confirmación |
| `experiences.spec.ts` | Listado de experiencias |
| `contacto.spec.ts` | Formulario de contacto |
| `admin.spec.ts` | Control de acceso (admin vs user), CRUD productos, slides, órdenes |

---

## Problemas Encontrados y Soluciones

### 1. Colisión de IDs por `Date.now()`

**Problema**: La generación de IDs usaba `Date.now().toString(36)` en `server/db.ts`. Como `Date.now()` tiene precisión de milisegundos, dos llamadas en el mismo ms generaban el mismo ID. Al usar `deleteSlide` (que filtra por `filter(s => s.id !== id)`), se eliminaban TODAS las diapositivas en lugar de solo una.

**Solución**: Reemplazar con `crypto.randomUUID()` en los 6 generadores de ID (`usr_`, `prod_`, `exp_`, `msg_`, `slide_`, `res_`).

### 2. Pruebas de API de Slides usaban `all.body[0]` incorrecto

**Problema**: Los tests de slides obtenían el ID del primer slide con `all.body[0]`. Como múltiples slides tenían `orden: 1`, el orden no era determinista y podía apuntar al slide equivocado.

**Solución**: Cambiar a `all.body.find(s => s.title === '...')` para buscar por título explícito.

### 3. Afirmaciones frágiles basadas en conteo fijo

**Problema**: Tests como `expect(products).toHaveLength(1)` asumían un estado inicial fijo, pero tests anteriores modificaban los datos (ej: `saveProduct` creaba un producto extra).

**Solución**: Cambiar a comparaciones relativas: `expect(products).toHaveLength(before + 1)` y `expect(products).toHaveLength(before - 1)`.

### 4. Error EBUSY en tests paralelos de API

**Problema**: Múltiples archivos de test API escribían a `db.json` en paralelo, causando conflictos de archivo.

**Solución**: Deshabilitar paralelismo con `fileParallelism: false` en `vitest.config.ts`.

---

## ¿Subir Tests a Git y Producción?

### Recomendación: ✅ SÍ subir tests a Git, NO a producción

**Archivos de test (`.test.ts`, `e2e/`, `playwright.config.ts`, `vitest.config.ts`)**:
- **✅ Deben estar en Git**. Son parte del código fuente, documentan el comportamiento esperado y permiten CI/CD.
- **❌ No afectan producción**. Están en `devDependencies` de `package.json`. En producción se ejecuta `npm ci --production` o `npm install --omit=dev`, que los ignora por completo.

**Dependencias de test** (`@playwright/test`, `vitest`, `supertest`, etc.):
- Están en `devDependencies` → no se instalan en producción.
- El build `npm run build` no las incluye.

**Archivos generados por tests**:
| Archivo | ¿Git? | ¿Producción? |
|---------|-------|-------------|
| `playwright-report/` | ❌ ignorado | ❌ |
| `test-results/` | ❌ ignorado | ❌ |
| `coverage/` | ❌ ignorado | ❌ |
| `e2e/.auth/` | ❌ ignorado | ❌ |
| `*.test.json` | ❌ ignorado | ❌ |
| `db.json.bak` | ❌ ignorado (añadido) | ❌ |

**Conclusión**: Los tests están correctamente aislados. Puedes hacer push sin preocupaciones. En producción con `npm ci --production` nada de esto se ejecuta ni se instala.

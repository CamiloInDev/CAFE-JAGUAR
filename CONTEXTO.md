# Resumen del Rediseño: Sleek Interface - Jaguar Coffee

Este documento resume los cambios estéticos y estructurales aplicados para implementar el tema premium **Sleek Interface** en toda la plataforma transaccional de **Jaguar Coffee**, manteniendo intactas todas las funcionalidades y componentes dinámicos de la aplicación original.

---

## 🎨 Identidad Visual y Paleta de Colores (v2 - Azul Corporativo + Naranja Energético)

La nueva paleta transiciona de un estilo "café/espresso" a un estilo **corporativo premium** con tonos azul profundo y naranja vibrante:

*   **Color de Fondo Primario (`#FFF9F5`)**: Tono crema/off-white cálido que reemplaza el blanco genérico, ahora más claro y limpio.
*   **Color de Contraste Oscuro (`#122C9B`)**: Azul corporativo profundo que reemplaza al marrón espresso. Usado para textos primarios, fondos oscuros (hero, footer), encabezados y botones de alta jerarquía.
*   **Acento de Marca (`#FFA42C`)**: Naranja vibrante/ámbar que reemplaza al naranja anterior. Resalta estados activos, insignias de oferta, selecciones de navegación y CTAs principales.
*   **Color Secundario (`#3D5FC9`)**: Azul medio usado para hover states de enlaces y elementos secundarios.

### Variables CSS en Tailwind v4 (index.css)
```css
@theme {
  --color-brand-accent: #FFA42C;
  --color-brand-dark: #122C9B;
  --color-brand-secondary: #3D5FC9;
  --color-brand-bg: #FFF9F5;
}
```

### Reglas de Aplicación de Colores
| Rol | Color | Uso principal |
|-----|-------|---------------|
| Fondo página | `#FFF9F5` | `bg-[#FFF9F5]`, `text-[#122C9B]` en body |
| Oscuro/Estructura | `#122C9B` | `bg-[#122C9B]` (hero, footer), `text-[#122C9B]` (textos) |
| Acento/CTA | `#FFA42C` | Hover botones, badges activos, iconos destacados |
| Secundario | `#3D5FC9` | `hover:text-[#3D5FC9]`, hover en links de navegación |

---

## 🛠️ Ajustes y Mejoras por Componente

### 1. Sistema Global de Estilos (`/src/index.css`)
*   Se registraron variables core de Tailwind (`--color-brand-accent`, `--color-brand-dark`, `--color-brand-secondary`, `--color-brand-bg`).
*   Se actualizó la selección del navegador a `bg-[#FFA42C]/20` con color de texto `#122C9B`.
*   Scrollbars actualizados: thumb `#3D5FC9`, hover `#FFA42C`.

### 2. Barra de Navegación Principal (`/src/components/Navbar.tsx`)
*   **Rediseño del Logotipo**: Círculo con icono café en tono acento (`#FFA42C`) sobre fondo oscuro (`#122C9B`).
*   **Navegación**: Links en mayúsculas con hover `hover:text-[#3D5FC9]` (azul secundario), estado activo con borde inferior `#FFA42C`.
*   **Botón Carrito**: Badge naranja `#FFA42C`, fondo hover `bg-[#122C9B]/10`.
*   **Botones Auth**: Primary button `bg-[#122C9B]` → hover `bg-[#FFA42C]`.

### 3. Página de Inicio (`/src/pages/Home.tsx`)
*   **Hero Carrusel**: Fondo `#122C9B` (reemplaza `#2A1A12`), badges en `#FFA42C`.
*   **Bento Grid Valores**: Iconos en `#FFA42C`, fondos `bg-[#FFA42C]/10`.
*   **Tarjetas Producto**: Borde `border-[#122C9B]/10`, botón "Comprar" `bg-[#122C9B]` → hover `bg-[#FFA42C]`.
*   **Sección Experiencias**: Fondo `#122C9B` oscuro, CTAs en `#FFA42C`.
*   **Turismo/Academia Cards**: Hover links `hover:text-[#3D5FC9]`.

### 4. Catálogo Tienda (`/src/pages/Tienda.tsx`)
*   **Banner**: Fondo `#122C9B`, search button `#FFA42C`.
*   **Filtros activos**: `bg-[#FFA42C]`, inactivos `hover:border-[#FFA42C] hover:text-[#FFA42C]`.
*   **Cards productos**: Badge "Pocas unidades" en `#FFA42C`, hover overlay `#122C9B`.

### 5. Footer (`/src/components/Footer.tsx`)
*   **Fondo**: `#122C9B` (reemplaza `#2A1A12`).
*   **Logo/iconos**: Tono `#FFA42C`.
*   **Links hover**: `hover:text-[#FFA42C]`.

### 6. Formularios (Login, Register, Checkout, Admin, Contacto)
*   Botones primarios: `bg-[#122C9B]` → hover `bg-[#FFA42C]`.
*   Botones admin/secondary: hover `bg-[#FFA42C]`.
*   Iconos de secciones: `text-[#FFA42C]`.

---

## 6. Seguridad y Gobernanza de Agentes IA

El proyecto implementa un sistema de skills documentado en `agents.md` que define:

- **Estándar OWASP Agentic Skills Top 10 (AST10)** para modelado de amenazas.
- **Controles obligatorios**: sandboxing, allowlist de red, firma criptográfica, logging inmutable.
- **5 Skills activos** para seguridad (express-owasp-sec), frontend (react-vite-tailwind), pagos (wompi-checkout), base de datos (sequelize-mysql) y autenticación (jwt-cookie-auth).

---

---

## 🆕 Actualización de Contenido (27 May 2026)

### Navegación
- **Navbar**: Links activos: Tienda, Experiencias, Estadías, Academia, Contacto.

### Home.tsx
- **Hero Slides**: Títulos cortos en 2 líneas (ej: "Jaguar Coffee\nCafé Exótico")
- **Badge hero**: "Mejor Café de Cundinamarca" (sin emoji)
- **Subtítulos**: Mayor legibilidad con `text-white font-medium`
- **Botón 1er slide**: Solo 1 botón (Explorar Cosechas → /tienda)
- **Botón 2do slide**: 2 botones (Ver Academia + Reservar Ahora)
- **Valores**: Tueste sobre pedido, Certificación SCA & CQI, Transacción Segura
- **Nueva sección**: "Desarrollo de Producto" (Trilla/Tostión, Perfilación, Logística Exportadora)
- **Sección inferior**: Estadías + SCA Academy cards

### Experiencias.tsx (estático)
- 6 experiencias: Catación, Barismo, Tostión, Coffee Tour, Glamping, Scooter Tour
- Imágenes reales de cafejaguar.com
- Precios en COP

### Academia.tsx
- SCA Premier Campus con Mario Patiño AST
- Certificaciones SCA & CQI
- 3 cursos con sílabos

### Contacto.tsx
- Email: cafejaguarcolombia@gmail.com
- Tel: (+57) 315 7307016
- Dirección: Cra 4 # 12 – 78, La Candelaria, Bogotá

### Footer.tsx
- Grid 5 columnas: Marca, Líneas de Negocio, Atención al Cliente, Servicios, Contacto
- Email y teléfono reales integrados

---

## 🆕 Añadiduras de la Sesión Anterior (27 May 2026)

### 1. Logo Real del Cliente Integrado
*   **Archivos**: `public/images/logo-color.png`, `public/images/logo-azul.png` (copiados desde `src/assets/`).
*   **Recorte**: Se eliminó el padding transparente excesivo del PNG (1080×1081 → 448×459 px) para que el logo se renderice sin verse diminuto.
*   **Navbar** (`Navbar.tsx`): Reemplazado SVG inline por `<img src="/images/logo-color.png" className="h-16 w-auto" />`.
*   **Footer** (`Footer.tsx`): Logo color integrado en la sección de marca.
*   **Favicon** (`index.html`): `<link rel="icon" type="image/png" href="/images/logo-color.png" />`.

### 2. Títulos y Textos de Marca Actualizados
*   **Título de pestaña** (`index.html`): "Jaguar Coffee — Café de Especialidad Colombiano".
*   **Loading screen** (`App.tsx:44`): "Jaguar Coffee S.A.S." (antes "Jaguar Coffee Inc.").

### 3. Hero Carrusel — Mejoras
*   **Nuevo slide**: "Academia de Barismo Profesional" (4to slide) con link a `/academia`.
*   **Imagen real en 1er slide**: Reemplazada la URL Unsplash por `/images/HERO/CAFEwebp.webp` (foto de cerezas de café del cliente con logo superpuesto).
*   **Atenuación del filtro azul**: `mix-blend-multiply opacity-50` → `opacity-80` y gradiente `from-100%/via-40%` → `from-60%/via-15%` para que la fotografía real brille sin perder la identidad corporativa.

### 4. Navbar Desktop — Distribución Espaciada
*   **Ancho máximo**: `max-w-7xl` → `max-w-[90rem]`.
*   **Navegación central**: `flex-1 justify-center space-x-14` para evitar que los links queden "apiñados" en pantallas grandes.
*   **Padding lateral**: Incrementado a `px-8 lg:px-20`.

### 5. Limpieza del Entorno
*   Eliminados scripts Python temporales (`crop_logo.py`) y entorno virtual (`imgvenv`) usados para el recorte del logo.

---

## 🧭 Roadmap — Próximos Pasos

### FASE A — Personalización de Marca (Assets del Cliente)
> **Estado**: 🟡 **Parcialmente Completada** — Logo, contenido textual, imágenes de experiencias y academia integrados.

| Elemento | Estado | Acción requerida |
|----------|--------|------------------|
| **Logo** | ✅ Completado | Integrado en Navbar, Footer y Favicon |
| **Favicon** | ✅ Completado | Usando logo-color.png |
| **Hero imágenes** | 🟡 Parcial | 1ra imagen real; slides 2-4 con Unsplash |
| **Imágenes producto** | ⏳ Pendiente | Reemplazar URLs Unsplash en db.json |
| **Imágenes experiencias** | ✅ Completado | Integradas desde cafejaguar.com |
| **Imágenes academia** | ✅ Completado | Imagen real de Academia integrada |
| **Contenido textual** | ✅ Completado | Texto real de cafejaguar.com en todas las páginas |
| **Contact info** | ✅ Completado | Email, tel y dirección reales integrados |

### FASE B — Gestión de Carrusel desde Admin
> **Estado**: ✅ **Completada**

| Componente | Descripción |
|-----------|-------------|
| **Modelo DB** | Nuevo tipo `CarouselSlide` en `types.ts` y sección `slides` en `db.json` |
| **API REST** | `GET /api/slides` (público), `GET/POST/PUT/DELETE /api/slides/all` (admin) |
| **Componente carrusel** | Extraído de `Home.tsx` para consumir `GET /api/slides` |
| **Admin UI — Pestaña Banner Home** | Nuevo 4to segmento en `Admin.tsx` con tabla de slides + modal formulario |
| **Imágenes** | URLs externas (Unsplash, etc.) - el admin ingresa el link directamente |

---

## 🆕 Sesión: 29 May 2026 — Fixes Crashes + Limpieza + Prep Deploy

### 1. Fix: Carousel Crashes (`Home.tsx`)
**Problema**: `TypeError` cuando `slides` era `undefined`.  
**Solución**: Validación con `Array.isArray(slides)` y bound checks en `setCurrentSlide`.

### 2. Fix: Backend ERR_CONNECTION_REFUSED
**Problema**: Servidor Express no corría.  
**Solución**: Ejecutar `npm run dev` en terminal separada → `http://localhost:3000`.

### 3. Server Hardening (`server.ts`)
- Error handlers globales para `uncaughtException` y `unhandledRejection` (previene crashes silenciosos)
- Endpoint `GET /api/health` para monitoring
- Middleware de logging de requests API
- Global error handler para errores no capturados

### 4. DB Service (`server/db.ts`)
- Modelo completo `CarouselSlide` (CRUD completo en JSON DB)
- Métodos de seguridad: `checkLoginAttempt`, `recordFailedLogin`, `clearLoginAttempts`
- Bloqueo de cuenta tras 5 intentos fallidos (15 min lockout)
- Stock deduction al confirmar pagos

### 5. Admin Panel — Slide Management (`Admin.tsx`)
- Pestaña 4ta: "Banner Home" con tabla de slides activos
- Modal crear/editar con preview de imagen
- Toggle activo/inactivo por slide
- DELETE con confirmación

### 6. Limpieza Logs y Probing
- Eliminado `logs/server.log`
- Reemplazada función `log()` por `console.log()` en server.ts
- Sistema de logging sigue funcional (solo salida a consola, no a archivo)

### 7. Prep Deploy a Coolify/VPS
- Servidor listo para producción (`npm run build` + `npm start`)
- Base de datos JSON (`data/db.json`) funciona en servidor único
- Para producción en cloud: migrar a MySQL (FASE 1 pendiente)

### Archivos Nuevos
- `public/images/logo-color.png`, `public/images/logo-azul.png`
- `public/images/HERO/CAFEwebp.webp` (hero real)
- `src/components/Toast.tsx`
- `src/assets/` (logos originales del cliente)

### Estado Actual
- Servidor Express + Vite en puerto 3000 ✅
- 6 productos, 6 experiencias, 2 haciendas ✅
- Slides editables desde admin ✅
- Auth con JWT + cookies httpOnly ✅
- Wompi sandbox integrado ✅

---

## 🆕 Sesión: 4 Jun 2026 — Detalle de Experiencias + Bug Fix

### 1. Bug Fix: Loop Infinito de Recargas (CRÍTICO)
**Problema**: La página entraba en loop infinito de recargas constantes.
**Causa raíz**: En `server/db.ts`, función `readDb()`, se llamaba `writeDb()` en cada request si faltaban `slides` o `loginAttempts`, causando que Vite detectara cambios en el archivo y recargara la página.
**Solución**: Modificada la lógica para solo escribir si realmente hubo cambios (flag `needsWrite`).

### 2. Página de Detalle de Experiencias
**Agregado**: Cada experiencia ahora tiene página individual accesible via `/experiencias/:slug`.

#### Archivos modificados:
- `src/pages/Experiencias.tsx`: Tarjetas clickeables que redirigen a `/experiencias/{slug}`
- `src/pages/ExperienciaDetail.tsx`: Nueva página con:
  - Galería de imágenes con carrusel y miniaturas
  - Iconos dinámicos según tipo de experiencia
  - Panel lateral con precio, duración, capacidad y widget de Booking.com
  - Lista de "Qué está incluido"
  - Recomendaciones de asistencia
  - Certificado de participación
- `src/types.ts`: Agregado campo `imagenes: string[]` y `detalles_incluidos?: string[]` a interface `Experience`

#### Base de datos actualizada (`db.json`):
- 6 experiencias completas con slugs: `catacion`, `barismo`, `tueste`, `coffee-tour`, `glamping`, `scooter-tour`
- Cada experiencia tiene 4 imágenes en la galería
- Campo `booking_widget` con HTML del widget de Booking.com
- Campo `detalles_incluidos` con lista de beneficios

### 3. Nota Importante de Arquitectura
**La base de datos del servidor es `db.json` en la raíz del proyecto**, NO `data/db.json`. El servidor usa `process.cwd()` para resolver la ruta.

### Archivos modificados:
- `server/db.ts` - Fix loop infinito + experiencias con `imagenes`
- `server.ts` - Endpoint POST experiencias acepta campo `imagenes`
- `src/pages/Experiencias.tsx` - Links a detalle
- `src/pages/ExperienciaDetail.tsx` - Página completa con galería
- `src/types.ts` - Nuevos campos en Experience
- `db.json` - 6 experiencias con galería de imágenes

---

---

## 🆕 Sesión: 17 Jun 2026 — Hero Carousel, Privacidad y Fixes Footer

### 1. Fix: Indicadores del Hero Carousel (`Home.tsx`)
**Problema**: Los 4 puntos del carrusel quedaban cortados a la mitad por el bento grid de propuestas de valor que se superponía con `-mt-24`.
**Solución**: Se subieron los indicadores de `bottom-6` a `bottom-28 md:bottom-32` y se elevó su `z-index` a `z-40` para garantizar que sean completamente visibles.

### 2. Política de Privacidad y Consentimiento de Datos
**Contexto**: Cumplimiento con la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.

#### Archivos nuevos:
- `src/pages/Privacidad.tsx`: Página pública `/privacidad` con política de tratamiento de datos personales genérica y válida para Colombia.
- `src/components/PrivacyConsent.tsx`: Modal de consentimiento que se muestra en el primer ingreso, guarda aceptación en `localStorage` (`jaguar_privacy_consent`) y expone helpers `getPrivacyConsent` / `setPrivacyConsent`.

#### Archivos modificados:
- `src/App.tsx`: Ruta `/privacidad` añadida. Componente `<PrivacyConsent />` renderizado globalmente.
- `src/components/Footer.tsx`: Link a "Política de Privacidad" añadido en los créditos.
- `src/pages/Register.tsx`: Checkbox requerido de autorización de datos; al registrarse se guarda el consentimiento.
- `src/pages/CheckoutPage.tsx`: Checkbox requerido de autorización de datos antes de pagar.

### 3. Fix: Footer en Tablets (`Footer.tsx`)
**Problema**: El correo `cafejaguarcolombia@gmail.com` se salía de la pantalla en tablets.
**Solución**: Grid cambiado de `md:grid-cols-5` a `md:grid-cols-3 lg:grid-cols-5` para dar más ancho a las columnas en tablets, y se añadió `break-all` al email para evitar desbordamiento.

### Archivos modificados:
- `src/pages/Home.tsx` - Posición de dots del carrusel
- `src/pages/Privacidad.tsx` - Nueva página
- `src/components/PrivacyConsent.tsx` - Nuevo componente
- `src/App.tsx` - Ruta y render global del modal
- `src/components/Footer.tsx` - Link a privacidad + fix responsive
- `src/pages/Register.tsx` - Checkbox de autorización
- `src/pages/CheckoutPage.tsx` - Checkbox de autorización

---

## 🆕 Sesión: 18 Jun 2026 — Refactorización de Seguridad Backend (FASE 2 parcial)

### Contexto y Motivación

El proyecto se encuentra en etapa de desarrollo activo iterando con el cliente. Por decisión de arquitectura, **no se migra aún a MySQL/Sequelize (FASE 1) ni se integra Wompi real (FASE 4)** hasta que el frontend esté aprobado y se cuente con credenciales de producción. Sin embargo, `server.ts` se había convertido en un monolito de 650 líneas con endpoints, middlewares, secrets y lógica de pagos mezclados, lo que generaba:

- Deuda técnica creciente cada vez que se agregaba una nueva entidad.
- Riesgo de seguridad real por secrets hardcodeados (`JWT_SECRET`, `WOMPI_INTEGRITY_KEY`, `VITE_WOMPI_PUBLIC_KEY`) con fallbacks que podrían llegar a producción por accidente.
- Falta de headers de seguridad, CORS explícito y rate limiting global.
- Middleware de autenticación sin tipado (`any`), dificultando el mantenimiento.

El objetivo de esta sesión fue **ordenar el backend y aplicar controles de seguridad básicos sin romper el flujo de desarrollo actual**.

### Qué se hizo

1. **Modularización de `server.ts`**
   - Se extrajo la lógica de endpoints en rutas independientes bajo `server/routes/`.
   - Se centralizó la configuración de variables de entorno en `server/config/env.ts` con validación estricta mediante Zod.
   - Se crearon middlewares reutilizables tipados: autenticación, manejo de errores y rate limiting.
   - `server.ts` ahora solo hace bootstrap: middlewares globales, montaje de rutas y servidor Vite/static.

2. **Variables de entorno y secrets**
   - Nuevo `.env.example` con todas las variables requeridas documentadas.
   - Se creó `.env` local con valores de desarrollo (no se sube a git).
   - Se eliminaron los fallbacks hardcodeados de `JWT_SECRET`, `WOMPI_INTEGRITY_KEY` y `VITE_WOMPI_PUBLIC_KEY`.
   - El servidor falla al iniciar si falta alguna variable crítica.

3. **Seguridad agregada**
   - `helmet` para headers de seguridad (configuración relajada en desarrollo para no romper Vite HMR).
   - `cors` configurado: abierto en desarrollo, restringido a `APP_URL` en producción.
   - `express-rate-limit` con límites diferenciados para API general, autenticación y checkout.
   - `cookie-parser` y `express.json` mantenidos.
   - Middleware `authenticateToken` y `requireAdmin` tipados correctamente.
   - Error handler global que no expone stack traces en producción.

4. **Mantenimiento de dependencias**
   - Se ejecutó `npm audit fix` y se dejaron **0 vulnerabilidades** reportadas.

### Archivos Nuevos

- `server/config/env.ts` — validación centralizada de variables de entorno.
- `server/types/express.d.ts` — extensión tipada de `Express.Request` con `user`.
- `server/middleware/auth.ts` — `authenticateToken` y `requireAdmin` tipados.
- `server/middleware/errorHandler.ts` — manejo global de errores.
- `server/middleware/rateLimiter.ts` — limitadores de tasa por ruta.
- `server/routes/auth.ts` — registro, login, logout, perfil, recuperación.
- `server/routes/products.ts` — CRUD de productos.
- `server/routes/experiences.ts` — CRUD de experiencias.
- `server/routes/haciendas.ts` — listado de haciendas.
- `server/routes/contact.ts` — mensajes de contacto.
- `server/routes/orders.ts` — órdenes, preparación de pago Wompi y webhook de prueba.
- `server/routes/slides.ts` — CRUD del carrusel del home.
- `.env` — variables locales de desarrollo (ignorado por git).

### Archivos Modificados

- `server.ts` — refactorizado a bootstrap limpio.
- `.env.example` — documentación completa de variables requeridas.
- `package.json` / `package-lock.json` — nuevas dependencias: `helmet`, `cors`, `express-rate-limit`, `zod`, `@types/cors`.

### Qué se decidió NO cambiar (por estar en desarrollo)

- **Base de datos**: se mantiene `db.json` file-based para no agregar infraestructura mientras se itera el frontend.
- **Hash de contraseñas**: se mantiene el mecanismo actual para que los usuarios precargados (`admin@jaguarcoffee.com`, `cliente@jaguarcoffee.com`) sigan funcionando. Se migrará a `bcrypt` con salt por usuario junto con MySQL.
- **Wompi**: se mantiene el sandbox/simulador. La integración real se hará en FASE 4 con credenciales reales y validación SHA256 del webhook.

### Verificación

- `npm run lint` ✅ — TypeScript compila sin errores.
- Servidor arranca correctamente ✅ — probado en puerto 3001 (el puerto 3000 estaba ocupado por otra instancia del proyecto).
- `npm audit fix` ✅ — 0 vulnerabilidades.

---

## 🆕 Sesión: 18 Jun 2026 — Pentesting Externo Inicial (versión anterior desplegada)

### Contexto

Se realizó un pentesting externo pasivo/ligero contra el subdominio `jaguar.getindev.com` (IP `185.190.142.94`) **antes** de subir la refactorización de seguridad del backend. El objetivo fue establecer una línea base "antes/después" para validar el impacto de los cambios de FASE 2.

> **Nota importante**: el pentesting se limitó a reconocimiento, headers, endpoints públicos y pruebas no destructivas. No se realizaron ataques de fuerza bruta reales, DDoS ni explotación de daños.

### Herramientas utilizadas

- `curl.exe` — headers y respuestas HTTP/HTTPS.
- `Resolve-DnsName` — resolución DNS.
- `Test-NetConnection` — escaneo de puertos comunes.
- `.NET SslStream` — inspección del certificado SSL/TLS.

### Hallazgos de seguridad

#### 🔴 Críticos / Altos

1. **Falta de headers de seguridad HTTP**
   - No se encontraron: `Strict-Transport-Security` (HSTS), `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
   - **Riesgo**: el sitio es vulnerable a clickjacking, MIME sniffing, y no fuerza HTTPS en subsiguientes visitas.

2. **Exposición de tecnología: `X-Powered-By: Express`**
   - Tanto en respuestas del proxy como en el puerto 3000 directo.
   - **Riesgo**: facilita fingerprinting del backend.

3. **Puerto 3000 expuesto directamente a internet**
   - La aplicación Node.js escucha en el puerto 3000 y es accesible sin pasar por OpenResty.
   - **Riesgo**: permite ataques directos al backend, bypass parcial de controles del proxy, y fuga de headers (`X-Powered-By`, `Keep-Alive`).

4. **SSH (puerto 22) expuesto públicamente**
   - Es común, pero debe verificarse que no permita login root con password y que tenga `fail2ban` o equivalente.

5. **Endpoints rotos devolviendo 500**
   - `POST /api/auth/login` → 500 (incluso con payload válido).
   - `POST /api/contacto` → 500.
   - `POST /api/ordenes/preparar-pago` → 500 en lugar de 401 al no estar autenticado.
   - `PUT /api/productos/:id` → 500.
   - **Riesgo**: errores 500 pueden ser utilizados para DoS o para enumerar comportamientos internos. Afortunadamente **no se exponen stack traces** en las respuestas.

#### 🟡 Medios

1. **Rate limiting ausente en capa de aplicación**
   - La versión anterior solo tiene bloqueo por intentos fallidos por cuenta (`db.ts`), pero no hay rate limiting por IP en los endpoints.
   - No se pudo confirmar el comportamiento real porque `/api/auth/login` responde 500.

2. **CORS no configurado explícitamente**
   - No se observaron headers `Access-Control-Allow-Origin` en respuestas con `Origin` arbitrario.
   - No es un riesgo directo, pero la configuración explícita mejora la seguridad y previsibilidad.

3. **SPA fallback para rutas inexistentes**
   - Solicitudes a `/.env`, `/server.ts`, `/db.json`, `/package.json` devuelven `index.html` (`Content-Type: text/html`).
   - Esto es correcto (no exponen archivos reales), pero dificulta detectar 404s reales.

#### 🟢 Buenos / Correctos

1. **Certificado SSL/TLS válido**
   - Let's Encrypt para `jaguar.getindev.com`.
   - Protocolo TLS 1.2, firma ECDSA con SHA-384.
   - Vigente hasta agosto 2026.

2. **Autorización en endpoints admin**
   - `/api/ordenes-todas` y `/api/slides/all` devuelven 401 sin token.
   - `DELETE /api/productos/:id` devuelve 401 sin token.

3. **No hay exposición de stack traces**
   - Los errores 500 devuelven un mensaje genérico: `{"error":"Error interno del servidor. Intente de nuevo."}`.

4. **No vulnerable a SQL injection**
   - La búsqueda en `/api/productos?q=...` usa filtrado en JSON file, no SQL. Payloads como `' OR '1'='1` devuelven array vacío.

### Recomendaciones inmediatas (antes del siguiente deploy)

1. **Subir la refactorización de seguridad** (Helmet agregará los headers faltantes).
2. **Cerrar el puerto 3000 al público** o restringirlo a localhost; solo 80/443 deberían estar abiertos.
3. **Verificar configuración SSH**: deshabilitar login root con password, usar keys, activar fail2ban.
4. **Investigar los errores 500** en los endpoints rotos; podrían deberse a que `db.json` no se inicializó correctamente en el entorno de Coolify.
5. **Cambiar o eliminar las credenciales por defecto** `admin@jaguarcoffee.com` / `admin123` antes de producción.

---

## 🆕 Sesión: 18 Jun 2026 — Pausa para Actualización de Frontend

### Contexto

El cliente finalmente entregó la información necesaria para actualizar el frontend. Por decisión de priorización, **se pausa temporalmente el redeploy de la refactorización de seguridad (FASE 2) y el pentesting comparativo** hasta aplicar los cambios del frontend. Esto evita deployar dos veces seguidas.

### Flujo de trabajo definido

1. Aplicar cambios de frontend con la información proporcionada por el cliente.
2. Subir cambios de frontend al repositorio.
3. Configurar variables de entorno en Coolify (ver tabla inferior).
4. Redeployar la aplicación completa en Coolify.
5. Repetir el pentesting externo contra `jaguar.getindev.com`.
6. Documentar comparativa "antes/después" en este archivo.

### Variables de entorno para Coolify

Todas las variables son obligatorias para que el servidor arranque tras la refactorización (validación con Zod):

| Name | Valor en producción | Buildtime | Runtime | Literal |
|------|---------------------|-----------|---------|---------|
| `NODE_ENV` | `production` | ❌ | ✅ | ✅ |
| `PORT` | `3000` | ❌ | ✅ | ✅ |
| `APP_URL` | `https://jaguar.getindev.com` | ❌ | ✅ | ✅ |
| `JWT_SECRET` | Generar con `crypto.randomBytes(64)` | ❌ | ✅ | ✅ |
| `WOMPI_INTEGRITY_KEY` | Sandbox o producción de Wompi | ❌ | ✅ | ✅ |
| `VITE_WOMPI_PUBLIC_KEY` | Sandbox o producción de Wompi | ✅ | ✅ | ✅ |

> **Nota**: en Coolify, `Buildtime` debe marcarse solo para `VITE_WOMPI_PUBLIC_KEY` porque Vite la necesita durante el build. Las demás solo requieren `Runtime`. `Literal` debe marcarse en todas para evitar expansión de variables.

### Estado de Wompi

- **Wompi real/producción**: pendiente. Requiere cuenta del cliente verificada con NIT y cuenta bancaria.
- **Wompi sandbox**: recomendado para desarrollo/pruebas. Permite deployar y probar el checkout sin dinero real.
- **Alternativa temporal**: si no se crea la cuenta sandbox ahora, se pueden usar valores de prueba (`integridad_sandbox_key_123`, `pub_test_wompi_sandbox_public_key`) solo para que el servidor arranque en desarrollo. **Deben reemplazarse antes de producción real.**

### Datos importantes del pentesting previo

- **Target**: `jaguar.getindev.com` (IP `185.190.142.94`).
- **Autorización**: propietario del VPS y dominio confirmó permiso.
- **Problemas críticos detectados en versión anterior**:
  - Faltan headers de seguridad HTTP.
  - `X-Powered-By: Express` expone tecnología.
  - Puerto 3000 expuesto directamente.
  - SSH (22) expuesto.
  - Endpoints `/api/auth/login`, `/api/contacto`, `/api/ordenes/preparar-pago`, `PUT /api/productos/:id` devuelven 500.
- **Esperado tras redeploy con FASE 2**:
  - Headers de seguridad presentes (Helmet).
  - Sin `X-Powered-By: Express`.
  - Rate limiting activo.
  - Endpoints 500 corregidos (o al menos dan 401 cuando corresponda).

---

## 🆕 Sesión: 18 Jun 2026 — Actualización de Experiencias (información del cliente)

### Contexto

El cliente entregó la información oficial para la sección de experiencias. Se aplicaron los cambios tanto en la lista pública (`Experiencias.tsx`) como en la base de datos (`db.json`) que alimenta las páginas de detalle (`ExperienciaDetail.tsx`).

### Decisiones tomadas

- Se mantienen **solo las experiencias incluidas en la información del cliente**.
- Se **eliminan** del sitio de experiencias:
  - `Taller de Barismo` → se moverá a **Academia**.
  - `Coffee Tour — Finca y Beneficio` → no está en la información del cliente.
  - `Glamping entre Cafetales` → se moverá a **Estadías**.
- Se agrega un campo opcional `recomendaciones?: string[]` a la interfaz `Experience` para mostrar recomendaciones específicas por experiencia.

### Experiencias finales

| # | Nombre | Slug | Duración | Capacidad | Precio |
|---|--------|------|----------|-----------|--------|
| 1 | Cata de Cafés de Especialidad | `catacion` | 45 min | 10 | $90.000 COP |
| 2 | Métodos de Preparación | `metodos-de-preparacion` | 45 min | 10 | $90.000 COP |
| 3 | Experiencia de Tueste | `tueste` | 45 min | 10 | $115.000 COP |
| 4 | Experiencia Completa Jaguar Coffee | `experiencia-completa` | 3 h | 10 | $200.000 COP |
| 5 | Scooter Tour — Centro Histórico de Bogotá | `scooter-tour` | 1h 45min - 2h | 7 | Desde $65.000 COP |

### Notas específicas

- **Métodos de Preparación**: usa la imagen previa de filtrados. Widget de Booking.com por ahora.
- **Experiencia Completa**: se muestra como tarjeta más con su propia página de detalle, como solicitó el cliente.
- **Scooter Tour**: se resumió el tarifario y términos del guía turístico freelance. No tiene reserva por Booking.com; el widget redirige a `/contacto` para reserva directa mientras se define el canal de reserva.

### Archivos modificados

- `src/pages/Experiencias.tsx` — lista de experiencias actualizada y texto introductorio del cliente.
- `src/pages/ExperienciaDetail.tsx` — sección de recomendaciones ahora usa `experience.recomendaciones` cuando existe.
- `src/types.ts` — agregado campo opcional `recomendaciones` a `Experience`.
- `db.json` — experiencias actualizadas; slide 3 del home ajustado al nuevo listado.

---

## 🆕 Sesión: 18 Jun 2026 — Datos de Contacto, Redes y Horarios

### Contexto

El cliente entregó los datos oficiales de contacto, redes sociales y horarios de Casa Jaguar. Se actualizaron Footer y página de Contacto.

### Cambios aplicados

- **Correo electrónico**: `support.coffe.jaguar@gmail.com`
- **Instagram**: https://www.instagram.com/jaguarcoffeecolombia
- **Facebook**: https://www.facebook.com/share/1H51icMuVf/
- **Horarios Casa Jaguar**:
  - Lun – Mié: 9:00 a.m. – 7:00 p.m.
  - Jue: 9:00 a.m. – 8:00 p.m.
  - Vie – Sáb: 8:00 a.m. – 9:00 p.m.
  - Dom normal: 10:00 a.m. – 7:00 p.m.
  - Dom con lunes festivo: 10:00 a.m. – 9:00 p.m.
  - Lunes festivo: 10:00 a.m. – 7:00 p.m.

### Archivos modificados

- `src/components/Footer.tsx` — redes sociales, horarios, nuevo correo, tamaños de fuente mejorados.
- `src/pages/Contacto.tsx` — redes sociales, horarios, nuevo correo, tamaños de fuente mejorados.

### Notas

- Se mejoraron tamaños de fuente en Footer y Contacto para mayor legibilidad (de `text-[10px]`/`text-xs` a `text-sm` en contenido principal).
- Botones de Instagram y Facebook enlazan directamente a los perfiles oficiales.

---

## 🆕 Sesión: 22 Jun 2026 — Integración de "Nuestra Planta"

### Contexto

La página `Nuestra Planta` (`src/pages/NuestraPlanta.tsx`) y una sección homónima en `Home.tsx` habían sido agregadas en una iteración previa no documentada en este archivo. Sin embargo, la sección no estaba integrada en la navegación principal y generaba redundancia con la sección posterior de "Desarrollo de Producto" en el Home.

### Qué se hizo

1. **Navegación principal (`Navbar.tsx`)**
   - Se agregó el link **"Nuestra Planta"** entre "Productos" y "Experiencias", manteniendo el orden lógico de líneas de negocio.
   - Se ajustó el espaciado del menú desktop a `space-x-6 lg:space-x-10 xl:space-x-14` para mantener el diseño equilibrado con 7 links en lugar de 6.
   - El link también se renderiza en el menú mobile drawer.

2. **Footer (`Footer.tsx`)**
   - Se agregó **"Planta de Tueste"** con link a `/nuestra-planta` en la columna **Líneas de Negocio**, ubicado entre E-commerce y Experiencias.

3. **Home (`Home.tsx`)**
   - Se eliminó la sección completa **"Nuestra Planta de Tueste"** (hero interno, grid de servicios y CTA) para evitar duplicidad de contenido.
   - Se limpió el import de `lucide-react` eliminando `MessageCircle`, que dejó de usarse al quitar la sección.
   - Se renumeraron los comentarios de sección del Home tras la eliminación.

### Archivos modificados

- `src/components/Navbar.tsx` — link de Nuestra Planta + espaciado responsive.
- `src/components/Footer.tsx` — link de Planta de Tueste en Líneas de Negocio.
- `src/pages/Home.tsx` — eliminación de la sección redundante y limpieza de imports.
- `CONTEXTO.md` — documentación de esta sesión.

### Verificación

- `npm run lint` ✅ — TypeScript compila sin errores.

## 🆕 Sesión: 22 Jun 2026 — Rediseño de la Página "Nuestra Planta"

### Contexto

La página `/nuestra-planta` tenía un diseño poco pulido: secciones amontonadas, falta de jerarquía visual, imágenes genéricas sin tratamiento coherente y texto excesivo. Se aplicó la skill local **react-vite-tailwind** para reconstruirla con un enfoque premium, espacios generosos y componentes nativos de React.

### Qué se hizo

1. **Nueva arquitectura visual (`src/pages/NuestraPlanta.tsx`)**
   - **Hero full-width** con imagen de fondo, overlay azul corporativo (`#122C9B`) y título grande con acento naranja (`#FFA42C`).
   - **Stats strip** flotante con 4 indicadores clave (origen, micro-tostados, protocolos SCA, trazabilidad).
   - **Sección "Tecnología y pasión"** con texto + galería de imágenes con carrusel automático y controles manuales.
   - **Servicios** en grid de 3 columnas con cards blancas, iconos naranjas y flecha de hover.
   - **Proceso de 6 pasos** como timeline alternado (zig-zag) en desktop, limpio en mobile.
   - **CTA final** con fondo oscuro, blur y botones a WhatsApp y contacto.

2. **Aplicación de la skill react-vite-tailwind**
   - Se usó Tailwind v4 CSS-first con las variables de marca del proyecto.
   - Se encapsularon estilos repetitivos en sub-componentes nativos: `SectionHeader`, `ServiceCard`, `ProcessStep`, `StatItem`.
   - No se utilizó `@apply`.
   - Estado local con `useState`/`useCallback` para el carrusel de imágenes.

3. **Fix del Navbar**
   - Se cambió el menú desktop para que aparezca solo desde `lg` (1024px), evitando el apiñamiento en tablets.
   - Se redujo espaciado y tamaño de fuente en breakpoints intermedios.
   - Se agregó `whitespace-nowrap` a los links para evitar saltos de línea.

### Archivos modificados

- `src/pages/NuestraPlanta.tsx` — reconstrucción completa de la página.
- `src/components/Navbar.tsx` — ajustes de espaciado y breakpoint del menú desktop.
- `CONTEXTO.md` — documentación de esta sesión.

### Verificación

- `npm run lint` ✅ — TypeScript compila sin errores.

## 🆕 Sesión: 22 Jun 2026 — Fix: Scroll al Cambiar de Página

### Contexto

En una SPA con React Router, el navegador conserva la posición del scroll al cambiar de ruta. Esto causaba que, si el usuario bajaba en una página y luego navegaba a otra, la nueva página se renderizara en la misma posición inferior en lugar de volver al inicio.

### Qué se hizo

1. **Nuevo componente `ScrollToTop.tsx`**
   - Usa `useLocation` de `react-router-dom` para detectar cambios de ruta.
   - En cada cambio de `pathname`, ejecuta `window.scrollTo({ top: 0, left: 0, behavior: 'auto' })`.
   - El componente no renderiza ningún elemento (`return null`).

2. **Integración en `App.tsx`**
   - Se importó `ScrollToTop` y se colocó dentro de `<BrowserRouter>`, justo antes del layout principal.

### Archivos modificados

- `src/components/ScrollToTop.tsx` — nuevo componente.
- `src/App.tsx` — integración del componente.
- `CONTEXTO.md` — documentación de esta sesión.

### Verificación

- `npm run lint` ✅ — TypeScript compila sin errores.

---

---

## 🆕 Sesión: 29 Jun 2026 — Deploy Producción, Estadías Airbnb, Skills IA

### 1. Fix: Content Security Policy (CSP) en Producción
**Problema**: Helmet en producción bloqueaba:
- Embeds de Instagram (`ERR_BLOCKED_BY_CSP`)
- Imágenes de `cafejaguar.com` y `images.unsplash.com`
- Fuente Krub de Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`)
**Solución**: CSP personalizado en `server.ts` con `frame-src`, `img-src`, `style-src`, `font-src` configurados para permitir estos orígenes.

### 2. Limpieza: Eliminación de Referencias Google/Gemini
- Eliminada dependencia `@google/genai` de `package.json`
- Eliminada variable `GEMINI_API_KEY` de `env.ts`, `.env` y `.env.example`
- Eliminada capability Gemini de `metadata.json`

### 3. Despliegue en Coolify
- Configuradas variables de entorno en Coolify (JWT_SECRET, WOMPI keys, APP_URL)
- Ninguna variable requiere Buildtime — todas solo Runtime
- App corriendo en producción ✅

### 4. Actualización de Estadías — Glamping y ECO Hostal
**Contexto**: El cliente entregó info oficial de Airbnb para las propiedades.

**Glamping** (`src/pages/GlampingDetail.tsx`):
- Nueva descripción con caminatas ecológicas, fogata, atardeceres, agro turismo
- Badge **Pet Friendly** + features: parqueadero, WiFi, jardín
- Google Maps: `maps.app.goo.gl/ekvGgp5soN9PfTr86`
- Airbnb: `airbnb.es/h/jaguarglampibg`

**ECO Hostal** (`src/pages/EcoHostalDetail.tsx`):
- Ref. a Finca la Esperanza y 42 km de Bogotá
- Google Maps link
- Airbnb: `airbnb.es/h/jaguarhostal`

**Turismo/Estadías** (`src/pages/Turismo.tsx`):
- Cards rediseñadas con botón "Ver más" + botón directo "Airbnb"
- Sección de ubicación con link a Google Maps

**Sidebar de reservas rediseñado** (ambas páginas):
- Tabs tipo botón: **Reserva directa** (calendario + WhatsApp) | **Airbnb** (redirección)
- Por defecto muestra "Reserva directa"; al cambiar a Airbnb muestra info y botón

### 5. Skills de IA Instaladas
- `open-hax/opencode-skills` — 74 skills (testing-e2e, playwright, github-actions, git-workflow, etc.)
- `playwright` desde `bobmatnyc/claude-mpm-skills` — E2E testing
- `.agents/` y `skills-lock.json` agregados a `.gitignore`

### Archivos modificados
- `server.ts` — CSP personalizado para producción
- `src/pages/GlampingDetail.tsx` — info cliente, Airbnb, Google Maps, pet friendly, tabs reserva
- `src/pages/EcoHostalDetail.tsx` — Airbnb, Google Maps, tabs reserva
- `src/pages/Turismo.tsx` — rediseño completo con enlaces Airbnb
- `package.json` — eliminado `@google/genai`
- `server/config/env.ts` — eliminado `GEMINI_API_KEY`
- `.env` / `.env.example` — limpieza Gemini
- `metadata.json` — limpieza Gemini
- `.gitignore` — agregados `.agents/` y `skills-lock.json`

### Verificación
- `npm run lint` ✅ — TypeScript compila sin errores
- Deploy en Coolify ✅ — app corriendo en producción
- Instagram embeds funcionales ✅
- Fuente Krub cargando correctamente ✅

## 🆕 Sesión: 29 Jun 2026 — Suite de Tests Completa (117 tests) + Fix CSP Google Maps

### 1. Suite de Tests

Se implementó una suite completa de automatizada con **Vitest** y **Playwright**:

**Unit Tests** (`tests/unit/`):
- `store.test.ts` (11): Carrito Zustand — agregar, incrementar, límite stock, eliminar, limpiar, localStorage
- `types.test.ts` (5): Validación de formas TypeScript

**Integration Tests — DB** (`tests/integration/db.test.ts`) (33):
- Users, Products, Login Attempts, Orders, Reservations, Slides, Contact Messages

**Integration Tests — API** (`tests/integration/api/`) (~60):
- `auth.test.ts` (13), `products.test.ts` (13), `experiences.test.ts` (6), `slides.test.ts` (10), `orders.test.ts` (12), `contact.test.ts` (4), `reservations.test.ts` (10)

**E2E Playwright** (`e2e/`) (8 spec files):
- auth, home, tienda, cart, checkout, experiencias, contacto, admin (control de acceso)

### 2. Problemas Encontrados y Soluciones

| Problema | Causa | Solución |
|----------|-------|----------|
| Colisión de IDs | `Date.now().toString(36)` — 2 llamadas en el mismo ms = mismo ID | `crypto.randomUUID()` en todos los generadores |
| Slides API: get wrong slide | `all.body[0]` no era determinista con múltiples slides de orden 1 | Buscar por título con `.find()` |
| Aserciones frágiles | Tests esperaban conteos fijos | Comparaciones relativas `before ± 1` |
| EBUSY en tests paralelos | Múltiples archivos escribiendo a `db.json` | `fileParallelism: false` en vitest.config |

**Estado**: ✅ **117 tests pasando — 10 archivos — 0 fallas**

### 3. Fix: CSP Google Maps

**Problema**: El embed de Google Maps en `CasaJaguar.tsx` era bloqueado por CSP en producción (igual que Instagram).
**Solución**: Agregado `"https://www.google.com"` a `frame-src` en `server.ts:55`.

### 4. Archivos nuevos/creados

- `TEST.md` — documentación completa de la suite de tests
- `tests/` — helpers, setup, unit, integration (DB + API)
- `e2e/` — 8 spec files + auth setup
- `vitest.config.ts`, `playwright.config.ts`

### 5. Archivos modificados

- `server/db.ts` — id generation: `Date.now()` → `crypto.randomUUID()`
- `server.ts` — CSP: `frame-src` agregado `www.google.com`
- `.gitignore` — agregado `db.json.bak`
- `package.json` / `package-lock.json` — devDependencies de test

---

## 🆕 Sesión: 5 Jul 2026 — Catálogo Real 26 Productos, Carrito Flotante, Footer Simplificado, Nuestra Planta Imágenes Reales

### Contexto

El cliente entregó el listado oficial de productos con dos presentaciones (250gr / 175gr) y especificó que deben ser productos independientes, no variantes. También corrigió datos de Nuestra Planta (WhatsApp, descripción de servicios) y subió imágenes reales de la planta.

### 1. Catálogo — Productos Reales del Cliente

**Reestructuración completa del catálogo** (`db.json`, `src/types.ts`):

- **4 categorías planas**: `250gr`, `175gr`, `institucional`, `togo`
- **26 productos** como entidades independientes:
  - 10 productos en 250gr (Caturra Chiroso, Caturra Lavado, Geisha Lavado, etc.)
  - 10 productos en 175gr (mismos orígenes)
  - 2 institucionales (Jaguar Coffee 250gr, Termo Jaguar)
  - 4 togo (Café Filtrado, Cappuccino, Mocaccino, Chocolate)

**Cambios estructurales**:
- `CoffeeCategory` → `'250gr' | '175gr' | 'institucional' | 'togo'`
- Eliminado `ProductVariant` e interfaz `variants` de `Product`
- `CartItem` simplificado sin campo de variante
- `addToCart` en store sin parámetro de variante
- `ProductDetail.tsx` sin selector de peso
- `Tienda.tsx` filtros actualizados a 4 categorías
- Servidor (`server/db.ts`): default products actualizados

### 2. Carrito Flotante

**Nuevo componente** `src/components/FloatingCart.tsx`:

- Posición `fixed bottom-6 right-6 z-40`
- Badge condicional (solo cuando `cartCount > 0`)
- Botón siempre visible
- Icono ShoppingCart de Lucide
- Eliminado de `Navbar.tsx`

### 3. Navbar — Separación de Logo

- Logo separado de "Productos" con `mr-6 xl:mr-12`
- Links con `gap-x-6 xl:gap-x-10 2xl:gap-x-16`
- Actions (auth) con `ml-6 xl:ml-10`

### 4. Footer — Rediseño a 3 Columnas

- **5 columnas → 3 columnas** limpias: Marca, Enlaces, Contacto
- Logo blanco (`logo-blanco.png`, 474×310, `h-9 w-auto opacity-90`)
- Descripción reducida a 1 línea
- Horarios eliminados (exceso de texto)
- Enlaces en grid de 2 columnas
- Créditos simplificados

### 5. Nuestra Planta — Simplificación e Imágenes Reales

- **WhatsApp** corregido a `+57 320 4263217`
- **"Empaque y distribución"** → **"Empaque"** en servicios
- **Sección Proceso** (timeline de 6 pasos) eliminada por simplicidad
- **Imágenes reales** del cliente:
  - Hero: `public/images/NUESTRA-PLANTA/PLANTA1.webp`
  - Galería + overlay CTA: `public/images/NUESTRA-PLANTA/pLANTA2.webp`
  - Carrusel reemplazado por imagen fija
- Creada carpeta `public/images/NUESTRA-PLANTA/`

### Archivos nuevos

- `src/components/FloatingCart.tsx` — carrito flotante
- `public/images/NUESTRA-PLANTA/PLANTA1.webp` — hero real
- `public/images/NUESTRA-PLANTA/pLANTA2.webp` — galería real
- `public/images/logo-blanco.png` — logo blanco recortado para footer

### Archivos modificados

- `src/types.ts` — CoffeeCategory actualizado, ProductVariant eliminado
- `src/store.ts` — addToCart sin variante
- `src/components/Navbar.tsx` — logo separado, carrito removido
- `src/components/FloatingCart.tsx` — nuevo
- `src/components/Footer.tsx` — 3 columnas, logo blanco
- `src/pages/Tienda.tsx` — filtros 4 categorías
- `src/pages/ProductDetail.tsx` — sin variantes
- `src/pages/NuestraPlanta.tsx` — simplificado + imágenes reales
- `db.json` — 26 productos reales en 4 categorías
- `server/db.ts` — default products actualizados
- `tests/integration/db.test.ts` — categorías actualizadas
- `tests/integration/api/products.test.ts` — categorías actualizadas
- `tests/unit/types.test.ts` — categorías actualizadas

### Verificación

- `npm run lint` ✅ — TypeScript compila sin errores

---

## 🚀 Estado de Construcción

- TypeScript: ✅ Compila sin errores
- npm: ✅ 0 vulnerabilidades
- Dependencias: Todas instaladas y funcionales
- Frontend: ✅ Rediseño completo branding; Nuestra Planta con imágenes reales; Catálogo 26 productos en 4 categorías; Carrito flotante; Footer 3 columnas; ScrollToTop; Estadías con Airbnb; tabs reserva
- Backend: ✅ Modularizado con seguridad OWASP (Helmet, CORS, rate-limit, Zod)
- Tests: ✅ 117 tests (unit + integration DB/API + E2E Playwright) — 0 fallas
- Deploy: ✅ Producción en Coolify — `jaguar.getindev.com`
- Pentesting: 🟡 Línea base establecida — pendiente comparativa tras deploy
- Skills IA: ✅ 74+ skills instaladas (open-hax + playwright)
- Git: ✅ Todos los cambios subidos al repo

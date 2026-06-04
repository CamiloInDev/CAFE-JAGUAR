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

## 🚀 Estado de Construcción

- TypeScript: ✅ Compila sin errores
- npm: ✅ 0 vulnerabilidades
- Dependencias: Todas instaladas y funcionales
- Git: Listo para push después de redeploy

# Deploy Temporal vs Producción — Café Jaguar

## Configuración Temporal (Coolify/VPS propio)
Para obtener feedback del cliente antes de subir a Hostinger.

### Cambios necesarios ANTES de deployar a Coolify
Ninguno. El proyecto ya está listo con JSON DB.

### Configuración en Coolify
```
Repository:  https://github.com/CamiloInDev/CAFE-JAGUAR
Branch:      master
Build Pack:   Nixpacks
Base Dir:     /
Port:         3000
Is static?:   No
```

**Variables de entorno:**
```
NODE_ENV=production
JWT_SECRET=jaguar2026tokenseguro
```

**Volume persistente:**
```
Type: Directory Mount
Path: /app/data
```

**Dominio en NPM:**
```
Subdomain: cafe-jaguar
SSL: automático via NPM
Puerto interno: 3000
```

### Después de deployar a Coolify → REVERTIR
Crear commit con los cambios revertidos (ver sección "Cambios para producción")

---

## Configuración Producción (Hostinger)
El deploy final va aquí cuando el cliente apruebe.

### Cambios requeridos para Hostinger

1. **Crear Base de Datos MySQL** en Hostinger
2. **Instalar Sequelize + mysql2**
3. **Migrar data/db.json → MySQL**
4. **Cambios en código:**

| Archivo | Cambio temporal | Cambio producción |
|---------|-----------------|-------------------|
| `server/db.ts` | Mantener JSON `fs.readFileSync` | Reemplazar por `sequelize.findAll()` |
| `server.ts` | `JWT_SECRET` fallback hardcodeado | Usar variable de entorno real |
| `.env` | No existe | `DATABASE_URL`, `JWT_SECRET`, `WOMPI_*` |
| `package.json` | — | Agregar `sequelize`, `mysql2` |
| `server.ts` | Puerto `3000` | Usar `process.env.PORT \|\| 3000` |

5. **Commit "production-ready"** con los cambios de arriba

### Variables de entorno en Hostinger
```
NODE_ENV=production
JWT_SECRET=<64 chars random>
WOMPI_INTEGRITY_KEY=<key real>
VITE_WOMPI_PUBLIC_KEY=<pub key real>
DATABASE_URL=mysql://user:pass@host:3306/cafejaguar
```

---

## Checklist antes de cada deploy

### Temporal (Coolify)
- [ ] Branch `main` tiene los últimos cambios
- [ ] Volume `/app/data` montado
- [ ] `JWT_SECRET` configurado
- [ ] NPM proxy apunta a puerto 3000

### Producción (Hostinger)
- [ ] MySQL creado y migrado
- [ ] Variables de entorno en Hostinger configuradas
- [ ] Commit "production-ready" hecho
- [ ] Dominio apuntando al servidor
- [ ] SSL verificado

---

## Nota importante
El proyecto usa JSON DB (`data/db.json`) que funciona en un solo servidor. Para producción con Hostinger, **FASE 1 del roadmap** (Migración MySQL) debe completarse primero para evitar inconsistencias en datos si hay escalado horizontal.

---

## Fix: Ruta DB para producción (29 May 2026)

**Problema**: En producción (Coolify), el volumen se monta en `/app/data`, pero el código buscaba en `data/db.json` (relativo al proyecto).

**Solución en `server/db.ts`**:
```typescript
// Desarrollo: ./data/db.json
// Producción: /app/data/db.json
const DB_FILE = path.join(
  process.env.NODE_ENV === 'production' ? '/app/data' : process.cwd(),
  'db.json'
);
```

**Para Hostinger**:
- Crear directorio `/app/data` si no existe
- O cambiar la lógica para que siempre use una variable de entorno:
  ```typescript
  const DB_FILE = path.join(process.env.DB_PATH || './data', 'db.json');
  ```

**Commit**: `adbede2` — fix duplicate PORT + log → console.log

---

## Fix: Eliminar banner técnico del Footer (29 May 2026)

**Problema**: El footer mostraba un banner con versiones técnicas que no es profesional para el cliente.

**Cambios en `Footer.tsx`**:
- Eliminado: `Node.js v20 | React 18 + Vite | MySQL 8.x Hostinger`
- Eliminado: `WooMPI Checkout Connected` con indicador verde
- Eliminado: `V1.0.0 Build: 25.05.26`
- Solo quedó: copyright y crédito "Desarrollado con ❤️"

**Para producción**: Mantener el footer limpio. Si se necesita info técnica, mover a una página `/tecnologia` interna.
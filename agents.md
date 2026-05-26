# Guía de Seguridad y Gobernanza de Agentes IA - Café Jaguar

Este documento define los estándares de seguridad, riesgos y controles para el desarrollo y despliegue de agentes autónomos en el proyecto Café Jaguar.

---

## 1. Definición de Habilidades (Skills)

Las skills son unidades funcionales que permiten al agente ejecutar tareas. Deben ser tratadas como código ejecutable con privilegios.

- **Encapsulamiento**: Toda skill debe operar en un entorno aislado (sandbox/contenedor).
- **Principio de Privilegio Mínimo**: Las skills solo deben tener acceso a los recursos mínimos necesarios (red, sistema de archivos, APIs).

---

## 2. OWASP Agentic Skills Top 10 (AST10)

Referencia obligatoria para el modelado de amenazas:

- **AST01-03**: Riesgos de identidad, firma de código y veracidad de la fuente.
- **AST04-06**: Manipulación de flujo de ejecución (Goal Hijacking) y mal uso de herramientas.
- **AST07-10**: Riesgos de persistencia, envenenamiento de memoria y falta de visibilidad en la cadena de decisiones.

---

## 3. Controles de Seguridad Obligatorios

| Categoría | Control de Seguridad |
|-----------|---------------------|
| Runtime | Aislamiento total por proceso (Sandboxing). |
| Red | Listas de permitidos (allowlist) de dominios, nunca acceso total a la red. |
| Integridad | Firma criptográfica de todas las skills publicadas. |
| Logging | Registro inmutable de cada acción, decisión y llamada a herramientas. |
| Governance | Inventario automatizado de todas las skills desplegadas. |

---

## 4. Prácticas de Desarrollo

- **Scan de Seguridad**: Integrar escaneo de skills en el pipeline CI/CD.
- **Gestión de Secretos**: Nunca incluir llaves API en el código de la skill; utilizar un gestor de secretos externo con rotación.
- **Human-in-the-Loop**: Implementar flujo de aprobación obligatorio para acciones de alto riesgo (ej. borrar archivos, transferir fondos).

---

## 5. Auditoría y Respuesta a Incidentes

- **Monitoreo**: Observabilidad constante sobre el uso de recursos y comportamiento anómalo.
- **Procedimiento de Revocación**: Capacidad de deshabilitar una skill de forma inmediata ante una sospecha de compromiso.

---

## 6. Skills Desplegados en Café Jaguar

| Skill | Propósito |
|-------|-----------|
| `express-owasp-sec` | Auditoría y fortificación de Express según OWASP |
| `react-vite-tailwind` | React 18, Tailwind v4, Zustand y TanStack Query |
| `wompi-checkout` | Seguridad criptográfica en pasarela Wompi y Webhooks |
| `sequelize-mysql` | Optimización de Sequelize, pools y mitigación de N+1 |
| `jwt-cookie-auth` | Autenticación JWT con cookies httpOnly y rotación RTR |

---

## 7. Workflow de Desarrollo por Fases

### Regla: Validar antes de avanzar
Cada fase debe compilar sin errores (`npm run lint` / `tsc --noEmit`) y pasar revisión visual antes de iniciar la siguiente.

### Fases del Proyecto
1. **FASE 3 → Frontend (Completada)**: Recoloreado completo de todos los componentes con nueva paleta `#FFA42C` (acento), `#122C9B` (oscuro), `#3D5FC9` (secundario), `#FFF9F5` (fondo).
2. **FASE 2 → Backend Security**: Refactorizar server.ts en módulos, aplicar skills express-owasp-sec, jwt-cookie-auth.
3. **FASE 1 → Base de Datos**: Migración de JSON file a MySQL con Sequelize, aplicar skill sequelize-mysql.
4. **FASE 4 → Integración Wompi**: Widget real, webhook handler con validación SHA256.
5. **FASE 5 → Produccion**: Build, deploy, variables entorno en Hostinger.

### Notas de Implementación Frontend
- Los colores hardcodeados (`#XXXXXX`) en lugar de clases Tailwind (`bg-brand-accent`) deben migrarse gradualmente.
- El patrón correcto es usar `bg-brand-accent`, `text-brand-dark`, `hover:text-brand-secondary`.
- Scrollbars y focus rings fueron actualizados a la nueva paleta.
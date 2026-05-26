name: react-vite-tailwind
description: Guía de arquitectura frontend para React 18 con Vite, aplicando el estándar CSS-first de Tailwind CSS v4, Zustand para estado local de UI y TanStack Query para sincronización de datos de servidor.
instructions:
  1. Estilos con Tailwind CSS v4 (Compilador Lightning CSS)
     - Usa configuración CSS-first. Importa Tailwind usando @import "tailwindcss" en el CSS principal. No uses archivos tailwind.config.js ni PostCSS heredados.
     - Toda personalización de tema (colores, fuentes) debe ir dentro de la directiva @theme en tu archivo CSS.
     - No abuses de @apply. Encapsula estilos repetitivos mediante componentes nativos de React.
  2. Gestión de Estado: Zustand vs. TanStack Query
     - Estado del Servidor: Usa TanStack Query (useQuery, useMutation). No dupliques ni guardes datos de API dentro de tiendas de Zustand.
     - Estado de la UI: Usa Zustand solo para el estado global visual (modales, menús flotantes, temas).
     - Suscripciones Atómicas: Al usar Zustand, suscríbete siempre con selectores específicos (v.g., const isSidebarOpen = useUiStore(s => s.isSidebarOpen)) para evitar renderizados innecesarios.
     - Filtros e Historial: Mapea estados de paginación o filtrado directamente en la URL con useSearchParams y conéctalos como llaves de consulta (queryKeys) en TanStack Query.
examples:
  - code: |
      @import "tailwindcss";

      @theme {
        --color-brand-primary: oklch(0.62 0.24 256.4);
        --font-sans: "Inter", sans-serif;
      }
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restaura el scroll al inicio de la ventana cada vez que cambia la ruta.
 * Resuelve el comportamiento por defecto de las SPAs donde el scroll
 * se mantiene al navegar entre páginas.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

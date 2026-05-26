name: jwt-cookie-auth
description: Directrices de implementación de autenticación segura con JWT empleando cookies HttpOnly para Refresh Tokens y rotación automática de sesión de un solo uso (RTR) con detección de reuso.
instructions:
  1. Almacenamiento Seguro
     - Access Token: Almacénalo únicamente en la memoria de ejecución (variables de estado JavaScript) del cliente React. Nunca lo guardes en LocalStorage ni SessionStorage para prevenir robos mediante XSS.
     - Refresh Token: Envíalo encapsulado en una cookie segura con los atributos httpOnly: true, secure: true (HTTPS en prod) y sameSite: 'strict' (mitigación CSRF).
  2. Rotación de un Solo Uso (RTR) y Prevención de Robo de Sesión
     - Cada Refresh Token debe incluir una carga útil identificadora única jti (JWT ID).
     - Almacena el estado de los identificadores válidos en caché (v.g. Redis con TTL).
     - Cuando un usuario refresque la sesión, invalida inmediatamente el jti que envió y genera un nuevo par de tokens con un nuevo jti.
     - Detección de Abuso: Si se recibe una petición de refresco con un jti que ya fue marcado como "Consumido/Invalido", se asume una interceptación ilegal (robo de sesión). El backend debe invalidar de inmediato todas las sesiones activas de ese usuario.
  3. Validación Criptográfica Estricta
     - Rechaza de forma categórica firmas con algoritmo "none".
     - Al verificar tokens, pasa de forma obligatoria el array de algoritmos aprobados (v.g., { algorithms: }) en la firma para repeler ataques de inyección y sustitución criptográfica.
examples:
  - code: |
      async function refreshSession(req, res) {
        const token = req.cookies.jid;
        if (!token) return res.status(401).json({ error: 'Falta token de refresco' });

        try {
          const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET, { algorithms: });
          const { userId, jti } = decoded;
          const activeTokens = activeJtiStore.get(userId) || new Set();

          if (!activeTokens.has(jti)) {
            activeJtiStore.delete(userId);
            res.clearCookie('jid');
            return res.status(403).json({ error: 'Infracción de seguridad detectada. Acceso invalidado.' });
          }

          activeTokens.delete(jti);
          const newJti = crypto.randomUUID();
          const newAccessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
          const newRefreshToken = jwt.sign({ userId, jti: newJti }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

          activeTokens.add(newJti);
          activeJtiStore.set(userId, activeTokens);

          res.cookie('jid', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
          return res.json({ accessToken: newAccessToken });
        } catch (err) {
          return res.status(401).json({ error: 'Token inválido' });
        }
      }
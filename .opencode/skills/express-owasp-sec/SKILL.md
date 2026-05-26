name: express-owasp-sec
description: Audita y securiza endpoints de Node y Express aplicando las directrices de OWASP 2025/2026, configurando cabeceras seguras con Helmet, limitando payloads y sanitizando entradas contra inyecciones.
instructions:
  1. Cabeceras y Configuración Base
     - Aplica helmet para inyectar cabeceras HTTP de seguridad estrictas (HSTS, CSP).
     - Deshabilita la cabecera identificadora de Express con app.disable('x-powered-by').
     - Implementa hpp (HTTP Parameter Pollution) para prevenir la contaminación de parámetros.
  2. Validación de Datos y Sanitización
     - Valida y tipa de forma estricta las entradas (req.body, req.query, req.params) mediante express-validator o joi.
     - Limita el tamaño de las solicitudes con express.json({ limit: '10kb' }) para prevenir ataques de denegación de servicio (DoS).
     - Escapa caracteres especiales en textos libres. Utiliza DOMPurify (junto con jsdom en backend) o sanitize-html para datos HTML estructurados. Evita librerías obsoletas como node-esapi.
  3. Control de Excepciones y Logging
     - Utiliza middlewares de error centralizados. En producción (NODE_ENV === 'production'), nunca expongas trazas de pila (stack traces) ni mensajes internos de la base de datos.
     - Sanitiza los datos de entrada de los usuarios antes de escribirlos en los registros (logs) utilizando sistemas asíncronos rápidos como Pino o Winston para prevenir inyecciones de logs.
examples:
  - code: |
      const express = require('express');
      const helmet = require('helmet');
      const hpp = require('hpp');
      const { body, validationResult } = require('express-validator');
      const app = express();

      app.use(helmet());
      app.disable('x-powered-by');
      app.use(express.json({ limit: '10kb' }));
      app.use(hpp());

      app.post('/api/v1/users', [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 12 }),
        body('username').trim().escape()
      ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        res.status(201).json({ status: 'success' });
      });
name: wompi-checkout
description: Instrucciones de integración segura con el Widget Checkout y Webhooks de Wompi (Colombia). Cubre la generación de firmas SHA256 en backend y validación dinámica de Webhooks.
instructions:
  1. Reglas Generales de Seguridad
     - Nunca uses la redirección del navegador (redirect-url) como fuente de verdad para confirmar pagos. Los cambios de estado en base de datos deben confirmarse de forma obligatoria mediante Webhooks asíncronos.
  2. Firma de Integridad del Checkout (Generada en Servidor)
     - Genera la firma SHA256 antes de renderizar el Widget para garantizar que el precio de venta no sea manipulado en el frontend.
     - Sin fecha de vencimiento: Signature = SHA256(Reference || AmountInCents || Currency || IntegritySecret)
     - Con fecha de vencimiento: Signature = SHA256(Reference || AmountInCents || Currency || ExpirationDate || IntegritySecret)
  3. Validación del Webhook de Wompi
     - Cuando recibas un POST desde Wompi: Lee las propiedades indicadas en signature.properties del payload de forma dinámica (no asumas un orden fijo en el array).
     - Concatena sus valores reales, seguidos de la marca de tiempo timestamp y el secreto de eventos (EventSecret).
     - Calcula el hash SHA256 y compáralo con signature.checksum o la cabecera X-Event-Checksum mediante comparación segura en tiempo constante (crypto.timingSafeEqual).
examples:
  - code: |
      const crypto = require('crypto');

      function verifyWompiWebhook(req) {
        const payload = req.body;
        const receivedChecksum = req.headers['x-event-checksum'] || payload.signature?.checksum;
        const { properties } = payload.signature;
        const { timestamp } = payload;
        const eventSecret = process.env.WOMPI_EVENT_SECRET;

        let concatenated = properties.reduce((acc, path) => {
          const val = path.split('.').reduce((obj, key) => obj?.[key], payload.data);
          return acc + val;
        }, "");
        concatenated += timestamp + eventSecret;

        const calculated = crypto.createHash('sha256').update(concatenated).digest('hex');
        return crypto.timingSafeEqual(Buffer.from(calculated, 'hex'), Buffer.from(receivedChecksum, 'hex'));
      }
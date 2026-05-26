name: sequelize-mysql
description: Define mejores prácticas para Sequelize ORM con MySQL 8.x, enfocándose en la erradicación de consultas N+1 mediante Eager Loading, control de pools de conexiones y transacciones seguras.
instructions:
  1. Prevención del Antipatrón N+1
     - Queda prohibido consultar el ORM dentro de bucles (map, forEach, for).
     - Usa include (Eager Loading) para resolver relaciones en una sola consulta estructurada.
     - Cuando relaciones una entidad con colecciones de alta cardinalidad (v.g. usuarios con miles de pedidos), activa separate: true en el include para que el ORM divida la consulta de manera eficiente en dos llamadas unificadas usando sentencias IN.
  2. Gestión de Pools de Conexión
     - Configura valores lógicos para producción: max (máximo de conexiones paralelas por proceso), min (conexiones mínimas en espera), acquire (tiempo límite para obtener una conexión del pool antes de arrojar timeout).
     - Monitorea la latencia de adquisición de conexiones escuchando los hooks beforePoolAcquire y afterPoolAcquire.
  3. Transacciones y Replicación
     - Realiza transacciones gestionadas (sequelize.transaction) pasando siempre la referencia { transaction: t } a todas las consultas internas.
     - Si el proyecto usa réplicas de lectura, fuerza la lectura en el servidor primario usando useMaster: true en transacciones de actualización crítica inmediata para evitar inconsistencias por desfase de réplicas.
examples:
  - code: |
      const users = await User.findAll({
        attributes: ['id', 'username'],
        include: [{
          model: Order,
          as: 'orders',
          separate: true,
          limit: 5,
          attributes: ['id', 'totalPrice']
        }]
      });
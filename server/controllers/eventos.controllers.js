import { pool } from "../db.js";
import {
  getQRCodeForObra,
  clearQRCodesAndInterval,
  stopQRCodeUpdateInterval,
  startQRCodeUpdateInterval,
} from "../services/qr.service.js";

export const getEventos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM eventos");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEventosOrdenados = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM eventos ORDER BY (fecha_inicio) ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEvento = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM eventos WHERE id_evento = ?",
      [req.params.id]
    );

    if (result.length === 0)
      return res.status(404).json({ message: "Evento not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createEvento = async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin, lugar, descripcion, tematica } = req.body;
    const [result] = await pool.query(
      "INSERT INTO eventos(fecha_inicio, fecha_fin, lugar, descripcion, tematica) VALUES (?, ?, ?, ?, ?)",
      [fecha_inicio, fecha_fin, lugar, descripcion, tematica]
    );
    res.json({
      id_evento: result.insertId,
      fecha_inicio,
      fecha_fin,
      lugar,
      descripcion,
      tematica,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteEvento = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM eventos WHERE id_evento = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Evento not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEvento = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE eventos SET ? WHERE id_evento = ?",
      [req.body, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Evento not found" });
    const [updEvento] = await pool.query(
      "SELECT * FROM eventos WHERE id_evento = ?",
      [req.params.id]
    );
    res.json(updEvento);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controles de evento:

export const activarEvento = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el evento ya está activo o finalizado
    const [eventoActual] = await pool.query(
      "SELECT estado FROM eventos WHERE id_evento = ?",
      [id]
    );

    if (eventoActual.length === 0)
      return res.status(404).json({ message: "Evento no encontrado" });

    const estadoActual = eventoActual[0].estado;

    if (estadoActual === "activo" || estadoActual === "finalizado") {
      return res
        .status(400)
        .json({ message: "El evento no se puede activar." });
    }

    // Si el evento está pausado, simplemente reactiva los QR
    if (estadoActual === "pausado") {
      await pool.query(
        "UPDATE eventos SET estado = 'activo' WHERE id_evento = ?",
        [id]
      );

      // Reanudar los QR previamente pausados
      startQRCodeUpdateInterval();

      return res.json({ message: `Evento ${id} reactivado.` });
    }

    // Obtener todos los eventos activos o pausados
    const [eventosActivosPausados] = await pool.query(
      "SELECT id_evento FROM eventos WHERE estado IN ('activo', 'pausado')"
    );

    // Llamar a desactivarEventoLogic para cada evento activo o pausado
    for (const evento of eventosActivosPausados) {
      if (evento.id_evento !== id) {
        await desactivarEventoLogic(evento.id_evento);
      }
    }

    // Activar el nuevo evento
    await pool.query(
      "UPDATE eventos SET estado = 'activo' WHERE id_evento = ?",
      [id]
    );

    // Activar QRs para las obras asociadas al nuevo evento
    const [obras] = await pool.query(
      "SELECT id_obra FROM obras WHERE id_evento = ?",
      [id]
    );

    const idsObras = obras.map((obra) => obra.id_obra);

    for (const id_obra of idsObras) {
      // Generar el token para cada obra
      await getQRCodeForObra(id_obra);
    }

    res.json({ message: `Evento ${id} activado.` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const pausarEvento = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el evento ya está pausado
    const [eventoActual] = await pool.query(
      "SELECT estado FROM eventos WHERE id_evento = ?",
      [id]
    );

    if (eventoActual.length === 0)
      return res.status(404).json({ message: "Evento no encontrado" });

    const estadoActual = eventoActual[0].estado;

    if (estadoActual !== "activo") {
      return res.status(400).json({ message: "El evento no se puede pausar." });
    }

    // Actualizar estado del evento a 'pausado'
    await pool.query(
      "UPDATE eventos SET estado = 'pausado' WHERE id_evento = ?",
      [id]
    );

    // Detener los QRs pero mantenerlos en memoria para reactivarlos más tarde
    stopQRCodeUpdateInterval();

    res.json({ message: `Evento ${id} pausado.` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const finalizarEvento = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el evento ya está finalizado
    const [eventoActual] = await pool.query(
      "SELECT estado FROM eventos WHERE id_evento = ?",
      [id]
    );

    if (eventoActual.length === 0)
      return res.status(404).json({ message: "Evento no encontrado" });

    const estadoActual = eventoActual[0].estado;

    if (estadoActual === "finalizado" || estadoActual === "inactivo") {
      return res
        .status(400)
        .json({ message: "El evento no se puede finalizar." });
    }

    // Cambiar el estado del evento a 'finalizado'
    await pool.query(
      "UPDATE eventos SET estado = 'finalizado' WHERE id_evento = ?",
      [id]
    );

    // Desactivar QRs activos
    clearQRCodesAndInterval();

    // Calcular las calificaciones promedio por obra asociada al evento
    const [calificaciones] = await pool.query(
      `
      SELECT v.id_obra, AVG(v.puntaje) AS promedio
      FROM vota v
      INNER JOIN obras o ON v.id_obra = o.id_obra
      WHERE o.id_evento = ?
      GROUP BY v.id_obra
      `,
      [id]
    );

    // Actualizar la calificación en la tabla 'obras'
    for (const { id_obra, promedio } of calificaciones) {
      await pool.query("UPDATE obras SET calificacion = ? WHERE id_obra = ?", [
        promedio,
        id_obra,
      ]);
    }

    res.json({
      message: `Evento ${id} finalizado y calificaciones calculadas.`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const desactivarEventoLogic = async (id) => {
  // Lógica de desactivación del evento
  const [eventoActual] = await pool.query(
    "SELECT estado FROM eventos WHERE id_evento = ?",
    [id]
  );

  if (eventoActual.length === 0) {
    throw new Error("Evento no encontrado");
  }

  const estadoActual = eventoActual[0].estado;

  if (estadoActual === "inactivo") {
    throw new Error("El evento ya está inactivo.");
  }

  // Obtener las obras relacionadas con el evento
  const [obras] = await pool.query(
    "SELECT id_obra FROM obras WHERE id_evento = ?",
    [id]
  );

  // Eliminar los votos asociados a las obras del evento
  for (const obra of obras) {
    await pool.query("DELETE FROM vota WHERE id_obra = ?", [obra.id_obra]);
  }

  // Restablecer calificaciones de las obras relacionadas con el evento
  await pool.query("UPDATE obras SET calificacion = 0 WHERE id_evento = ?", [
    id,
  ]);

  // Cambiar el estado del evento a 'inactivo'
  const [result] = await pool.query(
    "UPDATE eventos SET estado = 'inactivo' WHERE id_evento = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    throw new Error("No se pudo desactivar el evento.");
  }

  // Desactivar cualquier QR activo o proceso relacionado
  clearQRCodesAndInterval();
};

export const desactivarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    await desactivarEventoLogic(id);
    res.json({
      message: `Evento ${id} desactivado y votación/clasificación reiniciados.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

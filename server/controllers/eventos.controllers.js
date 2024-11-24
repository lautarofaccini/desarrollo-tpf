import { pool } from "../db.js";
import {
  getQRCodeForObra,
  clearQRCodesAndInterval,
  stopQRCodeUpdateInterval,
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

    // Verificar si hay un evento activo y desactivarlo
    await pool.query(
      "UPDATE eventos SET estado = 'inactivo' WHERE estado = 'activo'"
    );

    // Desactivar QRs del evento activo
    clearQRCodesAndInterval();

    // Activar el nuevo evento
    const [result] = await pool.query(
      "UPDATE eventos SET estado = 'activo' WHERE id_evento = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Evento not found" });

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

    res.json({ message: `Evento ${id} activado exitosamente.` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const pausarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body; // Estado enviado desde el frontend (activo o pausado)

    if (!["activo", "pausado"].includes(estado))
      return res.status(400).json({ message: "Estado inválido" });

    const [result] = await pool.query(
      "UPDATE eventos SET estado = ? WHERE id_evento = ?",
      [estado, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Evento not found" });

    // Detener los QRs si el estado es pausado
    if (estado === "pausado") stopQRCodeUpdateInterval();

    res.json({ message: `Evento ${id} actualizado a estado '${estado}'.` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const finalizarEvento = async (req, res) => {
  try {
    const { id } = req.params;

    // Cambiar el estado del evento a 'finalizado'
    const [result] = await pool.query(
      "UPDATE eventos SET estado = 'finalizado' WHERE id_evento = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Evento not found" });

    // Desactivar QRs activos
    stopQRCodeUpdateInterval();

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
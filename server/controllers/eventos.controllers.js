import { pool } from "../db.js";

export const getEventos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM eventos");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEvento = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM eventos WHERE id_evento = ?", [
      req.params.id,
    ]);

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
      id_evento: result.InsertId,
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
    const [result] = await pool.query("DELETE FROM eventos WHERE id_evento = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Evento not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEvento = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE eventos SET ? WHERE id_evento = ?", [
      req.body,
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Evento not found" });
    const [updEvento] = await pool.query("SELECT * FROM eventos WHERE id_evento = ?", [
      req.params.id,
    ]);
    res.json(updEvento);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

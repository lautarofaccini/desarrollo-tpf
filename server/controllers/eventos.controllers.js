import { pool } from "../db.js";

export const getEventos = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM eventos");
  res.json(result);
};

export const getEvento = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM eventos WHERE id = ?", [
    req.params.id,
  ]);

  if (result.length === 0)
    return res.status(404).json({ message: "Evento not found" });

  res.json(result[0]);
};

export const createEvento = async (req, res) => {
  const { fecha_inicio, fecha_fin, lugar, descripcion, tematica } = req.body;
  const [result] = await pool.query(
    "INSERT INTO eventos(fecha_inicio, fecha_fin, lugar, descripcion, tematica) VALUES (?, ?, ?, ?, ?)",
    [fecha_inicio, fecha_fin, lugar, descripcion, tematica]
  );
  res.json({
    id: result.insertId,
    fecha_inicio,
    fecha_fin,
    lugar,
    descripcion,
    tematica,
  });
};

export const updateEvento = (req, res) => {
  res.send("updateEvento");
};

export const deleteEvento = async (req, res) => {
  const [result] = await pool.query("DELETE FROM eventos WHERE id = ?", [
    req.params.id,
  ]);

  if (result.affectedRows === 0)
    return res.status(404).json({ message: "Evento not found" });

  return res.sendStatus(204);
};

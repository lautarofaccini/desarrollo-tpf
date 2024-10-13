import { pool } from "../db.js";

export const getEventos = (req, res) => {
  res.send("getEventos");
};

export const getEvento = (req, res) => {
  res.send("getEvento");
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

export const deleteEvento = (req, res) => {
  res.send("deleteEvento");
};

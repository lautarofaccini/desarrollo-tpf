import { pool } from "../db.js";

export const getObras = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM obras");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getObra = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM obras WHERE id_obra = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Obra not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createObra = async (req, res) => {
    try {
      const { fecha_creacion, descripcion, material, estilo, calificacion, id_evento, id_escultor } = req.body;
      const [result] = await pool.query(
        "INSERT INTO obras(fecha_creacion, descripcion, material, estilo, calificacion, id_evento, id_escultor) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [fecha_creacion, descripcion, material, estilo, calificacion, id_evento, id_escultor]
      );
      res.json({
        id_obra: result.insertId,
        fecha_creacion,
        descripcion,
        material,
        estilo,
        calificacion,
        id_evento,
        id_escultor,
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
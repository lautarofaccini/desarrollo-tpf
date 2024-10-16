import { pool } from "../db.js";

export const getEscultores = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM escultores");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEscultor = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM escultores WHERE id_escultor = ?",
      [req.params.id]
    );

    if (result.length === 0)
      return res.status(404).json({ message: "Escultor not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createEscultor = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      nacionalidad,
      fecha_nacimiento,
      biografia,
      email,
      telefono,
      foto_perfil,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO escultores(nombre, apellido, nacionalidad, fecha_nacimiento, biografia, email, telefono,foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?,?)",
      [
        nombre,
        apellido,
        nacionalidad,
        fecha_nacimiento,
        biografia,
        email,
        telefono,
        foto_perfil,
      ]
    );
    res.json({
      id_escultor: result.insertId,
      nombre,
      apellido,
      nacionalidad,
      fecha_nacimiento,
      biografia,
      email,
      telefono,
      foto_perfil,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteEscultor = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM escultores WHERE id_escultor = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Escultor not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEscultor = async (req, res) => {
    try {
      const [result] = await pool.query("UPDATE escultores SET ? WHERE id_escultor = ?", [
        req.body,
        req.params.id,
      ]);
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Escultor not found" });
      const [updEscultor] = await pool.query("SELECT * FROM escultores WHERE id_escultor = ?", [
        req.params.id,
      ]);
      res.json(updEscultor);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
import { pool } from "../db.js";

export const getUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuarios");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Usuario not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { id_usuario, email, password, nickname, rol } = req.body;
    const [result] = await pool.query(
      "INSERT INTO usuarios(id_usuario, email, password, nickname, rol) VALUES (?, ?, ?, ?, ?)",
      [id_usuario, email, password, nickname, rol]
    );
    res.json({
			id_usuario: result.InsertId, 
			email, 
			password, 
			nickname, 
			rol
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id_usuario = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE usuarios SET ? WHERE id_usuario = ?", [
      req.body,
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario not found" });
    const [updUsuario] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [
      req.params.id,
    ]);
    res.json(updUsuario);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

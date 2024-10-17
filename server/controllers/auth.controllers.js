import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password, nickname, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO usuarios( email, password, nickname, rol) VALUES ( ?, ?, ?, ?)",
      [email, hashedPassword, nickname, rol]
    );

    jwt.sign(
      {
        id: result.insertId,
      },
      "secret123",
      { expiresIn: "1d" },
      (err, token) => {
        if (err) console.error(err);
        res.json({ token });
      }
    );

    /*  res.json({
      id_usuario: result.insertId,
      email,
      nickname,
      rol,
    }); */
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [req.params.id]
    );

    if (result.length === 0)
      return res.status(404).json({ message: "Usuario not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

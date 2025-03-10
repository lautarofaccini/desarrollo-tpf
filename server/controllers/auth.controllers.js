import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { email, password, nickname, rol } = req.body;

    const [emailFound] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    if (emailFound.length !== 0)
      return res.status(400).json(["El email ya existe"]);

    const [nicknameFound] = await pool.query(
      "SELECT * FROM usuarios WHERE nickname = ?",
      [nickname]
    );
    if (nicknameFound.length !== 0)
      return res.status(400).json(["El nickname ya existe"]);

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO usuarios( email, password, nickname, rol) VALUES ( ?, ?, ?, ?)",
      [email, hashedPassword, nickname, rol]
    );

    const token = await createAccessToken({ id: result.insertId });

    res.cookie("token", token);
    res.json({
      id_usuario: result.insertId,
      email,
      nickname,
      rol,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    //WARN: Cambiar los mensajes a uno genérico, no es bueno mostrar donde falló
    //Credenciales inválidas
    if (result.length === 0)
      return res.status(404).json(["Usuario no encontrado"]);

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(404).json(["Contraseña incorrecta"]);
    const token = await createAccessToken({ id: user.id_usuario });
    console.log("token: ",token)

    res.cookie("token", token);
    res.json({
      id_usuario: user.id_usuario,
      email,
      nickname: user.nickname,
      rol: user.rol,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const { id } = req.user;
    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [id]
    );

    if (result.length === 0)
      return res.status(404).json({ message: "Usuario not found" });

    const user = result[0];

    res.json({
      id_usuario: user.id_usuario,
      email: user.email,
      nickname: user.nickname,
      rol: user.rol,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalido" });

    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [user.id]
    );

    if (result.length === 0)
      return res.status(403).json({ message: "No autorizado" });

    const userFound = result[0];

    return res.json({
      id_usuario: userFound.id_usuario,
      nickname: userFound.nickname,
      email: userFound.email,
      rol: userFound.rol,
    });
  });
};

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { pool } from "../db.js";

dotenv.config();

export const authRequired = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Acceso denegado" });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token invalido" });

      req.user = user;

      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "No autorizado" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const [userFound] = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [req.user.id]
    );
    if (userFound[0].rol === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Requiere rol de administrador" });
    }
  } catch (error) {
    return res.status(401).json({ message: "No autorizado" });
  }
};

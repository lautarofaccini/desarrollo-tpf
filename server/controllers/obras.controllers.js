import { pool } from "../db.js";
import { getQRCodeForObra } from "../services/qr.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
    const {
      fecha_creacion,
      descripcion,
      material,
      estilo,
      calificacion,
      id_evento,
      id_escultor,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO obras(fecha_creacion, descripcion, material, estilo, calificacion, id_evento, id_escultor) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        fecha_creacion,
        descripcion,
        material,
        estilo,
        calificacion,
        id_evento,
        id_escultor,
      ]
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

export const deleteObra = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM obras WHERE id_obra = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Obra not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateObra = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE obras SET ? WHERE id_obra = ?", [
      req.body,
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Obra not found" });
    const [updObra] = await pool.query(
      "SELECT * FROM obras WHERE id_obra = ?",
      [req.params.id]
    );
    res.json(updObra);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener el código QR de una obra específica
export const getObraQR = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM obras WHERE id_obra = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Obra not found" });
    // Obtener o generar el QR actual de la obra
    const qrCode = await getQRCodeForObra(result[0].id_obra);

    res.status(200).json({ qrCode });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyObrasToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, process.env.SECRET_KEY, async (err, obra) => {
    if (err) return res.status(403).json({ message: "Token invalido" });

    const [result] = await pool.query("SELECT * FROM obras WHERE id_obra = ?", [
      obra.id_obra,
    ]);

    if (result.length === 0)
      return res.status(403).json({ message: "No autorizado" });

    const obraFound = result[0];

    return res.json(obraFound);
  });
};

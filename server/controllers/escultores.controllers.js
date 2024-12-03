import { pool } from "../db.js";
import sharp from "sharp";
import bucket from "../imgstorage.js";

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
    // Parsear los datos JSON enviados en el campo "escultor" del formulario
    const escultorData = JSON.parse(req.body.escultor);

    const {
      nombre,
      apellido,
      nacionalidad,
      fecha_nacimiento,
      biografia,
      email,
      telefono,
    } = escultorData;

    let foto_perfil = null;

    if (req.file) {
      // Procesar la imagen con sharp
      const buffer = await sharp(req.file.buffer)
        .webp({ quality: 80 }) // Convertir a WebP
        .toBuffer();

      const filename = `escultor_${Date.now()}.webp`;
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream();

      await new Promise((resolve, reject) => {
        blobStream.on("error", (error) => {
          console.error("Error uploading file:", error);
          reject(error);
        });

        blobStream.on("finish", resolve);
        blobStream.end(buffer);
      });

      foto_perfil = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    }

    const [result] = await pool.query(
      "INSERT INTO escultores (nombre, apellido, nacionalidad, fecha_nacimiento, biografia, email, telefono, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
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
    //Eliminar foto de perfil antes de borrar
    const [currentEscultor] = await pool.query(
      "SELECT foto_perfil FROM escultores WHERE id_escultor = ?",
      [req.params.id]
    );

    if (currentEscultor.length === 0) {
      return res.status(404).json({ message: "Escultor not found" });
    }

    const currentFotoPerfil = currentEscultor[0].foto_perfil;
    if (currentFotoPerfil) {
      const filename = currentFotoPerfil.split("/").pop(); // Extraer el nombre del archivo
      const file = bucket.file(filename);
      await file.delete().catch((error) => {
        console.error("Error deleting previous image:", error);
      });
    }

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
    // Parsear los datos del escultor y la bandera isImageRemoved
    const escultorData = JSON.parse(req.body.escultor);
    const isImageRemoved = req.body.isImageRemoved === "true"; // Convertir a booleano
    const newImage = req.file; // Nueva imagen subida, si existe

    // Obtener la foto de perfil actual del escultor
    const [currentEscultor] = await pool.query(
      "SELECT foto_perfil FROM escultores WHERE id_escultor = ?",
      [req.params.id]
    );

    if (currentEscultor.length === 0) {
      return res.status(404).json({ message: "Escultor not found" });
    }

    const currentFotoPerfil = currentEscultor[0].foto_perfil;

    // Si se solicita eliminar la imagen actual o se envía una nueva
    if (isImageRemoved || newImage) {
      if (currentFotoPerfil) {
        const filename = currentFotoPerfil.split("/").pop();
        const file = bucket.file(filename);

        await file.delete().catch((error) => {
          console.error("Error deleting previous image:", error);
        });
      }
    }

    // Manejar la nueva imagen, si existe
    let foto_perfil = isImageRemoved ? null : currentFotoPerfil;
    if (newImage) {
      const buffer = await sharp(newImage.buffer)
        .webp({ quality: 80 }) // Convertir a WebP con calidad de compresión
        .toBuffer();

      const filename = `escultor_${req.params.id}_${Date.now()}.webp`;
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream();

      await new Promise((resolve, reject) => {
        blobStream.on("error", (error) => {
          console.error("Error uploading new file:", error);
          reject(error);
        });
        blobStream.on("finish", resolve);
        blobStream.end(buffer);
      });

      foto_perfil = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    }

    // Actualizar los campos del escultor
    const updatedFields = {
      ...escultorData,
      foto_perfil, // Incluir la nueva imagen o la actualizada
    };

    const [result] = await pool.query(
      "UPDATE escultores SET ? WHERE id_escultor = ?",
      [updatedFields, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Escultor not found" });
    }

    // Obtener los datos actualizados del escultor
    const [updatedEscultor] = await pool.query(
      "SELECT * FROM escultores WHERE id_escultor = ?",
      [req.params.id]
    );

    res.json(updatedEscultor[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

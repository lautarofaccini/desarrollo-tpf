import { pool } from "../db.js";
import sharp from "sharp";
import bucket from "../imgstorage.js";

export const getImagenes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM imagenes");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getImagenesByObra = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM imagenes WHERE id_obra = ?",
      [req.params.id]
    );

    // Devolver un array vacío si no hay imágenes
    if (result.length === 0) return res.status(200).json([]);

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createImagen = async (req, res) => {
  try {
    // Verificar que haya archivos y el id_obra
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    if (!req.body.id_obra) {
      return res.status(400).json({ message: "Missing obra ID" });
    }

    const id_obra = parseInt(req.body.id_obra, 10);

    const uploadedImages = [];

    for (const file of req.files) {
      // Convertir la imagen a formato WebP
      const buffer = await sharp(file.buffer)
        .webp({ quality: 80 }) // Convertir a WebP con calidad de compresión
        .toBuffer();

      const filename = `${id_obra}_${Date.now()}.webp`;
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

      const url = `https://storage.googleapis.com/${bucket.name}/${filename}`;
      uploadedImages.push({ url, id_obra });

      // Guardar la URL en la base de datos
      const [result] = await pool.query(
        "INSERT INTO imagenes(url, id_obra) VALUES (?, ?)",
        [url, id_obra]
      );

      uploadedImages[uploadedImages.length - 1].id_imagen = result.insertId;
    }

    res.status(201).json(uploadedImages);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Unexpected server error" });
  }
};

export const deleteImagen = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM imagenes WHERE id_imagen = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Imagen not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteImagenes = async (req, res) => {
  try {
    const { imagesToDelete } = req.body;

    if (!imagesToDelete || imagesToDelete.length === 0) {
      return res.status(400).json({ message: "No images to delete" });
    }

    // Eliminar las imágenes de la base de datos y del bucket
    for (const imageUrl of imagesToDelete) {
      // Eliminar de la base de datos
      await pool.query("DELETE FROM imagenes WHERE url = ?", [imageUrl]);

      // Eliminar de Google Cloud Storage
      const filename = imageUrl.split("/").pop();
      const blob = bucket.file(filename);
      await blob.delete().catch((error) => {
        console.error("Error deleting previous image:", error);
      });
    }
    res.status(200).json({ message: "Images deleted successfully" });
  } catch (error) {
    console.error("Error al eliminar las imágenes:", error);
    res.status(500).json({ message: "Unexpected server error" });
  }
};

export const updateImagen = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE imagenes SET ? WHERE id_imagen = ?",
      [req.body, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Imagen not found" });
    const [updImagen] = await pool.query(
      "SELECT * FROM imagenes WHERE id_imagen = ?",
      [req.params.id]
    );
    res.json(updImagen);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import { pool } from "../db.js";
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

    if (result.length === 0)
      return res.status(404).json({ message: "No image found" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createImagen = async (req, res) => {
  try {
    // Verificar si existe un archivo en el request
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Subir archivo a Google Cloud Storage
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (error) => {
      console.error("Error uploading file:", error);
      return res.status(500).json({ message: "Error uploading file" });
    });

    blobStream.on("finish", async () => {
      try {
        // Obtener la URL del archivo subido
        const url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        // Insertar la URL y el ID de la obra en la base de datos
        const id_obra = parseInt(req.file.originalname.split("_")[0], 10);
        const [result] = await pool.query(
          "INSERT INTO imagenes(url, id_obra) VALUES (?, ?)",
          [url, id_obra]
        );

        // Enviar respuesta exitosa con los datos insertados
        res.status(201).json({
          id_imagen: result.insertId,
          url,
          id_obra,
        });
      } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Error saving data to database" });
      }
    });

    blobStream.end(req.file.buffer);
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

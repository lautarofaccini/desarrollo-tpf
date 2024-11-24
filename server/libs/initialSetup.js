import { pool } from "../db.js"; // Asegúrate de usar el path correcto
import bcrypt from "bcrypt";
import {
  getQRCodeForObra,
  stopQRCodeUpdateInterval,
} from "../services/qr.service.js";

export const initialSetup = async () => {
  try {
    // Verificar si ya existe el usuario administrador
    const [emailFound] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      ["admin@admin.com"]
    );

    if (emailFound.length === 0) {
      // Crear contraseña encriptada
      const hashedPassword = await bcrypt.hash("admin123", 10);

      // Crear usuario administrador en la base de datos
      await pool.query(
        "INSERT INTO usuarios (email, password, nickname, rol) VALUES (?, ?, ?, ?)",
        ["admin@admin.com", hashedPassword, "admin", "admin"]
      );
    }

    // Buscar evento activo o pausado
    const [eventos] = await pool.query(
      "SELECT id_evento, estado FROM eventos WHERE estado IN ('activo', 'pausado') LIMIT 1"
    );

    if (eventos.length > 0) {
      const { id_evento, estado } = eventos[0];

      // Obtener las obras asociadas al evento
      const [obras] = await pool.query(
        "SELECT id_obra FROM obras WHERE id_evento = ?",
        [id_evento]
      );

      if (obras.length > 0) {
        // Generar QR para cada obra asociada
        for (const { id_obra } of obras) {
          await getQRCodeForObra(id_obra);
        }

        // Iniciar el intervalo si el evento está activo
        if (estado === "pausado") {
          stopQRCodeUpdateInterval();
        }
      }
    }
    console.log("Setup inicial completado.");
  } catch (error) {
    console.error("Error durante el setup inicial:", error.message);
  }
};

import { pool } from "../db.js"; // Asegúrate de usar el path correcto
import bcrypt from "bcrypt";

export const createAdmin = async () => {
  try {
    // Verificar si ya existe el usuario administrador
    const [emailFound] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      ["admin@admin.com"]
    );

    if (emailFound.length !== 0) {
      console.log("Setup completed");
      return;
    }

    // Crear contraseña encriptada
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Crear usuario administrador en la base de datos
    await pool.query(
      "INSERT INTO usuarios (email, password, nickname, rol) VALUES (?, ?, ?, ?)",
      ["admin@admin.com", hashedPassword, "admin", "admin"]
    );

    console.log("Setup completed");
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error.message);
  }
};

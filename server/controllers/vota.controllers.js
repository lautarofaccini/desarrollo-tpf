import { pool } from "../db.js";

// Obtener todos los votos o un voto específico
export const getVotos = async (req, res) => {
  try {
    const { idObra, idUsu } = req.query;

    if (idObra && idUsu) {
      // Si se proporcionan idObra e idUsu, devolver el voto específico
      const [result] = await pool.query(
        "SELECT * FROM vota WHERE id_obra = ? AND id_usuario = ?",
        [idObra, idUsu]
      );

      if (result.length === 0)
        return res.status(404).json({ message: "Voto not found" });

      return res.json(result[0]);
    }

    // Si no se proporcionan parámetros, devolver todos los votos
    const [result] = await pool.query("SELECT * FROM vota");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener votos por obra
export const getVotosByObra = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM vota WHERE id_obra = ?", [
      req.params.id_obra,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener votos por usuario
export const getVotosByUsuario = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM vota WHERE id_usuario = ?",
      [req.params.id_usuario]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un voto
export const createVoto = async (req, res) => {
  try {
    const { id_obra, id_usuario, puntaje } = req.body;

    // Verificar el estado del evento asociado a la obra
    const [eventResult] = await pool.query(
      "SELECT e.estado FROM eventos e JOIN obras o ON o.id_evento = e.id_evento WHERE o.id_obra = ?",
      [id_obra]
    );

    if (eventResult.length === 0) {
      return res
        .status(404)
        .json({ message: "Obra no asociada a ningún evento." });
    }

    const eventEstado = eventResult[0].estado;

    // Comprobar si el evento está activo
    if (eventEstado !== "activo") {
      return res
        .status(400)
        .json({ message: "No se puede votar, el evento no está activo." });
    }

    // Si el evento está activo, proceder a registrar el voto
    const [result] = await pool.query(
      "INSERT INTO vota (id_obra, id_usuario, puntaje) VALUES (?, ?, ?)",
      [id_obra, id_usuario, puntaje]
    );

    res.json({
      id_obra,
      id_usuario,
      puntaje,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un voto
export const updateVoto = async (req, res) => {
  try {
    const { puntaje } = req.body;
    const [result] = await pool.query(
      "UPDATE vota SET puntaje = ? WHERE id_obra = ? AND id_usuario = ?",
      [puntaje, req.params.id_obra, req.params.id_usuario]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Voto not found" });

    const [updatedVoto] = await pool.query(
      "SELECT * FROM vota WHERE id_obra = ? AND id_usuario = ?",
      [req.params.id_obra, req.params.id_usuario]
    );

    res.json(updatedVoto[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un voto
export const deleteVoto = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM vota WHERE id_obra = ? AND id_usuario = ?",
      [req.params.id_obra, req.params.id_usuario]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Voto not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

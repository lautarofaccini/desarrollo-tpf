import { Router } from "express";
import {
  getEventos,
  getEvento,
  createEvento,
  updateEvento,
  deleteEvento,
} from "../controllers/eventos.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
/* 
Agregar authRequired para asegurar la ruta
Ejemplo: 
router.get("/ejemplo", authRequired, getEjemplo);
 */

const router = Router();

router.get("/", getEventos);

router.get("/:id", getEvento);

router.post("/", createEvento);

router.put("/:id", updateEvento);

router.delete("/:id", deleteEvento);

export default router;

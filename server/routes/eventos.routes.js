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

router.get("/eventos", getEventos);

router.get("/eventos/:id", getEvento);

router.post("/eventos", createEvento);

router.put("/eventos/:id", updateEvento);

router.delete("/eventos/:id", deleteEvento);

export default router;

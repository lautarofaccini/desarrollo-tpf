import { Router } from "express";
import {
  getEventos,
  getEventosOrdenados,
  getEvento,
  createEvento,
  updateEvento,
  deleteEvento,
} from "../controllers/eventos.controllers.js";
import { authRequired, isAdmin } from "../middlewares/validateToken.js";
/* 
Agregar authRequired para asegurar la ruta
Ejemplo: 
router.get("/ejemplo", authRequired, getEjemplo);
 */

const router = Router();

router.get("/eventos", getEventos);

router.get("/eventosOrd", getEventosOrdenados);

router.get("/eventos/:id", getEvento);

router.post("/eventos", [authRequired, isAdmin], createEvento);

router.put("/eventos/:id", [authRequired, isAdmin], updateEvento);

router.delete("/eventos/:id", [authRequired, isAdmin], deleteEvento);

export default router;

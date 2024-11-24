import { Router } from "express";
import {
  getEventos,
  getEventosOrdenados,
  getEvento,
  createEvento,
  updateEvento,
  deleteEvento,
  activarEvento,
  pausarEvento,
  finalizarEvento,
  desactivarEvento
} from "../controllers/eventos.controllers.js";
import { authRequired, isAdmin } from "../middlewares/validateToken.js";

const router = Router();

router.get("/eventos", getEventos);

router.get("/eventosOrd", getEventosOrdenados);

router.get("/eventos/:id", getEvento);

router.post("/eventos", [authRequired, isAdmin], createEvento);

router.put("/eventos/:id", [authRequired, isAdmin], updateEvento);

router.delete("/eventos/:id", [authRequired, isAdmin], deleteEvento);

//Controles de evento

router.post("/eventos/activar/:id", [authRequired, isAdmin], activarEvento);

router.post("/eventos/pausar/:id", [authRequired, isAdmin], pausarEvento);

router.post("/eventos/finalizar/:id", [authRequired, isAdmin], finalizarEvento);

router.post("/eventos/desactivar/:id", [authRequired, isAdmin], desactivarEvento);

export default router;

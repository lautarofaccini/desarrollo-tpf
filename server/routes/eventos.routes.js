import { Router } from "express";
import {
  getEventos,
  getEvento,
  createEvento,
  updateEvento,
  deleteEvento,
} from "../controllers/eventos.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/eventos", authRequired, getEventos);

router.get("/eventos/:id", authRequired, getEvento);

router.post("/eventos", authRequired, createEvento);

router.put("/eventos/:id", authRequired, updateEvento);

router.delete("/eventos/:id", authRequired, deleteEvento);

export default router;

import { Router } from "express";
import {
  getEventos,
  getEvento,
  createEvento,
  updateEvento,
  deleteEvento,
} from "../controllers/eventos.controllers.js";

const router = Router();

router.get("/eventos", getEventos);

router.get("/eventos/:id", getEvento);

router.post("/eventos", createEvento);

router.put("/eventos/:id", updateEvento);

router.delete("/eventos/:id", deleteEvento);

export default router;

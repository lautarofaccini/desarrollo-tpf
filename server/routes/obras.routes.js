import { Router } from "express";
import {
  getObras,
  getObra,
  createObra,
  updateObra,
  deleteObra,
} from "../controllers/obras.controllers.js";

const router = Router();

router.get("/obras", getEventos);

router.get("/obras/:id", getEvento);

router.post("/obras", createEvento);

router.put("/obras/:id", updateEvento);

router.delete("/obras/:id", deleteEvento);

export default router;
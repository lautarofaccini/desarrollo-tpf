import { Router } from "express";
import {
  getObras,
  getObra,
  createObra,
  updateObra,
  deleteObra,
} from "../controllers/obras.controllers.js";

const router = Router();

router.get("/obras", getObras);

router.get("/obras/:id", getObra);

router.post("/obras", createObra);

router.put("/obras/:id", updateObra);

router.delete("/obras/:id", deleteObra);

export default router;
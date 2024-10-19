import { Router } from "express";
import {
  getObras,
  getObra,
  createObra,
  updateObra,
  deleteObra,
} from "../controllers/obras.controllers.js";

const router = Router();

router.get("/", getObras);

router.get("/:id", getObra);

router.post("/", createObra);

router.put("/:id", updateObra);

router.delete("/:id", deleteObra);

export default router;

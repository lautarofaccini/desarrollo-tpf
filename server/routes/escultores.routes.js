import { Router } from "express";
import {
  getEscultores,
  getEscultor,
  createEscultor,
  updateEscultor,
  deleteEscultor,
} from "../controllers/escultores.controllers.js";

const router = Router();

router.get("/", getEscultores);

router.get("/:id", getEscultor);

router.post("/", createEscultor);

router.put("/:id", updateEscultor);

router.delete("/:id", deleteEscultor);

export default router;

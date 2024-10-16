import { Router } from "express";
import {
  getEscultores,
  getEscultor,
  createEscultor,
  updateEscultor,
  deleteEscultor,
} from "../controllers/escultores.controllers.js";

const router = Router();

router.get("/escultores", getEscultores);

router.get("/escultores/:id", getEscultor);

router.post("/escultores", createEscultor);

router.put("/escultores/:id", updateEscultor);

router.delete("/escultores/:id", deleteEscultor);

export default router;

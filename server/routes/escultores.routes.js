import { Router } from "express";
import {
  getEscultores,
  getEscultor,
  createEscultor,
} from "../controllers/escultores.controllers.js";

const router = Router();

router.get("/escultores", getEscultores);
router.get("/escultores/:id", getEscultor);

router.post("/escultores", createEscultor);
/* 

router.put("/escultores/:id", updateEvento);

router.delete("/escultores/:id", deleteEvento);
 */
export default router;

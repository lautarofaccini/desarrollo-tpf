import { Router } from "express";
import {
  getEscultores,
  getEscultor,
  createEscultor,
  updateEscultor,
  deleteEscultor,
} from "../controllers/escultores.controllers.js";
import { authRequired, isAdmin } from "../middlewares/validateToken.js";

const router = Router();

router.get("/", getEscultores);

router.get("/:id", getEscultor);

router.post("/", [authRequired, isAdmin], createEscultor);

router.put("/:id", [authRequired, isAdmin], updateEscultor);

router.delete("/:id", [authRequired, isAdmin], deleteEscultor);

export default router;

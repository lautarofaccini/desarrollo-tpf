import { Router } from "express";
import {
  getEscultores,
  getEscultor,
  createEscultor,
  updateEscultor,
  deleteEscultor,
} from "../controllers/escultores.controllers.js";
import Multer from "multer";
import { authRequired, isAdmin } from "../middlewares/validateToken.js";

export const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //Hasta 5mb
  },
});

const router = Router();

router.get("/", getEscultores);

router.get("/:id", getEscultor);

router.post(
  "/",
  [authRequired, isAdmin],
  multer.single("foto_perfil"),
  createEscultor
);

router.put(
  "/:id",
  [authRequired, isAdmin],
  multer.single("foto_perfil"),
  updateEscultor
);

router.delete("/:id", [authRequired, isAdmin], deleteEscultor);

export default router;

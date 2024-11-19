import { Router } from "express";
import {
  getImagenes,
  getImagenesByObra,
  createImagen,
  updateImagen,
  deleteImagen,
  deleteImagenes,
} from "../controllers/imagenes.controllers.js";
import Multer from "multer";
import { authRequired, isAdmin } from "../middlewares/validateToken.js";

export const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //Hasta 5mb
  },
});

const router = Router();

router.get("/", getImagenes);

router.get("/:id", getImagenesByObra);

router.post("/", [authRequired, isAdmin], multer.array("images", 3), createImagen);

router.put("/:id", [authRequired, isAdmin], updateImagen);

router.delete("/:id", [authRequired, isAdmin], deleteImagen);

router.delete("/", [authRequired, isAdmin], deleteImagenes);

export default router;

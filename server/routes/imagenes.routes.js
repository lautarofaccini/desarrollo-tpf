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

export const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //Hasta 5mb
  },
});

const router = Router();

router.get("/", getImagenes);

router.get("/:id", getImagenesByObra);

router.post("/", multer.array("images", 3), createImagen);

router.put("/:id", updateImagen);

router.delete("/:id", deleteImagen);

router.delete("/", deleteImagenes);

export default router;

import { Router } from "express";
import {
  getVotos,
  getVotosByObra,
  getVotosByUsuario,
  createVoto,
  updateVoto,
  deleteVoto,
} from "../controllers/vota.controllers.js";

const router = Router();

router.get("/", getVotos);

router.get("/obra/:id_obra", getVotosByObra);

router.get("/usuario/:id_usuario", getVotosByUsuario);

router.post("/", createVoto);

router.put("/:id_obra/:id_usuario", updateVoto);

router.delete("/:id_obra/:id_usuario", deleteVoto);

export default router;

import { Router } from "express";
import {
  getVotos,
  getVotosByObra,
  getVotosByUsuario,
  createVoto,
  updateVoto,
  deleteVoto,
} from "../controllers/vota.controllers.js";
import { authRequired, isAdmin } from "../middlewares/validateToken.js";

const router = Router();

router.get("/", [authRequired, isAdmin], getVotos);

router.get("/obra/:id_obra", [authRequired, isAdmin], getVotosByObra);

router.get("/usuario/:id_usuario", [authRequired, isAdmin], getVotosByUsuario);

router.post("/", [authRequired], createVoto);

router.put("/:id_obra/:id_usuario", [authRequired, isAdmin], updateVoto);

router.delete("/:id_obra/:id_usuario", [authRequired, isAdmin], deleteVoto);

export default router;

import { Router } from "express";
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarios.controllers.js";
import { authRequired, isAdmin } from "../middlewares/validateToken.js";

const router = Router();

router.get("/", [authRequired, isAdmin], getUsuarios);

router.get("/:id", [authRequired, isAdmin], getUsuario);

router.post("/", [authRequired, isAdmin], createUsuario);

router.put("/:id", [authRequired, isAdmin], updateUsuario);

router.delete("/:id", [authRequired, isAdmin], deleteUsuario);

export default router;

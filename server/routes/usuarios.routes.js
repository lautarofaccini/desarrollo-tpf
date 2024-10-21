import { Router } from "express";
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.get("/", getUsuarios);

router.get("/:id", getUsuario);

router.post("/", createUsuario);

router.put("/:id", updateUsuario);

router.delete("/:id", deleteUsuario);

export default router;

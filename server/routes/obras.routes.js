import { Router } from "express";
import {
  getObras,
  getObra,
  createObra,
  updateObra,
  deleteObra,
  getObraQR,
  verifyObrasToken,
} from "../controllers/obras.controllers.js";

const router = Router();

router.get("/verify", verifyObrasToken);

router.get("/", getObras);

router.get("/:id", getObra);

router.post("/", createObra);

router.put("/:id", updateObra);

router.delete("/:id", deleteObra);

router.get("/:id/qr", getObraQR);

export default router;

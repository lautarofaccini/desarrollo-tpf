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
import { authRequired, isAdmin } from "../middlewares/validateToken.js";

const router = Router();

router.get("/verify", verifyObrasToken);

router.get("/", getObras);

router.get("/:id", getObra);

router.post("/", [authRequired, isAdmin], createObra);

router.put("/:id", [authRequired, isAdmin], updateObra);

router.delete("/:id", [authRequired, isAdmin], deleteObra);

router.get("/:id/qr", [authRequired, isAdmin], getObraQR);

export default router;

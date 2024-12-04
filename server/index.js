import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import eventosRoutes from "./routes/eventos.routes.js";
import obrasRoutes from "./routes/obras.routes.js";
import escultoresRoutes from "./routes/escultores.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import votaRoutes from "./routes/vota.routes.js";
import imagenesRoutes from "./routes/imagenes.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { initialSetup } from "./libs/initialSetup.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/escultores/", escultoresRoutes);
app.use("/api/", eventosRoutes);
app.use("/api", indexRoutes);
app.use("/api/obras", obrasRoutes);
app.use("/api/imagenes", imagenesRoutes);
app.use("/api/usuarios", usuariosRoutes);

app.use("/api/vota", votaRoutes);

initialSetup();

app.listen(PORT);

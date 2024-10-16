import express from "express";
import cors from "cors";
import { PORT } from "./config.js";

import indexRoutes from "./routes/index.routes.js";
import eventosRoutes from "./routes/eventos.routes.js";
import obrasRoutes from './routes/obras.routes.js';
import escultoresRoutes from "./routes/escultores.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use(indexRoutes);
app.use(eventosRoutes);
app.use(escultoresRoutes);
app.use(obrasRoutes);
app.use(usuariosRoutes);

app.listen(PORT);

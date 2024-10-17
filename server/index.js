import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config.js";

import indexRoutes from "./routes/index.routes.js";
import eventosRoutes from "./routes/eventos.routes.js";
import escultoresRoutes from "./routes/escultores.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use(indexRoutes);
app.use(eventosRoutes);
app.use(escultoresRoutes);

app.listen(PORT);

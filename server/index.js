import express from "express";
import { PORT } from "./config.js";

import indexRoutes from "./routes/index.routes.js";
import eventosRoutes from "./routes/eventos.routes.js";

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use(eventosRoutes);

app.listen(PORT);

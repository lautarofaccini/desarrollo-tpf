import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar las variables de entorno del archivo .env
dotenv.config();

export const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

import axios from "axios";

// Usa import.meta.env para las variables de entorno en Vite
const instance = axios.create({
  baseURL: `http://${import.meta.env.VITE_HOST || "localhost"}:${
    import.meta.env.VITE_PORT || 4000
  }/api`,
  withCredentials: true,
});

export default instance;

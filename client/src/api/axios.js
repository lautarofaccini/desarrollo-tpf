import axios from "axios";
import { VITE_IP } from "../../../server/config";

const instance = axios.create({
  baseURL: `http://${VITE_IP}:4000/api`,
  withCredentials: true,
});

export default instance;

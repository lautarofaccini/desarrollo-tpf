import axios from "axios";
import { API } from "./config";

export const registerRequest = async (user) =>
  await axios.post(`${API}/register`, user);

export const loginRequest = async (user) =>
  await axios.post(`${API}/login`, user);

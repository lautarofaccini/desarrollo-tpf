import axios from "./axios";

export const registerRequest = async (user) =>
  await axios.post(`/register`, user);

export const loginRequest = async (user) => await axios.post(`/login`, user);

export const verifyTokenRequest = async () => await axios.get("/verify");

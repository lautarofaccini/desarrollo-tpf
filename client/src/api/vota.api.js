import axios from "./axios";

export const getVotoRequest = async () => await axios.get(`/vota`);

export const getVotoByObraRequest = async (id) =>
  await axios.get(`/vota/obra/${id}`);

export const getVotoByUsuarioRequest = async (id) =>
    await axios.get(`/vota/usuario/${id}`);

export const createVotoRequest = async (voto) =>
  await axios.post(`/vota`, voto);
import axios from "./axios";

export const getEventosRequest = async () => await axios.get(`/eventos`);

export const getEventosOrdenadosRequest = async () =>
  await axios.get(`/eventosOrd`);

export const createEventoRequest = async (evento) =>
  await axios.post(`/eventos`, evento);

export const deleteEventoRequest = async (id) =>
  await axios.delete(`/eventos/${id}`);

export const getEventoRequest = async (id) => await axios.get(`/eventos/${id}`);

export const updateEventoRequest = async (id, newFields) =>
  await axios.put(`/eventos/${id}`, newFields);

export const activarEventoRequest = async (id) =>
  await axios.post(`/eventos/activar/${id}`);

export const pausarEventoRequest = async (id) =>
  await axios.post(`/eventos/pausar/${id}`);

export const finalizarEventoRequest = async (id) =>
  await axios.post(`/eventos/finalizar/${id}`);

export const desactivarEventoRequest = async (id) =>
  await axios.post(`/eventos/desactivar/${id}`);

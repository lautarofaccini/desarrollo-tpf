import axios from "./axios";

export const getEventosRequest = async () => await axios.get(`/eventos`);

export const createEventoRequest = async (evento) =>
  await axios.post(`/eventos`, evento);

export const deleteEventoRequest = async (id) =>
  await axios.delete(`/eventos/${id}`);

export const getEventoRequest = async (id) =>
  await axios.get(`/eventos/${id}`);

export const updateEventoRequest = async (id, newFields) =>
  await axios.put(`/eventos/${id}`, newFields);

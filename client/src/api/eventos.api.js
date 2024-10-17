import axios from "axios";
import { API } from "./config";

export const getEventosRequest = async () => await axios.get(`${API}/eventos`);

export const createEventoRequest = async (evento) =>
  await axios.post(`${API}/eventos`, evento);

export const deleteEventoRequest = async (id) =>
  await axios.delete(`${API}/eventos/${id}`);

export const getEventoRequest = async (id) =>
  await axios.get(`${API}/eventos/${id}`);

export const updateEventoRequest = async (id, newFields) =>
  await axios.put(`${API}/eventos/${id}`, newFields);

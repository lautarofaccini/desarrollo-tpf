import axios from "axios";

export const getEventosRequest = async () =>
  await axios.get("http://localhost:4000/eventos");

export const createEventoRequest = async (evento) =>
  await axios.post("http://localhost:4000/eventos", evento);

export const deleteEventoRequest = async (id) => 
	await axios.delete(`http://localhost:4000/eventos/${id}`)

export const getEventoRequest = async (id) =>
    await axios.get(`http://localhost:4000/eventos/${id}`);

export const updateEventoRequest = async (id, newFields) =>
    await axios.put(`http://localhost:4000/eventos/${id}`, newFields);

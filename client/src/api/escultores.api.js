import axios from "./axios";

export const getEscultoresRequest = async () => await axios.get(`/escultores`);

export const createEscultorRequest = async (escultor) =>
  await axios.post(`/escultores`, escultor);

export const deleteEscultorRequest = async (id) =>
  await axios.delete(`/escultores/${id}`);

export const getEscultorRequest = async (id) =>
  await axios.get(`/escultores/${id}`);

export const updateEscultorRequest = async (id, newFields) =>
  await axios.put(`/escultores/${id}`, newFields);
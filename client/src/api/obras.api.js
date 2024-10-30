import axios from "./axios";

export const getObrasRequest = async () => await axios.get(`/obras`);

export const createObraRequest = async (obra) =>
  await axios.post(`/obras`, obra);

export const deleteObraRequest = async (id) =>
  await axios.delete(`/obras/${id}`);

export const getObraRequest = async (id) => await axios.get(`/obras/${id}`);

export const updateObraRequest = async (id, newFields) =>
  await axios.put(`/obras/${id}`, newFields);

export const getObrasQRRequest = async (id) =>
  await axios.get(`/obras/${id}/qr`);

export const verifyObrasTokenRequest = async (token) =>
  await axios.get(`/obras/verify/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
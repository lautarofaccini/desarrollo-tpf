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

export const esculturas = [
  {
    id: 1,
    nombre: "Escultura Rostro",
    imagen: "/download.jpg",
    descripcion: "Esta es una obra inspirada",
  },
  {
    id: 2,
    nombre: "La Venus de Milo?",
    imagen: "/images.jpg",
    descripcion:
      "La Venus de Milo, también conocida como Afrodita de Milo, es una de las esculturas más icónicas de la Antigua Grecia y una de las obras maestras del arte clásico. ",
  },
  {
    id: 3,
    nombre: "Titular",
    imagen: "/JEFF_KOONS_2.jpg",
    descripcion: "Esta imponente estatua de mármol representa al héroe bíblico",
  },
];

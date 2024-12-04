import axios from "./axios";

export const getVotoRequest = async () => await axios.get(`/vota`);

export const getVotoByObraUsuarioRequest = async (idObra, idUsuario) => {
  try {
    const response = await axios.get(
      `/vota?idObra=${idObra}&idUsu=${idUsuario}`
    );
    return response.data; // Si encuentra un voto, lo devuelve
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Si el error es 404, significa que no hay voto
      return null; // Devolver null para manejar este caso como una condición normal
    }
    throw error; // Lanza otros errores que no sean 404
  }
};

export const getVotoByObraRequest = async (id) =>
  await axios.get(`/vota/obra/${id}`);

export const getVotoByUsuarioRequest = async (id) =>
  await axios.get(`/vota/usuario/${id}`);

export const createVotoRequest = async (voto) =>
  await axios.post(`/vota`, voto);

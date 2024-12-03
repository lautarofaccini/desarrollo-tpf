import axios from "./axios";

export const getEscultoresRequest = async () => await axios.get(`/escultores`);

export const createEscultorRequest = async (escultor, selectedImage) => {
  const formData = new FormData();
  formData.append("escultor", JSON.stringify(escultor));
  if (selectedImage) {
    formData.append("foto_perfil", selectedImage);
  }

  await axios.post("/escultores", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteEscultorRequest = async (id) =>
  await axios.delete(`/escultores/${id}`);

export const getEscultorRequest = async (id) =>
  await axios.get(`/escultores/${id}`);

export const updateEscultorRequest = async (
  id,
  newFields,
  selectedImage,
  isImageRemoved
) => {
  const formData = new FormData();

  // Agregar los datos del escultor como JSON
  formData.append("escultor", JSON.stringify(newFields));

  // Agregar la imagen seleccionada, si existe
  if (selectedImage) {
    formData.append("foto_perfil", selectedImage);
  }

  // Agregar la bandera de eliminación de imagen
  formData.append("isImageRemoved", isImageRemoved);

  // Enviar la solicitud al servidor
  await axios.put(`/escultores/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

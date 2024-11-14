import axios from "./axios";

export const getObrasRequest = async () => await axios.get(`/obras`);

export const createObraRequest = async (obra, selectedImages) => {
  // Enviar primero la información de la obra
  const res = await axios.post(`/obras`, obra);

  if (selectedImages && selectedImages.length > 0) {
    const formData = new FormData();
    formData.append("id_obra", res.data.id_obra); // Añadir el id_obra al FormData

    // Agregar cada imagen seleccionada al FormData
    selectedImages.forEach((image) => {
      formData.append("images", image); // No cambiar el nombre en el frontend
    });

    // Enviar todas las imágenes y el id_obra en una sola petición
    await axios.post("http://localhost:4000/imagenes", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
};

export const deleteObraRequest = async (id) =>
  await axios.delete(`/obras/${id}`);

export const getObraRequest = async (id) => await axios.get(`/obras/${id}`);

export const getObrasByEscultorRequest = async (id) =>
  await axios.get(`/obras?idEsc=${id}`);

export const updateObraRequest = async (
  id,
  newFields,
  selectedImages,
  imagesToDelete
) => {
  // Eliminar las imágenes primero
  if (imagesToDelete.length > 0) {
    await axios.delete(`/imagenes`, { data: { imagesToDelete } });
  }

  // Subir las nuevas imágenes (si las hay)
  if (selectedImages.length > 0) {
    const formData = new FormData();
    formData.append("id_obra", id);

    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    await axios.post("http://localhost:4000/imagenes", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Ahora, actualizar la obra
    await axios.put(`/obras/${id}`, newFields);
  }
};

export const getObrasQRRequest = async (id) =>
  await axios.get(`/obras/${id}/qr`);

export const getImagenesByObraRequest = async (id) =>
  await axios.get(`/imagenes/${id}`);

export const verifyObrasTokenRequest = async (token) =>
  await axios.get(`/obras/verify/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

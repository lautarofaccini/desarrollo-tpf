import axios from "./axios";

export const getObrasRequest = async () => await axios.get(`/obras`);

export const createObraRequest = async (obra, selectedImage) => {
  const res = await axios.post(`/obras`, obra);
  if (selectedImage) {
    const postid = `${res.data.id_obra}_${Date.now()}`;
    const blob = selectedImage.slice(0, selectedImage.size, "image/jpeg");
    const newFile = new File([blob], `${postid}_post.jpeg`, {
      type: "image/jpeg",
    });
    const formData = new FormData();
    formData.append("imgfile", newFile);
    console.log(formData)
    await axios.post("http://localhost:4000/imagenes", formData);
  }
};

export const deleteObraRequest = async (id) =>
  await axios.delete(`/obras/${id}`);

export const getObraRequest = async (id) => await axios.get(`/obras/${id}`);

export const updateObraRequest = async (id, newFields) =>
  await axios.put(`/obras/${id}`, newFields);

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

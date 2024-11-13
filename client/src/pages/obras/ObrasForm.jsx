import { useForm } from "react-hook-form";
import { useObras } from "@/context/ObraContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

function ObrasForm() {
  const [selectedImages, setSelectedImages] = useState([]); // Nuevas imágenes seleccionadas
  const [previewUrls, setPreviewUrls] = useState([]); // URLs de previsualización
  const [existingImages, setExistingImages] = useState([]); // Imágenes ya existentes del backend
  const [imagesToDelete, setImagesToDelete] = useState([]); // Imágenes existentes a eliminar
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el envío del formulario

  const { register, handleSubmit, setValue } = useForm();
  const { createObra, getObra, updateObra, getImagenesByObra } = useObras();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadObra() {
      if (params.id) {
        const obraData = await getObra(params.id);

        // Convertir la fecha al formato "yyyy-MM-dd"
        const fecha_creacion = obraData.fecha_creacion
          ? new Date(obraData.fecha_creacion).toISOString().split("T")[0]
          : "";

        setValue("fecha_creacion", fecha_creacion);
        setValue("descripcion", obraData.descripcion || "");
        setValue("material", obraData.material || "");
        setValue("estilo", obraData.estilo || "");
        setValue("id_evento", obraData.id_evento);
        setValue("id_escultor", obraData.id_escultor);

        // Cargar imágenes existentes
        const imagenes = await getImagenesByObra(obraData.id_obra);
        if (imagenes) {
          const urls = imagenes.map((img) => img.url);
          setExistingImages(urls);
          setPreviewUrls(urls); // Previsualizar las imágenes existentes
        }
      }
    }
    loadObra();
  }, [getObra, params.id, setValue, getImagenesByObra]);

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    const obra = {
      fecha_creacion: values.fecha_creacion,
      descripcion: values.descripcion,
      material: values.material,
      estilo: values.estilo,
      calificacion: 0.0,
      id_evento: values.id_evento,
      id_escultor: values.id_escultor,
    };

    // Filtrar campos opcionales
    if (obra.fecha_creacion === "") delete obra.fecha_creacion;
    if (obra.material === "") delete obra.material;
    if (obra.descripcion === "") delete obra.descripcion;
    if (obra.estilo === "") delete obra.estilo;

    if (params.id) {
      await updateObra(params.id, obra, selectedImages, imagesToDelete);
    } else {
      await createObra(obra, selectedImages);
    }
    navigate("/obras");
  });

  const onImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.slice(
      0,
      3 - selectedImages.length - existingImages.length
    );

    setSelectedImages((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const removeSelectedImage = (index) => {
    if (index < existingImages.length) {
      // Eliminar una imagen existente
      const urlToDelete = existingImages[index];
      setImagesToDelete((prev) => [...prev, urlToDelete]);
      setExistingImages((prev) =>
        prev.filter((_, existingIndex) => existingIndex !== index)
      );
    } else {
      // Eliminar una imagen nueva
      const newIndex = index - existingImages.length;
      setSelectedImages((prev) =>
        prev.filter((_, newImageIndex) => newImageIndex !== newIndex)
      );
    }

    // Actualizar previsualización
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full py-12">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-white text-xl font-bold uppercase text-center">
            {params.id ? "Actualizar Obra" : "Crear Obra"}
          </h1>

          <label className="text-gray-400 block">Imágenes</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={onImageChange}
            className="px-2 py-1 rounded-sm w-full text-white"
            multiple
            disabled={previewUrls.length >= 3}
          />

          <div className="grid grid-cols-3 gap-2">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Selected ${index}`}
                  className="w-full h-24 object-cover px-2 py-1 rounded-sm"
                />
                <button
                  type="button"
                  onClick={() => removeSelectedImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <label className="text-gray-400 block">Fecha de Creación</label>
          <input
            type="date"
            {...register("fecha_creacion")}
            className="px-2 py-1 rounded-sm w-full"
          />

          <label className="text-gray-400 block">Material</label>
          <input
            type="text"
            placeholder="Escribe el material del que está compuesta la obra"
            {...register("material")}
            className="px-2 py-1 rounded-sm w-full"
          />

          <label className="text-gray-400 block">Descripción</label>
          <textarea
            rows="3"
            placeholder="Escribe una descripción"
            {...register("descripcion")}
            className="px-2 py-1 rounded-sm w-full"
          ></textarea>

          <label className="text-gray-400 block">Estilo</label>
          <input
            type="text"
            placeholder="Escribe el estilo con el que se compuso la obra"
            {...register("estilo")}
            className="px-2 py-1 rounded-sm w-full"
          />

          <label className="text-gray-400 block">ID del Evento</label>
          <input
            type="number"
            min="1"
            placeholder="ID del evento de la obra"
            {...register("id_evento")}
            className="px-2 py-1 rounded-sm w-full"
          />

          <label className="text-gray-400 block">ID del Escultor</label>
          <input
            type="number"
            min="1"
            placeholder="ID del escultor de la obra"
            {...register("id_escultor")}
            className="px-2 py-1 rounded-sm w-full"
          />
          <button
            type="submit"
            className="block bg-indigo-500 px-2 py-1 mt-2 text-white w-full rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ObrasForm;

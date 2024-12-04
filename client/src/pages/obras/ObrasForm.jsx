import { useForm } from "react-hook-form";
import { useObras } from "@/context/ObraContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

function ObrasForm() {
  const [selectedImages, setSelectedImages] = useState([]); // Nuevas imágenes seleccionadas
  const [previewUrls, setPreviewUrls] = useState([]); // URLs de previsualización
  const [existingImages, setExistingImages] = useState([]); // Imágenes ya existentes del backend
  const [imagesToDelete, setImagesToDelete] = useState([]); // Imágenes existentes a eliminar
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el envío del formulario

  const [searchParams] = useSearchParams(); // Obtener parámetros de la URL
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
      } else {
        // Si es una nueva obra, verifica si hay un escultor preseleccionado
        const escultorId = searchParams.get("escultor");
        if (escultorId) {
          setValue("id_escultor", escultorId);
        }
      }
    }
    loadObra();
  }, [getObra, params.id, setValue, getImagenesByObra, searchParams]);

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
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-pink-300 via-purple-500 to-indigo-300">
      <div className="-mt-20 max-w-md w-full p-10 border-4 border-gray-700 rounded-2xl shadow-lg bg-gray-900">
        <form onSubmit={onSubmit}>
          <h1 className="text-white text-2xl pb-8 underline font-bold uppercase text-center">
            {params.id ? "Actualizar Obra" : "Crear Obra"}
          </h1>

          <label className="text-white block underline pb-1">Imágenes</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={onImageChange}
            className="px-0 py-1 rounded-sm w-full text-white "
            multiple
            disabled={previewUrls.length >= 3}
          />

          <div className="grid grid-cols-3 gap-2">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Selected ${index}`}
                  className="w-full h-24 object-cover px-2 py-1 rounded-sm "
                />
                <button
                  type="button"
                  onClick={() => removeSelectedImage(index)}
                  className="absolute top-0 right-0  bg-red-500 text-white p-1 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <label className="text-white underline pt-2 pb-1 block">Fecha de Creación</label>
          <input
            type="date"
            {...register("fecha_creacion")}
            className="px-2 py-1 rounded-sm w-full bg-gray-200 text-black"
          />

          <label className="text-white underline pt-2 pb-1 block">Material</label>
          <input
            type="text"
            placeholder="Escribe el material del que está compuesta la obra"
            {...register("material")}
            className="px-2 py-1 rounded-sm w-full bg-gray-200 text-black"
          />

          <label className="text-white underline pt-2 pb-1 block">Descripción</label>
          <textarea
            rows="3"
            placeholder="Escribe una descripción"
            {...register("descripcion")}
            className="px-2 py-1 rounded-sm w-full bg-gray-200 text-black"
          ></textarea>

          <label className="text-white underline pt-2 pb-1 block">Estilo</label>
          <input
            type="text"
            placeholder="Escribe el estilo con el que se compuso la obra"
            {...register("estilo")}
            className="px-2 py-1 rounded-sm w-full bg-gray-200 text-black"
          />

          <label className="text-white underline pt-2 pb-1 block">ID del Evento</label>
          <input
            type="number"
            min="1"
            placeholder="ID del evento de la obra"
            {...register("id_evento")}
            className="px-2 py-1 rounded-sm w-full bg-gray-200 text-black"
          />

          <label className="text-white block underline pt-2 pb-1">ID del Escultor</label>
          <input
            type="number"
            min="1"
            placeholder="ID del escultor de la obra"
            {...register("id_escultor")}
            className="px-2 py-1 rounded-sm w-full bg-gray-200 text-black "
            readOnly={!!searchParams.get("escultor")} // Deshabilitado si hay escultor preseleccionado
          />
          <button
            type="submit"
            className="block bg-blue-600 px-2 py-1 mt-6 text-white hover:bg-blue-800 transition-colors duration-300 text-center w-full rounded-md font-semibold text-lg hover:scale-105 hover:transition-300"
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

import { useForm } from "react-hook-form";
import { useEscultores } from "@/context/EscultorContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

function EscultoresForm() {
  const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada para perfil
  const [previewUrl, setPreviewUrl] = useState(null); // URL de previsualización
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el envío del formulario
  const [isImageRemoved, setIsImageRemoved] = useState(false); // Bandera para saber si se eliminó la imagen actual

  const { register, handleSubmit, setValue } = useForm();
  const { createEscultor, getEscultor, updateEscultor } = useEscultores();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadEscultor() {
      if (params.id) {
        const escultorData = await getEscultor(params.id);

        setValue("nombre", escultorData.nombre);
        setValue("apellido", escultorData.apellido);
        setValue("nacionalidad", escultorData.nacionalidad);
        setValue(
          "fecha_nacimiento",
          escultorData.fecha_nacimiento
            ? new Date(escultorData.fecha_nacimiento)
                .toISOString()
                .split("T")[0]
            : ""
        );
        setValue("biografia", escultorData.biografia);
        setValue("email", escultorData.email || "");
        setValue("telefono", escultorData.telefono || "");

        // Previsualizar la imagen de perfil existente
        if (escultorData.foto_perfil) {
          setPreviewUrl(escultorData.foto_perfil);
        }
      }
    }
    loadEscultor();
  }, [getEscultor, params.id, setValue]);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsImageRemoved(false); // La imagen no está eliminada
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setIsImageRemoved(true); // Indicar que se eliminó la imagen actual
  };

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);

    const escultor = {
      nombre: values.nombre,
      apellido: values.apellido,
      nacionalidad: values.nacionalidad,
      fecha_nacimiento: values.fecha_nacimiento,
      biografia: values.biografia,
      email: values.email,
      telefono: values.telefono,
    };

    // Filtrar campos opcionales
    if (escultor.email === "") delete escultor.email;
    if (escultor.telefono === "") delete escultor.telefono;

    if (params.id) {
      await updateEscultor(params.id, escultor, selectedImage, isImageRemoved);
    } else {
      await createEscultor(escultor, selectedImage);
    }
    navigate("/escultores");
  });

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-white text-xl font-bold uppercase text-center">
            {params.id ? "Actualizar Escultor" : "Crear Escultor"}
          </h1>
          <div className="flex gap-x-2">
            <div>
              <label className="text-gray-400 block">Nombre</label>
              <input
                type="text"
                placeholder="Escribe el nombre"
                {...register("nombre")}
                className="px-2 py-1 rounded-sm w-full"
              />
            </div>
            <div>
              <label className="text-gray-400 block">Apellido</label>
              <input
                type="text"
                placeholder="Escribe el apellido"
                {...register("apellido")}
                className="px-2 py-1 rounded-sm w-full"
              />
            </div>
          </div>

          <label className="text-gray-400 block">Foto de Perfil</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={onImageChange}
            className="px-2 py-1 rounded-sm w-full text-white"
          />
          <div className="">
            {previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Foto de perfil"
                  className="w-32 h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeSelectedImage()}
                  className="absolute top-1 left-1 bg-red-500 text-white p-1 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {
            //TODO: Que te deje elegir entre una lista de nacionaliadades existentes
          }
          <label className="text-gray-400 block">Nacionalidad</label>
          <input
            type="text"
            placeholder="Escribe una nacionalidad"
            {...register("nacionalidad")}
            className="px-2 py-1 rounded-sm w-full"
          />
          {
            //TODO: Ver porque los placeholders de los input de tipo date no se adaptan al color
          }
          <label className="text-gray-400 block">Fecha de Nacimiento</label>
          <input
            type="date"
            {...register("fecha_nacimiento")}
            className="px-2 py-1 rounded-sm w-full"
          />

          <label className="text-gray-400 block">Biografía</label>
          <textarea
            rows="3"
            placeholder="Escribe una biografía"
            {...register("biografia")}
            className="px-2 py-1 rounded-sm w-full"
          ></textarea>

          <label className="text-gray-400 block">Email</label>
          <input
            type="email"
            placeholder="Escribe el email de contacto (opcional)"
            {...register("email")}
            className="px-2 py-1 rounded-sm w-full"
          />

          <label className="text-gray-400 block">Teléfono</label>
          <input
            type="telefono"
            placeholder="Escribe el telefono de contacto (opcional)"
            {...register("telefono")}
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

export default EscultoresForm;

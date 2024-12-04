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
  const [generalError, setGeneralError] = useState(""); // Estado para errores generales del backend

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
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
    setGeneralError(""); // Reiniciar el error general

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

    try {
      if (params.id) {
        await updateEscultor(
          params.id,
          escultor,
          selectedImage,
          isImageRemoved
        );
      } else {
        await createEscultor(escultor, selectedImage);
      }
      navigate("/escultores");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setGeneralError(
        error.response?.data?.message || "Ocurrió un error inesperado."
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-pink-300 via-purple-500 to-indigo-300">
      <div className="-mt-20 max-w-md w-full p-10 border-4 border-gray-700 rounded-2xl shadow-lg bg-gray-900">
        <form onSubmit={onSubmit}>
          <h1 className="text-white text-2xl pb-8 underline font-bold uppercase text-center">
            {params.id ? "Actualizar Escultor" : "Crear Escultor"}
          </h1>

          {/* Mostrar el error general */}
          {generalError && (
            <div className="bg-red-500 text-white p-3 rounded-md text-center mb-4">
              {generalError}
            </div>
          )}

          {/* Campos del formulario */}
          <div className="flex gap-x-2">
            <div>
              <label className="text-white block underline">Nombre</label>
              <input
                type="text"
                placeholder="Escribe el nombre"
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                })}
                className="px-2 py-1 rounded-sm w-full"
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nombre.message}
                </p>
              )}
            </div>
            <div className="pb-4">
              <label className="text-white block underline">Apellido</label>
              <input
                type="text"
                placeholder="Escribe el apellido"
                {...register("apellido", {
                  required: "El apellido es obligatorio",
                })}
                className="px-2 py-1 rounded-sm w-full"
              />
              {errors.apellido && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.apellido.message}
                </p>
              )}
            </div>
          </div>

          <label className="text-white block pb-1 underline">
            Foto de Perfil
          </label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={onImageChange}
            className="px-0 py-1 rounded-sm w-full text-white"
          />
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

          {
            //TODO: Que te deje elegir entre una lista de nacionaliadades existentes
          }
          <label className="text-white block pt-2 underline pb-1">
            Nacionalidad
          </label>
          <input
            type="text"
            placeholder="Escribe una nacionalidad"
            {...register("nacionalidad", {
              required: "La nacionalidad es obligatoria",
            })}
            className="px-2 py-1 rounded-sm w-full"
          />
          {
            //TODO: Ver porque los placeholders de los input de tipo date no se adaptan al color
          }
          <label className="text-white underline block pt-2 pb-1">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            {...register("fecha_nacimiento", {
              required: "La fecha de nacimiento es obligatoria",
            })}
            className="px-2 py-1 rounded-sm w-full"
          />
          {errors.fecha_nacimiento && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fecha_nacimiento.message}
            </p>
          )}

          <label className="text-white block pt-2 pb-1 underline">
            Biografía
          </label>
          <textarea
            rows="3"
            placeholder="Escribe una biografía"
            {...register("biografia", {
              required: "La biografía es obligatoria",
            })}
            className="px-2 py-1 rounded-sm w-full"
          ></textarea>
          {errors.biografia && (
            <p className="text-red-500 text-sm mt-1">
              {errors.biografia.message}
            </p>
          )}

          <label className="text-white block pt-2 pb-1 underline">Email</label>
          <input
            type="email"
            placeholder="Escribe el email de contacto (opcional)"
            {...register("email")}
            className="px-2 py-1 rounded-sm w-full bg-gray-200"
          />

          <label className="text-white underline block pt-2 pb-1">
            Teléfono
          </label>
          <input
            type="telefono"
            placeholder="Escribe el telefono de contacto (opcional)"
            {...register("telefono")}
            className="px-2 py-1 rounded-sm w-full bg-gray-200"
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

export default EscultoresForm;

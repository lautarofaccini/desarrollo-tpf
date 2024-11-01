import { useForm } from "react-hook-form";
import { useEscultores } from "@/context/EscultorContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function EscultoresForm() {

  const { register, handleSubmit, setValue } = useForm();

  const { createEscultor, getEscultor, updateEscultor } = useEscultores();

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    async function loadEscultor() {
      if (params.id) {
        const escultorData = await getEscultor(params.id);

        // Convertir la fecha al formato "yyyy-MM-dd"
        const fecha_nacimiento = escultorData.fecha_nacimiento
          ? new Date(escultorData.fecha_nacimiento).toISOString().split("T")[0]
          : "";

        // Actualizar el estado del escultor con las fechas y horas separadas

        setValue("nombre", escultorData.nombre);
        setValue("apellido", escultorData.apellido);
        setValue("nacionalidad", escultorData.nacionalidad);
        setValue("fecha_nacimiento", fecha_nacimiento);
        setValue("biografia", escultorData.biografia);
        setValue("email", escultorData.email || "");
        setValue("telefono", escultorData.telefono || "");

        //Separar la fecha antes de mandarla
        //setEscultor(escultor);
      } else {
        setValue("nombre", "");
        setValue("apellido", "");
        setValue("nacionalidad", "");
        setValue("fecha_nacimiento", ""), setValue("biografia", "");
        setValue("email", "");
        setValue("telefono", "");
      }
    }
    loadEscultor();
  }, [getEscultor, params.id, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    // Combinar fecha y hora en un solo valor de tipo datetime
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
      await updateEscultor(params.id, escultor);
    } else {
      await createEscultor(escultor);
    }
    navigate("/escultores");
  });

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="bg-zinc-800 max-w-md  w-full p-10 rounded-md">
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
          {
            //TODO: Que te deje elegir entre una lista de nacionaliadades existentes
          }
          <label className="text-gray-400 block">Nacionalidad</label>
          <input
            type="text"
            placeholder="Escribe una nacionalidad"
            {...register("nacionalidad")}
            className="px-2
             py-1 rounded-sm w-full"
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
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EscultoresForm;

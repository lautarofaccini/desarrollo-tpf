import { useForm } from "react-hook-form";
import { useObra } from "../context/ObraContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function ObrasForm() {
  const { register, handleSubmit, setValue } = useForm();

  const { createObra, getObra, updateObra } = useObra();

  const navigate = useNavigate();

  const params = useParams();
  //Solicitar imagenes en el formulario
  useEffect(() => {
    async function loadObra() {
      if (params.id) {
        const obraData = await getObra(params.id);

        setValue("fecha_creacion", obraData.fecha_creacion);
        setValue("descripcion", obraData.descripcion || "");
        setValue("material", obraData.material || "");
        setValue("estilo", obraData.material || "");
        setValue("calificacion", obraData.calificacion || "");
        setValue("id_evento", obraData.id_evento);
        setValue("id_escultor", obraData.id_escultor);
      } else {
        setValue("fecha_creacion", "");
        setValue("descripcion", "");
        setValue("material", "");
        setValue("estilo", "");
        setValue("calificacion", "");
        setValue("id_evento", "");
        setValue("id_escultor", "");
      }
    }
    loadObra();
  }, [getObra, params.id, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    // Combinar fecha y hora en un solo valor de tipo datetime
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
      await updateObra(params.id, obra);
    } else {
      await createObra(obra);
    }
    navigate("/obras");
  });

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="bg-zinc-800 max-w-md  w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-white text-xl font-bold uppercase text-center">
            {params.id ? "Actualizar Obra" : "Crear Obra"}
          </h1>

          <label className="text-gray-400 block">Fecha de Creacion</label>
          <div className="flex gap-x-2">
            <input
              type="date"
              {...register("fecha_creacion")}
              className=" text-black"
            />
          </div>
          <label className="text-gray-400 block">Material</label>
          <input
            type="text"
            placeholder="Escribe el material del que esta compuesto la obra"
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
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ObrasForm;

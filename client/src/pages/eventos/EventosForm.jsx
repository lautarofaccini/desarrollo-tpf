import { useForm } from "react-hook-form";
import { useEventos } from "@/context/EventoContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function EventosForm() {
  const { register, handleSubmit, setValue } = useForm();

  const { createEvento, getEvento, updateEvento } = useEventos();

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    async function loadEvento() {
      if (params.id) {
        const eventoData = await getEvento(params.id);

        // Separar la fecha y la hora
        const [fechaInicio, tiempoInicio] = eventoData.fecha_inicio.split("T");
        const [fechaFin, tiempoFin] = eventoData.fecha_fin.split("T");

        // Eliminar la parte 'Z' de la hora
        const tiempoInicioFormatted = tiempoInicio.slice(0, 5);
        const tiempoFinFormatted = tiempoFin.slice(0, 5);

        // Actualizar el estado del evento con las fechas y horas separadas

        setValue("fecha_inicio", fechaInicio);
        setValue("tiempo_inicio", tiempoInicioFormatted);
        setValue("fecha_fin", fechaFin);
        setValue("tiempo_fin", tiempoFinFormatted);
        setValue("lugar", eventoData.lugar);
        setValue("descripcion", eventoData.descripcion || "");
        setValue("tematica", eventoData.tematica || "");

        //Separar la fecha antes de mandarla
        //setEvento(evento);
      } else {
        setValue("fecha_inicio", "");
        setValue("tiempo_inicio", "");
        setValue("fecha_fin", "");
        setValue("tiempo_fin", "");
        setValue("lugar", "");
        setValue("descripcion", "");
        setValue("tematica", "");
      }
    }
    loadEvento();
  }, [getEvento, params.id, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    // Combinar fecha y hora en un solo valor de tipo datetime
    const evento = {
      fecha_inicio: `${values.fecha_inicio} ${values.tiempo_inicio}`,
      fecha_fin: `${values.fecha_fin} ${values.tiempo_fin}`,
      lugar: values.lugar,
      descripcion: values.descripcion,
      tematica: values.tematica,
    };

    // Filtrar campos opcionales
    if (evento.lugar === "") delete evento.lugar;
    if (evento.descripcion === "") delete evento.descripcion;
    if (evento.tematica === "") delete evento.tematica;

    if (params.id) {
      await updateEvento(params.id, evento);
    } else {
      await createEvento(evento);
    }
    navigate("/eventos");
  });

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-pink-300 via-purple-500 to-indigo-300">
      <div className="-mt-20 max-w-md w-full p-10 border-4 border-gray-700 rounded-2xl shadow-lg bg-gray-900">
        <form onSubmit={onSubmit}>
          <h1 className="text-white text-2xl  pb-8 underline font-bold uppercase text-center">
            {params.id ? "Actualizar Evento" : "Crear Evento"}
          </h1>
          <label className="text-white underline block pb-1">Fecha de Inicio</label>
          <div className="flex gap-x-2">
            <input
              type="date"
              {...register("fecha_inicio")}
              className=" px-2 py-1 rounded-sm w-full bg-gray-200 text-black "
            />
            <input
              type="time"
              {...register("tiempo_inicio")}
              className="px-2 py-1 rounded-sm bg-gray-200 text-black"
            />
          </div>

          <label className="text-white block pt-2 pb-1 underline">Fecha de Fin</label>
          <div className="flex gap-x-2">
            <input
              type="date"
              {...register("fecha_fin")}
              className=" px-2 py-1 rounded-sm w-full bg-gray-200 text-black"
            />
            <input
              type="time"
              {...register("tiempo_fin")}
              className="px-2 py-1 rounded-sm bg-gray-200 text-black"
            />
          </div>

          <label className="text-white block underline pt-2 pb-1">Lugar</label>
          <input
            type="text text"
            placeholder="Escribe un lugar"
            {...register("lugar")}
            className="px-2 py-1 rounded-sm w-full bg-gray-200 text-black"
          />

          <label className="text-white block underline pt-2 pb-1">Descripción</label>
          <textarea
            rows="3"
            placeholder="Escribe una descripción"
            {...register("descripcion")}
            className="px-2 py-1 rounded-sm w-full bg-gray-200 text-black"
          ></textarea>
          
          <label className="text-white block underline pt-2 pb-1">Temática</label>
          <input
            type="text"
            placeholder="Escribe una temática"
            {...register("tematica")}
            className="px-2 py-1 rounded-sm w-full bg-gray-200 text-black"
          />

          <button
            type="submit"
            className="block bg-blue-600 px-2 py-1 mt-6 text-white hover:bg-blue-800 transition-colors duration-300 text-center w-full rounded-md font-semibold text-lg hover:scale-105 hover:transition-300"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventosForm;

import { useForm } from "react-hook-form";
import { useEventos } from "@/context/EventoContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EventosForm() {
  const [generalError, setGeneralError] = useState(""); // Estado para el error general
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
    setGeneralError(""); // Reiniciar el error general
    try {
      const evento = {
        fecha_inicio: `${values.fecha_inicio} ${values.tiempo_inicio}`,
        fecha_fin: `${values.fecha_fin} ${values.tiempo_fin}`,
        lugar: values.lugar,
        descripcion: values.descripcion,
        tematica: values.tematica,
      };

      if (evento.lugar === "") delete evento.lugar;
      if (evento.descripcion === "") delete evento.descripcion;
      if (evento.tematica === "") delete evento.tematica;

      if (params.id) {
        await updateEvento(params.id, evento);
      } else {
        await createEvento(evento);
      }
      console.log(generalError);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setGeneralError(
        error.message || "Ocurrió un error al intentar guardar el evento."
      );
    }
  });

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-white text-xl font-bold uppercase text-center">
            {params.id ? "Actualizar Evento" : "Crear Evento"}
          </h1>

          {/* Mostrar el error general */}
          {generalError && (
            <div className="bg-red-500 text-white p-3 rounded-md text-center mb-4">
              {generalError}
            </div>
          )}

          {/* Fecha de Inicio */}
          <label className="text-gray-400 block">Fecha de Inicio</label>
          <div className="flex gap-x-2">
            <input
              type="date"
              {...register("fecha_inicio", {
                required: "La fecha de inicio es obligatoria",
              })}
              className="px-2 py-1 rounded-sm w-full"
            />
            <input
              type="time"
              {...register("tiempo_inicio", {
                required: "La hora de inicio es obligatoria",
              })}
              className="px-2 py-1 rounded-sm"
            />
          </div>
          {errors.fecha_inicio && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fecha_inicio.message}
            </p>
          )}
          {errors.tiempo_inicio && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tiempo_inicio.message}
            </p>
          )}

          {/* Fecha de Fin */}
          <label className="text-gray-400 block">Fecha de Fin</label>
          <div className="flex gap-x-2">
            <input
              type="date"
              {...register("fecha_fin", {
                required: "La fecha de fin es obligatoria",
              })}
              className="px-2 py-1 rounded-sm w-full"
            />
            <input
              type="time"
              {...register("tiempo_fin", {
                required: "La hora de fin es obligatoria",
              })}
              className="px-2 py-1 rounded-sm"
            />
          </div>
          {errors.fecha_fin && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fecha_fin.message}
            </p>
          )}
          {errors.tiempo_fin && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tiempo_fin.message}
            </p>
          )}

          {/* Lugar */}
          <label className="text-gray-400 block">Lugar</label>
          <input
            type="text"
            placeholder="Escribe un lugar"
            {...register("lugar", { required: "El lugar es obligatorio" })}
            className="px-2 py-1 rounded-sm w-full"
          />
          {errors.lugar && (
            <p className="text-red-500 text-sm mt-1">{errors.lugar.message}</p>
          )}

          <label className="text-gray-400 block">Descripción</label>
          <textarea
            rows="3"
            placeholder="Escribe una descripción"
            {...register("descripcion")}
            className="px-2 py-1 rounded-sm w-full"
          ></textarea>

          <label className="text-gray-400 block">Temática</label>
          <input
            type="text"
            placeholder="Escribe una temática"
            {...register("tematica")}
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

export default EventosForm;

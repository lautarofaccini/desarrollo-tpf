import { Form, Formik } from "formik";
import { useEventos } from "../context/EventoContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EventosForm() {
  const { createEvento, getEvento, updateEvento } = useEventos();
  const [evento, setEvento] = useState({
    fecha_inicio: "",
    tiempo_inicio: "",
    fecha_fin: "",
    tiempo_fin: "",
    lugar: "",
    descripcion: "",
    tematica: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const loadEvento = async () => {
      if (params.id) {
        const eventoData = await getEvento(params.id);

        // Separar la fecha y la hora
        const [fechaInicio, tiempoInicio] = eventoData.fecha_inicio.split("T");
        const [fechaFin, tiempoFin] = eventoData.fecha_fin.split("T");

        // Eliminar la parte 'Z' de la hora
        const tiempoInicioFormatted = tiempoInicio.slice(0, 5);
        const tiempoFinFormatted = tiempoFin.slice(0, 5);

        // Actualizar el estado del evento con las fechas y horas separadas
        setEvento({
          fecha_inicio: fechaInicio,
          tiempo_inicio: tiempoInicioFormatted,
          fecha_fin: fechaFin,
          tiempo_fin: tiempoFinFormatted,
          lugar: eventoData.lugar || "",
          descripcion: eventoData.descripcion || "",
          tematica: eventoData.tematica || "",
        });
        //Separar la fecha antes de mandarla
        //setEvento(evento);
      }
    };
    loadEvento();
  }, [getEvento, params.id]);

  return (
    <div>
      <Formik
        initialValues={evento}
        enableReinitialize={true}
        onSubmit={async (values) => {
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
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id ? "Actualizar Evento" : "Crear Evento"}
            </h1>
            <label className="block">Fecha de Inicio</label>
            <input
              className="mr-4"
              type="date"
              name="fecha_inicio"
              onChange={handleChange}
              value={values.fecha_inicio}
            />
            <input
              type="time"
              name="tiempo_inicio"
              onChange={handleChange}
              value={values.tiempo_inicio}
            ></input>
            <label className="block">Fecha de Fin</label>
            <input
              className="mr-4"
              type="date"
              name="fecha_fin"
              onChange={handleChange}
              value={values.fecha_fin}
            ></input>
            <input
              className=""
              type="time"
              name="tiempo_fin"
              onChange={handleChange}
              value={values.tiempo_fin}
            ></input>
            <label className="block">Lugar</label>
            <input
              className="px-2 py-1 rounded-sm w-full"
              type="text"
              name="lugar"
              placeholder="Escribe un lugar"
              onChange={handleChange}
              value={values.lugar}
            />
            <label className="block">Descripción</label>
            <textarea
              className="px-2 py-1 rounded-sm w-full"
              name="descripcion"
              rows="3"
              placeholder="Escribe una descripción"
              onChange={handleChange}
              value={values.descripcion}
            ></textarea>
            <label className="block">Temática</label>
            <input
              className="px-2 py-1 rounded-sm w-full"
              type="text"
              name="tematica"
              placeholder="Escribe una temática"
              onChange={handleChange}
              value={values.tematica}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 px-2 py-1 mt-2 text-white w-full rounded-md"
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EventosForm;

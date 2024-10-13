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
      <h1>{params.id ? "Actualizar Evento" : "Crear Evento"}</h1>
      <Formik
        initialValues={evento}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
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
            navigate('/');
          } else {
            await createEvento(evento);
          }
          actions.resetForm();
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label>Fecha de Inicio</label>
            <input
              className="text-slate-950"
              type="date"
              name="fecha_inicio"
              onChange={handleChange}
              value={values.fecha_inicio}
            />
            <input
              className="text-slate-950"
              type="time"
              name="tiempo_inicio"
              onChange={handleChange}
              value={values.tiempo_inicio}
            ></input>
            <label>Fecha de Fin</label>
            <input
              className="text-slate-950"
              type="date"
              name="fecha_fin"
              onChange={handleChange}
              value={values.fecha_fin}
            ></input>
            <input
              className="text-slate-950"
              type="time"
              name="tiempo_fin"
              onChange={handleChange}
              value={values.tiempo_fin}
            ></input>
            <label>Lugar</label>
            <input
              className="text-slate-950"
              type="text"
              name="lugar"
              placeholder="Escribe un lugar"
              onChange={handleChange}
              value={values.lugar}
            />
            <label>Descripción</label>
            <textarea
              className="text-slate-950"
              name="descripcion"
              rows="3"
              placeholder="Escribe una descripción"
              onChange={handleChange}
              value={values.descripcion}
            ></textarea>
            <label>Temática</label>
            <input
              className="text-slate-950"
              type="text"
              name="tematica"
              placeholder="Escribe una temática"
              onChange={handleChange}
              value={values.tematica}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EventosForm;

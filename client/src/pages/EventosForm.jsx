import { Form, Formik } from "formik";
import { createEventoRequest } from "../api/eventos.api";

function EventosForm() {
  return (
    <div>
      <Formik
        initialValues={{
          fecha_inicio: "",
          tiempo_inicio: "",
          fecha_fin: "",
          tiempo_fin: "",
          lugar: "",
          descripcion: "",
          tematica: "",
        }}
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

          try {
            const response = await createEventoRequest(evento);
            console.log(response);
            actions.resetForm();
          } catch (error) {
            console.error(error);
          }
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

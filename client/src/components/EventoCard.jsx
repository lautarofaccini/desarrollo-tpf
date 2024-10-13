import { deleteEventoRequest } from "../api/eventos.api";

function EventoCard({ evento }) {
  const handleDelete = async (id) => {
    try {
      const response = await deleteEventoRequest(id);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2>{evento.fecha_inicio}</h2>
      <h2>{evento.fecha_fin}</h2>
      <p>{evento.lugar}</p>
      <p>{evento.descripcion}</p>
      <p>{evento.tematica}</p>
      <button onClick={() => handleDelete(evento.id)}>Eliminar</button>
      <button>Editar</button>
    </div>
  );
}

export default EventoCard;

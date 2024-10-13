import { useEventos } from "../context/EventoContext";


function EventoCard({ evento }) {

const {deleteEvento} = useEventos()

  
  return (
    <div>
      <h2>{evento.fecha_inicio}</h2>
      <h2>{evento.fecha_fin}</h2>
      <p>{evento.lugar}</p>
      <p>{evento.descripcion}</p>
      <p>{evento.tematica}</p>
      <button onClick={() => deleteEvento(evento.id)}>Eliminar</button>
      <button>Editar</button>
    </div>
  );
}

export default EventoCard;

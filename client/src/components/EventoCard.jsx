import { Link } from "react-router-dom";
import EventoButtons from "./EventoButtons";

function EventoCard({ evento }) {
  return (
    <div className="bg-zinc-700 text-white rounded-md p-4">
      <Link to={`/eventos/${evento.id_evento}`} className="text-xl font-bold">
        {evento.lugar}
      </Link>
      <p className="text-sm">{evento.descripcion}</p>
      <p className="text-sm">{evento.tematica}</p>
      <p className="text-xs">
        {new Date(evento.fecha_inicio).toLocaleDateString()}
      </p>
      <p className="text-xs">
        {
          //Falta hora
          new Date(evento.fecha_fin).toLocaleDateString()
        }
      </p>
      <EventoButtons id_evento={evento.id_evento} />
    </div>
  );
}

export default EventoCard;

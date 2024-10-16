import { useNavigate } from "react-router-dom";
import { useEventos } from "../context/EventoContext";

function EventoCard({ evento }) {
  const { deleteEvento } = useEventos();
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-700 text-white rounded-md p-4">
      <p className="text-xl font-bold">{evento.lugar}</p>
      <p className="text-sm">{evento.descripcion}</p>
      <p className="text-sm">{evento.tematica}</p>
      <p className="text-xs">{evento.fecha_inicio}</p>
      <p className="text-xs">{evento.fecha_fin}</p>
      <div className="flex gap-x-2">
        <button className="bg-red-500 px-2 py-1 text-white rounded-md" onClick={() => deleteEvento(evento.id_evento)}>Eliminar</button>
        <button className="bg-slate-500 px-2 py-1 text-white rounded-md" onClick={() => navigate("/eventos/edit/" + evento.id_evento)}>
          Editar
        </button>
      </div>
    </div>
  );
}

export default EventoCard;

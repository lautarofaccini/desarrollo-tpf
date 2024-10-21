import { useEffect } from "react";
import EventoCard from "../components/EventoCard";
import { useEventos } from "../context/EventoContext";

function EventosPage() {
  const { eventos, loadEventos } = useEventos();

  useEffect(() => {
    loadEventos();
  }, [loadEventos]);

  return (
    <div>
      <h1 className="text-3xl text-white font-bold text-center">Eventos</h1>
      <div className="grid grid-cols-3 gap-2">
        {eventos.length === 0 ? (
          <h1>No hay eventos aún</h1>
        ) : (
          eventos.map((evento) => (
            <EventoCard evento={evento} key={evento.id_evento} />
          ))
        )}
      </div>
    </div>
  );
}

export default EventosPage;

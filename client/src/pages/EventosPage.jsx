import { useEffect } from "react";
import EventoCard from "../components/EventoCard";
import { useEventos } from "../context/EventoContext";

function EventosPage() {
  const { eventos, loadEventos } = useEventos();

  useEffect(() => {
    loadEventos();
  }, []);

  function renderMain() {
    if (eventos.length === 0) return <h1>No hay eventos aún</h1>;
    return eventos.map((evento) => (
      <EventoCard evento={evento} key={evento.id_evento} />
    ));
  }

  return (
    <div>
      <h1 className="text-3xl text-white font-bold text-center">Eventos</h1>
      <div className="grid grid-cols-3 gap-2">{renderMain()}</div>
    </div>
  );
}

export default EventosPage;

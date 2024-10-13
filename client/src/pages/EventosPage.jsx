import { useEffect } from "react";
import EventoCard from "../components/EventoCard";
import {useEventos} from '../context/EventoContext'

function EventosPage() {
  const {eventos, loadEventos} = useEventos()

  useEffect(() => {    
    loadEventos();
  }, [loadEventos]);

  function renderMain() {
    if (eventos.length === 0) return <h1>No hay eventos aún</h1>
    return eventos.map((evento) => (
      <EventoCard evento={evento} key={evento.id} />
    ));
  }

  return (
    <div>
      <h1>Eventos</h1>
      {renderMain()}
    </div>
  );
}

export default EventosPage;

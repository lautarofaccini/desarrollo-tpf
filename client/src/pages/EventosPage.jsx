import { useEffect, useState } from "react";
import { getEventosRequest } from "../api/eventos.api";
import EventoCard from "../components/EventoCard";

function EventosPage() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    console.log("EventosPage");
    async function loadEventos() {
      const response = await getEventosRequest();
      setEventos(response.data);
    }
    loadEventos();
  }, []);

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

import { createContext, useState } from "react";
import { createEventoRequest, deleteEventoRequest, getEventosRequest } from "../api/eventos.api";

export const EventoContext = createContext();

export const EventoContextProvider = ({ children }) => {
  const [eventos, setEventos] = useState([]);

  async function loadEventos() {
    const response = await getEventosRequest();
    setEventos(response.data);
  }

  const deleteEvento = async (id) => {
    try {
      const response = await deleteEventoRequest(id);
      console.log(response);
      setEventos(eventos.filter((evento) => evento.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  const createEvento = async (evento) => {
    try {
      await createEventoRequest(evento);
      /* 
      TODO: Ver forma de no pedir todos los eventos cada vez que se carga la pagina, si asi fuera se podria usar ->
      setEventos([...eventos, response.data]) */
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EventoContext.Provider value={{ eventos, loadEventos, deleteEvento, createEvento }}>
      {children}
    </EventoContext.Provider>
  );
};

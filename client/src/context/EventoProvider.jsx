import { createContext, useState, useCallback } from "react";
import {
  createEventoRequest,
  deleteEventoRequest,
  getEventosRequest,
  getEventosOrdenadosRequest,
  getEventoRequest,
  updateEventoRequest,
  activarEventoRequest,
  pausarEventoRequest,
  finalizarEventoRequest,
  desactivarEventoRequest,
} from "../api/eventos.api";

export const EventoContext = createContext();

export const EventoProvider = ({ children }) => {
  const [eventos, setEventos] = useState([]);

  const loadEventos = useCallback(async () => {
    const response = await getEventosRequest();
    setEventos(response.data);
  }, []);

  const loadEventosOrdenados = useCallback(async () => {
    const response = await getEventosOrdenadosRequest();
    setEventos(response.data);
  }, []);

  const deleteEvento = async (id) => {
    try {
      const response = await deleteEventoRequest(id);
      console.log(response);
      setEventos(eventos.filter((evento) => evento.id_evento !== id));
    } catch (error) {
      throw (
        error.response?.data ||
        error.message ||
        "Error desconocido."
      );
    }
  };

  const createEvento = async (evento) => {
    try {
      await createEventoRequest(evento);
    } catch (error) {
      // Propaga el error para que pueda ser manejado en el formulario.
      throw (
        error.response?.data ||
        error.message ||
        "Error desconocido al crear el evento."
      );
    }
  };

  const getEvento = async (id) => {
    try {
      const response = await getEventoRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateEvento = async (id, newFields) => {
    try {
      await updateEventoRequest(id, newFields);
    } catch (error) {
      throw (
        error.response?.data ||
        error.message ||
        "Error desconocido."
      );
    }
  };
  const activarEvento = async (id) => {
    try {
      const response = await activarEventoRequest(id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const pausarEvento = async (id) => {
    try {
      const response = await pausarEventoRequest(id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const finalizarEvento = async (id) => {
    try {
      const response = await finalizarEventoRequest(id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const desactivarEvento = async (id) => {
    try {
      const response = await desactivarEventoRequest(id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EventoContext.Provider
      value={{
        eventos,
        loadEventos,
        loadEventosOrdenados,
        deleteEvento,
        createEvento,
        getEvento,
        updateEvento,
        activarEvento,
        pausarEvento,
        finalizarEvento,
        desactivarEvento,
      }}
    >
      {children}
    </EventoContext.Provider>
  );
};

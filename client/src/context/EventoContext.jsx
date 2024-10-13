import { useContext } from "react";
import { EventoContext } from "./EventoProvider";

export const useEventos = () => {
    const context = useContext(EventoContext);
    if (!context) {
      throw new Error("useEvento must be used within a EventoContextProvider");
    }
    return context;
  };


import axios from "axios";

export const createEventoRequest = async (evento) =>
  await axios.post("http://localhost:4000/eventos", evento);

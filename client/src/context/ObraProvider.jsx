import { createContext, useState, useCallback } from "react";
import {
  createObraRequest,
  deleteObraRequest,
  getObrasRequest,
  getObraRequest,
  updateObraRequest,
  getImagenesByObraRequest,
} from "../api/obras.api";

export const ObraContext = createContext();

export const ObraProvider = ({ children }) => {
  const [obras, setObras] = useState([]);

  const loadObras = useCallback(async () => {
    const response = await getObrasRequest();
    setObras(response.data);
  }, []);

  const deleteObra = async (id) => {
    try {
      const response = await deleteObraRequest(id);
      console.log(response);
      setObras(obras.filter((obra) => obra.id_obra !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createObra = async (obra, selectedImages) => {
    try {
      await createObraRequest(obra, selectedImages);
      /* 
      TODO: Ver forma de no pedir todos los obras cada vez que se carga la pagina, si asi fuera se podria usar ->
      setObras([...obras, response.data]) */
    } catch (error) {
      console.error(error);
    }
  };

  const getObra = async (id) => {
    try {
      const response = await getObraRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateObra = async (id, newFields) => {
    try {
      const response = await updateObraRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getImagenesByObra = async (id) => {
    try {
      const response = await getImagenesByObraRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ObraContext.Provider
      value={{
        obras,
        loadObras,
        deleteObra,
        createObra,
        getObra,
        updateObra,
        getImagenesByObra,
      }}
    >
      {children}
    </ObraContext.Provider>
  );
};

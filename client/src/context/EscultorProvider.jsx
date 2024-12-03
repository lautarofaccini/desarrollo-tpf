import { createContext, useState, useCallback } from "react";
import {
  createEscultorRequest,
  deleteEscultorRequest,
  getEscultoresRequest,
  getEscultorRequest,
  updateEscultorRequest,
} from "../api/escultores.api";

export const EscultorContext = createContext();

export const EscultorProvider = ({ children }) => {
  const [escultores, setEscultores] = useState([]);

  const loadEscultores = useCallback(async () => {
    const response = await getEscultoresRequest();
    setEscultores(response.data);
  }, []);

  const deleteEscultor = async (id) => {
    try {
      const response = await deleteEscultorRequest(id);
      console.log(response);
      setEscultores(
        escultores.filter((escultor) => escultor.id_escultor !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const createEscultor = async (escultor, selectedImage) => {
    try {
      await createEscultorRequest(escultor, selectedImage);
      /* 
      TODO: Ver forma de no pedir todos los escultores cada vez que se carga la pagina, si asi fuera se podria usar ->
      setEscultores([...escultores, response.data]) */
    } catch (error) {
      console.error(error);
    }
  };

  const getEscultor = async (id) => {
    try {
      const response = await getEscultorRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateEscultor = async (id, newFields, selectedImage, isImageRemoved) => {
    try {
      const response = await updateEscultorRequest(id, newFields, selectedImage, isImageRemoved);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EscultorContext.Provider
      value={{
        escultores,
        loadEscultores,
        deleteEscultor,
        createEscultor,
        getEscultor,
        updateEscultor,
      }}
    >
      {children}
    </EscultorContext.Provider>
  );
};

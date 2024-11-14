import { createContext, useState, useCallback } from "react";
import {
  createObraRequest,
  deleteObraRequest,
  getObrasRequest,
  getObraRequest,
  getObrasByEscultorRequest,
  getObrasByEventoRequest,
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
      console.log(id)
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

  const getObrasByEscultor = async (id) => {
    try {
      const response = await getObrasByEscultorRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getObrasByEvento = async (id) => {
    try {
      const response = await getObrasByEventoRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateObra = async (id, newFields, selectedImages, imagesToDelete) => {
    try {
      const response = await updateObraRequest(
        id,
        newFields,
        selectedImages,
        imagesToDelete
      );
      console.log(response)
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
        getObrasByEscultor,
        getObrasByEvento,
        updateObra,
        getImagenesByObra,
      }}
    >
      {children}
    </ObraContext.Provider>
  );
};

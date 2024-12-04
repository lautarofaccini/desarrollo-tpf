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
      throw (
        error.response?.data ||
        error.message ||
        "Error desconocido."
      );
    }
  };

  const createEscultor = async (escultor, selectedImage) => {
    try {
      await createEscultorRequest(escultor, selectedImage);
    } catch (error) {
      throw (
        error.response?.data ||
        error.message ||
        "Error desconocido."
      );
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

  const updateEscultor = async (
    id,
    newFields,
    selectedImage,
    isImageRemoved
  ) => {
    try {
      const response = await updateEscultorRequest(
        id,
        newFields,
        selectedImage,
        isImageRemoved
      );
      console.log(response);
    } catch (error) {
      throw (
        error.response?.data ||
        error.message ||
        "Error desconocido."
      );
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

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEventos } from "../context/EventoContext";
import { useObras } from "../context/ObraContext";
import { useEscultores } from "@/context/EscultorContext";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

function EdDelButtons({ id }) {
  const { isAdmin } = useAuth();
  const { deleteEvento } = useEventos();
  const { deleteObra } = useObras();
  const { deleteEscultor } = useEscultores();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null); // Estado para manejar errores

  // Detecta si estamos en "eventos", "obras" o "escultores" en base a la URL
  const isEvento = location.pathname.includes("/eventos");
  const isObra = location.pathname.includes("/obras");
  const isEscultor = location.pathname.includes("/escultores");

  const handleDelete = async () => {
    try {
      setError(null); // Limpiar errores previos
      if (isEvento) {
        await deleteEvento(id);
        navigate("/eventos");
      } else if (isObra) {
        await deleteObra(id);
        navigate("/obras");
      } else if (isEscultor) {
        await deleteEscultor(id);
        navigate("/escultores");
      }
    } catch (err) {
      // Manejar errores
      setError(
        err.response?.data?.message ||
          err.message ||
          "Ocurrió un error inesperado."
      );
      alert(error);
    }
  };

  const handleEdit = () => {
    if (isEvento) {
      navigate(`/eventos/edit/${id}`);
    } else if (isObra) {
      navigate(`/obras/edit/${id}`);
    } else if (isEscultor) {
      navigate(`/escultores/edit/${id}`);
    }
  };

  return (
    <>
      {isAdmin && (
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
              onClick={handleEdit}
            >
              <Edit className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
              onClick={handleDelete}
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
}

export default EdDelButtons;

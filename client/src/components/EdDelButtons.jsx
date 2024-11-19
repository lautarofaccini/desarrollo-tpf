import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEventos } from "../context/EventoContext";
import { useObras } from "../context/ObraContext";
import { useEscultores } from "@/context/EscultorContext";

function EdDelButtons({ id }) {
  const { isAdmin } = useAuth();
  const { deleteEvento } = useEventos();
  const { deleteObra } = useObras();
  const { deleteEscultor } = useEscultores();
  const navigate = useNavigate();
  const location = useLocation();

  // Detecta si estamos en "eventos" o en "obras" en base a la URL
  const isEvento = location.pathname.includes("/eventos");
  const isObra = location.pathname.includes("/obras");
  const isEscultor = location.pathname.includes("/escultores");

  // Definimos las acciones de eliminar y editar en función del tipo de entidad
  const handleDelete = () => {
    if (isEvento) {
      deleteEvento(id);
      navigate("/eventos");
    } else if (isObra) {
      deleteObra(id);
      navigate("/obras");
    } else if (isEscultor) {
      deleteEscultor(id);
      navigate("/escultores");
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
        <div className="flex gap-x-2">
          <button
            className="bg-red-500 px-2 py-1 text-white rounded-md"
            onClick={handleDelete}
          >
            Eliminar
          </button>
          <button
            className="bg-slate-500 px-2 py-1 text-white rounded-md"
            onClick={handleEdit}
          >
            Editar
          </button>
        </div>
      )}
    </>
  );
}

export default EdDelButtons;

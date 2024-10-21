import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEventos } from "../context/EventoContext";

function EventoButtons({ id_evento }) {
  const { isAuthenticated } = useAuth();
  const { deleteEvento } = useEventos();
  const navigate = useNavigate();
  return (
    <>
      {isAuthenticated && (
        <>
          <div className="flex gap-x-2">
            <button
              className="bg-red-500 px-2 py-1 text-white rounded-md"
              onClick={() => {
                deleteEvento(id_evento);
                navigate("/eventos");
              }}
            >
              Eliminar
            </button>
            <button
              className="bg-slate-500 px-2 py-1 text-white rounded-md"
              onClick={() => navigate("/eventos/edit/" + id_evento)}
            >
              Editar
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default EventoButtons;

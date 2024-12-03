import { useEffect, useState } from "react";
import { useEventos } from "@/context/EventoContext";
import { useParams } from "react-router-dom";
import { useObras } from "@/context/ObraContext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import EventoHeader from "@/components/EventoHeader";
import ObraGrid from "@/components/ObraGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import EventControls from "@/components/EventControls";

function EventoPage() {
  const [evento, setEvento] = useState(null);
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEstado, setLoadingEstado] = useState(false);
  const {
    getEvento,
    activarEvento,
    pausarEvento,
    finalizarEvento,
    desactivarEvento,
  } = useEventos();
  const { getObrasByEvento } = useObras();
  const { isAdmin } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const loadEvento = async () => {
      try {
        setLoading(true);
        const eventoData = await getEvento(id);
        let obrasData = await getObrasByEvento(id);

        if (eventoData.estado === "finalizado") {
          obrasData = obrasData.sort((a, b) => b.calificacion - a.calificacion);
        }

        setEvento(eventoData);
        setObras(obrasData);
      } catch (error) {
        console.error("Error loading event:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvento();
  }, [getEvento, getObrasByEvento, id]);

  const handleChangeState = async (action) => {
    try {
      setLoadingEstado(true);
      switch (action) {
        case "activar":
          await activarEvento(evento.id_evento);
          break;
        case "pausar":
          await pausarEvento(evento.id_evento);
          break;
        case "finalizar":
          await finalizarEvento(evento.id_evento);
          break;
        case "desactivar":
          await desactivarEvento(evento.id_evento);
          break;
        default:
          throw new Error("Invalid action");
      }
      const updatedEvento = await getEvento(id);
      setEvento(updatedEvento);
    } catch (error) {
      console.error("Error changing event state:", error);
    } finally {
      setLoadingEstado(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <EventoHeader evento={evento} />

        {isAdmin && (
          <EventControls
            evento={evento}
            onChangeState={handleChangeState}
            loading={loadingEstado}
          />
        )}

        <ObraGrid obras={obras} estadoEvento={evento.estado} />
      </div>
    </motion.div>
  );
}

export default EventoPage;

import { useEffect, useState } from "react";
import { useEventos } from "@/context/EventoContext";
import { Link, useParams } from "react-router-dom";
import { useObras } from "@/context/ObraContext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import EventoHeader from "@/components/EventoHeader";
import ObraGrid from "@/components/ObraGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import EventControls from "@/components/EventControls";
import { Plus } from "lucide-react";

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

        {/* Obras */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-purple-400 mb-6">Obras</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {obras.length > 0 ? (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <ObraGrid obras={obras} estadoEvento={evento.estado} />
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center text-indigo-300"
              >
                Aún no hay obras para este evento...
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Agregar obra (solo para admins) */}
        {isAdmin && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              Agregar Obra
            </h2>
            {
              <Link
                to={`/obras/new?evento=${evento.id_evento}`}
                className="inline-flex items-center px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Nueva Obra
              </Link>
            }
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default EventoPage;

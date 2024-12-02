import { useEffect, useRef, useState } from "react";
import EventoCard from "@/components/EventoCard";
import { useEventos } from "@/context/EventoContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function EventosPage() {
  const { eventos, loadEventosOrdenados } = useEventos();
  const [categorizedEvents, setCategorizedEvents] = useState({
    past: [],
    current: [],
    future: [],
  });
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const containerRef = useRef(null);
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    loadEventosOrdenados();
  }, [loadEventosOrdenados]);

  useEffect(() => {
    const currentDate = new Date();
    const sortedEvents = eventos;

    const categorized = sortedEvents.reduce(
      (acc, evento) => {
        const startDate = new Date(evento.fecha_inicio);
        const endDate = new Date(evento.fecha_fin);

        if (endDate < currentDate) {
          acc.past.push(evento);
        } else if (startDate <= currentDate && currentDate <= endDate) {
          acc.current.push(evento);
        } else {
          acc.future.push(evento);
        }
        return acc;
      },
      { past: [], current: [], future: [] }
    );

    setCategorizedEvents(categorized);

    if (categorized.current.length > 0) {
      // Si hay eventos en curso, selecciona el primero de ellos
      setActiveEventIndex(categorized.past.length);
    } else if (categorized.future.length > 0) {
      // Si no hay eventos en curso pero hay eventos futuros, selecciona el primero futuro
      setActiveEventIndex(categorized.past.length + categorized.current.length);
    } else if (categorized.past.length > 0) {
      // Si no hay eventos en curso ni futuros, selecciona el último evento pasado
      setActiveEventIndex(categorized.past.length - 1);
    } else {
      // Si no hay eventos en absoluto, establece el índice en 0
      setActiveEventIndex(0);
    }
  }, [eventos]);

  const allEvents = [
    ...categorizedEvents.past,
    ...categorizedEvents.current,
    ...categorizedEvents.future,
  ];

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setActiveEventIndex((prev) => Math.min(prev + 1, allEvents.length - 1));
      } else {
        setActiveEventIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [allEvents.length]);

  // Manejo de clic en un evento
  const handleEventClick = (index, eventoId) => {
    if (index === activeEventIndex) {
      // Si el evento ya está seleccionado, redirige a la página de detalles
      navigate(`/eventos/${eventoId}`);
    } else {
      // Si no está seleccionado, establece el índice activo en el evento clicado
      setActiveEventIndex(index);
    }
  };

  const handleCreateEvent = () => {
    navigate(`/eventos/new`);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white py-8 px-4 relative"
      ref={containerRef}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Eventos</h1>
        <AnimatePresence>
          <motion.div
            className="space-y-8"
            initial={{ y: 0 }}
            animate={{ y: -activeEventIndex * 140 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {allEvents.map((evento, index) => (
              <EventoCard
                key={evento.id_evento}
                evento={evento}
                isActive={index === activeEventIndex}
                onClick={() => handleEventClick(index, evento.id_evento)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      {isAdmin && (
        <motion.button
          className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCreateEvent}
        >
          <PlusIcon size={24} />
          <span className="sr-only">Crear nuevo evento</span>
        </motion.button>
      )}
    </div>
  );
}

export default EventosPage;

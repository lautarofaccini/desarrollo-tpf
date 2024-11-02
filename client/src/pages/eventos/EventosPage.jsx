import { useEffect, useRef, useState } from "react";
import EventoCard from "@/components/EventoCard";
import { useEventos } from "@/context/EventoContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function EventosPage() {
  const { eventos, loadEventos } = useEventos();
  const [categorizedEvents, setCategorizedEvents] = useState({
    past: [],
    current: [],
    future: [],
  });
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const containerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadEventos();
  }, [loadEventos]);

  useEffect(() => {
    const currentDate = new Date();
    const sortedEvents = [...eventos].sort(
      (a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio)
    );

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
        // Scrolling down
        setActiveEventIndex((prev) => Math.min(prev + 1, allEvents.length - 1));
      } else {
        // Scrolling up
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
  
  return (
    <div className="min-h-screen text-white py-8 px-4" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        <AnimatePresence>
          <motion.div
            className="space-y-8"
            initial={{ y: 0 }}
            animate={{ y: -activeEventIndex * 120 }}
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
    </div>
  );
}

export default EventosPage;

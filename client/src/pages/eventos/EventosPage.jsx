import { useEffect, useRef, useState } from "react";
import EventoCard from "@/components/EventoCard";
import { useEventos } from "@/context/EventoContext";
import { motion, AnimatePresence } from "framer-motion";

export default function EventosPage() {
  const { eventos, loadEventos } = useEventos();
  const [categorizedEvents, setCategorizedEvents] = useState({
    past: [],
    current: [],
    future: [],
  });
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const containerRef = useRef(null);

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

    // Set the active event to the first current event, or the last past event, or the first future event
    if (categorized.current.length > 0) {
      setActiveEventIndex(categorized.past.length);
    } else if (categorized.past.length > 0) {
      setActiveEventIndex(categorized.past.length - 1);
    } else {
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

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        <AnimatePresence>
          <motion.div
            className="space-y-8"
            initial={{ y: 0 }}
            animate={{ y: -activeEventIndex * 120 }} // Adjust this value based on your card height
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {allEvents.map((evento, index) => (
              <EventoCard
                key={evento.id_evento}
                evento={evento}
                isActive={index === activeEventIndex}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import EdDelButtons from "./EdDelButtons";
import { motion } from "framer-motion";

function EventoCard({ evento, isActive }) {
  return (
    <motion.div
      layout
      className={`event-card bg-white rounded-lg shadow-md p-6 mb-4 transition-all duration-300 ${
        isActive ? "ring-2 ring-blue-500" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: isActive ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
    >
      <Link
        to={`/eventos/${evento.id_evento}`}
        className="text-xl font-semibold mb-2"
      >
        {evento.lugar}
      </Link>

      <p className="text-sm text-gray-600 mb-2">
        {new Date(evento.fecha_inicio).toLocaleDateString()} -{" "}
        {new Date(evento.fecha_fin).toLocaleDateString()}
      </p>
      <p className="text-gray-700">{evento.descripcion}</p>

      <p className="text-gray-700">{evento.tematica}</p>
      <EdDelButtons id={evento.id_evento} />
    </motion.div>
  );
}

export default EventoCard;

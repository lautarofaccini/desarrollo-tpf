import { motion } from "framer-motion";

function EventoCard({ evento, isActive, onClick }) {
  return (
    <motion.div
      layout
      className={`bg-zinc-700 text-white rounded-lg shadow-md p-6 mb-4 transition-all duration-300 ${
        isActive ? "ring-2 ring-blue-500" : ""
      } cursor-pointer hover:bg-zinc-600`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isActive ? 1.05 : 1,
      }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <h1 className="text-xl font-semibold mb-2">{evento.lugar}</h1>

      <p className="text-sm mb-2">
        Del {new Date(evento.fecha_inicio).toLocaleDateString()} al {" "}
        {new Date(evento.fecha_fin).toLocaleDateString()}
      </p>
      <p>{evento.descripcion}</p>

      <p>Temática: {evento.tematica || "nil"}</p>
    </motion.div>
  );
}

export default EventoCard;

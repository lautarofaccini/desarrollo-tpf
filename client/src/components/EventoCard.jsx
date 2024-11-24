import { motion } from "framer-motion";

function EventoCard({ evento, isActive, onClick }) {
  // Calcular el estado del evento en función de las fechas
  const getEventStatus = () => {
    const currentDate = new Date();
    const startDate = new Date(evento.fecha_inicio);
    const endDate = new Date(evento.fecha_fin);

    if (endDate < currentDate) return "Finalizado";
    if (startDate <= currentDate && currentDate <= endDate) return "En curso";
    return "Próximamente";
  };

  // Obtener el color del estado del evento
  const getEventLabelColor = () => {
    switch (getEventStatus()) {
      case "Finalizado":
        return "bg-gray-400 text-gray-800";
      case "En curso":
        return "bg-[#00FF00] text-[#006400]";
      case "Próximamente":
        return "bg-blue-400 text-blue-800";
      default:
        return "bg-gray-400 text-gray-800";
    }
  };

  // Obtener el color del estado de la votación
  const getVotingLabelColor = () => {
    switch (evento.estado) {
      case "activo":
        return "bg-green-500 text-white";
      case "finalizado":
        return "bg-red-500 text-white";
      case "inactivo":
        return "bg-yellow-500 text-white";
      case "pausado":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-400 text-gray-800";
    }
  };

  return (
    <motion.div
      layout
      className={`bg-zinc-800 text-white rounded-lg shadow-md p-6 mb-4 transition-all duration-300 ${
        isActive ? "ring-2 ring-blue-500" : ""
      } cursor-pointer hover:opacity-90 relative`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isActive ? 1.05 : 1,
      }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {/* Label del estado del evento */}
      <span
        className={`absolute top-2 right-2 py-1 px-3 rounded-full text-xs font-semibold ${getEventLabelColor()}`}
      >
        {getEventStatus()}
      </span>

      {/* Label del estado de la votación */}
      <span
        className={`absolute top-10 right-2 py-1 px-3 rounded-full text-xs font-semibold ${getVotingLabelColor()}`}
      >
        {evento.estado.charAt(0).toUpperCase() + evento.estado.slice(1)}
      </span>

      <h1 className="text-xl font-semibold mb-2">{evento.lugar}</h1>

      <p className="text-sm mb-2">
        Del {new Date(evento.fecha_inicio).toLocaleDateString()} al{" "}
        {new Date(evento.fecha_fin).toLocaleDateString()}
      </p>
      <p>{evento.descripcion}</p>

      <p>Temática: {evento.tematica || "nil"}</p>
    </motion.div>
  );
}

export default EventoCard;

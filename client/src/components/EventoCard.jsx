import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

function EventoCard({ evento, isActive, onClick }) {
  const { isAdmin } = useAuth();

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
        return "bg-gray-700 text-gray-200";
      case "En curso":
        return "bg-green-700 text-green-200";
      case "Próximamente":
        return "bg-blue-700 text-blue-200";
      default:
        return "bg-gray-700 text-gray-200";
    }
  };

  // Obtener el color del estado de la votación
  const getVotingLabelColor = () => {
    switch (evento.estado) {
      case "activo":
        return "bg-green-700 text-green-200";
      case "finalizado":
        return "bg-red-700 text-red-200";
      case "inactivo":
        return "bg-yellow-700 text-yellow-200";
      case "pausado":
        return "bg-orange-700 text-orange-200";
      default:
        return "bg-gray-700 text-gray-200";
    }
  };

  return (
    <motion.div
      layout
      className={`bg-gray-800 text-gray-200 rounded-lg shadow-lg p-6 mb-4 transition-all duration-300 ${
        isActive ? "ring-2 ring-blue-400" : ""
      } cursor-pointer hover:bg-gray-700 relative`}
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
      {isAdmin && (
        <div className="absolute bottom-2 right-2 text-xs font-semibold bg-gray-700 text-gray-200 px-2 py-1 rounded">
          <p>
            Votación:{" "}
            <span className={`${getVotingLabelColor()} px-2 py-1 rounded`}>
              {evento.estado.charAt(0).toUpperCase() + evento.estado.slice(1)}
            </span>
          </p>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-2 text-gray-100">{evento.lugar}</h1>

      <p className="text-sm mb-2 text-gray-400">
        Del {new Date(evento.fecha_inicio).toLocaleDateString()} al{" "}
        {new Date(evento.fecha_fin).toLocaleDateString()}
      </p>
      <p className="text-gray-300 mb-2">{evento.descripcion}</p>

      <p className="text-gray-400">
        Temática: {evento.tematica || "No especificada"}
      </p>
    </motion.div>
  );
}

export default EventoCard;

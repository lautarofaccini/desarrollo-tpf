import { motion } from "framer-motion";

function EventoCard({ evento, isActive, onClick }) {
  // Calcular el estado del evento en función de las fechas
  const getStatus = () => {
    const currentDate = new Date();
    const startDate = new Date(evento.fecha_inicio);
    const endDate = new Date(evento.fecha_fin);

    if (endDate < currentDate) return "Pasado";
    if (startDate <= currentDate && currentDate <= endDate) return "En curso";
    return "Futuro";
  };

  // Obtener el color de fondo en función del estado
  const getBackgroundColor = () => {
    const status = getStatus();

        return "bg-zinc-800"; // Color por defecto en caso de error

  };

  // Obtener el color del label según el estado
  const getLabelColor = () => {
    const status = getStatus();
    switch (status) {
      case "Pasado":
        return "bg-gray-400 text-gray-800"; // Gris claro para eventos pasados
      case "En curso":
        return "bg-yellow-400 text-yellow-800"; // Amarillo claro para eventos en curso
      case "Futuro":
        return "bg-blue-400 text-blue-800"; // Azul claro para eventos futuros
      default:
        return "bg-gray-400 text-gray-800"; // Color por defecto en caso de error
    }
  };

  return (
    <motion.div
      layout
      className={`${getBackgroundColor()} text-white rounded-lg shadow-md p-6 mb-4 transition-all duration-300 ${
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
      {/* Label de estado en la esquina superior derecha */}
      <span
        className={`absolute top-2 right-2 py-1 px-3 rounded-full text-xs font-semibold ${getLabelColor()}`}
      >
        {getStatus()}
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

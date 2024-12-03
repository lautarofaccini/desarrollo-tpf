import { motion } from "framer-motion";
import { Play, Pause, CircleStopIcon as Stop, X, RefreshCw } from 'lucide-react';

function EventControls({ evento, onChangeState, loading }) {
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const renderButton = (action, icon, text, color) => (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className={`py-2 px-4 rounded-full flex items-center ${
        loading ? 'opacity-50 cursor-not-allowed' : `hover:bg-${color}-600`
      } bg-${color}-500 text-white`}
      onClick={() => onChangeState(action)}
      disabled={loading}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-purple-400 mb-4">Event Controls</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-indigo-300 mb-2">
          Current Status: <span className="text-pink-400 capitalize">{evento.estado}</span>
        </h3>
      </div>
      <div className="flex flex-wrap gap-4">
        {evento.estado === "activo" && (
          <>
            {renderButton("pausar", <Pause className="w-5 h-5" />, "Pausar", "yellow")}
            {renderButton("finalizar", <Stop className="w-5 h-5" />, "Finalizar", "red")}
            {renderButton("desactivar", <X className="w-5 h-5" />, "Desactivar", "gray")}
          </>
        )}
        {evento.estado === "pausado" && (
          <>
            {renderButton("activar", <Play className="w-5 h-5" />, "Reanudar", "green")}
            {renderButton("finalizar", <Stop className="w-5 h-5" />, "Finalizar", "red")}
            {renderButton("desactivar", <X className="w-5 h-5" />, "Desactivar", "gray")}
          </>
        )}
        {evento.estado === "inactivo" && (
          renderButton("activar", <Play className="w-5 h-5" />, "Activar", "green")
        )}
        {evento.estado === "finalizado" && (
          renderButton("desactivar", <RefreshCw className="w-5 h-5" />, "Reiniciar", "gray")
        )}
      </div>
    </motion.div>
  );
}

export default EventControls;


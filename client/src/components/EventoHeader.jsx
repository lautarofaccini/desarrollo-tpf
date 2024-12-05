import { motion } from "framer-motion";
import { Calendar, MapPin, Tag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import EdDelButtons from "./EdDelButtons";

function EventoHeader({ evento }) {
  const { isAdmin } = useAuth();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg"
    >
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-4xl font-bold text-blue-500 underline">{evento.lugar}</h1>
        {isAdmin && <EdDelButtons id={evento.id_evento} />}
      </div>
      <p className="text-xl text-indigo-300 mb-4">{evento.descripcion}</p>
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center text-purple-300">
          <Calendar className="w-5 h-5 mr-2" />
          <span>
            {new Date(evento.fecha_inicio).toLocaleDateString()} -{" "}
            {new Date(evento.fecha_fin).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center text-purple-300">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{evento.lugar}</span>
        </div>
        <div className="flex items-center text-purple-300">
          <Tag className="w-5 h-5 mr-2" />
          <span>{evento.tematica}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default EventoHeader;

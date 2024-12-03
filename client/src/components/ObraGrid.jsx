import { motion } from "framer-motion";
import EscultorObraCard from "@/components/EscultorObraCard";

function ObraGrid({ obras, estadoEvento }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-pink-400 mb-6">Obras</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {obras.map((obra, index) => (
          <motion.div
            key={obra.id_obra}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <EscultorObraCard
              obra={obra}
              mostrarCalificacion={estadoEvento === "finalizado"}
              blancoYNegro={estadoEvento === "inactivo"}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ObraGrid;

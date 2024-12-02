import { useEffect } from "react";
import { useObras } from "@/context/ObraContext";
import ObraCard from "@/components/ObraCard";
import { useAuth } from "@/context/AuthContext";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ObrasPage() {
  const { obras, loadObras } = useObras();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadObras();
  }, [loadObras]);

  const handleCreateObra = () => {
    navigate(`/obras/new`);
  };

  return (
    <div className="bg-neutral-800 flex flex-col justify-between px-20 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-8 hc-blue text-white text-center">
          Obras
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {obras.map((obra) => (
          <ObraCard obra={obra} key={obra.id_obra} />
        ))}
      </div>
      {isAdmin && (
        <motion.button
          className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCreateObra}
        >
          <PlusIcon size={24} />
          <span className="sr-only">Crear nuevo evento</span>
        </motion.button>
      )}
    </div>
  );
}

export default ObrasPage;

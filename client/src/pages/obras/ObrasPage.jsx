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
    <div className="bg-gradient-to-br from-pink-300 via-purple-500 to-indigo-300 text-white flex flex-col justify-between px-10 sm:px-48 xl:px-60 py-8 container-scrollable pb-20" style={{ maxHeight: 'calc(100vh - 4rem)'}} >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-8 hc-blue text-white text-center">
          Obras
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
        {obras.map((obra) => (
          <ObraCard obra={obra} key={obra.id_obra} />
        ))}
      </div>
      {isAdmin && (
        <motion.button
  className="fixed bottom-24 right-8 bg-indigo-400 border-white border-1 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg md:bg-pink-500 md:bottom-8 md:right-8"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={handleCreateObra}
>
  <PlusIcon size={24} />
  <span className="sr-only">Crear nueva obra</span>
</motion.button>
      )}
    </div>
  );
}

export default ObrasPage;

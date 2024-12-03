import { useEffect } from "react";
import { useEscultores } from "@/context/EscultorContext";
import EscultorCard from "@/components/EscultorCard";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EscultoresPage() {
  const { escultores, loadEscultores } = useEscultores();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadEscultores();
  }, [loadEscultores]);

  const handleCreateEsc = () => {
    navigate(`/escultores/new`);
  };

  return (
    <div className="bg-gradient-to-br from-pink-300 via-purple-500 to-indigo-300  text-white flex flex-col justify-between px-60 py-8 container-scrollable pb-20" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold mb-8 hc-blue text-white text-center">
          {" "}
          Escultores{" "}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {escultores.map((escultor) => (
          <EscultorCard escultor={escultor} key={escultor.id_escultor} />
        ))}
      </div>
      {isAdmin && (
        <motion.button
          className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCreateEsc}
        >
          <PlusIcon size={24} />
          <span className="sr-only">Crear nuevo evento</span>
        </motion.button>
      )}
    </div>
  );
}

export default EscultoresPage;

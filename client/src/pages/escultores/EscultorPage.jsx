import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useEscultores } from "@/context/EscultorContext";
import EdDelButtons from "@/components/EdDelButtons";
import { useAuth } from "@/context/AuthContext";
import ObraCard from "@/components/ObraCard";
import { useObras } from "@/context/ObraContext";
import { Avatar } from "@nextui-org/avatar";
import { motion } from "framer-motion";
import { Mail, Phone, Flag, Cake, Plus } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

function EscultorPage() {
  const [escultor, setEscultor] = useState(null);
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getEscultor } = useEscultores();
  const { getObrasByEscultor } = useObras();
  const { isAdmin } = useAuth();
  const params = useParams();

  useEffect(() => {
    async function loadEscultor() {
      try {
        const escultorData = await getEscultor(params.id);
        const obrasData = await getObrasByEscultor(params.id);
        setEscultor(escultorData);
        setObras(obrasData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadEscultor();
  }, [getEscultor, getObrasByEscultor, params.id]);

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar
              src={escultor.foto_perfil}
              size="xl"
              color="primary"
              isBordered
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-bold text-pink-400">
                  {escultor.nombre} {escultor.apellido}
                </h1>
                <EdDelButtons id={escultor.id_escultor} />
              </div>
              <p className="text-xl text-indigo-300 mb-4">
                {escultor.biografia}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-purple-300">
                  <Cake className="w-5 h-5 mr-2" />
                  <span>Edad: {escultor.edad}</span>
                </div>
                <div className="flex items-center text-purple-300">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{escultor.email}</span>
                </div>
                <div className="flex items-center text-purple-300">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{escultor.telefono}</span>
                </div>
                <div className="flex items-center text-purple-300">
                  <Flag className="w-5 h-5 mr-2" />
                  <span>{escultor.nacionalidad}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-purple-400 mb-6">Obras</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {obras.map((obra, index) => (
              <motion.div
                key={obra.id_obra}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <ObraCard obra={obra} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {isAdmin && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              Agregar Obra
            </h2>
            <Link
              to={`/obras/new?escultor=${escultor.id_escultor}`}
              className="inline-flex items-center px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nueva Obra
            </Link>
            <h2 className="text-2xl font-bold text-red-800 mb-4 pt-6">
              TODO: Enviar al formulario con escultor ya seleccionado
            </h2>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default EscultorPage;

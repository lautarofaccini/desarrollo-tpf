import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useObras } from "@/context/ObraContext";
import EdDelButtons from "@/components/EdDelButtons";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { QrCode, Calendar, Box } from 'lucide-react';
import LoadingSpinner from "@/components/LoadingSpinner";

function ObraPage() {
  const [obra, setObra] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getObra, getImagenesByObra } = useObras();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadObra() {
      try {
        const res = await getObra(params.id);
        setObra(res);
        const imagenesRes = await getImagenesByObra(params.id);
        setImagenes(imagenesRes);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadObra();
  }, [getObra, getImagenesByObra, params.id]);

  if (loading) return <LoadingSpinner />;

  // Clasificación de imágenes
  const imagenAntes = imagenes[0] || null;
  const imagenDurante = imagenes[1] || null;
  const imagenDespues = imagenes[2] || null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg"
        >
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-bold text-pink-400">{obra.estilo}</h1>
            <div className="flex space-x-2">
              <EdDelButtons id={obra.id_obra} />
              {isAdmin && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/obras/qr/${obra.id_obra}`)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
                >
                  <QrCode className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </div>
          <p className="text-xl text-indigo-300 mb-4">{obra.descripcion}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-purple-300">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{obra.fecha_creacion}</span>
            </div>
            <div className="flex items-center text-purple-300">
              <Box className="w-5 h-5 mr-2" />
              <span>Material: {obra.material || "N/A"}</span>
            </div>
          </div>
        </motion.div>

        {imagenes.length > 0 ? (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Progreso de la Obra</h2>
            <div className={`grid gap-6 ${
              imagenes.length > 1 ? "sm:grid-cols-2" : ""
            } ${imagenes.length > 2 ? "lg:grid-cols-3" : ""}`}>
              {[
                { title: "Antes", image: imagenAntes },
                { title: "Durante", image: imagenDurante },
                { title: "Después", image: imagenDespues },
              ].map((item, index) => 
                item.image && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="text-center"
                  >
                    <h3 className="font-semibold text-pink-300 mb-2">{item.title}</h3>
                    <img
                      src={item.image.url}
                      alt={item.title}
                      className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    />
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-indigo-300"
          >
            No se han proporcionado imágenes...
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default ObraPage;


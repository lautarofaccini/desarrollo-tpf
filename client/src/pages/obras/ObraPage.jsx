import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useObras } from "@/context/ObraContext";
import EdDelButtons from "@/components/EdDelButtons";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { QrCode, Calendar, Box } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { Helmet } from "react-helmet"; // Importa React Helmet

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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadObra();
  }, [getObra, getImagenesByObra, params.id]);

  useEffect(() => {
    if (obra) {
      console.log("Datos de la obra:", obra); // Depuración
    }
  }, [obra]);

  if (loading) return <LoadingSpinner />;

  if (!obra) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gray-800 text-white"
      >
        <p>No se encontró la obra solicitada.</p>
      </motion.div>
    );
  }

  // Clasificación de imágenes
  const imagenAntes = imagenes[0] || null;
  const imagenDurante = imagenes[1] || null;
  const imagenDespues = imagenes[2] || null;

  // URL y mensaje para compartir
  const shareUrl = `${window.location.origin}/obras/${obra.id_obra}`;
  const shareMessage = obra.titulo
    ? `¡Mira esta increíble obra llamada "${obra.titulo}"!`
    : `¡Mira esta increíble obra!`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-500 to-indigo-300 text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Agregar React Helmet para modificar las etiquetas <head> */}
      <Helmet>
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={obra.titulo || "Obra de arte"} />
        <meta property="og:description" content={shareMessage} />
        <meta
          property="og:image"
          content={imagenAntes ? imagenAntes.url : "default-image.jpg"}
        />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Detalles de la obra */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg"
        >
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-bold text-blue-500 underline">
              {obra.estilo}
            </h1>
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
          <p className="text-xl text-white mb-4">{obra.descripcion}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-white">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{new Date(obra.fecha_creacion).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-white">
              <Box className="w-5 h-5 mr-2" />
              <span>Material: {obra.material || "N/A"}</span>
            </div>
          </div>
        </motion.div>

        {/* Botones para compartir dentro del recuadro */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-blue-500 mb-4 underline">
            Progreso de la Obra
          </h2>
          <div
            className={`grid gap-6 ${
              imagenes.length > 1 ? "sm:grid-cols-2" : ""
            } ${imagenes.length > 2 ? "lg:grid-cols-3" : ""}`}
          >
            {[
              { title: "Antes", image: imagenAntes },
              { title: "Durante", image: imagenDurante },
              { title: "Después", image: imagenDespues },
            ].map(
              (item, index) =>
                item.image && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="text-center"
                  >
                    <h3 className="font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <img
                      src={item.image.url}
                      alt={item.title}
                      className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    />
                  </motion.div>
                )
            )}
          </div>

          {/* Botones para compartir */}
          <div className="share-buttons mt-8 text-center">
            <h2 className="text-lg font-bold text-white mb-4">Compartir:</h2>
            <div className="flex justify-center items-center space-x-4">
              <FacebookShareButton
                url={shareUrl}
                className="hover:bg-gray-200 p-2 rounded-full"
              >
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
              <TwitterShareButton
                url={shareUrl}
                title={shareMessage}
                className="hover:bg-gray-200 p-2 rounded-full"
              >
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton
                url={shareUrl}
                title={shareMessage}
                className="hover:bg-gray-200 p-2 rounded-full"
              >
                <WhatsappIcon size={40} round={true} />
              </WhatsappShareButton>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ObraPage;

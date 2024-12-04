import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { verifyObrasTokenRequest } from "@/api/obras.api";
import { useEscultores } from "@/context/EscultorContext";
import { useObras } from "@/context/ObraContext";
import { useAuth } from "@/context/AuthContext";
import { createVotoRequest, getVotoByObraUsuarioRequest } from "@/api/vota.api"; // Nueva función
import EscultorObraCard from "@/components/EscultorObraCard";
import StarRating from "@/components/StarRating";
import { motion } from "framer-motion";

function ObraVotacionPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [obra, setObra] = useState(null);
  const [otrasObras, setOtrasObras] = useState([]);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votoError, setVotoError] = useState(null);
  const [votoEnviado, setVotoEnviado] = useState(false);
  const [yaVotado, setYaVotado] = useState(false); // Nuevo estado para verificar si ya votó

  const { getEscultor } = useEscultores();
  const { getObrasByEscultor } = useObras();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await verifyObrasTokenRequest(token);
        if (response.data) {
          const obraData = response.data;

          // Verificar si el usuario ya votó
          const votoExistente = await getVotoByObraUsuarioRequest(
            obraData.id_obra,
            user.id_usuario
          );
          if (votoExistente) {
            setYaVotado(true); // Si ya votó, actualizar el estado
            return;
          }

          setObra(obraData);

          // Solo buscar el escultor si la obra tiene un id_escultor
          if (obraData.id_escultor) {
            const obrasEscultor = await getObrasByEscultor(
              obraData.id_escultor
            );
            setOtrasObras(
              obrasEscultor.filter((o) => o.id_obra !== obraData.id_obra)
            );
          }
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Error inesperado";

        if (errorMessage === "Token expirado") {
          setError("Código expirado. Por favor, escanéa nuevamente el QR.");
        } else if (errorMessage === "Token invalido") {
          setError("Código inválido.");
        } else {
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token, user.id_usuario, getEscultor, getObrasByEscultor]);

  const handleRatingSubmit = async () => {
    setVotoError(null); // Reseteamos errores previos
    try {
      const voto = {
        id_usuario: user.id_usuario,
        id_obra: obra.id_obra,
        puntaje: rating,
      };
      await createVotoRequest(voto);
      setVotoEnviado(true); // Indicamos que el voto fue exitoso
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error al enviar tu voto.";
      setVotoError(errorMessage); // Guardamos el error
    }
  };

  if (loading)
    return (
      <div className="text-white text-center text-2xl mt-10">Cargando...</div>
    );

  if (error)
    return (
      <div className="text-white text-center mt-10">
        <div className="text-2xl mb-4">{error}</div>
        <Link to="/" className="text-pink-400 hover:text-pink-300 underline">
          Volver al inicio
        </Link>
      </div>
    );

  if (yaVotado)
    return (
      <div className="text-white text-center mt-10">
        <h1 className="text-4xl font-bold text-green-400">¡Ya has votado!</h1>
        <p className="text-lg text-gray-400 mt-4">
          Gracias por participar. Solo puedes votar una vez por esta obra.
        </p>
        <Link
          to="/"
          className="mt-4 text-pink-400 hover:text-pink-300 underline"
        >
          Volver al inicio
        </Link>
      </div>
    );

  if (votoEnviado)
    return (
      <div className="text-white text-center mt-10">
        <h1 className="text-4xl font-bold text-pink-300">
          ¡Gracias por tu voto!
        </h1>
        <Link
          to="/"
          className="mt-4 text-pink-400 hover:text-pink-300 underline"
        >
          Volver al inicio
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-pink-300"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Vota por la obra y el escultor
        </motion.h1>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EscultorObraCard
            obra={obra}
            mostrarCalificacion={false}
            blancoYNegro={false}
          />
        </motion.div>

        <motion.div
          className="bg-gray-800 rounded-lg p-6 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-purple-300">
            Califica al escultor
          </h2>
          <div className="flex items-center justify-between">
            <StarRating rating={rating} setRating={setRating} />
            <button
              onClick={handleRatingSubmit}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition-colors duration-200"
              disabled={rating === 0}
            >
              Enviar Voto
            </button>
          </div>
          {votoError && (
            <div className="mt-4 text-red-500 font-semibold">{votoError}</div>
          )}
        </motion.div>

        {otrasObras.length > 0 && (
          <motion.div
            className="bg-gray-800 rounded-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-300">
              Otras obras del escultor
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otrasObras.map((otraObra) => (
                <div
                  key={otraObra.id_obra}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <h3 className="text-xl font-semibold text-pink-300 mb-2">
                    {otraObra.nombre}
                  </h3>
                  <p className="text-indigo-300">Estilo: {otraObra.estilo}</p>
                  <p className="text-indigo-300">
                    Material: {otraObra.material || "N/A"}
                  </p>
                  <Link
                    to={`/obras/${otraObra.id_obra}`}
                    className="mt-2 inline-block bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full transition-colors duration-200"
                  >
                    Ver detalles
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ObraVotacionPage;

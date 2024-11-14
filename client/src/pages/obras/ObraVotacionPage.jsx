import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { verifyObrasTokenRequest } from "@/api/obras.api";
import ObraCard from "@/components/ObraCard";
import { useEscultores } from "@/context/EscultorContext";
import EscultorCard from "@/components/EscultorCard";
import { useAuth } from "@/context/AuthContext";
import { createVotoRequest } from "@/api/vota.api";

function ObraVotacionPage() {
  const location = useLocation();
  // Obtener el token de la URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [obra, setObra] = useState();
  const [escultor, setEscultor] = useState();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getEscultor } = useEscultores();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(token);
        const response = await verifyObrasTokenRequest(token);
        if (response.data) {
          const obraData = response.data;
          setObra(obraData);

          // Solo buscar el escultor si la obra tiene un id_escultor
          if (obraData.id_escultor) {
            const escultorData = await getEscultor(obraData.id_escultor);
            setEscultor(escultorData);
          }
        } else {
          setError("Token inválido o expirado.");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token, getEscultor]);

  const createVoto = async (voto) => {
    try {
      await createVotoRequest(voto);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingSubmit = async () => {
    try {
      const voto = {
        id_usuario: user.id_usuario,
        id_obra: obra.id_obra,
        puntaje: rating,
      };
      createVoto(voto);
      alert("Gracias por tu voto!");
      navigate("/"); // Redirigir a la página de inicio u otra página después de votar
    } catch (err) {
      console.error(err);
      alert("Error al enviar tu voto.");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error)
    return (
      <div className="text-white">
        <div>{error}</div>
        <Link to="/" className="text-blue-600">
          Volver al inicio
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">Vota por la obra</h1>
      <h2 className="text-lg">{obra.nombre}</h2>
      <EscultorCard escultor={escultor} key={escultor.id_escultor} />
      <ObraCard obra={obra} key={obra.id_obra} />
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer ${
              star <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <button
        onClick={handleRatingSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Enviar Voto
      </button>
    </div>
  );
}

export default ObraVotacionPage;

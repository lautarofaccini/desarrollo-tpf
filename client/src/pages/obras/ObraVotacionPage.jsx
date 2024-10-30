import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { verifyObrasTokenRequest } from "@/api/obras.api";

function ObraVotacionPage() {
  const location = useLocation();

  // Obtener el token de la URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [obra, setObra] = useState({
    id: 1,
    nombre: "Escultura Rostro",
    imagen: "/download.jpg",
    descripcion: "Esta es una obra inspirada",
  });
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchObra() {
      try {
        console.log(token);
        const response = await verifyObrasTokenRequest(token);
        console.log(response.data);
        if (response.data) {
          setObra(response.data);
        } else {
          setError("Token inválido o expirado.");
        }
      } catch (err) {
        console.error(err);
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    }

    fetchObra();
  }, [token]);

  const handleRatingSubmit = async () => {
    try {
      //await submitRating(obra.id_obra, rating);
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
      <h1 className="text-2xl font-bold mb-4">Vota por la obra</h1>
      <h2 className="text-lg">{obra.nombre}</h2>
      {/* Asi deberia ser
        <img src={obra.imagen} alt={obra.nombre} className="mb-4" /> */}
      <img src="/download.jpg" alt={obra.nombre} className="mb-4" />
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

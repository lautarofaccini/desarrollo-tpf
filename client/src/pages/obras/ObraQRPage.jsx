import { useEffect, useState } from "react";
import { getObrasQRRequest } from "@/api/obras.api";
import { useParams, useNavigate } from "react-router-dom";

function ObraQRPage() {
  const [qrCode, setQrCode] = useState("");
  /* const [decodedUrl, setDecodedUrl] = useState(); */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // Nuevo estado para errores
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el QR al montar el componente
    async function fetchQrCode() {
      try {
        const response = await getObrasQRRequest(params.id);
        setQrCode(response.data.qrCode);
        setError(false); // Resetear error si la carga es exitosa
      } catch (error) {
        console.error("Error al obtener el QR:", error);
        setError(true); // Establecer error si la solicitud falla
      }
      setLoading(false);
    }

    fetchQrCode();

    // Configurar el intervalo para actualizar el QR cada 1 minuto (60000 ms)
    const intervalId = setInterval(fetchQrCode, 60000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [params]);

  //Solo para probar en desarrollo

  /* 
  useEffect(() => {
    if (qrCode) {
      const img = new Image();
      img.src = qrCode;

      // Esperar a que la imagen se cargue
      img.onload = () => {
        const qr = new QRCode();
        qr.decodeFromImage(img)
          .then((data) => {
            setDecodedUrl(data.data);
          })
          .catch((error) => {
            console.error("Error al decodificar el QR:", error);
            setError(true); // Manejar error de decodificación
          });
      };

      // Manejar el error si la imagen no se carga
      img.onerror = () => {
        console.error("Error al cargar la imagen del QR.");
        setError(true); // Manejar error de carga
      };
    }
  }, [qrCode]);
 */

  if (loading) return <div>loading...</div>;

  if (error) {
    // Mostrar mensaje de error y botón para volver al inicio
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
          <h1 className="text-2xl font-bold text-white">
            Error al cargar el QR
          </h1>
          <p className="text-white mt-2">
            Ocurrió un problema al cargar el código QR. Por favor, inténtalo más
            tarde.
          </p>
          <button
            onClick={() => navigate("/")} // Navegar al inicio
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <h1 className="text-2xl font-bold text-white">
          Escanea el QR para votar
        </h1>
        <img src={qrCode} alt="Código QR" className="" />
        {/* decodedUrl && (
          <Link to={decodedUrl} className="text-blue-400">
            Código
          </Link>
        ) */}
      </div>
    </div>
  );
}

export default ObraQRPage;

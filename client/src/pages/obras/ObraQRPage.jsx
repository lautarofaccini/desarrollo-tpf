import { useEffect, useState } from "react";
import { getObrasQRRequest } from "@/api/obras.api";
import { useParams, useNavigate } from "react-router-dom";

/* import QRCode from "qrcode-decoder"; */
import { io } from "socket.io-client"; // Importar la biblioteca de WebSockets

function ObraQRPage() {
  const [qrCode, setQrCode] = useState("");
  /* const [decodedUrl, setDecodedUrl] = useState(); */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await getObrasQRRequest(params.id);
        setQrCode(response.data.qrCode);
        setError(false);
      } catch (error) {
        console.error("Error al obtener el QR:", error);
        setError(true);
      }
      setLoading(false);
    };

    fetchQrCode();

    // Conectar con el servidor WebSocket
    const socket = io(
      `http://${import.meta.env.VITE_HOST || "localhost"}:${
    import.meta.env.VITE_SERVER_PORT || 4000
  }`
    );

    // Escuchar actualizaciones del QR específico
    socket.on(`qr-updated-${params.id}`, (newQrCode) => {
      setQrCode(newQrCode);
    });

    socket.on("connect_error", (err) => {
      console.error("Error de conexión al WebSocket:", err);
    });

    // Limpiar la conexión al desmontar el componente
    return () => {
      socket.disconnect();
    };
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
            onClick={() => navigate("/")}
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

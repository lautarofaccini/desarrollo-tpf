import { useEffect, useState } from "react";
import { getObrasQRRequest } from "@/api/obras.api";
import { Link, useParams } from "react-router-dom";
import QRCode from "qrcode-decoder";

function ObraQRPage() {
  const [qrCode, setQrCode] = useState("");
  const [decodedUrl, setDecodedUrl] = useState();
  const params = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener el QR al montar el componente
    async function fetchQrCode() {
      try {
        const response = await getObrasQRRequest(params.id);
        setQrCode(response.data.qrCode);
      } catch (error) {
        console.error("Error al obtener el QR:", error);
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
            console.error('Error al decodificar el QR:', error);
          });
      };

      // Manejar el error si la imagen no se carga
      img.onerror = () => {
        console.error("Error al cargar la imagen del QR.");
      };
    }
  }, [qrCode]);

  if (loading) return <div>loading...</div>;

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className=" bg-zinc-800 max-w-md p-10 rounded-md ">
        <h1 className="text-2xl font-bold text-white">
          Escanea el QR para votar
        </h1>
        <img src={qrCode} alt="Código QR" className="" />
        {decodedUrl && (
          <Link to={decodedUrl} className="text-blue-400">
            Código
          </Link>
        )}
      </div>
    </div>
  );
}

export default ObraQRPage;

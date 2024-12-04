import { motion } from "framer-motion";
import { QrCode } from "lucide-react";
import { isMobile } from "react-device-detect";

const OpenCameraButton = () => {
  const handleOpenCamera = () => {
    if (navigator.userAgent.includes("Android")) {
      window.location.href = "https://webqr.com/";
    } else {
      // Abrir el esquema por defecto (iOS/otros dispositivos)
      window.location.href = "camera://";
    }
  };

  return (
    <>
      {isMobile && (
        <motion.button
          className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleOpenCamera}
        >
          <QrCode size={24} />
          <span className="sr-only">Scanear QR</span>
        </motion.button>
      )}
    </>
  );
};

export default OpenCameraButton;

import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import dotenv from "dotenv";
import { io } from "../index.js";

dotenv.config();
// Clave secreta para firmar los tokens
const SECRET_KEY = process.env.SECRET_KEY;

// Mapa en memoria para almacenar los tokens de cada obra
let obraQRCodes = {};
let qrUpdateInterval;

// Función para generar un token único por obra
const generateTokenForObra = (id_obra) => {
  return jwt.sign({ id_obra, timestamp: Date.now() }, SECRET_KEY, {
    expiresIn: "1m",
  });
};

// Generar el QR para una obra específica
export const getQRCodeForObra = async (id_obra) => {
  // Si no existe un QR para esta obra, generar uno
  if (!obraQRCodes[id_obra]) {
    obraQRCodes[id_obra] = generateTokenForObra(id_obra);
  }

  // Generar la imagen QR basada en el token generado
  const qrCodeUrl = await QRCode.toDataURL(
    `http://${process.env.HOST || "localhost"}:${
      process.env.PORT || 5173
    }/obras/votar?token=${obraQRCodes[id_obra]}`
  );

  // Iniciar el intervalo para actualizar QR si no está corriendo
  if (!qrUpdateInterval) {
    startQRCodeUpdateInterval();
  }

  return qrCodeUrl;
};

// Modifica solo `updateAllQRCodes` para emitir eventos
const updateAllQRCodes = async () => {
  const idsObras = Object.keys(obraQRCodes);

  for (const id_obra of idsObras) {
    obraQRCodes[id_obra] = generateTokenForObra(id_obra);

    // Generar URL del QR y esperar que termine
    const qrCodeUrl = await QRCode.toDataURL(
      `http://${process.env.HOST || "localhost"}:${
        process.env.PORT || 5173
      }/obras/votar?token=${obraQRCodes[id_obra]}`
    );

    // Emitir el evento con el nuevo QR
    io.emit(`qr-updated-${id_obra}`, qrCodeUrl);
  }

  console.log("QRs actualizados para obras:", idsObras);
};

// Iniciar el intervalo de actualización de QR
export const startQRCodeUpdateInterval = () => {
  qrUpdateInterval = setInterval(updateAllQRCodes, 60 * 1000);
  console.log("Intervalo de actualización de códigos QR iniciado.");
};

// Detener el intervalo
export const stopQRCodeUpdateInterval = () => {
  if (qrUpdateInterval) {
    clearInterval(qrUpdateInterval);
    qrUpdateInterval = null;
    console.log("Intervalo de actualización de códigos QR detenido.");
  }
};

// Limpiar los QR en memoria y detener el intervalo
export const clearQRCodesAndInterval = () => {
  obraQRCodes = {};
  stopQRCodeUpdateInterval();
  console.log("Memoria de códigos QR y el intervalo han sido limpiados.");
};

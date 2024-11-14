import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useObras } from "@/context/ObraContext";
import { useEscultores } from "@/context/EscultorContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

function EscultorObraCard({ obra, mostrarCalificacion, blancoYNegro }) {
  const [escultor, setEscultor] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const { getImagenesByObra } = useObras();
  const { getEscultor } = useEscultores();

  useEffect(() => {
    async function loadRelatedData() {
      try {
        // Cargar el escultor de la obra
        const escultorData = await getEscultor(obra.id_escultor);
        setEscultor(escultorData);

        // Cargar las imágenes de la obra
        const imagenesData = await getImagenesByObra(obra.id_obra);
        if (imagenesData && imagenesData.length > 0) {
          const urls = imagenesData.map((img) => img.url);
          setImagenes(urls);
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadRelatedData();
  }, [obra, getEscultor, getImagenesByObra]);

  if (!escultor) return null;

  const defaultImage = "/images.jpg";

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-full min-h-[400px]">
      <div className={`relative h-64 w-full ${blancoYNegro && "grayscale"}`}>
        {imagenes.length > 0 ? (
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            showArrows={imagenes.length > 1}
            showIndicators={imagenes.length > 1}
            renderArrowPrev={(onClickHandler, hasPrev) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-r-md"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-l-md"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              )
            }
          >
            {imagenes.map((imagen, index) => (
              <div key={index} className="h-64 w-full">
                <img
                  src={imagen}
                  alt={`${obra.nombre} - Imagen ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <img
            src={defaultImage}
            alt={obra.nombre}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4 flex-grow relative">
        <h2 className="text-xl font-semibold text-white">{obra.nombre}</h2>
        <p className="text-gray-400">Estilo: {obra.estilo}</p>
        <p className="text-gray-400">Material: {obra.material || "N/A"}</p>

        {/* Mostrar calificación si mostrarCalificacion es verdadero */}
        {mostrarCalificacion && (
          <p className="text-yellow-400 font-bold">
            Calificación: {obra.calificacion}
          </p>
        )}

        <hr className="my-4 border-gray-600" />
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">
              {escultor.nombre} {escultor.apellido}
            </h3>
            <p className="text-gray-400">Edad: {escultor.edad}</p>
            <p className="text-gray-400">{escultor.biografia}</p>
            <p className="text-gray-400">{escultor.email}</p>
          </div>
          <img
            src={escultor.foto_perfil || "/JEFF_KOONS_2.jpg"}
            alt={escultor.nombre}
            className="w-20 h-20 rounded-full object-cover aspect-square ml-4"
          />
        </div>
      </div>
      <div className="p-4 mt-auto">
        <Link
          to={`/obras/${obra.id_obra}`}
          className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full text-center"
        >
          Ver más de la obra
        </Link>
        <Link
          to={`/escultores/${escultor.id_escultor}`}
          className="mt-2 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 w-full text-center"
        >
          Ver más del escultor
        </Link>
      </div>
    </div>
  );
}

export default EscultorObraCard;

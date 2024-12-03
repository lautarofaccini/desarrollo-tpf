import { useObras } from "@/context/ObraContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ObraCard({ obra }) {
  const [imagenes, setImagenes] = useState([]);
  // Una sola imagen
  const { getImagenesByObra } = useObras();

  useEffect(() => {
    async function loadImagenes() {
      const data = await getImagenesByObra(obra.id_obra);
      if (data) {
        const urls = data.map((img) => img.url);
        setImagenes(urls);
      }
    }
    loadImagenes();
  }, [obra, getImagenesByObra]);

  const defaultImage = "@/Escultura10.jpg";

  return (
    <div className="border-4 border-gray-700 rounded-2xl overflow-hidden shadow-lg flex flex-col w-full h-full bg-gray-900 transition-transform hover:scale-105">
      <div className="relative h-64">
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
              <div key={index} className="h-64">
                <img
                  src={imagen || defaultImage}
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
            className="w-full h-64 object-cover object-center"
          />
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-4 line-clamp-2">
          {obra.estilo}
        </h2>
        <p className="text-gray-400 text-base mb-4 line-clamp-6 flex-grow">
          {obra.descripcion}
        </p>
        <p className="text-gray-400 text-base mb-2">
          Material: {obra.material || "none"}
        </p>
      </div>
      <div className="p-6">
        <Link
          to={`/obras/${obra.id_obra}`}
          className="block bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300 text-center font-semibold text-lg"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}

export default ObraCard;

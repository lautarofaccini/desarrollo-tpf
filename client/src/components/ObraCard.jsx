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

  const defaultImage = "/images.jpg";

  return (
    <div
      key={obra.id_obra}
      className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-full min-h-[400px]"
    >
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
                  className="absolute left-0 top-1/2 z-9 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-r-md"
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
                  className="absolute right-0 top-1/2 z-9 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-l-md"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              )
            }
          >
            {imagenes.map((imagen, index) => (
              <div key={index} className="h-64">
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
      <div className="p-2 flex-grow">
        <h2 className="text-xl font-semibold text-white">{obra.estilo}</h2>
        <p className="text-gray-400">{obra.descripcion}</p>
        <p className="text-gray-400">Material: {obra.material || "none"}</p>
      </div>
      <div className="p-2 mt-auto">
        <Link
          to={`/obras/${obra.id_obra}`}
          className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full text-center"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}

export default ObraCard;

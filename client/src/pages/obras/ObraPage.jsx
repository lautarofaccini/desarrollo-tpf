import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useObras } from "@/context/ObraContext";
import EdDelButtons from "@/components/EdDelButtons";

function ObraPage() {
  const [obra, setObra] = useState();
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getObra, getImagenesByObra } = useObras();
  const params = useParams();

  useEffect(() => {
    async function loadObra() {
      try {
        const res = await getObra(params.id);
        setObra(res);
        const imagenesRes = await getImagenesByObra(params.id);
        setImagenes(imagenesRes);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadObra();
  }, [getObra, getImagenesByObra, params.id]);

  if (loading) return <p>Loading...</p>;

  // Clasificación de imágenes
  const imagenAntes = imagenes[0] || null;
  const imagenDurante = imagenes[1] || null;
  const imagenDespues = imagenes[2] || null;

  return (
    <section className="flex justify-center items-center">
      <div className="bg-zinc-700 text-white rounded-md p-4 w-full max-w-4xl">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold mt-4">{obra.estilo}</h1>
          <p className="text-sm">{obra.descripcion}</p>
          <p className="text-sm">{obra.fecha_creacion}</p>
          <p className="text-sm">Material: {obra.material || "none"}</p>
          <EdDelButtons id={obra.id_obra} />

          {/* Clasificación de Imágenes */}
          {imagenes.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-lg font-bold">Progreso de la Obra</h2>
              <div
                className={`grid gap-4 mt-4 grid-cols-1 ${
                  imagenes.length > 1 && "sm:grid-cols-2"
                } ${imagenes.length > 2 && "lg:grid-cols-3"}`}
              >
                {/* Antes */}
                {imagenAntes && (
                  <div className="text-center">
                    <h3 className="font-semibold">Antes</h3>
                    <img
                      src={imagenAntes.url}
                      alt="Antes"
                      className="w-full h-64 object-cover rounded-md"
                    />
                  </div>
                )}

                {/* Durante */}
                {imagenDurante && (
                  <div className="text-center">
                    <h3 className="font-semibold">Durante</h3>
                    <img
                      src={imagenDurante.url}
                      alt="Durante"
                      className="w-full h-64 object-cover rounded-md"
                    />
                  </div>
                )}

                {/* Después */}
                {imagenDespues && (
                  <div className="text-center">
                    <h3 className="font-semibold">Después</h3>
                    <img
                      src={imagenDespues.url}
                      alt="Después"
                      className="w-full h-64 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>No se han proporcionado imágenes...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ObraPage;

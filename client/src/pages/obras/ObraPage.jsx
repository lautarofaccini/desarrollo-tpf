import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useObras } from "@/context/ObraContext";
import EdDelButtons from "@/components/EdDelButtons";

function ObraPage() {
  const [obra, setObra] = useState();
  const [loading, setLoading] = useState(true);
  const { getObra } = useObras();
  const params = useParams();

  useEffect(() => {
    async function loadObra() {
      try {
        const res = await getObra(params.id);
        setObra(res);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadObra();
  }, [getObra, params.id]);

  if (loading) return <p>Loading...</p>;
  return (
    <section className="flex justify-center items-center">
      <div className="bg-zinc-700 text-white rounded-md p-4">
        <div className="container mx-auto">
          <img
            src={obra.imagen || "/images.jpg"}
            alt={obra.nombre}
            className="w-full max-w-md object-cover"
          />
          <h1 className="text-xl font-bold mt-4">{obra.estilo}</h1>
          <p className="text-sm">{obra.descripcion}</p>
          <p className="text-sm">Material: {obra.material || "none"}</p>
          <EdDelButtons id={obra.id_obra} />
          {/* aca hay que agregar para que se puedan ver las otras imagenes cuando entra a la obra*/}

        </div>
      </div>
    </section>
  );
}

export default ObraPage;

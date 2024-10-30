import { useEffect, useState } from "react";
import { useEventos } from "@/context/EventoContext";
import { useParams } from "react-router-dom";
import EdDelButtons from "@/components/EdDelButtons";

function EventoPage() {
  const [evento, setEvento] = useState();
  const [loading, setLoading] = useState(true);
  const { getEvento } = useEventos();
  const params = useParams();

  useEffect(() => {
    async function loadEvento() {
      try {
        const res = await getEvento(params.id);
        setEvento(res);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadEvento();
  }, [getEvento, params.id]);

  if (loading) return <p>Loading...</p>;

  return (
    <section className="flex justify-center items-center">
      <div className="bg-zinc-700 text-white rounded-md p-4">
        <div className="text-xl font-bold">{evento.lugar}</div>
        <p className="text-sm">{evento.descripcion}</p>
        <p className="text-sm">{evento.tematica}</p>
        <p className="text-xs">
          {new Date(evento.fecha_inicio).toLocaleDateString()}
        </p>
        <p className="text-xs">
          {
            //Falta hora
            new Date(evento.fecha_fin).toLocaleDateString()
          }
        </p>
        <EdDelButtons id={evento.id_evento} />
      </div>
    </section>
  );
}

export default EventoPage;

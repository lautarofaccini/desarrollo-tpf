import { useEffect, useState } from "react";
import { useEventos } from "@/context/EventoContext";
import { useParams } from "react-router-dom";
import EdDelButtons from "@/components/EdDelButtons";
import { useObras } from "@/context/ObraContext";
import EscultorObraCard from "@/components/EscultorObraCard";
import { useAuth } from "@/context/AuthContext";

function EventoPage() {
  const [evento, setEvento] = useState();
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getEvento } = useEventos();
  const { getObrasByEvento } = useObras();
  const { isAuthenticated } = useAuth();
  const params = useParams();

  useEffect(() => {
    async function loadEvento() {
      try {
        const eventoData = await getEvento(params.id);
        let obrasData = await getObrasByEvento(params.id);

        // Si el evento ha finalizado, ordenar las obras por calificación
        if (isFinalizado(eventoData)) {
          obrasData = obrasData.sort((a, b) => b.calificacion - a.calificacion);
        }

        setEvento(eventoData);
        setObras(obrasData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadEvento();
  }, [getEvento, getObrasByEvento, params.id]);

  const terminarEventoManual = (id) => {
    console.log(id)
    alert(`NOT YET IMPLEMENTED`);
  };

  function isEnCurso(evento) {
    const now = new Date();
    return (
      new Date(evento.fecha_inicio) <= now && now <= new Date(evento.fecha_fin)
    );
  }

  function isFinalizado(evento) {
    return new Date(evento.fecha_fin) < new Date();
  }

  function isProximo(evento) {
    return new Date(evento.fecha_inicio) > new Date();
  }

  function handleTerminarEvento() {
    terminarEventoManual(evento.id_evento);
  }

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
          {new Date(evento.fecha_fin).toLocaleDateString()}
        </p>
        <EdDelButtons id={evento.id_evento} />

        {/* Mostrar botón de terminar manual si el evento está en curso 
        //TODO: Controlar que sea admin para terminar evento
        */}
        {isEnCurso(evento) && isAuthenticated && (
          <button
            onClick={handleTerminarEvento}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Terminar Evento
          </button>
        )}

        {/* Galería de obras */}
        {obras.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold">Obras</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {obras.map((obra) => (
                <EscultorObraCard
                  obra={obra}
                  key={obra.id_obra}
                  mostrarCalificacion={isFinalizado(evento)}
                  blancoYNegro={isProximo(evento)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default EventoPage;

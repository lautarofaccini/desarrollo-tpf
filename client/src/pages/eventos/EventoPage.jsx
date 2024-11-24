import { useEffect, useState } from "react";
import { useEventos } from "@/context/EventoContext";
import { useParams } from "react-router-dom";
import EdDelButtons from "@/components/EdDelButtons";
import { useObras } from "@/context/ObraContext";
import EscultorObraCard from "@/components/EscultorObraCard";
import { useAuth } from "@/context/AuthContext";
import EstadoBottons from "@/components/EstadoButtons";

function EventoPage() {
  const [evento, setEvento] = useState();
  const [obras, setObras] = useState([]);
  const [estado, setEstado] = useState("inactivo");
  const [loading, setLoading] = useState(true);
  const [loadingEstado, setLoadingEstado] = useState(false); // Cargando cambios de estado
  const {
    getEvento,
    activarEvento,
    pausarEvento,
    finalizarEvento,
    desactivarEvento,
  } = useEventos();
  const { getObrasByEvento } = useObras();
  const { isAdmin } = useAuth();
  const params = useParams();

  // Cargar evento y obras
  useEffect(() => {
    const loadEvento = async () => {
      try {
        setLoading(true);
        const eventoData = await getEvento(params.id);
        let obrasData = await getObrasByEvento(params.id);

        if (eventoData.estado === "finalizado") {
          obrasData = obrasData.sort((a, b) => b.calificacion - a.calificacion);
        }

        setEvento(eventoData);
        setEstado(eventoData.estado);
        setObras(obrasData);
      } catch (error) {
        console.error("Error cargando el evento:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvento();
  }, [getEvento, getObrasByEvento, params.id]);

  // Cambiar estado del evento
  const handleChangeState = async (action) => {
    try {
      setLoadingEstado(true); // Mostramos un estado de carga solo para el cambio de estado
      switch (action) {
        case "activar":
          await activarEvento(evento.id_evento);
          break;
        case "pausar":
          await pausarEvento(evento.id_evento);
          break;
        case "finalizar":
          await finalizarEvento(evento.id_evento);
          break;
        case "desactivar":
          await desactivarEvento(evento.id_evento);
          break;
        default:
          throw new Error("Acción no válida");
      }

      // Actualizamos solo el estado del evento
      const eventoData = await getEvento(params.id);
      setEvento(eventoData);
      setEstado(eventoData.estado);
    } catch (error) {
      console.error("Error al cambiar el estado del evento:", error);
    } finally {
      setLoadingEstado(false);
    }
  };

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

        {isAdmin && (
          <>
            <p className="text-sm font-bold">
              Estado del Evento:{" "}
              {estado.charAt(0).toUpperCase() + estado.slice(1)}
            </p>
            <EstadoBottons
              estado={estado}
              onChangeState={handleChangeState}
              loading={loadingEstado} // Indicador de carga
            />
          </>
        )}

        {obras.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold">Obras</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {obras.map((obra) => (
                <EscultorObraCard
                  obra={obra}
                  key={obra.id_obra}
                  mostrarCalificacion={estado === "finalizado"}
                  blancoYNegro={estado === "inactivo"}
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

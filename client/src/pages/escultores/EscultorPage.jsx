import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEscultores } from "@/context/EscultorContext";
import EdDelButtons from "@/components/EdDelButtons";
import { useAuth } from "@/context/AuthContext";
import ObraCard from "@/components/ObraCard";
import { useObras } from "@/context/ObraContext";

function EscultorPage() {
  const [escultor, setEscultor] = useState();
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getEscultor } = useEscultores();
  const { getObrasByEscultor } = useObras();
  const { isAuthenticated } = useAuth();
  const params = useParams();

  useEffect(() => {
    async function loadEscultor() {
      try {
        const escultorData = await getEscultor(params.id);
        const obrasData = await getObrasByEscultor(params.id);
        setEscultor(escultorData);
        setObras(obrasData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadEscultor();
  }, [getEscultor, getObrasByEscultor, params.id]);

  if (loading) return <p>Loading...</p>;

  return (
    <section className="flex justify-center items-center">
      <div className="bg-zinc-700 text-white rounded-md p-4">
        <div className="container mx-auto">
          <img
            src={escultor.foto_perfil || "/JEFF_KOONS_2.jpg"}
            alt={escultor.nombre}
            className="w-full max-w-md object-cover"
          />
          <h2 className="text-xl font-bold mt-4">
            {escultor.nombre} {escultor.apellido}
          </h2>
          <p className="text-sm">{escultor.biografia}</p>
          <p className="text-sm">Edad: {escultor.edad}</p>
          <p className="text-sm">{escultor.email}</p>
          <p className="text-sm">{escultor.telefono}</p>
          <p className="text-sm">{escultor.nacionalidad}</p>
          <EdDelButtons id={escultor.id_escultor} />

          {/* Galería de obras */}
          <div className="mt-6">
            <h3 className="text-lg font-bold">Obras</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {obras.map((obra) => (
                <ObraCard obra={obra} key={obra.id_obra} />
              ))}
            </div>
          </div>

          {isAuthenticated && (
            <div className="mt-6">
              <h3 className="text-lg font-bold">Crear Nueva Obra</h3>

              {/* Boton que lleve a ObrasForm, pero que ya tenga autocompletado el escultor */}
              <div className="text-red-500">NOT YET IMPLEMENTED</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default EscultorPage;

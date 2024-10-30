import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEscultores } from "@/context/EscultorContext";
import EdDelButtons from "@/components/EdDelButtons";

function EscultorPage() {
  const [escultor, setEscultor] = useState();
  const [loading, setLoading] = useState(true);
  const { getEscultor } = useEscultores();
  const params = useParams();

  useEffect(() => {
    async function loadEscultor() {
      try {
        const res = await getEscultor(params.id);
        setEscultor(res);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadEscultor();
  }, [getEscultor, params.id]);

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
          {/* aca hay que agregar para que se puedan ver las otras imagenes cuando entra a la escultor*/}
        </div>
      </div>
    </section>
  );
}

export default EscultorPage;

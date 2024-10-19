// src/components/EsculturaDetail.js
import { useParams } from "react-router-dom";
import { esculturas } from "../api/esculturas";

function EsculturaCard() {
  const { id } = useParams();
  const escultura = esculturas.find((e) => e.id === parseInt(id));

  if (!escultura) {
    return <div>Escultura no encontrada</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <img
          src={escultura.imagen}
          alt={escultura.nombre}
          className="w-full max-w-md object-cover"
        />
        <h1 className="text-3xl font-bold mt-4 text-white">
          {escultura.nombre}
        </h1>
        <p className="mt-2 text-gray-700">{escultura.descripcion}</p>
        {/* aca hay que agregar para que se puedan ver las otras imagenes cuando entra a la escultura*/}
      </div>
    </div>
  );
}

export default EsculturaCard;

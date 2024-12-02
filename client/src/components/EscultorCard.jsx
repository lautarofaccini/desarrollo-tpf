import { Link } from "react-router-dom";

function EscultorCard({ escultor }) {
  return (
    <div
      key={escultor.id_escultor}
      className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-full min-h-[400px]"
    >
      <img
        src={escultor.foto_perfil || "/Escultura1.jpg"}
        alt={escultor.nombre}
        className="w-full h-64 object-cover"
      />
      <div className="p-2 flex-grow bg-black">
        <h2 className="text-xl font-semibold text-white">{escultor.nombre} {escultor.apellido}</h2>
        <p className="text-gray-400">{escultor.biografia}</p>
        <p className="text-gray-400">{escultor.edad}</p>
        <p className="text-gray-400">{escultor.email}</p>
      </div>
      <div className="p-2 mt-auto bg-black">
        <Link
          to={`/escultores/${escultor.id_escultor}`}
          className="mt-2  inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full text-center"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}

export default EscultorCard;

import { Link } from "react-router-dom";

function EscultorCard({ escultor }) {
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg flex flex-col w-full h-full bg-gray-900 transition-transform hover:scale-105">
      <img
        src={escultor.foto_perfil || "/Escultura3.jpg"}
        alt={escultor.nombre}
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-4 line-clamp-2">
          {escultor.nombre} {escultor.apellido}
        </h2>
        <p className="text-gray-400 text-base mb-4 line-clamp-6 flex-grow">
          {escultor.biografia}
        </p>
        <p className="text-gray-400 text-base mb-2">Edad: {escultor.edad}</p>
        <p className="text-gray-400 text-base truncate mb-4">
          {escultor.email}
        </p>
      </div>
      <div className="p-6">
        <Link
          to={`/escultores/${escultor.id_escultor}`}
          className="block bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300 text-center font-semibold text-lg"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}

export default EscultorCard;

import { Link } from "react-router-dom";

function ObraCard({ obra }) {
  return (
    <div
      key={obra.id_obra}
      className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-full min-h-[400px]"
    >
      <img
        src={obra.imagen || "images.jpg"}
        alt={obra.nombre}
        className="w-full h-64 object-cover"
      />
      <div className="p-2 flex-grow">
        <h2 className="text-xl font-semibold text-white">{obra.estilo}</h2>
        <p className="text-gray-400">{obra.descripcion}</p>
        <p className="text-gray-400">Material: {obra.material || "none"}</p>
      </div>
      <div className="p-2 mt-auto">
        <Link
          to={`/obras/${obra.id_obra}`}
          className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full text-center"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}

export default ObraCard;

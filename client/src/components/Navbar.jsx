import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-neutral-800 flex justify-between px-20 py-4">
      <Link to="/" className="text-white font-bold text-3xl">
        La Bienal
      </Link>
      <ul className="flex gap-x-2">
        <li>
          <Link to="/eventos" className="text-white px-2 py-1 text-2xl">Eventos</Link>
        </li>
        <li>
          <Link to="/eventos/new" className="text-white px-2 py-1 text-2xl">Crear Evento</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

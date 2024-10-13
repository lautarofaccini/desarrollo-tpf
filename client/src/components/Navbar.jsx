import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <h1>La Bienal</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/eventos">Eventos</Link>
        </li>
        <li>
          <Link to="/eventos/new">Crear Evento</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

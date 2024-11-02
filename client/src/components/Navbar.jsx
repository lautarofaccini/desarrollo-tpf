import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="z-10 fixed bg-neutral-800 flex justify-between px-20 py-4 top-0 left-0 w-full shadow-md">
      <Link to="/" className="text-white font-bold text-3xl">
        <img src="/Logo.png" alt="Logo" />
      </Link>
      <ul className="flex gap-x-2 items-center">
        <li>
          <Link to="/obras" className="text-white px-2 py-1 text-2xl">
            Obras
          </Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/obras/new" className="text-white px-2 py-1 text-2xl">
              Crear Obra
            </Link>
          </li>
        )}

        <li>
          <Link to="/escultores" className="text-white px-2 py-1 text-2xl">
            Escultores
          </Link>
        </li>

        {isAuthenticated && (
          <li>
            <Link to="/escultores/new" className="text-white px-2 py-1 text-2xl">
              Crear Escultor
            </Link>
          </li>
        )}

        <li>
          <Link to="/eventos" className="text-white px-2 py-1 text-2xl">
            Eventos
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <Link to="/eventos/new" className="text-white px-2 py-1 text-2xl">
                Crear Evento
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  //TODO: Preguntar antes de cerrar sesion
                  logout();
                }}
                className="text-white px-2 py-1 text-2xl"
              >
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="text-white px-2 py-1 text-2xl">
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-white px-2 py-1 text-2xl">
                Registrar
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;

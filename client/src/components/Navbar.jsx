import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="z-20 fixed bg-neutral-800 flex justify-between px-20 py-4 top-0 left-0 w-full shadow-md">
      <Link to="/" className="text-white font-bold text-3xl">
        <img src="/Logo.png" alt="Logo" />
      </Link>
      <ul className="flex gap-x-2 items-center">
        <li>
          <Link to="/obras" className={`text-2xl px-2 py-1 underline ${location.pathname === "/obras" ? "text-[#58c2f0]" : "text-white"}`}>
            Obras
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/obras/new" className={`text-2xl px-2 py-1 underline ${location.pathname === "/obras/new" ? "text-[#58c2f0]" : "text-white"}`}>
              Crear Obra
            </Link>
          </li>
        )}

        <li>
          <Link to="/escultores" className={`text-2xl px-2 py-1 underline ${location.pathname === "/escultores" ? "text-[#58c2f0]" : "text-white"}`}>
            Escultores
          </Link>
        </li>

        {isAdmin && (
          <li>
            <Link to="/escultores/new" className={`text-2xl px-2 py-1 underline ${location.pathname === "/escultores/new" ? "text-[#58c2f0]" : "text-white"}`}>
              Crear Escultor
            </Link>
          </li>
        )}

        <li>
          <Link to="/eventos" className={`text-2xl px-2 py-1 underline ${location.pathname === "/eventos" ? "text-[#58c2f0]" : "text-white"}`}>
            Eventos
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/eventos/new" className={`text-2xl px-2 py-1 underline ${location.pathname === "/eventos/new" ? "text-[#58c2f0]" : "text-white"}`}>
              Crear Evento
            </Link>
          </li>
        )}

        {isAuthenticated ? (
          <>
            <li>
              <Link
                to="/"
                onClick={() => {
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
              <Link to="/login" className={`text-2xl px-2 py-1 underline ${location.pathname === "/login" ? "text-[#58c2f0]" : "text-white"}`}>
                Iniciar Sesión
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
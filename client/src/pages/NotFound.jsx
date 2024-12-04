import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center px-8">
      <div className="text-center mt-6">
        <div className="flex items-center justify-center mb-4">
          <div className="text-pink-400 mr-4">
            <AlertTriangle size={60} />
          </div>
          <h1 className="text-6xl font-bold text-pink-400">404</h1>
        </div>
        <h2 className="text-3xl font-semibold text-purple-300 mb-4">
          Página no encontrada
        </h2>
        <p className="text-xl text-indigo-300 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
        >
          <Home className="mr-2" size={20} />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  useEffect(() => {
    if (isAuthenticated) navigate(from);
  }, [isAuthenticated, navigate, from]);

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/Home.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10 flex items-center justify-center md:justify-start min-h-screen w-full p-4 md:pl-[10%]">
        <div className="w-full max-w-sm md:max-w-md bg-zinc-700 bg-opacity-80 p-6 sm:p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl text-center font-bold text-white underline decoration-sky-500 decoration-4 mb-4 sm:mb-6">Bienvenido</h1>
          <h2 className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-5 text-center">Por favor, inicia sesión en su cuenta de la Bienal para continuar.</h2>
          {loginErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white rounded mb-4">
              {error}
            </div>
          ))}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Correo electrónico"
                className="w-full px-4 py-2 rounded-md border border-gray-700 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email requerido</p>
              )}
            </div>
            <div>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Contraseña"
                className="w-full px-4 py-2 rounded-md border border-gray-700 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Contraseña requerida
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-sky-500 text-white hover:bg-sky-600 transition-colors font-semibold"
            >
              Iniciar Sesión
            </button>
          </form>
          <p className="text-gray-400 mt-4 text-sm text-center">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              state={{ from }}
              className="text-sky-500 hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;


import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Background from "@/components/ImagenFondo";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener la URL de retorno desde `state` o establecerla como "/"
  const from = location.state?.from || "/";

  useEffect(() => {
    if (isAuthenticated) navigate(from); // Redirigir al enlace original tras registrarse
  }, [isAuthenticated, navigate, from]);

  const onSubmit = handleSubmit(async (values) => {
    const updatedValues = {
      ...values,
      rol: "user", // Asignar rol por defecto
    };
    signup(updatedValues);
  });

  return (
    <Background>
      <div className="flex items-center h-screen w-full overflow-hidden relative">
        <div className="absolute top-50 left-80 bg-zinc-700 bg-opacity-80 max-w-md p-10 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-white underline decoration-sky-500 decoration-4 mb-6">Registrarse</h1>
          <h2 className="text-xl text-gray-300 mb-5 text-center">
            Por favor, completa la información para registrarte.
          </h2>
          {registerErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white rounded mb-4">
              {error}
            </div>
          ))}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                {...register("nickname", { required: true })}
                placeholder="Nombre de usuario"
                className="w-full px-4 py-2 rounded-md border border-gray-700 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {errors.nickname && (
                <p className="text-red-500 text-sm mt-1">
                  Nombre de usuario requerido
                </p>
              )}
            </div>
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
              Registrarse
            </button>
          </form>
          <p className="text-gray-400 mt-4 text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              state={{ from }}
              className="text-sky-500 hover:underline"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </Background>
  );
}

export default RegisterPage;

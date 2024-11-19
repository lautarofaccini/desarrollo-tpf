import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Background from "@/components/ImagenFondo";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener la URL de retorno desde `state` o establecerla como "/"
  console.log(location)
  const from = location.state?.from || "/";

  useEffect(() => {
    if (isAuthenticated) navigate(from); // Redirigir al enlace original después de iniciar sesión
  }, [isAuthenticated, navigate, from]);

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  return (
    <Background>
      <div className="flex items-center justify-center h-screen w-full">
        <div className=" bg-zinc-800 max-w-md p-10 rounded-md w-full ">
          <h1 className="text-2xl font-bold text-white">Iniciar Sesión</h1>
          {loginErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white">
              {error}
            </div>
          ))}
          <form onSubmit={onSubmit}>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="ejemplo@email.com"
              className="w-full px-4 py-2 my-2 rounded-md"
            />
            {errors.email && <p className="text-red-500">Email requerido</p>}
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="********"
              className="w-full px-4 py-2 my-2 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500">Contraseña requerida</p>
            )}
            <button type="submit" className="text-white">
              Enviar
            </button>
          </form>
          <Link to="/register" state={{ from }} className="text-sky-500">
            Crear cuenta
          </Link>
        </div>
      </div>
    </Background>
  );
}

export default LoginPage;

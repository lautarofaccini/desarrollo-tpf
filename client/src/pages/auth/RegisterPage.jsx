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
      rol: "user",
    };
    signup(updatedValues);
  });

  return (
    <Background>
      <div className="flex items-center justify-center h-screen w-full">
        <div className=" bg-zinc-800 max-w-md p-10 rounded-md w-full">
          <h1 className="text-2xl font-bold text-white">Registrar</h1>
          {registerErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white">
              {error}
            </div>
          ))}
          <form onSubmit={onSubmit}>
            <input
              type="text"
              {...register("nickname", { required: true })}
              placeholder="Nickname chido"
              className="w-full px-4 py-2 my-2 rounded-md"
            />
            {errors.nickname && (
              <p className="text-red-500">Nombre de usuario requerido</p>
            )}
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
          <Link to="/login" state={{ from }} className="text-sky-500">
            Inicia Sesión
          </Link>
        </div>
      </div>
    </Background>
  );
}

export default RegisterPage;

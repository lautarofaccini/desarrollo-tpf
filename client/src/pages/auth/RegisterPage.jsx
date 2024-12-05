import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [captchaValue, setCaptchaValue] = useState(null);

  const from = location.state?.from || "/";

  useEffect(() => {
    if (isAuthenticated) navigate(from);
  }, [isAuthenticated, navigate, from]);

  const onSubmit = handleSubmit(async (values) => {
    if (!captchaValue) {
      // Mostrar un error si el captcha no se ha completado
      alert("Por favor, completa el captcha");
      return;
    }
    const updatedValues = {
      ...values,
      rol: "user",
      captcha: captchaValue,
    };
    signup(updatedValues);
  });

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/Home.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10 flex items-center justify-center md:justify-start min-h-screen w-full p-4 md:pl-[10%]">
        <div className="w-full max-w-sm md:max-w-md bg-zinc-700 bg-opacity-80 p-6 sm:p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl text-center font-bold text-white underline decoration-sky-500 decoration-4 mb-4 sm:mb-6">Registrarse</h1>
          <h2 className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-5 text-center">
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
            <ReCAPTCHA 
              sitekey="6LfsWZMqAAAAAOQ2zL0xFXd-SXMRCDuza7pRZXfk" 
              onChange={handleCaptchaChange}
              className="w-full flex justify-center " 
            />
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-sky-500 text-white hover:bg-sky-600 transition-colors font-semibold"
            >
              Registrarse
            </button>
          </form>
          <p className="text-gray-400 mt-4 text-sm text-center">
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
    </div>
  );
}

export default RegisterPage;


import { z } from "zod";

export const registerSchema = z.object({
  nickname: z.string({
    required_error: "El nombre de usuario es requerido",
  }),
  email: z
    .string({ required_error: "El email es requerido" })
    .email({ message: "Email invalido" }),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(8, { message: "La contraseña debe ser de al menos 8 caracteres" }),
  rol: z.enum(["admin", "user"], {
    required_error: "El rol es requerido",
  }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "El email es requerido" })
    .email({ message: "Email invalido" }),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(8, { message: "La contraseña debe ser de al menos 8 caracteres" }),
});

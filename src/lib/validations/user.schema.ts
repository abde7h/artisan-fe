import { z } from "zod";

export const RegisterUserSchema = z
  .object({
    name: z
      .string({
        required_error: "Nombre requerido",
      })
      .min(1, "Nombre requerido"),
    surnames: z
      .string({
        required_error: "Nombre requerido",
      })
      .min(1, "Nombre requerido"),
    username: z
      .string({
        required_error: "Nombre de usuario requerido",
      })
      .min(1, "Nombre de usuario requerido"),
    email: z
      .string({
        required_error: "Correo electrónico requerido",
      })
      .min(1, "Correo electrónico requerido")
      .email("Correo electrónico no válido"),
    //photo: z.string().optional(),
    password: z
      .string({
        required_error: "Contraseña requerida",
      })
      .min(1, "Contraseña requerida")
      .min(8, "La contraseña debe de tener 8 o más carácteres")
      .max(32, "La contraseña debe de tener 32 o menos carácteres"),
    passwordConfirm: z
      .string({
        required_error: "Confirma tu contraseña",
      })
      .min(1, "Confirma tu contraseña"),
    telephone: z
      .string({
        required_error: "Número de teléfono requerido",
      })
      .min(1, "Número de teléfono requerido")
      .min(9, "Número de teléfono no válido"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Contraseñas no coinciden",
  });

export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: "Correo electrónico requerido",
    })
    .min(1, "Correo electrónico requerido")
    .email("Correo electrónico no válido"),
  password: z
    .string({
      required_error: "Contraseña requerida",
    })
    .min(1, "Contraseña requerida")
    .min(8, "La contraseña debe de tener al menos 8 carácteres"),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;

"use client";

import {
    RegisterUserInput,
    RegisterUserSchema,
} from "../../../lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { registerUser } from "@/lib/actions";
import { getUser } from "@/lib/api-requests";
import FormInput from "../FormInput";
import Link from "next/link";
import { LoadingButton } from "../LoadingButton";
import useStore from "@/store";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormInputDoble from "@/app/components/FormInputDoble";

export default function UserRegisterForm() {
    const store = useStore();
    const router = useRouter();

    const methods = useForm<RegisterUserInput>({
        resolver: zodResolver(RegisterUserSchema),
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    async function RegisterUserFunction(credentials: RegisterUserInput) {
        store.setRequestLoading(true);
        try {
            const user = await registerUser(credentials);
            toast.success("Registro con éxito!");
            store.setAuthUser(user);
            return router.push("/login");
        } catch (error: any) {
            console.log(error);
            toast.error(`Ya hay un usuario creado con el email "${credentials.email}"!`);
            console.log("Error message:", error.message);
        } finally {
            store.setRequestLoading(false);
        }
    }

    const onSubmitHandler: SubmitHandler<RegisterUserInput> = (values) => {
        RegisterUserFunction(values);
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="max-w-md w-full h-fit self-center mx-auto overflow-hidden shadow-lg bg-secundario rounded-2xl p-8 space-y-5"
            >
                <FormInputDoble labelUno="Nombre" nameUno="name" labelDos="Apellidos" nameDos="surnames" />
                <FormInput label="Nombre de usuario" name="username" />
                <FormInput label="Correo electrónico" name="email" type="email" />
                <FormInputDoble labelUno="Contraseña" nameUno="password" typeUno="password" labelDos="Confirmar contraseña" nameDos="passwordConfirm" typeDos="password" />
                <FormInput label="Número de teléfono" name="telephone" type="telephone" />
                <span className="block">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/login" className="text-yellow-900">
                        Iniciar sesión
                    </Link>
                </span>
                <LoadingButton
                    loading={store.requestLoading}
                >
                    Registrarse
                </LoadingButton>
            </form>
        </FormProvider>
    );
}

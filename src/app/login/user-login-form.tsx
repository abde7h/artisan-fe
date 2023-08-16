"use client";

import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { apiLoginUser } from "@/lib/api-requests";
import FormInput from "../components/FormInput";
import Link from "next/link";
import { LoadingButton } from "../components/LoadingButton";
import useStore from "@/store";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getCookies, setCookie, deleteCookie } from 'cookies-next';

export default function UserLoginForm() {
    const store = useStore();
    const router = useRouter();

    const methods = useForm<LoginUserInput>({
        resolver: zodResolver(LoginUserSchema),
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

    useEffect(() => {
        store.reset();
    }, []);

    async function LoginUserFunction(credentials: LoginUserInput) {
        store.setRequestLoading(true);
        try {
            //await apiLoginUser(JSON.stringify(credentials));

            toast.success("Inicio de sesión con éxito!");
            // Crear cookie aquí
            setCookie("userLogged", JSON.stringify(credentials));
            return router.push("/");
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
            console.log("Error message:", error.message);
        } finally {
            store.setRequestLoading(false);
        }
    }

    const onSubmitHandler: SubmitHandler<LoginUserInput> = (values) => {
        LoginUserFunction(values);
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="max-w-md w-full h-fit self-center mx-auto overflow-hidden shadow-lg bg-secundario rounded-2xl p-8 space-y-5"
            >
                <FormInput label="Correo electrónico" name="email" type="email" />
                <FormInput label="Contraseña" name="password" type="password" />

                <div className="text-right">
                    <Link href="#" className="">
                        Has olvidado tu contraseña?
                    </Link>
                </div>
                <LoadingButton
                    loading={store.requestLoading}
                >
                    Iniciar sesión
                </LoadingButton>
                <span className="block">
                    ¿Necesitas una cuenta?{" "}
                    <Link href="/register" className="text-yellow-900">
                        Registrarse
                    </Link>
                </span>
            </form>
        </FormProvider>

    );
}

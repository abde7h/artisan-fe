import { getCurrentUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import Header from "../../app/components/Header";
import UserLoginForm from "./user-login-form";
import Image from 'next/image';
import { cookies } from "next/headers";

export default async function LoginPage() {

    if (cookies().get("userLogged")) redirect("/");

    return (
        <>
            {<Header />}
            <section className="min-h-screen grid place-items-center bg-[url('/gradiente-2.jpg')] bg-cover bg-center">
                <div className="w-full h-3/4 flex flex-row">
                    <div className="w-full max-w-md relative mx-auto flex rounded-2xl justify-center items-center">
                        <Image
                            src="/img-login.png"
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    <div className="flex items-center">
                        <div className="w-0.5 h-3/4 bg-black"></div>
                    </div>

                    <UserLoginForm />
                </div>
            </section>
        </>
    );
}

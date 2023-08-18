import { useRouter } from "next/navigation";
import Header from "../app/components/Header";
import UserLoginForm from "./login/user-login-form";
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import Link from "next/link";
import { useState } from "react";
import ArtisanLoginForm from "./login/artisan-login-form";

const LoginPage = () => {
    const router = useRouter();

    if (getCookie("userLogged")) router.push("/");

    const [isArtisan, setIsArtisan] = useState(false);

    const toggleActive = () => {
        setIsArtisan(!isArtisan);
    };

    return (
        <>
            <header className="h-20 w-full absolute">
                <nav className="h-full flex justify-between container items-center">
                    <div>
                        <Link href="/" className="text-primario text-4xl font-semibold">
                            Artisan
                        </Link>
                    </div>
                    <button onClick={toggleActive} className={"w-1/3 py-3 font-semibold rounded-2xl outline-none border-none flex justify-center text-white bg-primario"}>
                        {isArtisan ? "Usuario" : "Artesano"}
                    </button>
                </nav>
            </header>

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

                    {isArtisan ? (
                        <UserLoginForm />
                    ) : (
                        <ArtisanLoginForm />
                    )}

                </div>
            </section>
        </>
    );
}

export default LoginPage
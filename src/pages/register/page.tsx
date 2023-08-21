import Header from "../../app/components/Header";
import UserRegisterForm from "./user-register-form";
import Image from 'next/image';

export default async function RegisterPage() {
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 1000);
    // });
    return (
        <>
            {<Header />}
            <section className="min-h-screen grid place-items-center bg-[url('/gradiente-2.avif')] bg-cover bg-center">
                <div className="w-full h-3/4 flex flex-row">
                    <div className="w-full max-w-md relative mx-auto flex justify-center items-center">
                        <Image
                            src="/img-register.png"
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    <div className="flex items-center">
                        <div className="w-0.5 h-3/4 bg-black"></div>
                    </div>

                    <UserRegisterForm />
                </div>
            </section>
        </>
    );
}

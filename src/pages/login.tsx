import { useRouter } from "next/navigation";
import UserLoginForm from "../app/components/login/user-login-form";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useState } from "react";
import ArtisanLoginForm from "../app/components/login/artisan-login-form";
import Button from "@/app/components/Button";

const LoginPage = () => {
  const router = useRouter();

  if (getCookie("userLogged")) router.push("/");

  const [isArtisan, setIsArtisan] = useState(false);

  const toggleActive = () => {
    setIsArtisan(!isArtisan);
  };

  return (
    <>
      <div className="h-20 mb-20 w-full absolute flex justify-center items-center">
        <button
          onClick={toggleActive}
          className={
            "w-1/3 py-3 font-semibold rounded-2xl outline-none border-none flex justify-center text-white bg-primario"
          }
        >
          Tipo {isArtisan ? "Artesano" : "Usuario"}
        </button>
      </div>

      <section className="container ml-auto mr-auto min-h-screen grid place-items-center">
        <div className="w-full flex flex-row min-h-screen">
          <div className="w-full max-w-md max-h-[80vh] mt-20 relative mx-auto flex justify-center items-center rounded-2xl overflow-hidden">
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

          {isArtisan ? <ArtisanLoginForm /> : <UserLoginForm />}
        </div>
      </section>
    </>
  );
};

export default LoginPage;

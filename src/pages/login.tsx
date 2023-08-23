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
      <section className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full flex flex-row min-h-screen">
          <div className="w-full max-w-md max-h-[80vh] mt-20 relative mx-auto flex justify-center items-center rounded overflow-hidden relative">
            <Image
              src="/img-login.png"
              alt="Picture of the author"
              layout="fill"
              objectFit="cover"
            />
            <button className="absolute w-full top-0 left-1/2 transform -translate-x-1/2 bg-amber-900 hover:bg-amber-800 text-white px-4 py-2 rounded" onClick={toggleActive}>
              Tipo de usuario {isArtisan ? "Artesano" : "Normal"}
            </button>
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

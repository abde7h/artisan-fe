import { useState } from "react";
import Link from "next/link";
import { MdArrowDropDownCircle } from "react-icons/md";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { UserLoggedInterface } from "@/lib/types";

const UserMenuDropdown = () => {
  const userLoggedCookie: any = getCookie("userLogged");
  let userLoggedString: string | null = null;
  if (userLoggedCookie) userLoggedString = userLoggedCookie.toString();

  let userLogged: UserLoggedInterface | null = null;
  if (userLoggedString) userLogged = JSON.parse(userLoggedString);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div style={{ display: isMenuOpen ? "relative" : "inline-block" }}>
      <button
        onClick={toggleMenu}
        className="focus:outline-none flex items-center relative"
      >
        <img
          src="http://localhost:8080/images/Aritsan_Web/Logo_Artisan.jpg"
          style={{ width: 54, height: 60 }}
          alt="Logo Artisan"
        />

        <MdArrowDropDownCircle className="w-5 h-5 absolute bottom-0 right-0" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-4 mt-2 w-[18rem] bg-white border border-gray-200 rounded shadow-lg z-10 py-2 overflow-y-hidden">
          <Link
            href={`/${userLogged?.user.username}`}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={closeMenu}
          >
            Mi perfil
          </Link>
          <Link
            href="/logout"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={closeMenu}
          >
            Cerrar sesión
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenuDropdown;

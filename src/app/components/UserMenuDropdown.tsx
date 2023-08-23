import { useState } from "react";
import Link from "next/link";
import { MdArrowDropDownCircle } from "react-icons/md";
import Image from "next/image";
import {
  getCookie,
  setCookie,
  deleteCookie,
  CookieValueTypes,
} from "cookies-next";
import { useRouter } from "next/navigation";

const UserMenuDropdown = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const cerrarSession = () => {
    deleteCookie("userLogged")
    closeMenu();
    if (!getCookie("userLogged")) router.push("/login");
  }

  return (
    <div style={{ display: isMenuOpen ? "relative" : "inline-block" }}>
      <button
        onClick={toggleMenu}
        className="focus:outline-none flex items-center relative"
      >
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN7__X2x4sgwdH_mU6RZcEIMyu9i2ykytSWLxslCLSCw&s"
          width={60}
          height={60}
          alt="Perfil"
          className="rounded-full border border-gray-600"
        />
        <MdArrowDropDownCircle className="w-5 h-5 absolute bottom-0 right-0" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-4 mt-2 w-[18rem] bg-white border border-gray-200 rounded shadow-lg z-10 py-2 overflow-y-hidden">
          <Link
            href="/mi-perfil"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={closeMenu}
          >
            Mi perfil
          </Link>
          <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={cerrarSession}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default UserMenuDropdown;

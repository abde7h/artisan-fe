"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
import Buscador from "./Buscador";
import {
  BsChatText,
  BsChatTextFill,
  BsCloudArrowUp,
  BsIncognito,
} from "react-icons/bs";
import UserMenuDropdown from "./UserMenuDropdown";

interface Artisan {
  user_id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  surnames: string;
  telephone: string;
  description: string;
  image: string;
}

export default function Navbar() {
  const [artisan, setArtisan] = useState("");

  const handleSearch = () => {};
  return (
    <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
      <Link href="/">
        <BsIncognito className="w-20 h-8" />
        {/*<Image src="/" width={100} height={100} alt="Logo Artisan" />*/}
      </Link>
      <form className="w-[28rem]" onSubmit={handleSearch}>
        <Buscador
          artisan={artisan}
          setArtisan={setArtisan}
        />
      </form>
      <Link href="/create-product">
        <BsCloudArrowUp className="w-8 h-8" />
      </Link>
      {/*
        TO DO
        <Notificaciones />*/}
      <UserMenuDropdown />
    </nav>
  );
}

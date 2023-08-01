'use client'

import { useState, useEffect } from "react"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import Buscador from './Buscador'


export default function Navbar() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const getProfiles = async () => {
      const response = await fetch('/api/artisan');
      const profiles = await response.json();
      setProfiles(profiles.data.username);
    }

    getProfiles();
  }, []);


  return (
    <nav>
      <div>
        <Link href=''>
          <Image
            src='/'
            width={100}
            height={100}
            alt='Logo Artisan'
          />
        </Link>
        <Buscador  getSearchResults={(profiles) => setProfiles(profiles)}/>
        <Link href=''>
          <Image
            src='/'
            width={100}
            height={100}
            alt='Subir producto'
          />
        </Link>
        <Link href=''>
          <Image
            src='/'
            width={100}
            height={100}
            alt='Notificaciones'
          />
        </Link><Link href=''>
          <Image
            src='/chat'
            width={100}
            height={100}
            alt='Chats'
          />
        </Link><Link href=''>
          <Image
            src='/'
            width={100}
            height={100}
            alt='Perfil'
          />
        </Link>
        </div>
    </nav>
  );
};

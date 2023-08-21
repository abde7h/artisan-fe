import HomePage from '@/app/components/Homepage'
import React from 'react'
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { AuthPageInvisible } from '@/lib/protect-page';

const index = () => {
  const router = useRouter();

  // if (!getCookie("userLogged")) router.push("/login");

  return (
    <HomePage />
  )
}

export default index
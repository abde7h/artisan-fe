import HomePage from '@/app/components/Homepage'
import React from 'react'
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { AuthPageInvisible } from '@/lib/protect-page';
import Link from 'next/link';
import Button from '@/app/components/Button';

const index = () => {
  const router = useRouter();

  // if (!getCookie("userLogged")) router.push("/login");

  return (
    <div>
      <HomePage />
      
      <AuthPageInvisible />
    </div>
  )
}

export default index
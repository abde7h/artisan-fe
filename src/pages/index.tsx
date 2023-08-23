import HomePage from '@/app/components/Homepage'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import Button from '@/app/components/Button';
import { getUserLogged } from '@/lib/actions';

const index = () => {
  const router = useRouter();

  const userLogged = getUserLogged();
  
  useEffect(() => {
    if (!userLogged) router.push("/login");
  }, [])
  
  return (
    <div>
      <HomePage />
    </div>
  )
}

export default index
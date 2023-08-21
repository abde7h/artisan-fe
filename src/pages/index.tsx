import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { AuthPageInvisible } from '@/lib/protect-page';

const index = () => {
  const router = useRouter();

  // if (!getCookie("userLogged")) router.push("/login");

  return (
    <div>
      <h1>Artisan</h1>
      
      <AuthPageInvisible />
    </div>
  )
}

export default index
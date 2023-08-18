import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

const index = () => {
  const router = useRouter();

  // if (!getCookie("userLogged")) router.push("/login");

  return (
    <div>
      <h1>Artisan</h1>
    </div>
  )
}

export default index
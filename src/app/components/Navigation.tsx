import Link from 'next/link'
import styles from './Navigation.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import { getCurrentUser } from '@/lib/session'
import Button from './Button'
import AuthProviders from './AuthProviders'

const links = [
  {
    label: 'Home',
    route: '/'
  },
  {
    label: 'Login',
    route: '/login'
  },
  {
    label: 'Registro',
    route: '/register'
  },
  {
    label: 'Perfil',
    route: '/profile'
  }
]

const Navbar = async () => {
  //const { data: session } = useSession()
  const session = await getCurrentUser()

  console.log(session)
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navigation}>
          {links.map(({ label, route }) => (
            <li key={route}>
              <Link href={route}>{label}</Link>
            </li>
          ))}
        </ul> 
        {/*session ? <button onClick={() => signOut()}>Sign out</button> 
        : <button onClick={() => signIn()}>Sign in</button>*/}

        <div /*className='flexCenter gap-4'*/>
          {session?.user ? (
            <>
              {session?.user.name}

              <Link href="/create-product">
                <Button title='Crear Producto' textColor='text-black' />
              </Link>
            </>
          ) : (
            <AuthProviders />
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar;
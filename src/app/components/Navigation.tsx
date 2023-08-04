"use client"

import Link from 'next/link'
import styles from './Navigation.module.css'
import { useSession, signIn, signOut } from "next-auth/react"

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

export function Navigation() {
  const { data: session } = useSession()

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
        {session ? <button onClick={() => signOut()}>Sign out</button> 
        : <button onClick={() => signIn()}>Sign in</button>}
      </nav>
    </header>
  )
}

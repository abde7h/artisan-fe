import Link from 'next/link'
import styles from './Navigation.module.css'

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
      </nav>
    </header>
  )
}
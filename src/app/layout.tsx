import Navbar from './components/Navbar'
import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Artisan',
  description: 'Productos de artesanía hecho por artesanos verificados.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-ES">
      <Navbar />
      <main>{children}</main>
    </html>
  )
}

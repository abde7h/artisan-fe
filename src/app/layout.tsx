import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from './Provider'
import { Navigation } from './components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Artisan',
  description: '¿Y tu que haces con tu serrin?'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es-ES'>
      <body className={inter.className}>
        <Provider>
          <Navigation />
          {children}
        </Provider>
      </body>
    </html>
  )
}

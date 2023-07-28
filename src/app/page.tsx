'use client'

import { useEffect, useState } from 'react'

export default function HomePage () {
  /*interface User {
    username: string;
    email: string;
  }

  const person: User = {
    username: 'Diego AL',
    email: 'diego@example.com'
  }

  const [user, setUser] = useState<string>(
    localStorage.getItem('user') ?? ''
  )

  // Convertir el objeto User a una cadena JSON
  const personString: string = JSON.stringify(person)
  //setUser(personString)

  useEffect(() => {
    window.localStorage.setItem('user', personString ?? '')
  }, [user])

  const personUser: User = JSON.parse(personString)*/

  return (
    <h1>Pagina de Inicio</h1>
  )
}

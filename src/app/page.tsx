'use client'

import { useEffect, useState } from 'react'
import PostsList from "./components/PostsList"

export default function HomePage() {
  interface User {
    username: string;
    email: string;
  }

  const person: User = {
    username: 'Diego AL',
    email: 'diego@example.com'
  }

  /*const [user, setUser] = useState<string>(
    localStorage.getItem('user') ?? ""
  )

  const [isValidUser, setIsValidUser] = useState(false);

  // Convertir el objeto User a una cadena JSON
  const personString: string = JSON.stringify(person)
  //setUser(personString)

  useEffect(() => {
    window.localStorage.setItem('user', personString ?? '')
  }, [user])

  useEffect(() => {
    const userLS = localStorage.getItem("presupuesto") ?? ""

    if (userLS != "") {
      setIsValidUser(true)
    }
  }, [])

  const personUser: User = JSON.parse(personString)*/

  return (
    <>
      {/*isValidUser ? (
        <PostsList />
      ) : (
        <>
          <p>No eres un usuario válido.</p>
        </>
      )*/}
      <PostsList />
    </>
  )
}

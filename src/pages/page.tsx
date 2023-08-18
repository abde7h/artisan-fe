// 'use client'

// import { useEffect, useState } from 'react'
// import PostsList from "./components/PostsList"
// import { signOut } from 'next-auth/react';

// export default function HomePage() {
//   interface User {
//     username: string;
//     email: string;
//   }

//   const person: User = {
//     username: 'Diego AL',
//     email: 'diego@example.com'
//   }

//   /*const [user, setUser] = useState<string>(
//     localStorage.getItem('user') ?? ""
//   )

//   const [isValidUser, setIsValidUser] = useState(false);

//   // Convertir el objeto User a una cadena JSON
//   const personString: string = JSON.stringify(person)
//   //setUser(personString)

//   useEffect(() => {
//     window.localStorage.setItem('user', personString ?? '')
//   }, [user])

//   useEffect(() => {
//     const userLS = localStorage.getItem("presupuesto") ?? ""

//     if (userLS != "") {
//       setIsValidUser(true)
//     }
//   }, [])

//   const personUser: User = JSON.parse(personString)*/

//   return (
//     <>
//       {/*isValidUser ? (
//         <PostsList />
//       ) : (
//         <>
//           <p>No eres un usuario válido.</p>
//         </>
//       )*/}
//       <PostsList />
//       <button onClick={() => signOut()}>Sign out</button>
//     </>
//   )
// }

import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <p className="text-3xl font-semibold">
            Implement JWT Authentication in Next.js 13 App Directory
          </p>
        </div>
      </section>
    </>
  );
}
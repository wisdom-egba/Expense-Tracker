"use client"
import React from "react"
import { signIn, useSession, signOut } from "next-auth/react"
import Image from "next/image"
function NavBar() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return (
      <div className="bg-slate-900 w-full h-14">
        <div className="flex justify-between max-w-[90%] mx-auto py-4 h-14 ">
          <h1>Exp-Tkr</h1>
          <div className="flex items-center gap-2">
            <Image
              src={session.user.image}
              width={40}
              height={40}
              className=" rounded-full"
              alt=""
            />
            <button onClick={() => signOut("github")}>Sign out</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-slate-900 w-full h-14">
      <div className="flex justify-between max-w-[90%] mx-auto py-4 h-14 ">
        <h1>Exp-Tkr</h1>
        <div>
          <button onClick={() => signIn("google")}>Sign in</button>
        </div>
      </div>
    </div>
  )
}

export default NavBar

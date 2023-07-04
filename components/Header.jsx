import React from "react"
import { BsGithub, BsGoogle } from "react-icons/bs"
import { signIn } from "next-auth/react"
function Header() {
  return (
    <div className="flex  items-center justify-center h-screen flex-col gap-5 ">
      <h1>Login to get started</h1>
      <button
        onClick={() => signIn("github")}
        className="flex items-center justify-center py-2 px-3 gap-2 rounded-lg border outline-none hover:scale-105"
      >
        <BsGithub size={25} /> Continue with GitHub
      </button>
      or
      <div>
        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center py-2 px-3 gap-2 rounded-lg border outline-none hover:scale-105"
        >
          <BsGoogle size={25} />
          Continue with Google
        </button>
      </div>
    </div>
  )
}

export default Header

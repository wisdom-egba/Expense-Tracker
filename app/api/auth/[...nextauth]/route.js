import { authConfig } from "@/lib/auth"
import NextAuth from "next-auth/next"


const handlers = NextAuth(authConfig)

export { handlers as GET, handlers as POST }

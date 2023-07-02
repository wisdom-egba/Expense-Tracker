import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"

const handlers = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
})

export { handlers as GET, handlers as POST }

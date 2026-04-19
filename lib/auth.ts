import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET

export function isAuthConfigured() {
  return Boolean(githubId && githubSecret && process.env.NEXTAUTH_SECRET)
}

export const authOptions: NextAuthOptions = {
  providers: githubId && githubSecret
    ? [
        GitHubProvider({
          clientId: githubId,
          clientSecret: githubSecret,
        }),
      ]
    : [],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile && 'login' in profile) {
        token.login = String(profile.login)
      }

      return token
    },
    async session({ session, token }) {
      if (session.user && token.login) {
        ;(session.user as { login?: string }).login = String(token.login)
      }

      return session
    },
  },
}

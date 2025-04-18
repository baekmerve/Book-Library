
export const runtime = 'nodejs'

import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { User } from 'next-auth'
import { db } from './database/drizzle'
import { users } from './database/schema'
import { eq } from 'drizzle-orm'
import { compare } from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true, // Cookie can't be accessed via JavaScript
        secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production (HTTPS)
        sameSite: 'lax', // Safe for cross-site navigation
        maxAge: 7 * 24 * 60 * 60, // 1 week
        path: '/', // Cookie is valid for the entire domain
      },
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1)

        if (user.length === 0) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password
        )
        if (!isPasswordValid) return null

        return {
          id: user[0].id,
          name: user[0].fullName,
          email: user[0].email,
        } as User
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
      }
      return session
    },
  },
})

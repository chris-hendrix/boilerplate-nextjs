import NextAuth from 'next-auth'
import { User } from '@prisma/client'

declare module 'next-auth' {
  export interface Session extends NextAuth.Session {
    user: User | null
  }
}

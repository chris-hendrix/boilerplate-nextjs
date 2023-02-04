/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { PrismaClient, User } from '@prisma/client'
import NextAuth from 'next-auth'

declare global {
  var prisma: PrismaClient | null
}

declare module 'next-auth' {
  export interface Session extends NextAuth.Session {
    user: User | null
  }
}

/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { PrismaClient, User } from '@prisma/client'
import { SupabaseClient } from '@supabase/supabase-js'
import NextAuth from 'next-auth'

declare global {
  var prisma: PrismaClient | null
  var supabase: SupabaseClient | null
}

declare module 'next-auth' {
  export interface Session extends NextAuth.Session {
    user: User | null
  }
}

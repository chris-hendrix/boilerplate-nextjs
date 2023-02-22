import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export const getSessionUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json('Unauthorized')
    return null
  }
  return session?.user
}

export const userMatchesSession = async (
  userId: string | undefined,
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const [user, session] = await Promise.all([
    userId && await prisma.user.findUnique({ where: { id: userId } }),
    await getServerSession(req, res, authOptions)
  ])
  if (!user) {
    res.status(400).json('User does not exist')
    return false
  }
  if (session?.user?.id !== userId) {
    res.status(401).json('Unauthorized')
    return false
  }
  return true
}

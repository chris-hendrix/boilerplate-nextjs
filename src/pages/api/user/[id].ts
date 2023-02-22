import prisma from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { userMatchesSession } from '@/lib-server/session'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<User | string>
) {
  // check user and session
  const userId = req.query.id as string | undefined
  if (!userId) return res.status(400).json('Must provide user id')

  // GET user
  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return res.status(400).json('User does not exist')
    return res.status(200).json(user)
  }

  // PUT user
  if (req.method === 'PUT') {
    if (!await userMatchesSession(userId, req, res)) return res.status(405).json('Not authorized')
    if (!req.body) return res.status(400).json('No update args provided')
    const data = req.body as Prisma.UserUpdateArgs
    const updatedUser = await prisma.user.update({ where: { id: userId }, data })
    return res.status(204).json(updatedUser)
  }

  // DELETE user
  if (req.method === 'DELETE') {
    if (!await userMatchesSession(userId, req, res)) return res.status(405).json('Not authorized')
    const deletedUser = await prisma.user.delete({ where: { id: userId } })
    return res.status(204).json(deletedUser)
  }

  return res.status(400).json('Invalid request')
}

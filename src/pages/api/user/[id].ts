import prisma from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { userMatchesSession } from '@/lib/session'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<User | string>
) {
  // check user and session
  const userId = req.query.id as string | undefined
  if (!await userMatchesSession(userId, req, res)) return res

  // PUT user
  if (req.method === 'PUT') {
    if (!req.body) return res.status(400).json('No update args provided')
    const data = req.body as Prisma.UserUpdateArgs
    const updatedUser = await prisma.user.update({ where: { id: userId }, data })
    return res.status(204).json(updatedUser)
  }

  // DELETE user
  if (req.method === 'DELETE') {
    const deletedUser = await prisma.user.delete({ where: { id: userId } })
    return res.status(204).json(deletedUser)
  }

  return res.status(400).json('Invalid request')
}

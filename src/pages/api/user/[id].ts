import prisma from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiError, apiHandler, withUserMatchingSession } from '@/utils/api'

const handler = apiHandler(async (
  req: NextApiRequest,
  res: NextApiResponse<User | string>
) => {
  // check user and session
  const userId = req.query.id as string | undefined
  if (!userId) throw new ApiError('Must provide id', 400)

  // GET user
  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new ApiError('User does not exist', 400)
    return res.status(200).json(user)
  }

  // PUT user
  if (req.method === 'PUT') {
    await withUserMatchingSession(userId, req, res)
    if (!req.body) throw new ApiError('Must body', 400)
    const data = req.body as Prisma.UserUpdateArgs
    const updatedUser = await prisma.user.update({ where: { id: userId }, data })
    return res.status(204).json(updatedUser)
  }

  // DELETE user
  if (req.method === 'DELETE') {
    await withUserMatchingSession(userId, req, res)
    const deletedUser = await prisma.user.delete({ where: { id: userId } })
    return res.status(204).json(deletedUser)
  }

  throw new ApiError('Invalid request', 400)
})

export default handler

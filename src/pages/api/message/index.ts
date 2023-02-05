import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { MessageWithUser } from '@/types'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<MessageWithUser | MessageWithUser[] | string>
) {
  const session = await getServerSession(req, res, authOptions)
  let result = null

  if (req.method === 'POST') {
    if (!session) return res.status(400).json('Invalid request')
    const { content } = req.body
    result = await prisma.message.create({
      data: {
        content,
        user: { connect: { id: session?.user?.id } },
      },
      include: { user: true }
    })
  }

  if (req.method === 'GET') {
    result = await prisma.message.findMany({ include: { user: true } })
  }

  return res.status(result ? 200 : 400).json(result || 'invalid request')
}

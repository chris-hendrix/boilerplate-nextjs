import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { MessageWithUser } from '@/types'
import { getSessionUser } from '@/lib/session'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<MessageWithUser | MessageWithUser[] | string>
) {
  // GET messages
  if (req.method === 'GET') {
    const messages = await prisma.message.findMany({ include: { user: true } })
    return res.status(200).json(messages)
  }

  // POST message
  if (req.method === 'POST') {
    const user = await getSessionUser(req, res)
    if (!user) return res
    const { content } = req.body
    const message = await prisma.message.create({
      data: {
        content,
        user: { connect: { id: user?.id } },
      },
      include: { user: true }
    })
    return res.status(201).json(message)
  }

  return res.status(400).json('Invalid request')
}

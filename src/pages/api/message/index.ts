import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Message } from '@/types'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Message | Message[] | string>
) {
  let result = null
  if (req.method === 'POST') {
    const { content, user } = req.body
    result = await prisma.message.create({
      data: {
        content,
        user: { connect: { id: user.id } },
      },
      include: { user: true }
    })
  }

  if (req.method === 'GET') {
    result = await prisma.message.findMany({ include: { user: true } })
  }

  return res.status(result ? 200 : 400).json(result || 'invalid request')
}

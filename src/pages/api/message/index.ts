import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { MessageWithUser } from '@/types'
import { ApiError, apiHandler, withSessionUser } from '@/utils/api'

const handler = apiHandler(async (
  req: NextApiRequest,
  res: NextApiResponse<MessageWithUser | MessageWithUser[] | string>
) => {
  // GET messages
  if (req.method === 'GET') {
    const messages = await prisma.message.findMany({ include: { user: true } })
    return res.status(200).json(messages)
  }

  // POST message
  if (req.method === 'POST') {
    const user = await withSessionUser(req, res)
    if (!user) throw new ApiError('Unauthorized', 401)
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

  throw new ApiError('Invalid request', 400)
})

export default handler

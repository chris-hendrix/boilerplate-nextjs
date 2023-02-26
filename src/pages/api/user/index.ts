import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@prisma/client'
import { ApiError, apiHandler } from '@/utils/api'
import { generateHash } from '@/utils/hash'

const handler = apiHandler(async (
  req: NextApiRequest,
  res: NextApiResponse<User | User[] | string>
) => {
  // GET users
  if (req.method === 'GET') {
    const { skip, take } = req.query
    const users = await prisma.user.findMany({
      skip: skip && take ? Number(skip) : undefined,
      take: skip && take ? Number(take) : undefined,
    })
    return res.status(200).json(users)
  }
  // POST user
  if (req.method === 'POST') {
    const { email, password } = req.body
    if (await prisma.user.findUnique({ where: { email } })) {
      throw new ApiError('Email exists', 400)
    }
    const hash = await generateHash(password)
    const user = await prisma.user.create({ data: { email, password: hash } })
    return res.status(201).json(user)
  }

  throw new ApiError('Invalid request', 400)
})

export default handler

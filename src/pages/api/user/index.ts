import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { ApiError, apiHandler } from '@/utils/api'

const handler = apiHandler(async (
  req: NextApiRequest,
  res: NextApiResponse<User | User[] | string>
) => {
  let result = null
  if (req.method === 'POST') {
    const { email, password } = req.body
    if (await prisma.user.findUnique({ where: { email } })) {
      throw new ApiError('Email exists', 400)
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    result = await prisma.user.create({ data: { email, password: hash } })
  }

  return res.status(result ? 200 : 400).json(result || 'Invalid request')
})

export default handler

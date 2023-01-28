import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<User | User[] | string>
) {
  let result = null
  if (req.method === 'POST') {
    const { email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    result = await prisma.user.create({ data: { email, password: hash } })
  }

  return res.status(result ? 200 : 400).json(result || 'invalid request')
}

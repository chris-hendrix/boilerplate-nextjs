/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export class ApiError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

export const apiHandler = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method, url, body } = req
  console.info('---')
  method && console.info('Method: ', method)
  url && console.info('Path:   ', url)
  body && console.info('Body:   ', body)
  console.info('---')
  try {
    return handler(req, res)
  } catch (error: any) {
    const isProd = process.env.NODE_ENV === 'production'
    const response = {
      ...(!isProd && { stack: error.stack }),
      message: error.message,
      statusCode: error.statusCode,
    }
    console.info('Error:  ', error)
    console.info('---')
    return res.status(error.statusCode || 500).json(response)
  }
}

export const withSessionUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions)
  if (!session) throw new ApiError('Unauthorized', 401)
  return session?.user
}

export const withUserMatchingSession = async (
  userId: string | undefined,
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const [user, session] = await Promise.all([
    userId && await prisma.user.findUnique({ where: { id: userId } }),
    await getServerSession(req, res, authOptions)
  ])
  if (!user) throw new ApiError('User does not exist', 400)
  if (session?.user?.id !== userId) throw new ApiError('Unauthorized', 401)
}

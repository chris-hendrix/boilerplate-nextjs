import { Prisma } from '@prisma/client'

export type Message = Prisma.MessageGetPayload<{
  include: { user: true }
}>

export type ResponseError = { message: string, code: number }

import { Prisma } from '@prisma/client'

export type Message = Prisma.MessageGetPayload<{
  include: { user: true }
}>

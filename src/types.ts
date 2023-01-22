import { Prisma } from '@prisma/client'

export type MessageWithUser = Prisma.MessageGetPayload<{
  include: { user: true }
}>

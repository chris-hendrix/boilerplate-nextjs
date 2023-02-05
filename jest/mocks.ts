import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'

jest.mock('next-auth') // must be imported in test file as well

const createGetServerSessionMock = async () => {
  const user = await prisma.user.create({
    data: {
      name: `Patch Adams ${new Date().getTime()}`,
      email: `patch-adams-${new Date().getTime()}@email.com`,
    }
  })
  const mockGetServerSession = getServerSession as jest.Mock
  mockGetServerSession.mockReturnValueOnce({
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user
  })
  return user
}

export default createGetServerSessionMock

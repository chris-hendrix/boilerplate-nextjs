/* eslint-disable no-underscore-dangle */
import { createMocks } from 'node-mocks-http'
import prisma from '@/lib/prisma'
import handle from '@/pages/api/user/[id]'
import createGetServerSessionMock from './mocks'

jest.mock('next-auth')

describe('/api/user', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany()
    await prisma.message.deleteMany()
  })

  test('user can edit same user', async () => {
    const user = await createGetServerSessionMock()
    const body = { name: 'Put Adams' }
    const { req, res } = createMocks({ method: 'PUT', body })
    req.query = { id: user?.id }
    await handle(req, res)
    expect(res._getStatusCode()).toBe(204)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(body),
    )
  })

  test('user cannot edit different user', async () => {
    await createGetServerSessionMock()
    const body = { name: 'Put Adams' }
    const otherUser = await prisma.user.create({
      data: {
        name: 'Other Adams',
        email: `other-adams-${new Date().getTime()}@email.com`
      }
    })
    const { req, res } = createMocks({ method: 'PUT', body })
    req.query = { id: otherUser.id }
    await handle(req, res)
    expect(res._getStatusCode()).toBe(405)
  })

  test('cannot edit user while signed out', async () => {
    const body = { name: 'Put Adams' }
    const otherUser = await prisma.user.create({
      data: {
        name: 'Other Adams',
        email: `other-adams-${new Date().getTime()}@email.com`
      }
    })
    const { req, res } = createMocks({ method: 'PUT', body })
    req.query = { id: otherUser.id }
    await handle(req, res)
    expect(res._getStatusCode()).toBe(405)
  })
})

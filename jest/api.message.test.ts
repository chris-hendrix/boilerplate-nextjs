/* eslint-disable no-underscore-dangle */
import { createMocks } from 'node-mocks-http'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import handle from '@/pages/api/message'
import createGetServerSessionMock from './mocks'

jest.mock('next-auth')

describe('/api/message', () => {
  let user: Partial<User> | null = null
  beforeAll(async () => {
    await prisma.user.deleteMany()
    await prisma.message.deleteMany()
    user = await createGetServerSessionMock()
  })

  test('create message', async () => {
    const content = `${user?.name} says hello world!`
    const { req, res } = createMocks({ method: 'POST', body: { content } })
    await handle(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ content }),
    )
  })

  test('get messages', async () => {
    const { req, res } = createMocks({ method: 'GET' })
    await handle(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData()).length).toEqual(1)
  })
})

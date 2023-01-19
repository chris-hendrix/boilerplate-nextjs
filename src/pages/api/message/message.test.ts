/* eslint-disable no-underscore-dangle */
import { createMocks } from 'node-mocks-http'
import prisma from '@/lib/prisma'
import handle from '.'

describe('/api/message', () => {
  test('create message', async () => {
    const userData = { name: 'tester', email: 'tester@email.com' }
    const user = await prisma.user.findUnique({ where: { email: userData.email } })
      || await prisma.user.create({ data: userData })

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        content: 'helloworld',
        user
      },
    })
    await handle(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        content: 'helloworld',
      }),
    )
  })

  test('get messages', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handle(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData()).length()).toEqual(1)
  })
})

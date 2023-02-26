/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { uniqueNamesGenerator, Config, names, animals } from 'unique-names-generator'
import { User, PrismaClient } from '@prisma/client'
import { generateHash } from '../src/utils/hash'

const prisma = new PrismaClient()

const generateUser = async () => {
  const config: Config = { dictionaries: [names] }
  const firstName = uniqueNamesGenerator(config)
  const lastName = uniqueNamesGenerator(config)

  const user = await prisma.user.create({
    data: {
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}-${lastName.toLowerCase()}@seed.com`,
      password: await generateHash('Abc1234!')
    }
  })
  return user
}

const generateMessages = async (user: User, messageCount: number) => {
  const generateMessage = async () => {
    const config: Config = { dictionaries: [animals] }
    return prisma.message.create({
      data: {
        content: `My favorite animal is a ${uniqueNamesGenerator(config)}`,
        user: { connect: { id: user?.id } },
      },
      include: { user: true }
    })
  }

  const messages = await Promise.all([...Array(messageCount)].map(() => generateMessage()))
  return messages
}

const generateSeedData = async (userCount = 20, messageCountPerUser = 2) => {
  const users = await Promise.all([...Array(userCount)].map(() => generateUser()))
  const messages = await Promise.all(
    users.map((user) => generateMessages(user, messageCountPerUser))
  )
  return { users, messages }
}

generateSeedData()
  .then(async ({ users, messages }) => {
    console.log({ users, messages })
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

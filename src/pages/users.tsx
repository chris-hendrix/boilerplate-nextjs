import { GetStaticProps } from 'next'
import { User } from '@prisma/client'
import prisma from '@/lib/prisma'
import Layout from '@/components/Layout'

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany()
  return {
    props: { users: JSON.parse(JSON.stringify(users)) },
    revalidate: 10,
  }
}

type Props = {
  users: User[]
}
const UsersPage: React.FC<Props> = ({ users }) => (
  <Layout>
    {users.map((user) => user.email)}
  </Layout>
)

export default UsersPage

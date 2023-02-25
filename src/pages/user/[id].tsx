import { GetStaticProps, GetStaticPaths } from 'next'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import Layout from '@/layouts/Layout'
import UserProfile from '@/components/UserProfile'

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id as string
  const user = await prisma.user.findUnique({ where: { id: id || '' } })
  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
    revalidate: 10
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany()
  const paths = users.map((user) => ({ params: { id: user.id } }))
  return { paths, fallback: false } // { fallback: false } means other routes should 404.
}

type Props = {
  user: Partial<User>
}

const UserPage: React.FC<Props> = ({ user }) => (
  <Layout>
    {user?.id && <UserProfile userId={user.id} />}
  </Layout>
)

export default UserPage

import { GetServerSideProps } from 'next'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import Layout from '@/layouts/Layout'
import UserProfile from '@/components/UserProfile'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id as string
  const user = await prisma.user.findUnique({ where: { id: id || '' } })
  return { props: { user: JSON.parse(JSON.stringify(user)) } }
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

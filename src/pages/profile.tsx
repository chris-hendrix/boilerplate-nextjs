import Layout from '@/layouts/Layout'
import { useGetSessionQuery } from '@/store'
import UserProfile from '@/components/UserProfile'

const ProfilePage: React.FC = () => {
  const { data: session, isLoading } = useGetSessionQuery()
  if (isLoading) return null
  if (!session?.user) return null
  return (
    <Layout display="flex" justifyContent="center" width="100%">
      <UserProfile userId={session.user.id} />
    </Layout>
  )
}

export default ProfilePage

import { useSession } from 'next-auth/react'
import Layout from '@/layouts/Layout'
import UserProfile from '@/components/UserProfile'

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession()
  if (status === 'loading') return null
  if (!session?.user) return null
  return (
    <Layout>
      <UserProfile user={session.user} />
    </Layout>
  )
}

export default ProfilePage

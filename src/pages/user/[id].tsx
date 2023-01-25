import { GetServerSideProps } from 'next'
import Router from 'next/router'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { Box, Button, Typography } from '@mui/material'
import Layout from '@/components/Layout'
import UserAvatar from '@/components/UserAvatar'

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
    <Box display="flex" alignItems="center" mb={2}>
      <UserAvatar user={user} sx={{ mr: 3 }} />
      <Typography variant="h3">{user.name}</Typography>
    </Box>
    <Typography>{`email: ${user.email}`}</Typography>
    <Typography>{`joined: ${user.createdAt}`}</Typography>
    <Typography>{`admin: ${user.admin}`}</Typography>
    <Button
      onClick={() => Router.push('/users')}
      variant="contained"
      sx={{ mt: 2 }}
    >
      Back
    </Button>
  </Layout>

)

export default UserPage

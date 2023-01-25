import { GetStaticProps } from 'next'
import Router from 'next/router'
import { User } from '@prisma/client'
import { Card, CardActionArea, Stack, Typography } from '@mui/material'
import prisma from '@/lib/prisma'
import Layout from '@/components/Layout'
import UserAvatar from '@/components/UserAvatar'

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
  <Layout display="flex" justifyContent="center">
    <Stack width="100%" spacing={2}>
      {users.map((user) => (
        <Card key={user.id} >
          <CardActionArea
            onClick={() => Router.push(`user/${user.id}`)}
            sx={{ p: 3, display: 'flex', justifyContent: 'flex-start' }}
          >
            <UserAvatar user={user} sx={{ mr: 2 }} />
            <Typography variant="h6">{user.name}</Typography>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  </Layout>
)

export default UsersPage

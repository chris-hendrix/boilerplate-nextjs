import { useState } from 'react'
import { GetStaticProps } from 'next'
import Router from 'next/router'
import { User } from '@prisma/client'
import { Button, Card, CardActionArea, Stack, Typography } from '@mui/material'
import prisma from '@/lib/prisma'
import { useGetSessionQuery, useGetUsersQuery } from '@/store'
import Layout from '@/layouts/Layout'
import UserAvatar from '@/components/UserAvatar'
import SnackbarAlert from '@/components/SnackbarAlert'

const PAGE_SIZE = 5

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({
    skip: 0,
    take: PAGE_SIZE
  })
  return {
    props: { initialUsers: JSON.parse(JSON.stringify(users)) },
    revalidate: 10
  }
}

type Props = {
  initialUsers: User[]
}
const UsersPage: React.FC<Props> = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers)
  const { data: session } = useGetSessionQuery()
  const { refetch, isError } = useGetUsersQuery({
    skip: users.length,
    take: PAGE_SIZE,
  })

  const loadMoreUsers = async () => {
    const { data } = await refetch()
    setUsers([...users, ...(data || [])])
  }

  return (
    <Layout display="flex" justifyContent="center">
      {isError && <SnackbarAlert content="Error loading more" />}
      <Stack width="100%" spacing={2}>
        {users.map((user) => (
          <Card key={user.id} >
            <CardActionArea
              onClick={() => (user.id === session?.user?.id
                ? Router.push('/profile')
                : Router.push(`user/${user.id}`))
              }
              sx={{ p: 3, display: 'flex', justifyContent: 'flex-start' }}
            >
              <UserAvatar userId={user.id} sx={{ mr: 2 }} />
              <Typography variant="h6">{user.name}</Typography>
            </CardActionArea>
          </Card>
        ))}
        <Button onClick={() => loadMoreUsers()}>Load more</Button>
      </Stack>
    </Layout>
  )
}

export default UsersPage

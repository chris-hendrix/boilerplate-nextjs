import Router from 'next/router'
import { User } from '@prisma/client'
import { Box, Button, Typography } from '@mui/material'
import UserAvatar from '@/components/UserAvatar'

type Props = {
  user: Partial<User>,
  [x: string]: unknown
}

const UserProfile: React.FC<Props> = ({ user, ...rest }) => (
  <Box {...rest}>
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
  </Box>
)

export default UserProfile

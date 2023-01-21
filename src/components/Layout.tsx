import { ReactNode } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import UserAvatar from './UserAvatar'

type Props = {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { data: session, status } = useSession()

  const renderSessionButtons = () => {
    if (status === 'loading') return null
    if (!session?.user) return <Button href="/api/auth/signin" color="inherit">Login</Button>

    return (
      <>
        <IconButton>
          <UserAvatar user={session?.user} />
        </IconButton>
        <Button onClick={() => signOut()} color="inherit">Logout</Button>
      </>

    )
  }
  return (
  <Box height="99vh" display="flex" flexDirection="column">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Next.js Boilerplate
        </Typography>
          {renderSessionButtons()}
      </Toolbar>
    </AppBar>
    <Box className="content" display="flex" height="100%" flex={1} p={6} >
      {children}
    </Box>
  </Box>
  )
}

export default Layout

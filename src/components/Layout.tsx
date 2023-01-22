import { ReactNode, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { AppBar, Box, Button, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { ChatBubble, ChevronRight } from '@mui/icons-material'
import UserAvatar from './UserAvatar'
import Messages from './Messages'

const barOpenWidth = 400
const barClosedWidth = 40
const appBarHeight = 32

type Props = {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(true)
  const barWidth = open ? barOpenWidth : barClosedWidth

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
    <Box height="100%" display="flex" flexDirection="column">
      <AppBar position="static" >
        <Toolbar sx={{ height: appBarHeight }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Next.js Boilerplate
          </Typography>
          {renderSessionButtons()}
        </Toolbar>
      </AppBar>
      <Box display="flex" height="100%" flex="1 1 1">
        <Box
          className="content"
          display="flex"
          width={`calc(100% - ${barWidth}px)`}
          flex={1}
          p={6}
        >
          {children}
        </Box>
        <Paper sx={{
          display: 'flex',
          width: barWidth,
          flexDirection: 'column',
          p: 2,
          mt: 1
        }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={open ? 'flex-start' : 'center'}
            mb={1}
          >
            {open && <ChatBubble />}
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <ChevronRight /> : <ChatBubble />}
            </IconButton>
          </Box>
          {<Messages iconsOnly={!open} height="100%" />}
        </Paper>
      </Box>
    </Box>
  )
}

export default Layout

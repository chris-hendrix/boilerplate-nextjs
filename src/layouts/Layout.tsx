import { ReactNode, useContext } from 'react'
import { useRouter } from 'next/router'
import { signIn, signOut } from 'next-auth/react'
import { AppBar, Box, IconButton, MenuItem, Paper, Toolbar, Typography } from '@mui/material'
import { ChatBubble, ChevronRight } from '@mui/icons-material'
import { useGetSessionQuery } from '@/store'
import { LayoutContext } from './LayoutContext'
import UserAvatar from '../components/UserAvatar'
import Messages from '../components/Messages'

const barOpenWidth = 400
const barClosedWidth = 40
const appBarHeight = 32

export const PAGES: Array<{ name: string, route: string }> = [
  { route: '/', name: 'Home' },
  { route: '/users', name: 'Users' }
]

type Props = {
  children: ReactNode,
  [x: string]: unknown
}

const Layout: React.FC<Props> = ({ children, ...rest }) => {
  const { data: session, isLoading } = useGetSessionQuery()
  const { chatOpen, setChatOpen } = useContext(LayoutContext)
  const barWidth = chatOpen ? barOpenWidth : barClosedWidth
  const router = useRouter()
  const pages = PAGES.filter((p) => p.route !== '/')
  const currentPage = pages.find((page) => page.route === router.route)

  const renderMenuItems = () => {
    if (isLoading) return null
    if (!session?.user) {
      return (
        <>
          <MenuItem
            className="signUpMenuButton"
            onClick={() => router.push('/signup')}
            sx={{ bgcolor: 'secondary.main' }}
          >
            Sign up
          </MenuItem>
          <MenuItem
            className="loginMenuButton"
            onClick={() => signIn()}
          >
            Login
          </MenuItem>
        </>
      )
    }

    return (
      <>
        <IconButton onClick={() => router.push('/profile')}>
          <UserAvatar userId={session?.user?.id} />
        </IconButton>
        <MenuItem className="logoutMenuButton" onClick={() => signOut()} color="inherit">Logout</MenuItem>
      </>

    )
  }

  return (
    <Box height={`calc(100vh - 3px - ${appBarHeight}px)`} display="flex" flexDirection="column" component="main">
      <AppBar position="static" >
        <Toolbar sx={{ height: appBarHeight, alignContent: 'center' }}>
          <Box display="flex" flexGrow={1} sx={{ '& .Mui-selected': { fontWeight: 600 } }}>
            <MenuItem onClick={() => router.push('/')}>
              <Typography variant="h6">
                Next.js Boilerplate
              </Typography>
            </MenuItem>
            {pages.map((page) => (
              <MenuItem
                key={page.route}
                onClick={() => router.push(page.route)}
                selected={currentPage?.route === page.route}>
                {page.name}
              </MenuItem>
            ))}
          </Box>
          {renderMenuItems()}
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
          <Box width="100%" {...rest}>
            {children}
          </Box>
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
            justifyContent={chatOpen ? 'flex-start' : 'center'}
            mb={1}
          >
            {chatOpen && <ChatBubble />}
            <IconButton onClick={() => setChatOpen(!chatOpen)}>
              {chatOpen ? <ChevronRight /> : <ChatBubble />}
            </IconButton>
          </Box>
          {<Messages iconsOnly={!chatOpen} height="100%" />}
        </Paper>
      </Box>
    </Box>
  )
}

export default Layout

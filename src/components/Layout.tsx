import { ReactNode } from 'react'
import { AppBar, Button, Box, Toolbar, Typography } from '@mui/material'

type Props = {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
  <Box>
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Blog
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    <Box
      className="App"
      typography="body1"
      sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}
    >
      {children}
    </Box>
  </Box>
)

export default Layout

import { ReactNode } from 'react'
import { AppBar, Button, Box, Toolbar, Typography } from '@mui/material'

type Props = {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
  <Box height="99vh" display="flex" flexDirection="column">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Message Board
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    <Box className="content" display="flex" height="100%" flex={1} p={6} >
      {children}
    </Box>
  </Box>
)

export default Layout

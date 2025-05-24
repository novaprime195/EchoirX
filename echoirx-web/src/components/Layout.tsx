import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Navigation from './Navigation'

function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flex: 1, p: 3 }}>
        <Outlet />
      </Box>
      <Navigation />
    </Box>
  )
}

export default Layout
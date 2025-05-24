import { useLocation, useNavigate } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'

function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={location.pathname}
        onChange={(_, newValue) => {
          navigate(newValue)
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Search"
          value="/search"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Settings"
          value="/settings"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </Paper>
  )
}

export default Navigation
import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link, useLocation } from 'react-router-dom'


const drawerWidth = 240
const navItems = ['Home', 'About', 'Contact']

function DrawerAppBar(props) {
  const { window, children } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2, color: '#4CAF50' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            style={{ height: 70, width: 55 }}
            src='https://i.imgur.com/SE8uswq.png'
            alt='logox'
          />
          <Typography variant="h6" sx={{ fontSize: 15, color: '#4CAF50' }}>SINDHULI BAZAR</Typography>
        </div>
      </Typography>
      <Divider />
      
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item}
            disablePadding
            sx={{
              textAlign: 'center',
              backgroundColor: location.pathname === `/${item.toLowerCase()}` ? '#4CAF50' : 'inherit',
              color: location.pathname === `/${item.toLowerCase()}` ? '#fff' : 'inherit',
            }}
          >
            <ListItemButton>
              <Link to={`/${item.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemText primary={item} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component='nav' sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to='/' style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  style={{ height: 80, width: 60, padding: 5 }}
                  src='https://i.imgur.com/SE8uswq.png'
                  alt='logox'
                />
                <Typography variant="h6" sx={{ fontFamily: 'Arial', fontWeight: 'bold', color: 'white', fontSize: 25 }}>
                  SINDHULI BAZAR
                </Typography>
              </div>
            </Link>
          </Typography>
          <List sx={{ display: 'flex', flexDirection: 'row', padding: 1.5 }}>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: 'center', color: 'white', '&:hover': { backgroundColor: '#4CAF50' } }}>
                  <Link to={`/${item.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemText primary={item} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#333',
              color: '#fff',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Box sx={{ flexGrow: 1, p: 3, mt: 3 }}>{children}</Box>
    </Box>
  )
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node,
}

export default DrawerAppBar

import '../App.css'
import {colorModeButton} from '../styles'
import { 
  Box,
  AppBar, 
  Button,
  Toolbar, 
} from '@mui/material'
import { useState } from 'react'
import userStore from './userStore'
import SlideMenu from './SlideMenu';
import sunIcon from '../assets/sun.png'
import mooIcon from '../assets/moon.png'
import { menuButton } from '../styles'
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { switchTheme } from '../functions/functions';
import horizontalLogo from '../assets/horizontal-logo.png'
import SingleNoteButtonGroup from './SingleNoteButtonGroup';


const NavBar = () => {
  
  const navigate = useNavigate()
  const {setSlideMenuOpen} = userStore()
  const path = location.pathname.split('/')[1]
  const savedColorMode = window.localStorage.getItem('lightColorMode')

  return(
    <Box>
      <SlideMenu/>
        <AppBar 
          position='sticky' 
          sx={{bgcolor:'background.default', color:'text.primary'}}
        >
          <Toolbar sx={{m:'-5px 0 -5px 0'}}>
            <Button {...menuButton}>
              <MenuIcon onClick={()=>setSlideMenuOpen(true)}/>
            </Button>
            <Button>
              <img 
                src={horizontalLogo} 
                className="horizontalLogo"
                onClick={()=>navigate('/')}
              />
            </Button>
            {!window.navigator.onLine && <p>(Offline)</p>}
            <Button {...colorModeButton} >
              <img 
                width={'15px'}
                onClick={()=>switchTheme(savedColorMode)}
                src={savedColorMode==="true"?mooIcon:sunIcon} 
              />
            </Button>
          </Toolbar>
          {path==='note' && <SingleNoteButtonGroup/>}
        </AppBar>
    </Box>
  )
}

export default NavBar
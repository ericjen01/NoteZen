import '../App.css'
import {colorModeButton} from '../styles'
import { 
  AppBar, 
  Button,
  Toolbar, 
} from '@mui/material'
import { useState } from 'react'
import SlideMenu from './SlideMenu';
import sunIcon from '../assets/sun.png'
import mooIcon from '../assets/moon.png'
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { switchHandler } from '../functions/functions';
import horizontalLogo from '../assets/horizontal-logo.png'
import SingleNoteButtonGroup from './SingleNoteButtonGroup';


const NavBar = () => {
  
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const path = location.pathname.split('/')[1]
  const toggleDrawer = (newOpen) => () => {setOpen(newOpen);}
  const savedColorMode = window.localStorage.getItem('lightColorMode')

  return(
    <>
      <SlideMenu open={open} toggleDrawer={toggleDrawer}/>
        <AppBar 
          position='sticky' 
          sx={{bgcolor:'background.default', color:'text.primary'}}
        >
          <Toolbar sx={{m:'-5px 0 -5px 0'}}>
            <MenuIcon onClick={toggleDrawer(true)}/>
            <Button>
              <img 
                src={horizontalLogo} 
                className="horizontalLogo"
                onClick={()=>navigate('/')}
              />
            </Button>
            <Button {...colorModeButton} >
              <img 
                width={'15px'}
                onClick={()=>switchHandler(savedColorMode)}
                src={savedColorMode==="true"?mooIcon:sunIcon} 
              />
            </Button>
          </Toolbar>
          {path==='note' && <SingleNoteButtonGroup/>}
        </AppBar>
    </>
  )
}

export default NavBar
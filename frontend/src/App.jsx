import './App.css'
import { useState } from 'react';
import { Box } from '@mui/material';
import Notes from './components/Notes';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import SlideMenu from './components/SlideMenu';
import { Routes, Route} from 'react-router-dom' 
import NewNoteForm from './components/NewNoteForm';
import SingleNotePage from './components/SingleNotePage'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const App = () => {

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {setOpen(newOpen);}
  const lightColorMode = window.localStorage.getItem('lightColorMode')

  const getColorTheme = () => {
    if(lightColorMode === 'true') {
      return createTheme({palette: {mode: 'light',},});
    }else{
      return createTheme({palette: {mode: 'dark',},});
    }
  }

  return (
    <Box>
      <ThemeProvider theme={getColorTheme} >
        <SlideMenu open={open} toggleDrawer={toggleDrawer}/>
        <NavBar />
        <Routes>
          <Route path='/' element={<Notes/>} />
          <Route path='/api/notes' element={<Notes/>} />
          <Route path='/create' element={<NewNoteForm/>} />
          <Route path='/note/:id' element={<SingleNotePage/>} />
        </Routes>
        <Footer/>
      </ThemeProvider>
    </Box>
  )
}

export default App


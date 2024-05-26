import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DrawerList from './components/DrawerList '
import Notes from './components/Notes';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Footer from './components/Footer'
import userStore from './components/userStore';
import './App.css'

import { 
  AppBar, 
  Toolbar, 
} from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

    const [open, setOpen] = useState(false);
    const {setSearchTerms} = userStore()
  
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);}

 // const booksQry = useQuery(ALL_BOOKS)
  //const authorsQry = useQuery(ALL_AUTHORS)

  //if(authorsQry.loading || booksQry.loading) return console.log('loading...')
/*
  const notify = (input) => {
    setMsg(input)
    setTimeout(() => {
      setMsg('')
    }, 4000);
  }*/

  return (
    <>
      <ThemeProvider theme={darkTheme} >
      <DrawerList open={open} toggleDrawer={toggleDrawer}/>
        <AppBar position='sticky' >
          <Toolbar>
            <MenuIcon onClick={toggleDrawer(true)}/>
            <p className ='myNotes'>MyNotes</p>
            <input
              size='14'
              className='quickSearch'
              placeholder='Search by Keywords'
              onChange={({target})=>{setSearchTerms(target.value.toLowerCase().split(' '))}}
            />
            <SearchIcon fontSize='small' sx={{ml:'10px'}}/>
          </Toolbar>
        </AppBar>
        <Notes/>
        <Footer/>
      {/*
        <Notify msg={msg} /> 
        <Routes>
          <Route path='/' element={<Authors setNoti={notify}/>} />
          <Route path='/login' element={<Login setNoti={notify}/>} />
          <Route path='/books' element={<Books/>} />
          <Route path='/addbook' element={<AddBook setNoti={notify}/>} />
          <Route path='/search' element={<Author setNoti={notify}/>} />
        </Routes>
        <Footer sx={{ mt: 8, mb: 4 }} />
        */}

      
      </ThemeProvider>
      


    </>
  )
}

export default App

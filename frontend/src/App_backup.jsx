import './App.css'
import { Box } from '@mui/material';
import Notes from './components/Notes';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';
import SlideMenu from './components/SlideMenu';
import userStore from './components/userStore';
import LoginForm from './components/LoginForm';
import userStore from './components/userStore';
import { Routes, Route} from 'react-router-dom' 
import loginService from './services/loginService';
import notesService from './services/notesService';
import NewNoteForm from './components/NewNoteForm';
import SingleNotePage from './components/SingleNotePage'

const App = () => {

  const {username, setUsername, password, setPassword} = userStore
  //const [username, setusername] = useState('')
  //const [password, setPassword] = useState('')
  const [messageObj, setMessageObj] = useState(null)

  const {user, setUser} = userStore
  const {notes, setNotes} = userStore
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {setOpen(newOpen);}

  useEffect(() => {
    const savedUser = window.localStorage.getItem('savedUser') 

    if(savedUser){
      console.log('savedUser: ', savedUser)
      setUser(JSON.parse(savedUser))
      notesService.setToken(user.token)
      notesService.getAll().then(res => setNotes(res))
    }
  },[])

  const handleMessage = (message, type) => {
    setMessageObj({ message, type })
    setTimeout(() => { setMessageObj() }, 2000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedinBlogUser', JSON.stringify(user))
      notesService.setToken(user.token)

      const noteList = notes.sort((a, b) => b.likes - a.likes)

      setNotes(noteList)
      setUser(user)
      setusername('')
      setPassword('')
      handleMessage('login successful.', 'success')
    }
    catch (ex) {
      handleMessage('wrong credentials', 'error')
    }
  }

  return (
    <Box>
      <SlideMenu open={open} toggleDrawer={toggleDrawer}/>
      <NavBar />
      <Routes>
        <Route path='/' element={<Notes/>} />
        <Route path='/api/notes' element={<Notes/>} />
        <Route path='/create' element={<NewNoteForm/>} />
        <Route path='/note/:id' element={<SingleNotePage/>} />
      </Routes>
      {!user && <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        updateUsername={({ target }) => setusername(target.value)}
        updatePassword={({ target }) => setPassword(target.value)} />
      }
      <Footer/>
    </Box>
  )
}

export default App


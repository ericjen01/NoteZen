import './App.css'
import { useEffect } from 'react';
import { Box } from '@mui/material';
import Notes from './components/Notes';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import SlideMenu from './components/SlideMenu';
import LoginForm from './components/LoginForm';
import userStore from './components/userStore';
import { Routes, Route} from 'react-router-dom' 
import notesService from './services/notesService';
import NewNoteForm from './components/NewNoteForm';
import PrivateRoute from './components/PrivateRoute';
import SingleNotePage from './components/SingleNotePage'
import loginService from './services/loginService';

const App = () => {

  const {
    user, 
    users,
    notes, 
    setUser, 
    setUsers,
    setNotes, 
  } = userStore()


  useEffect( () => {
    const savedUser = window.localStorage.getItem('savedUser') 
    const savedNotes = window.localStorage.getItem('savedNotes')
    const isOnline = window.navigator.onLine

    if (isOnline) {
      notesService.getAll()
      loginService.getUsers().then(res => { 
        setUsers(res)
        console.log('users: ', users)
      })

      window.localStorage.setItem('savedNotes', notes)
    }else{
      setUsers([])
      if(savedNotes){setNotes(savedNotes)}
      else{setNotes([])}
    }

    if(savedUser){
      console.log('savedUser: ', savedUser)
      setUser(JSON.parse(savedUser))
      notesService.setToken(user.token)
      notesService.getAll().then(res => setNotes(res))
    }
  },[])

  console.log('users 2:' , users)
  return (
    <Box>
      <SlideMenu/>
      <NavBar/>
      <Routes>
        <Route path='/' element={<PrivateRoute><Notes/></PrivateRoute>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/api/notes' element={<PrivateRoute><Notes/></PrivateRoute>} />
        <Route path='/create' element={<NewNoteForm/>} />
        <Route path='/note/:id' element={<SingleNotePage/>} />
      </Routes>
      <Footer/>
    </Box>
  )
}

export default App


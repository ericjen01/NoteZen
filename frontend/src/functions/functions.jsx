
import userStore from '../components/userStore';
import loginService from '../services/loginService';
import notesService from '../services/notesService';
const {
  notes, 
  setNotes, 
  username, 
  password, 
  messageObj, 
  setPassword, 
  setUsername, 
  setMessageObj 
} = userStore


export const refreshPage = () => {
  window.location.reload();
}

export const handleLogin = async (e) => {
  e.preventDefault()
  try {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedinBlogUser', JSON.stringify(user))
    notesService.setToken(user.token)

    const noteList = notes.sort((a, b) => b.likes - a.likes)

    setNotes(noteList)
   // setUser(user)
    setUsername('')
    setPassword('')
    handleMessage('login successful.', 'success')
  }
  catch (ex) {
    handleMessage('wrong credentials', 'error')
  }
}

export const handleMessage = (message, type) => {
  setMessageObj({ message, type })
  setTimeout(() => { setMessageObj() }, 2000)
}

export const switchTheme = (savedColorMode) =>{
  if(savedColorMode === 'undefined' ){
    localStorage.setItem('lightColorMode', true)
  }else if(savedColorMode === 'true'){
    localStorage.setItem('lightColorMode', false)
  }else{
    localStorage.setItem('lightColorMode', true)
  }
  refreshPage()
}

export const highlightMatch = (searchTerms, text) => {  
  searchTerms.map(searchTerm =>{
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('\\b' + escapedTerm + '\\b', 'gi');
    if (searchTerm !== '') {
      text = text.replace(
        regex, m => '<mark style="background-color: yellow;">' + m + '</mark>'
      );
    }
  })
  return ( text )
}

export const showDate = (noteObj, labelIdx) => {
  const today = new Date()
  const oneDay = 24 * 60 * 60 * 1000
  const editedDate = new Date(noteObj.edited)
  const createdDate = new Date(noteObj.created)
  
  if (labelIdx === 3){
    const dayCount = Math.round(Math.abs((today - editedDate)/oneDay))
    if(dayCount < 8) {
      return (`Edited ${dayCount} days ago`)
    } else return (`Edited on ${noteObj.edited}`) 
  }else{
    const dayCount = Math.round(Math.abs((today - createdDate)/oneDay))
    if(dayCount < 8) {
      return (`Created ${dayCount} days ago`)
    } else return (`Created on ${noteObj.created}`) 
  }
}

export const quickFilter = (terms, inputNotes) => {
  if ("" === terms || terms.length <1) return inputNotes;
  terms = terms.map(val => val.replace(/"/g, ""));
  const filteredNotes = inputNotes.filter((n) => {
    const v = Object.values(n);
    const f = JSON.stringify(v).toLowerCase();
    return terms.every(term => f.includes(term));
  });
  return filteredNotes
};



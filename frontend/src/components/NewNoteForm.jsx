import { 
  Box,
  Grid, 
  Stack,
  Paper,
  Button, 
  Divider,
  TextField, 
  Typography,
} from '@mui/material'

import TipTapEditor from './TipTapEditor'
import Notification from './Notification'
import {EditorContent} from '@tiptap/react'
import notesService from '../services/notesService'
import TipTapButtonGroup from './TipTapButtonGroup'
import userStore from './userStore'

const NewNoteForm = () => {

  const content = 'new'
  const {newNote, setNewNote} = userStore()
  const editor = TipTapEditor(content)
  
  if (!editor) return null

  const handleNewNoteTitle = async (e) => {
    e.preventDefault()
    console.log('e.target: ', e.target.value)
    console.log('new note: ', newNote)
    const newObj = {
      title:e.target.value,
      content:'',
      user:'',
      created:'',
      edited:'',
    }
    
      await notesService.create(newObj)
    

    //dispatch(notifyAC(`blog "${newBlog.title}" successfully posted`,'success',3))
  }

  return(
    <Paper>
      <Box sx={{
        mx:'auto',
        width:'95%', 
        height:'100%', 
        color:'text.primary', 
        border:'1px solid yellow'
      }}>
        <h3>New Blog</h3>
        <form onSubmit={handleNewNoteTitle}>
          <Grid container direction='column'  justifyItems='center' spacing='.5' mt='1'>
            <Grid item>
            </Grid>
          </Grid>
        </form>

        <Grid container direction='column' alignItems='center' spacing='25' mt='30'>
            <Grid item width='90%'>
              <TextField 
                required 
                placeholder='TITLE'
                variant="standard"
                sx={{width:'100%'}}
                onChange={handleNewNoteTitle}
              />            
            </Grid>
            <Grid item width='100%'>
              hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
            </Grid>
            <Grid item width='100% '>
              <Divider sx={{ bgcolor: "secondary.light" }}/>
            </Grid>
            <Grid item width='100%' >
              <div 
                style={{height:'100vh', marginTop:'-px', border:'1px solid red'}} 
                onClick={()=> { document.getElementById('tiptapContent').childNodes[0].focus()}}
              >
                <EditorContent id='tiptapContent' editor={editor} />
              </div>
            </Grid>
          </Grid>
          <TipTapButtonGroup editor={editor}/>

      </Box> 
    </Paper>
  )
}

export default NewNoteForm

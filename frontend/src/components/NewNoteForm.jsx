import { 
  Box,
  Grid, 
  Button, 
  TextField, 
} from '@mui/material'

import Notification from './Notification'
import notesService from '../services/notesService'

const NewNoteForm = () => {

  const handleNewNote = async (e) => {
    e.preventDefault()

    const newNote = { 
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    }
    await notesService.add(newNote)

    //dispatch(notifyAC(`blog "${newBlog.title}" successfully posted`,'success',3))
  }

  return(
    <Box buttonLabel = 'New Blog'>
      <h3>New Blog</h3>
      <form onSubmit={handleNewNote}>
        <Grid container direction={"column"} spacing={.5} mt={1}>
          <Grid item>
            <TextField size="small" id="title" label='Title' variant='outlined'/>
          </Grid>

          <Grid item>
            <TextField size="small" id="author" label='Author' variant='outlined'/>
          </Grid>

          <Grid item>
            <TextField size="small" id="url" label='Blog URL' variant='outlined'/>
          </Grid>

          <Grid item>
            <Button type='submit'>Add</Button>
          </Grid>

        </Grid>
      </form>
      <Notification messageObj={{message:'', type:'success'}}/>
    </Box>
  )
}

export default NewNoteForm

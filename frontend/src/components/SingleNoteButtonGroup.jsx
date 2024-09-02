import { 
  Stack,
  Paper,
  Button,
  Checkbox,
  FormControlLabel
} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const SingleNoteButtonGroup = () => {

  const navigate =  useNavigate()

  return(
    <Paper>
      <Stack 
        gap={3} 
        width='90%'
        direction="row" 
        alignItems="center" 
      >
        <Button 
          size='Large' 
          color='inherit' 
          sx={{ ml:'10px', mr:'auto'}}
          onClick={()=>navigate("../")} 
        > 
          &lt; Back
        </Button>
        <FormControlLabel 
          control={
            <Checkbox 
              icon={<StarBorderIcon/>} 
              checkedIcon={<StarIcon/>} 
            />
          } 
          label="Important" 
        />
        <Button 
          size='medium' 
          color='inherit' 
          onClick={()=>navigate("../")} 
          sx={{textTransform: 'none'}}
        > 
          <DeleteIcon fontSize='small'/> Delete
        </Button>
      </Stack> 
    </Paper>
  )
}

export default SingleNoteButtonGroup
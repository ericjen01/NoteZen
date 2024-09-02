import userStore from "./userStore"
import { Box, TextField }from '@mui/material';
import { highlightMatch } from '../functions/functions';

const TipTapSearchBox = ({editor, content}) => {

  const {searchTerms, setSearchTerms} = userStore()

  return(
    <Box>
      <TextField       
        size="small"
        placeholder='Search by Keywords'
        sx={{transform:'scale(.65) translate(-5px, 0)'}}
        inputProps={{sx:{width:'17ch', fontSize:19, padding:'1 !important'}}} 
        onChange={({target})=>{
          setSearchTerms(target.value.toLowerCase().split(' '))
          editor.commands.setContent(highlightMatch(searchTerms,content))}
        }  
      />
    </Box>
  )
}

export default TipTapSearchBox
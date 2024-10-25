import userStore from './userStore';
import {flexColumn} from '../styles';
import {Box, Drawer,} from "@mui/material"

const MessageSlide = () => {
  const {
    messageObj,
    setMessageObj,
  } = userStore()

  return (
    <Drawer 
      open={messageObj? true: false} 
      onClose={()=>setMessageObj(null)}   
      PaperProps={{ sx: { width: "100%" }}}
    >
      <Box {...flexColumn} sx={{my:'auto'}} >
        <h4>{messageObj}</h4>
      </Box>
    </Drawer>
 
  )
}

export default MessageSlide
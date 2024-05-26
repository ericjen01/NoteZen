import '../App.css'
import { 
  Box, 
  List, 
  Drawer, 
  Avatar,
  Divider,
  ListItem, 
  ListItemText, 
  ListItemIcon,
  ListItemButton,
  Stack, 
} from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import defaultAvatar from '../assets/space-invaders-pixel-retro-arcade.svg'


const DrawerList = ({open, toggleDrawer}) => (
  <Drawer open={open} onClose={toggleDrawer(false)}>
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box sx={{ my:2, mx:2}}>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Avatar alt={defaultAvatar} sx={{width:'30px', height:'30px'}}>
            <EmojiPeopleIcon/>
          </Avatar>
          <span>UserName</span>
        </Stack>
        <p>Email Address</p>
        <Stack alignItems="center" direction="row" marginTop={3} >
          <LogoutIcon sx={{mr:1}}/>
          <span>Log Out </span>
        </Stack>
      </Box>
      <Divider/>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  </Drawer>
  
);

export default DrawerList
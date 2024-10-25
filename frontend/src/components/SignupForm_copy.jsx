import { 
  loginBox, 
  submitBtn, 
  flexColumn, 
  usernameField, 
  passwordField,
  flexEndDisplay,
} from '../styles';
import { 
  Box, 
  Input,
  Button, 
  Drawer,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material"
//import PropTypes from 'prop-types'
import userStore from './userStore';
import LockIcon from '@mui/icons-material/Lock';
import loginService from '../services/loginService';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const SignupForm = () => {
  const {
    setUser,
    username,
    password,
    setUsername, 
    setPassword, 
    showPassword, 
    signupFormOpen,
    usernameErr,
    setUsernameErr,
    //setMessageOpen,
    messageObj,
    setMessageObj,
    setShowPassword, 
    setSignupFormOpen
  } = userStore()

  //const handleClickShowPassword = () => setShowPassword(!showPassword);
  //const handleMouseDownPassword = () => setShowPassword(!showPassword);
  //const updateUsername = (e) => { setUsername(e.target.value)}

  const handleUsernameChange = e => {
    setUsername(e.target.value);
    console.log(e.target.validity)
    if (e.target.validity.valid) {
      setUsernameErr(null);
    } else {
      setUsernameErr('not a valid email');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault()
    console.log('getting signed up')
    let token;
    const config = () => ({
        headers: {
            Authorization: token,
        },
    });
    const setToken = (newToken) => {
      token = `Bearer ${newToken}`
      console.log("*** f services token: ", token)
    }

    try {
      const newUser = await loginService.signup({ username, password })
      //window.localStorage.setItem('savedNewUser', JSON.stringify(user))
      setToken(newUser.token)

      //const blogList = blogs.sort((a, b) => b.likes - a.likes)
      console.log('loginService.signup called')
      //setBlogs(blogList)
      setUser(newUser)
      setUsername('')
      setPassword('')
      setMessageObj('success')
    }
    catch (ex) {
      setMessageObj('failure')
      console.log('messageObj: ', messageObj)

    } 

  }

  return (
    <Drawer 
      open={signupFormOpen} 
      PaperProps={{ sx: { width: "100%" }}}
      onClose={()=>setSignupFormOpen(false)}   
    >
      <Box {...flexColumn} sx={{my:'auto'}} >
        <Box width='70%' maxWidth='400px'>
          <Button 
            variant='standard' 
            sx={{ml:'-20px'}}
            onClick={()=>setSignupFormOpen(false)}
          >
            <h4>&lt; GO BACK</h4>
          </Button>
          <h3>Sign Up</h3>
          <Box 
            {...loginBox} 
            component='form' 
            onSubmit={handleSignup}
          >
            <Box {...flexEndDisplay}>
              <EmojiPeopleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
              <TextField
                value={username}
                {...usernameField}
                error={usernameErr}
                onChange={handleUsernameChange}
                helperText={usernameErr ? usernameErr : null}
              />
            </Box>
            <Box {...flexEndDisplay}>
              <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
              <TextField
                value={username}
                {...passwordField}
                error={usernameErr}
                onChange={({target}) => setPassword(target.value)}
                helperText={usernameErr ? usernameErr : null}
              />
              <IconButton
                onClick={()=>setShowPassword(!showPassword)}
                onMouseDown={(e)=>e.preventDefault()}
                onMouseUp={(e)=>e.preventDefault()}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
            
            <Input
              {...passwordField} 
              type={showPassword ? 'text' : 'password'}
              onChange={({target}) => setPassword(target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon/>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={()=>setShowPassword(!showPassword)}
                    onMouseDown={(e)=>e.preventDefault()}
                    onMouseUp={(e)=>e.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button {...submitBtn}>
              Sign Up
            </Button>
            <Box  
              {...flexColumn} 
              sx={{my:'25px', mx:'auto', width:'80%'}}
              borderRadius='5px'
              bgcolor='rgba(192,192,192,0.1)' 
            > 
              <h4 style={{margin:'10px 0 10px 0'}}>Just Browsing?</h4>
              <Button 
                onClick={()=>setSignupFormOpen(true)} 
                sx={{width:'70%', bgcolor:'rgba(0,200,255,0.5)'}}
              >
                Continue as Guest
              </Button>
              <p style={{fontSize:'.8rem', width:'80%'}}> 
                Guest user will have access to browse, 
                search and create notes. 
                Guest notes will be erased in 30 minutes.
              </p>
            </Box>  
          </Box>
        </Box>
      </Box>
    </Drawer>
 
  )
}
/*
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  updateUsername: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
*/
export default SignupForm
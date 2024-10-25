import { 
  loginBox, 
  submitBtn, 
  flexColumn, 
  emailField, 
  passwordField
} from '../styles';
import { 
  Box, 
  Link,
  Input, 
  Button, 
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material"
//import PropTypes from 'prop-types'
import userStore from './userStore';
import SignupForm from './SignupForm';
import MessageSlide from './MessageSlide';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
//import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

const LoginForm = () => {
  const {
    setEmail, 
    showPassword, 
    setShowPassword, 
    setSignupFormOpen
  } = userStore()

  //const handleMouseDownPassword = () => setShowPassword(!showPassword);
  //const updateEmail = (e) => {setEmail(e.target.value)}
  const handleLogin = () =>{
    console.log('logging in')
  }

  return (
    <Box {...flexColumn}>
      <Box width='70%' maxWidth='400px'>
        <SignupForm/>
        <MessageSlide/>
        <h3>Sign In</h3>
        <Box 
          {...loginBox} 
          component='form' 
          onSubmit={()=>console.log('first')}
        >
          <Input
            startAdornment={
              <InputAdornment position="start">
                <EmojiPeopleIcon/>
              </InputAdornment>
            }
            {...emailField}
            variant='standard'
            placeholder='Email Address'
            onChange={({target}) => setEmail(target.value)}
          />
          <Input
            {...passwordField} 
            type={showPassword ? 'text' : 'password'}
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
          <Link 
            href="#" 
            variant="body2" 
            sx={{ml:'auto'}}
          >
            Forgot password?
          </Link>
          <Button {...submitBtn}>
            Sign In
          </Button>
          <Box  
            {...flexColumn} 
            sx={{mt:'20px'}}
            borderRadius='5px'
            bgcolor='rgba(192,192,192,0.2)' 
          >
            <h4 style={{margin:'10px 0 10px 0'}}>Don&#39;t Have an Account?</h4>
            <Button 
              onClick={()=>setSignupFormOpen(true)} 
              sx={{width:'70%', bgcolor:'rgba(0,200,255,0.6)'}}
            >
              Sign Up
            </Button>
            <Divider sx={{color:'text.secondary', width:'50%', my:'5px'}}>OR</Divider>
            <Button 
              onClick={()=>setSignupFormOpen(true)} 
              sx={{width:'70%', bgcolor:'rgba(0,200,255,0.6)', mb:'20px'}}
            >
              Continue as Guest
            </Button>
          </Box> 
        </Box>
      </Box>
    </Box>
  )
}
/*
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
*/
export default LoginForm
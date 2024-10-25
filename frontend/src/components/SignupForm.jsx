import { 
  loginBox, 
  submitBtn, 
  flexColumn, 
  emailField, 
  passwordField
} from '../styles';

import { 
  Box, 
  Button, 
  Drawer,
  TextField,
  IconButton,
} from "@mui/material"

import userStore from './userStore';
import loginService from '../services/loginService';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const SignupForm = () => {
  const {
    users,
    email,
    setUser,
    message,
    emailErr,
    password,
    setEmail, 
    setMessage,
    setEmailErr,
    passwordErr,
    setPassword, 
    showPassword, 
    setPasswordErr,
    signupFormOpen,
    setShowPassword, 
    setSignupFormOpen
  } = userStore()

  const handleEmailChange = ({target}) => {
    const newValue = target.value
    const isValidEmail = target.validity.valid
    const emailAlreadyExists = users.findIndex(u => u.email === newValue)
    setEmail(newValue);
    if (!isValidEmail) {
      setEmailErr('proper email format: example@domain.com');
    } else {
      if(emailAlreadyExists !== -1){
        setEmailErr('email already exists')
      } else{
        setEmailErr('')
      }
    }
  };

  const handlePasswordChange = ({target}) => {
    const newValue = target.value
    const isValidPassword = target.validity.valid
    setPassword(newValue);
    if (!isValidPassword) {
      setPasswordErr('password error');
    } else {
      setPasswordErr('')
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault()
    let token;
    const config = () => ({
      headers: {
        Authorization: token,
      },
    });
    const setToken = (newToken) => {
      token = `Bearer ${newToken}`
    }

    try {
      const newUser = await loginService.signup({ email, password })
      const emailAlreadyExists = users.findIndex(u => u.email === email)
      
      if(emailAlreadyExists) {
        throw new TypeError ('email dupo')
      }
      //window.localStorage.setItem('savedNewUser', JSON.stringify(user))
      setEmail('')
      setPassword('')
      setEmailErr('')
      setUser(newUser)
      setPasswordErr('')
      setMessage('success')
      setToken(newUser.token)
    }
    catch (ex) {
      setMessage('** please fix error(s) above **')
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
            onSubmit={handleSignup}>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
              <EmojiPeopleIcon sx={{mr:'15px'}}/>
              <TextField
                value={email}
                {...emailField}
                onChange={handleEmailChange}
                error={emailErr === '' ? false : true}
                helperText={emailErr ? emailErr : null}
              />            
            </Box>
            <Box sx={{ display:'flex', alignItems: 'center' }}>
              <IconButton
                onMouseUp={(e)=>e.preventDefault()}
                onMouseDown={(e)=>e.preventDefault()}
                onClick={()=>setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>                      
              <TextField
                value={password}
                {...passwordField}
                onChange={handlePasswordChange}
                error={passwordErr === '' ? false : true}
                helperText={passwordErr ? passwordErr : null}
                type={showPassword ? 'text' : 'password'}
              />    
            </Box>
            <Button {...submitBtn} color={message ? 'warning' : 'primary'}>
              {message ? message : 'SIGN UP'}
            </Button>
            <Box 
              {...flexColumn} 
              borderRadius='5px'
              bgcolor='rgba(192,192,192,0.2)' 
              sx={{my:'25px', mx:'auto', width:'80%'}}
            > 
              <h4 style={{margin:'10px 0 10px 0'}}>Just Browsing?</h4>
              <Button 
                onClick={()=>setSignupFormOpen(true)} 
                sx={{width:'80%', bgcolor:'rgba(0,200,255,0.6)'}}
              >
                Guest Visit
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

export default SignupForm
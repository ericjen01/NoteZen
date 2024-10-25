export const colorModeButton = {
  variant: 'text', 
  sx:{
    ml: 'auto',
    padding: '3px',
    border: 'solid',
    minWidth: '25px', 
    maxWidth: '25px', 
    maxHeight: '25px', 
    minHeight: '25px', 
    borderRadius: '15px',
    backgroundColor: '#c3f2fd',
  }
}

export const flexColumn = {
  style:{
    display:'flex', 
    alignItems: 'center',
    flexDirection:'column',
  }
} 

export const loginBox = {
  style:{
    minWidth: '70%',
    maxWidth: '100%',
    marginTop: '10px',
  }
}

export const flexEndDisplay ={
  sx:{ 
    display: 'flex', 
    alignItems: 'flex-end' 
  }
}

export const emailField = {
  id:"email",
  name:"email",
  type:'email',
  required:true,
  fullWidth:true,
  autoFocus:true,
  variant:'standard',
  autoComplete:"email",
  placeholder:'Email Address'
}

export const passwordField = {
  required:true,
  fullWidth:true,
  autoFocus:true,
  id:"password",
  sx:{my:'20px'},
  name:"password",
  type:"password",
  variant:'standard',
  placeholder:'Password', 
  autoComplete:"current-password",
}

export const menuButton = {
  variant: 'text', 
  color: 'inherit',
  sx:{
    margin: '5px',
    maxWidth: '21px', 
    minWidth: '21px', 
    minHeight: '21px', 
    maxHeight: '21px', 
    color: 'text.primary'
  }
}

export const editorButton = {
  variant: 'text', 
  color: 'inherit',
  sx:{
    margin: '5px',
    border: 'solid',
    maxWidth: '21px', 
    minWidth: '21px', 
    maxHeight: '21px', 
    minHeight: '21px', 
    backgroundColor: '#c3f2fd',
  }
}

export const submitBtn = {
  size:'medium', 
  type:'submit',
  fullWidth:true,
  variant:'contained',
  sx:{my:2,  textTransform:'none'},
}

export const addButtonStyle = {
  variant: 'text', 
  color: 'inherit',
  sx:{
    ml: 'auto',
    border: 'solid',
    maxWidth: '21px', 
    minWidth: '21px', 
    maxHeight: '21px', 
    minHeight: '21px', 
    backgroundColor: '#d4a373',
  }
}



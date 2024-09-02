
import { Box } from '@mui/material'
import viteLogo from '../assets/vite.svg'
import reactLogo from '../assets/react.svg'

const Footer = () => (
  <Box sx={{
    left:'0', 
    right:'0', 
    bottom:'0', 
    p:'-30px',
    position:'fixed', 
    color:'text.primary', 
    bgcolor:'background.default', 
  }}>
    <div style={{zIndex:'2'}}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
  </Box>
)
export default Footer
import './index.css'
import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import {  BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, createTheme, } from '@mui/material/styles';

const lightColorMode = window.localStorage.getItem('lightColorMode')

const getColorTheme = () => {
  if(lightColorMode === 'true') {
    return createTheme({palette: {mode: 'light',},});
  }else{
    return createTheme({palette: {mode: 'dark',},});
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={getColorTheme}>
    <CssBaseline/>
    <React.StrictMode>
      <Router>
        <App/>
      </Router>
    </React.StrictMode>
  </ThemeProvider>
)

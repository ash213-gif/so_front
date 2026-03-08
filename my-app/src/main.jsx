import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import GetCampaignProvider from './Components/Context/User/Getcampaign.jsx'
import  AuthProvider  from './Components/Context/User/UserData.jsx'
import AdminProvider from './Components/Context/Admin/Summary.jsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' }, // change to your brand color
    secondary: { main: '#009688' }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <GetCampaignProvider>
        <AuthProvider>
        <AdminProvider>
          <App />
        </AdminProvider>
        </AuthProvider>
      </GetCampaignProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)

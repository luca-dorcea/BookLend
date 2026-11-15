import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/besley/wght.css'
import '@fontsource/alegreya-sans/400.css'
import '@fontsource/alegreya-sans/700.css'
import '@fontsource-variable/playwrite-ro/index.css'
import './App.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

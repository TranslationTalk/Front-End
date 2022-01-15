import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import GlobalStyles from './styles/GlobalStyles'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <GlobalStyles />
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
)

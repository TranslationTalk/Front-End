import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Router from './pages/Router'

function App() {
  const location = useLocation()
  return (
    <div>
      <Wrap location={location.pathname}>
        <Router />
      </Wrap>
    </div>
  )
}
const Wrap = styled.div`
  max-width: ${prop => (prop.location === '/' ? '100%' : '640px')};
  min-width: 360px;
  margin: auto;
`
export default App

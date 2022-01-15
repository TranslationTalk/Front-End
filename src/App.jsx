import React from 'react'
import styled from 'styled-components'
import Router from './pages/Router'

function App() {
  return (
    <div>
      <Wrap>
        <Router />
      </Wrap>
    </div>
  )
}

const Wrap = styled.div`
  min-width: 320px;
  max-width: 768px;
  margin: auto;
`
export default App

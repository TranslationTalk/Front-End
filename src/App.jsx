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
  min-width: 360px;
  max-width: 640px;
  margin: auto;
  margin-bottom: 54px;
`
export default App

import React from 'react'
<<<<<<< HEAD
import Router from './pages/Router'

function App() {
  return <Router />
}

=======
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

>>>>>>> 133e3377d4e2135f8d4f4237adefaf2ae31268ec
export default App

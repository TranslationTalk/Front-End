import React, { useState } from 'react'
import styled from 'styled-components'
import TextInput from './components/Input/TextInput'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    career: '',
    introduction: '',
  })

  const handleChange = e => {
    console.log(e.target.value)
    setFormData(prev => ({ ...prev, name: e.target.value }))
  }

  console.log(formData)

  return (
    <div className="App">
      <StyledDiv>App components 번역톡 프로젝트!!!!</StyledDiv>
      <TextInput
        id="name"
        placeholder="이름"
        onChange={handleChange}
        value={formData.name}
      />
    </div>
  )
}

const StyledDiv = styled.div`
  color: red;
  font-size: 30px;
`

export default App

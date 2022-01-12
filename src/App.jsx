import React, { useState } from 'react'
import styled from 'styled-components'
import SelectInput from './components/Input/SelectInput'
import TextInput from './components/Input/TextInput'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    career: '',
    language: '',
    introduction: '',
  })

  const handleChange = e => {
    console.log(e.target.id)
    console.log(e.target.value)
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
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
      <SelectInput
        id="language"
        value={formData.language}
        onChange={handleChange}
        defaultOption="가능 언어"
        options={['한국어', '영어', '일본어']}
      />
    </div>
  )
}

const StyledDiv = styled.div`
  color: red;
  font-size: 30px;
`

export default App

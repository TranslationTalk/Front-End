import React, { useState } from 'react'
import styled from 'styled-components'
import CheckBoxInput from './components/Input/CheckBoxInput'
import SelectInput from './components/Input/SelectInput'
import TextInput from './components/Input/TextInput'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    career: '',
    language: '',
    taxPossible: false,
    introduction: '',
  })

  const handleChange = e => {
    console.log(e.target.id)
    console.log(e.target.value)
    console.log(e.target.checked)
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
      taxPossible: e.target.checked ?? false,
    }))
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
      <CheckBoxInput
        id="taxPossible"
        onChange={handleChange}
        label="세금명세서 가능 여부"
      />
    </div>
  )
}

const StyledDiv = styled.div`
  color: red;
  font-size: 30px;
`

export default App

/*
text input을 받는 common input component
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextInput = ({ placeholder, onChange, value }) => (
  <Input placeholder={placeholder} onChange={onChange} value={value} />
)

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid gray;
`

TextInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default TextInput

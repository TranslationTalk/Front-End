/*
common input component:
text를 받는 input
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextInput = ({ id, placeholder, onChange, value }) => (
  <Input id={id} placeholder={placeholder} onChange={onChange} value={value} />
)

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid gray;
`

TextInput.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default TextInput

/*
common input component:
textarea input
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextAreaInput = ({ id, name, placeholder, onChange }) => (
  <TextArea id={id} name={name} placeholder={placeholder} onChange={onChange} />
)

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid gray;
`

TextAreaInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default TextAreaInput

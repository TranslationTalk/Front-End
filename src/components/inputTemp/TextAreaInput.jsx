/*
common input component:
textarea input
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextAreaInput = ({ id, placeholder, onChange }) => (
  <TextArea id={id} placeholder={placeholder} onChange={onChange} />
)

const TextArea = styled.textarea`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid gray;
`

TextAreaInput.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default TextAreaInput

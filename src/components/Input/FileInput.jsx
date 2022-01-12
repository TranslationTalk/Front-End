/*
common input component:
file를 받는 input
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FileInput = ({ id, onChange, value }) => (
  <Input
    type="file"
    accept=".txt"
    required
    id={id}
    onChange={onChange}
    value={value}
  />
)

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid gray;
`

FileInput.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default FileInput

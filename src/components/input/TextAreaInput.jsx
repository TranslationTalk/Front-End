/*
common input component:
textarea input
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextAreaInput = ({
  id,
  name,
  placeholder,
  onChange,
  value,
  maxLength,
}) => {
  return (
    <TextArea
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
    />
  )
}

const TextArea = styled.textarea`
  width: 100%;
  height: 136px;
  padding: 11px 12px;
  border-radius: 4px;
  border: 1px solid var(--gray-c4);
  font-size: var(--fs-14);
  &::placeholder {
    color: var(--gray-c4);
  }
  &:focus {
    outline: none !important;
    border: 1px solid var(--main-color);
  }
`

TextAreaInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  maxLength: PropTypes.number,
}

export default TextAreaInput

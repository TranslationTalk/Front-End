/*
common input component:
checkbox input
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CheckBoxInput = ({ id, name, onChange, label, checked }) => (
  <Container>
    <Input
      type="checkbox"
      name={name}
      id={id}
      onChange={onChange}
      value={label}
      checked={checked}
    />
    <label htmlFor={id}>{label}</label>
  </Container>
)

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  & label {
    font-size: var(--fs-14);
  }
`

const Input = styled.input`
  display: inline-block;
  width: var(--fs-16);
  height: var(--fs-16);
  border: 5px solid var(--gray-bc);
  margin-right: 6px;
  cursor: pointer;
`

CheckBoxInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
}

export default CheckBoxInput

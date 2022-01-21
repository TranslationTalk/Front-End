/*
common input component:
checkbox input
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CheckBoxInput = ({ id, onChange, label }) => (
  <Container>
    <Input type="checkbox" id={id} onChange={onChange} value={label} />
    <label htmlFor={label}>{label}</label>
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
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default CheckBoxInput

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

const Container = styled.div``

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid gray;
`

CheckBoxInput.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default CheckBoxInput

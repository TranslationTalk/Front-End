/*
common input component:
option을 선택하는 select input
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SelectInput = ({ id, name, defaultOption, onChange, value, options }) => (
  <Select id={id} name={name} onChange={onChange} value={value}>
    <option>{defaultOption}</option>
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </Select>
)

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid gray;
`

SelectInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  defaultOption: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
}

export default SelectInput

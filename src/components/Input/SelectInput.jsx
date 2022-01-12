/*
common input component:
option을 선택하는 select input
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SelectInput = ({ id, defaultOption, onChange, value, options }) => (
  <Select id={id} onChange={onChange} value={value}>
    <option value="">{defaultOption}</option>
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </Select>
)

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid gray;
`

SelectInput.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  defaultOption: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
}

export default SelectInput

/*
common input component:
option을 선택하는 select input
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ArrowDown from '../../assets/images/PolygonDown.png'

const SelectInput = ({ id, name, defaultOption, onChange, value, options }) => (
  <Select
    id={id}
    name={name}
    onChange={onChange}
    value={value}
    bgUrl={ArrowDown}
    defaultOption={defaultOption}
  >
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
  padding: 11px 6px 11px 12px;
  border-radius: 4px;
  font-size: var(--fs-14);
  border: 1px solid var(--gray-c4);
  appearance: none;
  /* value(선택된 옵션)이 defaultOption이면 회색, 다른 것이면 검은색
  추가로, defaultOption나 value가 정해지지 않은 상태라면 무조건 회색으로 나타낸다.  */
  color: ${props =>
    props.defaultOption && props.value
      ? props.value === props.defaultOption
        ? '#C4C4C4'
        : '#000'
      : '#C4C4C4'};
  background: url(${props => props.bgUrl}) no-repeat;
  background-position: right 13px top 50%;
  &:focus {
    outline: none !important;
    border: 1px solid var(--main-color);
  }
  & > option {
    color: #000;
  }
  &::first-child {
    color: var(--gray-c4);
  }
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

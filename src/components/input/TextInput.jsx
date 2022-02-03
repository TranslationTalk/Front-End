/*
common input component:
text를 받는 input'
type: input 타입 정하기
id: property로 사용할 때 쓰는 고유 id (string)
placeholder: 안내문
onChange: 변화 감지 이벤트 함수
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextInput = ({
  type,
  id,
  name,
  placeholder,
  onChange,
  value,
  fontSize,
  padding,
}) => {
  // type = 'date'
  // min Date 설정
  // 오늘포함 이후 날짜 선택 가능
  const dateMin = () => {
    if (type === 'date') {
      const current = new Date()
      const currentYear = current.getFullYear()
      let currentMonth = current.getMonth() + 1
      let currentDate = current.getDate()
      if (currentMonth < 10) {
        currentMonth = '0' + currentMonth
      }
      if (currentDate < 10) {
        currentDate = '0' + currentDate
      }
      const date = `${currentYear}-${currentMonth}-${currentDate}`
      return date
    }
  }

  // type='phone'
  // 숫자만 입력 가능
  if (type === 'phone') {
    value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
  }

  return (
    <Input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      fontSize={fontSize}
      padding={padding}
      min={dateMin()}
    />
  )
}
console.log()
const Input = styled.input`
  width: 100%;
  padding: ${props => (props.padding ? props.padding : '11px 12px')};
  border-radius: 4px;
  border: 1px solid var(--gray-c4);
  font-size: ${props => (props.fontSize ? props.fontSize : '14')}px;
  &::placeholder {
    color: var(--gray-c4);
  }
  &:focus {
    outline: none !important;
    border: 1px solid var(--main-color);
  }
  &[type=${props => props.type}] {
    color: ${props => (props.value ? '#000' : '#C4C4C4')};
  }
`

TextInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  fontSize: PropTypes.string,
  padding: PropTypes.string,
}

export default TextInput

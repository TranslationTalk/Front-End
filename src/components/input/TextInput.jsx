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

const TextInput = ({ type, id, name, placeholder, onChange, value }) => (
  <Input
    type={type}
    id={id}
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
  />
)

const Input = styled.input`
  width: 100%;
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
}

export default TextInput

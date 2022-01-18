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

const TextInput = ({ type, id, name, placeholder, onChange }) => (
  <Input
    type={type}
    id={id}
    name={name}
    placeholder={placeholder}
    onChange={onChange}
  />
)

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid gray;
`

TextInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default TextInput

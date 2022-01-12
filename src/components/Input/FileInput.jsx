/*
common input component:
file를 받는 input
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FileInput = ({ id, onChange, value }) => (
  // 실제로 받은 file을 어떻게 상위 컴포넌트에 전달할지 나중에 사용하면서 수정 필요
  <Input
    type="file"
    accept=".txt"
    required
    id={id}
    onChange={onChange}
    value={value}
  />
)

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid gray;
`

FileInput.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default FileInput

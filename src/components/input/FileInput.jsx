/*
common input component:
file를 받는 input
label: 파일 선택 버튼에 들어갈 내용
name: onChange에 사용될 name
onChange: onChange이벤트
useUploadName: 파일 선택 버튼 옆에 선택된 파일명 보여줄지 말지
*/
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FileInput = ({
  id,
  label,
  name,
  onChange,
  useUploadName,
  fontSize,
  width,
  height,
  padding,
}) => {
  // 실제로 받은 file을 어떻게 상위 컴포넌트에 전달할지 나중에 사용하면서 수정 필요
  const [fileName, setFileName] = useState('선택된 파일 없음')

  const handleFileChange = e => setFileName(e.target.value.slice(12))

  return (
    <InputContainer>
      <Label
        htmlFor={id}
        useUploadName={useUploadName}
        fontSize={fontSize}
        width={width}
        height={height}
        padding={padding}
      >
        {label}
      </Label>
      {useUploadName && (
        <UploadName
          onChange={handleFileChange}
          value={fileName}
          placeholder="선택된 파일 없음"
        />
      )}
      <Input id={id} type="file" name={name} onChange={onChange} />
    </InputContainer>
  )
}

const InputContainer = styled.div`
  width: 100%;
  display: flex;
`

const Label = styled.label`
  width: ${props => (props.useUploadName ? '50%' : '100%')};
  background-color: var(--main-color);
  padding: ${props => (props.padding ? props.padding : '11px 12px')};
  ${props =>
    props.useUploadName
      ? 'border-top-left-radius: 4px; border-bottom-left-radius: 4px;'
      : 'border-radius: 8px;'}
  text-align: center;
  font-size: ${props => (props.fontSize ? props.fontSize : '14px')};
  color: var(--white);
`

const UploadName = styled.input`
  width: 50%;
  background-color: var(--white);
  padding: 11px 12px;
  font-size: var(--fs-14);
  text-align: center;
  border: 1px solid var(--gray-c4);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  pointer-events: none;
`

const Input = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`

FileInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  useUploadName: PropTypes.bool,
  fontSize: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
}

export default FileInput

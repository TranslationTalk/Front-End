/*
common input component:
file를 받는 input
label: 파일 선택 버튼에 들어갈 내용
name: onChange에 사용될 name
onChange: onChange이벤트
useUploadName: 파일 선택 버튼 옆에 선택된 파일명 보여줄지 말지
*/
import React from 'react'
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
  accept,
  value,
}) => {
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
          onChange={() => {}} //  value 사용할 시 onChange 안쓰면 오류
          value={value.slice(12)} // 가져온 value로 앞에 fakepath 잘라서 명시
          placeholder="선택된 파일 없음"
        />
      )}
      <Input
        id={id}
        type="file"
        name={name}
        onChange={onChange}
        accept={accept === 'text' ? '*' : `${accept}/*`} // 이거 지정 안해줘도 됨 text 는 모두 받을 거임
      />
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
  padding: ${props => (props.useUploadName ? '16px 0' : '8px 0')};
  font-size: ${props => (props.fontSize ? props.fontSize : '14px')};
  color: var(--white);
  cursor: pointer;
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
  accept: PropTypes.string,
  value: PropTypes.string,
}

export default FileInput

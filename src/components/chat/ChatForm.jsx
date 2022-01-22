/**
 * ChatForm
 * input / button
 * 상위 컴포넌트에서 이러한 함수를 onSubmit에 넘겨주어야 합니다.
 * const handleChatSubmit = e => {
    e.preventDefault()
    console.log(e.target[0].value) // input이 form의 target의 가장 첫번째 요소라서
  }
  button에 type 추가해야합니다. button에 onClick으로 onSubmit 함수를 전달하면 동작하지 않습니다
  type을 추가하여 submit으로 설정할 수 있도록 추가해야 합니다
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextInput } from '..'
import styled from 'styled-components'

const ChatForm = ({ onSubmit, onChange, value }) => {
  return (
    <Form onSubmit={onSubmit}>
      <InputWrap>
        <TextInput
          placeholder="메시지를 입력하세요."
          onChange={onChange}
          value={value}
          fontSize="12"
          padding="10px 12px"
        />
      </InputWrap>
      <Button content="보내기" bgColor="#fff" color="#3D51FF" />
    </Form>
  )
}

const Form = styled.form`
  width: 100%;
  height: 54px;
  position: fixed;
  bottom: 0;
  left: 50%;
  max-width: 640px;
  min-width: 360px;
  transform: translateX(-50%);
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  padding: 9px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    font-size: var(--fs-14);
    font-weight: normal;
    border: 1px solid var(--main-color);
    width: fit-content;
    height: fit-content;
    padding: 5px 15px;
  }
`

const InputWrap = styled.div`
  width: 70%;
  margin: 6px;
`

ChatForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default ChatForm

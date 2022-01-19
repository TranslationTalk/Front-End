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

const ChatForm = ({ onSubmit, onChange, value }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextInput
        placeholder="채팅 내용을 입력하세요."
        onChange={onChange}
        value={value}
      />
      <Button type="submit" shortBtn content="보내기" />
    </form>
  )
}

ChatForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default ChatForm

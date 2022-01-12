import React from 'react'
import styled from 'styled-components'
import { Button } from '../../components/index'

function Login() {
  return (
    <>
      <TitleWrap>
        <Title>
          언제 어디서든 <TitlePoint>번역을 신청해보세요</TitlePoint>
        </Title>
      </TitleWrap>

      <ButtonWrap>
        <Button longBtn content="카카오톡으로 로그인" />
      </ButtonWrap>
      <ButtonWrap>
        <Button shortBtn content="번역가로 로그인 >" />
      </ButtonWrap>
    </>
  )
}

const TitleWrap = styled.div`
  margin: auto;
  width: 240px;
  height: 76px;
`

const Title = styled.div`
  margin: 10px 0;
  font-size: 24px;
`

const TitlePoint = styled.div`
  font-weight: bold;
`

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Login

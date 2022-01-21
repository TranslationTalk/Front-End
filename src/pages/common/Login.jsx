import React from 'react'
import styled from 'styled-components'
import { Button, PageHeader } from '../../components/index'
import { apis } from '../../utils/axios'
import loginBg from '../../assets/images/loginBg.png'
import loginBottom from '../../assets/images/loginBottom.png'
import loginTopLogo from '../../assets/images/loginTopLogo.png'
import loginLogo from '../../assets/images/loginLogo.png'

function Login() {
  return (
    <>
      <MainWrap>
        <PageHeader />
        <ImgWrap>
          <Img
            src={loginTopLogo}
            alt="번역이 필요 할땐"
            style={{ marginBottom: '20px' }}
          />
          <Img src={loginLogo} alt="번역톡" />
          <Img src={loginBottom} alt="세상의 모든 번역" />
        </ImgWrap>
        <LoginWrap>
          <ButtonWrap>
            <Button
              content="카카오톡으로 로그인"
              onClick={() => apis.login()}
              bgColor="#F9E000"
            />
          </ButtonWrap>
          <ButtonWrap>
            <TranslatorLogin onClick={() => apis.translatorLogin()}>
              번역가로 로그인하기 {`>`}
            </TranslatorLogin>
          </ButtonWrap>
        </LoginWrap>
        <DeveloperWrap>
          <ButtonWrap>
            <Button
              content="링크페이지"
              onClick={() => {
                location.href = '/test'
              }}
            />
          </ButtonWrap>
        </DeveloperWrap>
      </MainWrap>
    </>
  )
}

const MainWrap = styled.div`
  max-width: 360px;
  height: 748px;
  margin: auto;
  background-image: url(${loginBg});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`
const ImgWrap = styled.div`
  margin: 68px auto 0;
`
const Img = styled.img`
  display: block;
  margin: 10px auto;
`

const LoginWrap = styled.div`
  position: relative;
  top: 205px;
`

const TranslatorLogin = styled.span`
  cursor: pointer;
  color: #fff;
`

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const DeveloperWrap = styled.div`
  position: fixed;
  right: 0px;
`

export default Login

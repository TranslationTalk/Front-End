import React from 'react'
import styled from 'styled-components'
import { Button, PageHeader, TextInput } from '../../components/index'
import { apis } from '../../utils/axios'
import loginBg from '../../assets/images/loginBg.png'
import loginBottom from '../../assets/images/loginBottom.png'
import loginTopLogo from '../../assets/images/loginTopLogo.png'
import loginLogo from '../../assets/images/loginLogo.png'

function Login() {
  const [id, setId] = React.useState('')

  const func = e => {
    setId(e.target.value)
  }

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
              longBtn
              content="카카오톡으로 로그인"
              _onClick={() => apis.login()}
              margin="10px"
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
              _onClick={() => {
                location.href = '/test'
              }}
            />
          </ButtonWrap>
          <TextInput onChange={func} placeholder="아이디를 입력해주세요." />
          <ButtonWrap>
            <Button
              shortBtn
              content="개발자 유저로 회원가입"
              _onClick={() => {
                const auth = 'client'
                console.log(id, auth)
                apis
                  .developerSignup(id, auth)
                  .then(() => alert(`개발자 유저로 회원가입 성공 id는 ${id}`))
                  .catch(e => alert(`${e}실패`))
              }}
            />
          </ButtonWrap>
          <ButtonWrap>
            <Button
              shortBtn
              content="개발자 번역가로 회원가입"
              _onClick={() => {
                const auth = 'translator'
                apis
                  .developerSignup(id, auth)
                  .then(() => alert(`개발자 번역가로 회원가입 성공 id는 ${id}`))
                  .catch(e => alert(`${e}실패`))
              }}
            />
          </ButtonWrap>
          <ButtonWrap>
            <Button
              shortBtn
              content="개발자 로그인"
              _onClick={async () => {
                console.log(id)
                const res = await apis.developerLogin(id)
                console.log(res)
                sessionStorage.setItem('token', res.data.token)
              }}
            />
          </ButtonWrap>
          <ButtonWrap>
            <Button
              shortBtn
              content="번역요청"
              _onClick={() => {
                apis
                  .requestList()
                  .then(res => console.log(res))
                  .catch(e => console.log(e))
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
  width: 100%;
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

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const TranslatorLogin = styled.span`
  cursor: pointer;
  color: #fff;
`

const DeveloperWrap = styled.div`
  position: fixed;
  right: 0px;
`

export default Login

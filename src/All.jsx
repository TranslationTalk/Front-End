import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from './components/index'
import { apis } from './utils/axios'

const All = () => {
  const [id, setId] = React.useState('')
  const [auth, setAuth] = React.useState(null)

  const func = e => {
    setId(e.target.value)
  }

  return (
    <Test>
      <Input onChange={func} placeholder="아이디를 입력해주세요." />
      <DeveloperWrap>
        <Button
          shortBtn
          content="유저 회원가입"
          _onClick={() => {
            const auth = 'client'
            console.log(id, auth)
            apis
              .developerSignup(id, auth)
              .then(() => alert(`개발자 유저로 회원가입 성공 id는 '${id}'`))
              .catch(e => alert(`${e} already exist id '${id}'`))
          }}
          color="#f5f5f5"
          bgColor="#333"
        />

        <Button
          shortBtn
          content="번역가 회원가입"
          _onClick={() => {
            const auth = 'translator'
            apis
              .developerSignup(id, auth)
              .then(() => alert(`개발자 번역가로 회원가입 성공 id는 '${id}'`))
              .catch(e => alert(`${e} already exist id '${id}'`))
          }}
          color="#f5f5f5"
          bgColor="#333"
        />
        {(auth && (
          <Button
            shortBtn
            content="로그아웃"
            _onClick={() => {
              setAuth(null)
            }}
            color="#f5f5f5"
          />
        )) || (
          <Button
            shortBtn
            content="개발자 로그인"
            _onClick={async () => {
              console.log(id)
              const res = await apis.developerLogin(id)
              console.log(res)
              sessionStorage.setItem('token', res.data.token)
              sessionStorage.setItem('auth', res.data.auth)
              setAuth(res.data.auth)
            }}
            color="#f5f5f5"
          />
        )}

        <Button
          shortBtn
          content="Test API"
          _onClick={() => {
            apis
              .requestList()
              .then(res => console.log(res))
              .catch(e => console.log(e))
          }}
          color="#f5f5f5"
          bgColor="#333"
        />
      </DeveloperWrap>
      {auth === 'translator' && (
        <Now>
          현재 로그인 상태 : <span>번역가</span>
        </Now>
      )}
      {auth === 'client' && (
        <Now>
          현재 로그인 상태 : <span>유저</span>
        </Now>
      )}
      {auth === null && (
        <Now>
          현재 로그인 상태 : <span>비로그인</span>
        </Now>
      )}

      <br />
      <h2>공통</h2>
      <Link to="/">로그인</Link>
      <Link to="/chat/list">채티방 리스트</Link>
      <Link to="/chat/:roomid">채팅방</Link>
      <br />
      <h2>유저</h2>
      <Link to="/client/main">번역 요청 페이지</Link>
      <Link to={{ pathname: '/client/request', state: { isText: true } }}>
        번역 요청 Form-택스트번역
      </Link>
      <Link to={{ pathname: '/client/request', state: { isText: false } }}>
        번역 요청 Form-영상번역
      </Link>
      <Link to="/client/request/list">견적 요청 List</Link>
      <Link to="/client/estimate/list">받은 견적 List</Link>
      <Link to="/client/estimate/list/:id">번역가 상세페이지</Link>
      <br />
      <h2>번역가</h2>
      <Link to="/translator/signup">번역가 가입form</Link>
      <Link to="/translator/list">번역 의뢰 List</Link>
      <Link to="/translator/estimate/form">견적서 작성 폼</Link>
      <Link to="/translator/mypage">마이페이지</Link>
      <Link to="/translator/translation/list">내번역</Link>
      <Link to="/translator/estimate/:id">견적서 디테일</Link>
    </Test>
  )
}
const Test = styled.div`
  & h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  & a {
    display: block;
    line-height: 28px;
    &:hover {
      color: blue;
    }
  }
`

const DeveloperWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  height: 60px;
  margin: 50px auto 10px;

  &:: placeholder {
    padding-left: 20px;
    font-size: 20px;
    color: cornflowerblue;
  }
`

const Now = styled.div`
  text-align: center;
  font-size: 20px;
  border-bottom: 1px solid #ccc;
  margin-top: 10px;
  padding-bottom: 20px;

  & span {
    color: #ff0000dd;
  }
`
export default All

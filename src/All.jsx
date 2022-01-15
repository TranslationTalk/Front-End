import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const All = () => {
  return (
    <Test>
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

export default All

import React from 'react'
import styled from 'styled-components'
import Logo from '../../assets/images/logoWhite.svg'

const Footer = () => {
  return (
    <Div>
      <img src={Logo} alt="dfs" />
      <p>
        번역 견적은 해당 사이트를 통해서 신청이 가능하며, 통신판매중개자로서
        거래당사자가 아닙니다. 거래에 관한 의무와 책임을 지지 않습니다. 서비스
        관련 문의는 채팅 또는 e번역 카페를 통해 상담부탁드립니다.
      </p>
      <p>Copyright 번역톡 Inc.. LTD ALL RIGHT RESERVED.</p>
    </Div>
  )
}

const Div = styled.div`
  text-align: center;
  padding: 58px 0;
  background-color: var(--dark-blue);
  line-height: 1.6;
  font-size: var(--fs-14);
  & img {
    margin-bottom: 22px;
  }
  & p {
    width: 369px;
    margin: auto;
    color: #fff;
    font-weight: 400;
  }
  & p:last-child {
    margin-top: 14px;
    opacity: 0.6;
  }
  @media screen and (min-width: 640px) {
    padding: 100px 0;
    & img {
      margin-bottom: 37px;
    }
    & p {
      width: 678px;
    }
  }
`

export default Footer

import React from 'react'
import styled from 'styled-components'
import { Button, PageHeader } from '../../components'
import { ReactComponent as NotFoundImage } from '../../assets/images/NotFound.svg'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  const gotoHome = () => navigate(-1)

  return (
    <>
      <HeaderWrap>
        <PageHeader />
      </HeaderWrap>
      <Wrap>
        <NotFoundImage />
        <Description>
          <span>죄송합니다.</span>
          <span>현재 찾을 수 없는 페이지입니다.</span>
        </Description>
        <Description>
          <span>요청하신 페이지가 사라졌거나,</span>
          <span>잘못된 경로를 이용하셨어요.</span>
        </Description>
        <Button content="이전 페이지로 이동" onClick={gotoHome} />
      </Wrap>
    </>
  )
}

const HeaderWrap = styled.div`
  display: none;
  @media (max-width: 640px) {
    display: unset;
  }
`

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    width: 340px;
    height: 204px;
    @media (max-width: 640px) {
      width: 132px;
      height: 88px;
      margin-bottom: 20px;
    }
  }
  button {
    margin-top: 30px;
    width: 200px;
  }
`

const Description = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 20px;
  font-size: var(--fs-24);
  font-weight: 500;
  @media (max-width: 640px) {
    flex-direction: column;
    font-size: var(--fs-18);
  }
  span {
    margin-bottom: 5px;
  }
`

export default NotFound

// ClientHome
// text, 영상 번역요청 고르는 페이지

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { NavigationUser, PageHeader } from '../../components'
import ClientHomeImg from '../../assets/images/ClientHomeImg.png'
import TestTranslation from '../../assets/images/TestTranslation.png'
import YoutubeTranslation from '../../assets/images/YoutubeTranslation.png'

const ClientHome = () => {
  return (
    <Home>
      <PageHeader />
      <div>
        <Link to={'/client/request/list'}>
          <p>이미 번역을 의뢰 하셨나요?</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g opacity="0.8">
              <path
                d="M8.59003 16.59L13.17 12L8.59003 7.41L10 6L16 12L10 18L8.59003 16.59Z"
                fill="#3D51FF"
              />
            </g>
          </svg>
        </Link>
      </div>
      <h2>
        <p>어디서나 쉽게,</p>
        <p>번역의뢰 하는 방법</p>
      </h2>
      <div>
        <Link to={'/client/request/text'}>
          <span>텍스트 번역</span>
        </Link>
        <Link to={'/client/request/youtube'}>
          <span>영상번역</span>
        </Link>
      </div>
      <NavigationUser />
    </Home>
  )
}

const Home = styled.div`
  margin: 77px 0 72px;
  > div:nth-child(2) {
    margin: 21px;
    padding: 0 12px;
    border-radius: 4px;
    background-color: var(--light-blue);
    font-size: var(--fs-14);
    a {
      display: flex;
      height: 36px;
      justify-content: space-between;
      align-items: center;
    }
  }

  h2 {
    margin-top: 57px;
    margin-bottom: 46px;
    text-align: center;
    p:first-child::before {
      display: block;
      width: 224px;
      height: 134px;
      margin: 0 auto 24px;
      background-image: url(${ClientHomeImg});
      background-size: cover;
      content: '';
    }
    p {
      font-size: var(--fs-32);
      line-height: 1.4;
      :last-child {
        font-weight: 600;
      }
    }
  }

  div:nth-child(4) {
    display: flex;
    justify-content: center;
    a {
      display: block;
      width: 155px;
      height: 132px;
      border: 1px solid var(--gray-c4);
      border-radius: 4px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      transition: all 0.5s;
      :first-child {
        margin-right: 10px;
      }
      ::before {
        display: block;
        width: 54px;
        background-size: cover;
        content: '';
      }
      :hover {
        border: 1px solid var(--main-color);
      }
    }
  }
  a:first-child::before {
    height: 56px;
    margin: 22px auto 10px;
    background-image: url(${TestTranslation});
  }
  a:last-child::before {
    height: 42px;
    margin: 31px auto 15px;
    background-image: url(${YoutubeTranslation});
  }
`
export default ClientHome

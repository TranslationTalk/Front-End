import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, PageHeader } from '../../components/index'
import { Footer } from '../../components/index'
import loginBg from '../../assets/images/LoginBg.jpg'
import loginBgBig from '../../assets/images/LoginBgBig.jpg'
import { ReactComponent as Arrow } from '../../assets/icons/Arrow.svg'
import loginLogo from '../../assets/icons/Logo.svg'
import MainSection2 from '../../assets/images/MainSection2.png'
import MainSection3 from '../../assets/images/MainSection3.png'
import MainVisionSection from '../../assets/images/MainVisionSection.jpg'

const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID
const redirectUriClient = `https://translation-talk-efa1a.firebaseapp.com/oauth/callback/kakao/client`
const redirectUriTranslator = `https://translation-talk-efa1a.firebaseapp.com/oauth/callback/kakao/translator`

const Login = () => {
  const [scrollY, setScrollY] = useState(0)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  // innerWidth
  const useResize = () => {
    const listener = () => {
      setInnerWidth(window.innerWidth)
    }
    useEffect(() => {
      window.addEventListener('resize', listener)
      return () => {
        window.addEventListener('resize', listener)
      }
    }, [])
    return innerWidth
  }

  // 스크롤 위치
  const useScroll = () => {
    const listener = () => {
      setScrollY(window.pageYOffset)
    }
    useEffect(() => {
      window.addEventListener('scroll', listener)
      return () => {
        window.addEventListener('scroll', listener)
      }
    }, [])
    return scrollY
  }

  return (
    <LoginPage>
      <PageHeader />

      {/* 로그인 section */}
      <LoginSection>
        <div>
          <h2>
            <p>번역이 필요할 땐</p>
            <img src={loginLogo} alt="번역톡" />
            <p>실시간 번역 견적 플랫폼</p>
          </h2>
          <div>
            <a
              href={`https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUriClient}&response_type=code`}
            >
              <Button
                content="카카오톡으로 로그인"
                bgColor="#F9E000"
                color="#000"
              />
            </a>
            <a
              href={`https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUriTranslator}&response_type=code`}
            >
              번역가로 로그인하기
              <i>
                {useResize() > 640 ? (
                  <Arrow fill="#000" width="24px" height="24px" />
                ) : (
                  <Arrow fill="#fff" width="24px" height="24px" />
                )}
              </i>
            </a>
          </div>
        </div>
      </LoginSection>

      <TextSection1 useScroll={useScroll()}>
        <h2>원하는 번역가를 선택할 수 있어요</h2>
        <p>합리적인 가격과, 평점, 리뷰를 보고 직접 번역가를 선택하세요</p>
      </TextSection1>

      <TextSection2 useScroll={useScroll()}>
        <h2>
          <span>전문가에게</span>
          <span>번역을 의뢰하고</span>
          <span>견적을 비교해 보고</span>
        </h2>
        <img
          src={MainSection2}
          alt="전문가에게 번역을 의뢰하고 견적을 비교해 보고"
        />
      </TextSection2>

      <TextSection3 useScroll={useScroll()}>
        <div>
          <h2>
            <span>나에게 맞는</span>
            <span>번역 전문가를</span>
            <span>직접 선택해 보세요</span>
          </h2>
          <img src={MainSection3} alt="나에게 맞는 전문가를 선택해 보세요" />
        </div>
      </TextSection3>

      <VisionSection useScroll={useScroll()}>
        <h2>
          <span>번역톡은 여러분과</span>
          <span> 함께 성장합니다</span>
        </h2>
        <p>
          <span>수 많은 고객이 이용하는</span>
          <span> 성장 플랫폼 번역톡</span>
          <span> 지금 바로 이용해 보세요!</span>
        </p>
      </VisionSection>
      <Footer />
    </LoginPage>
  )
}

// 스크롤 애니메이션
const LoginPage = styled.div`
  @keyframes show {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes disappear {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(50px);
    }
  }
`

// 로그인 섹션
const LoginSection = styled.section`
  height: 100vh;
  background-image: url(${loginBg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
  box-sizing: border-box;
  h2 {
    animation: show 2s;
  }
  > div {
    position: relative;
    display: inline-block;
    height: 100vh;
    padding-top: 132px;
    padding-bottom: 132px;
    p:first-child {
      font-size: 36px;
      margin-bottom: 13px;
      line-height: 1.4;
    }
    img {
      width: 179px;
    }
    p:nth-child(3) {
      margin-top: 20px;
      color: var(--main-color);
      font-size: 20px;
      font-weight: 800;
    }
    /* 카카오 로그인, 번역가로 로그인 */
    div {
      position: absolute;
      bottom: 100px;
      left: 50%;
      width: 100%;
      transform: translateX(-50%);
      button {
        display: block;
        bottom: 10px;
        max-width: 320px;
        margin: 11px auto;
      }
      a {
        padding-top: 15px;
        color: #fff;
        line-height: 1.2;
        font-size: var(--fs-18);
        cursor: pointer;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
      }
      i {
        display: inline-block;
        transition: all 0.5s;
        svg {
          margin-bottom: -5px;
        }
      }
      a:last-child i {
        transform: translateX(5px);
      }
    }
    @media screen and (min-width: 640px) {
      display: inline-block;
      right: 20%;
      h2 {
        animation: none;
      }
      p:first-child {
        font-weight: 300;
        font-size: 49px;
      }
      img {
        width: 323px;
      }
      p:nth-child(3) {
        font-size: 30px;
      }
      div {
        bottom: 100px;
        button {
          margin: 14px auto;
        }
        a {
          font-size: 24px;
          color: #000;
          text-shadow: none;
          i svg {
            margin-bottom: -2px;
          }
        }
      }
    }
  }
  @media screen and (min-width: 640px) {
    margin-top: 80px;
    background-image: url(${loginBgBig});
    height: 748px;
    > div {
      height: 748px;
      padding-top: 241px;
    }
  }
`

// TextSection1
const TextSection1 = styled.section`
  text-align: center;
  h2 {
    width: 250px;
    margin: 50px auto 14px;
    color: var(--main-color);
    line-height: 1.4;
    font-weight: 700;
    font-size: 36px;
    opacity: ${({ useScroll }) => (useScroll > 200 ? 1 : 0)};
    animation: ${({ useScroll }) => (useScroll > 200 ? 'show' : 'disappear')}
      1.5s;
  }
  p {
    margin: 0 auto 50px;
    width: 260px;
    line-height: 1.36;
    font-size: 20px;
    opacity: ${({ useScroll }) => (useScroll > 200 ? 1 : 0)};
    animation: ${({ useScroll }) => (useScroll > 200 ? 'show' : 'disappear')} 2s;
  }
  @media screen and (min-width: 640px) {
    h2,
    p {
      width: 100%;
      opacity: 1;
      animation: none;
    }
  }
`

// section2
const TextSection2 = styled.section`
  text-align: center;
  background-color: var(--light-gray);
  padding: 56px 20px;
  h2 {
    padding-bottom: 32px;
    max-width: 300px;
    margin: auto;
    font-weight: bold;
    font-size: 28px;
    line-height: 1.6;
  }
  img {
    width: 320px;
    opacity: ${({ useScroll }) => (useScroll > 700 ? 1 : 0)};
    animation: ${({ useScroll }) => (useScroll > 700 ? 'show' : 'disappear')} 2s;
  }
  span {
    display: inline-block;
  }
  @media screen and (min-width: 768px) {
    display: flex;
    padding: 100px 0;
    justify-content: center;
    flex-direction: row-reverse;
    h2 {
      margin: auto 0 0;
      padding-bottom: 20px;
      font-size: 45px;
      text-align: left;
      white-space: nowrap;
    }
    span {
      display: block;
    }
    img {
      margin-right: 20px;
      width: 412px;
      opacity: ${({ useScroll }) => (useScroll > 200 ? 1 : 0)};
      animation: ${({ useScroll }) => (useScroll > 200 ? 'show' : 'disappear')}
        2s;
    }
  }
`

// section3
const TextSection3 = styled.section`
  height: 509px;
  background-color: var(--main-color);
  text-align: center;
  h2 {
    padding: 56px 0 32px;
    color: #fff;
    line-height: 1.6;
    font-size: 28px;
    font-weight: 700;
    white-space: nowrap;
  }
  img {
    width: 208px;
    opacity: ${({ useScroll }) => (useScroll > 1100 ? 1 : 0)};
    animation: ${({ useScroll }) => (useScroll > 1100 ? 'show' : 'disappear')}
      2s;
  }
  span {
    display: block;
  }
  @media screen and (min-width: 768px) {
    height: 592px;
    padding: 119px 0 0;
    padding-top: 119px;
    div {
      display: flex;
      justify-content: center;
      h2 {
        margin: 140px 63px 0 0;
        font-size: 45px;
        text-align: right;
      }
      img {
        width: 359px;
        opacity: ${({ useScroll }) => (useScroll > 700 ? 1 : 0)};
        animation: ${({ useScroll }) =>
            useScroll > 700 ? 'show' : 'disappear'}
          2s;
      }
    }
  }
`

// visionSection
const VisionSection = styled.section`
  position: relative;
  text-align: center;
  padding: 56px 0;
  color: #fff;
  background-image: url(${MainVisionSection});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 35% 20%;
  z-index: 1;
  h2 {
    margin: 0 auto 18px;
    font-weight: bold;
    width: 245px;
    font-size: 32px;
    line-height: 1.4;
    opacity: ${({ useScroll }) => (useScroll > 1500 ? 1 : 0)};
    animation: ${({ useScroll }) => (useScroll > 1500 ? 'show' : 'disappear')}
      1.5s;
  }
  p {
    margin: auto;
    font-size: 18px;
    line-height: 1.4;
    opacity: ${({ useScroll }) => (useScroll > 1600 ? 1 : 0)};
    animation: ${({ useScroll }) => (useScroll > 1600 ? 'show' : 'disappear')}
      2s;
  }
  span {
    display: block;
  }
  @media screen and (min-width: 640px) {
    h2 {
      width: 100%;
      opacity: ${({ useScroll }) => (useScroll > 1000 ? 1 : 0)};
      animation: ${({ useScroll }) => (useScroll > 1000 ? 'show' : 'disappear')}
        1.5s;
    }
    span {
      display: inline;
    }
    p {
      opacity: ${({ useScroll }) => (useScroll > 1000 ? 1 : 0)};
      animation: ${({ useScroll }) => (useScroll > 1000 ? 'show' : 'disappear')}
        2s;
    }
  }
`

export default Login

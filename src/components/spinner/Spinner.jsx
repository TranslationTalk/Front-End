/**
 * Spinner
 *
 * loading시 보여지는 컴포넌트
 *
 * loadingTitle : 로그인 중, 정보를 가져오는 중 등등 단어가 아닌 문장으로 전달 (string)
 */
import React from 'react'
import propTypes from 'prop-types'
import { ReactComponent as Logo } from '../../assets/icons/Logo.svg'
import styled from 'styled-components'

const Spinner = ({ loadingTitle }) => {
  return (
    <Wrap>
      <Circle />
      <p>{loadingTitle}</p>
      <Logo />
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--white);
  p {
    font-size: var(--fs-18);
    font-weight: bold;
    margin-bottom: 15px;
  }
`

const Circle = styled.div`
  width: 7px;
  height: 7px;
  animation: rotate 1s infinite linear;
  border-radius: 50%;
  margin-bottom: 50px;
  box-shadow: 0px -30px 0px 0px var(--main-color),
    -15px -26px 0 0px rgba(61, 80, 255, 0.93),
    -26px -15px 0 0px rgba(61, 80, 255, 0.86),
    -30px 0px 0 0px rgba(61, 80, 255, 0.65),
    -26px 15px 0 0px rgba(61, 80, 255, 0.44),
    -15px 26px 0 0px rgba(61, 80, 255, 0.3),
    0px 30px 0 0px rgba(61, 80, 255, 0.3),
    15px 26px 0 0px rgba(61, 80, 255, 0.3),
    26px 15px 0 0px rgba(61, 80, 255, 0.3),
    30px 0px 0 0px rgba(61, 80, 255, 0.3),
    26px -15px 0 0px rgba(61, 80, 255, 0.3),
    15px -26px 0 0px rgba(61, 80, 255, 0.3);

  @keyframes rotate {
    0%,
    100% {
      box-shadow: 0px -30px 0px 0px var(--main-color),
        -15px -26px 0 0px rgba(61, 80, 255, 0.93),
        -26px -15px 0 0px rgba(61, 80, 255, 0.86),
        -30px 0px 0 0px rgba(61, 80, 255, 0.65),
        -26px 15px 0 0px rgba(61, 80, 255, 0.44),
        -15px 26px 0 0px rgba(61, 80, 255, 0.3),
        0px 30px 0 0px rgba(61, 80, 255, 0.3),
        15px 26px 0 0px rgba(61, 80, 255, 0.3),
        26px 15px 0 0px rgba(61, 80, 255, 0.3),
        30px 0px 0 0px rgba(61, 80, 255, 0.3),
        26px -15px 0 0px rgba(61, 80, 255, 0.3),
        15px -26px 0 0px rgba(61, 80, 255, 0.3);
    }
    8.3% {
      box-shadow: 0px -30px 0px 0px rgba(61, 80, 255, 0.93),
        -15px -26px 0 0px rgba(61, 80, 255, 0.86),
        -26px -15px 0 0px rgba(61, 80, 255, 0.65),
        -30px 0px 0 0px rgba(61, 80, 255, 0.44),
        -26px 15px 0 0px rgba(61, 80, 255, 0.3),
        -15px 26px 0 0px rgba(61, 80, 255, 0.3),
        0px 30px 0 0px rgba(61, 80, 255, 0.3),
        15px 26px 0 0px rgba(61, 80, 255, 0.3),
        26px 15px 0 0px rgba(61, 80, 255, 0.3),
        30px 0px 0 0px rgba(61, 80, 255, 0.3),
        26px -15px 0 0px rgba(61, 80, 255, 0.3),
        15px -26px 0 0px var(--main-color);
    }
    16.6% {
      box-shadow: 0px -30px 0px 0px rgba(61, 80, 255, 0.86),
        -15px -26px 0 0px rgba(61, 80, 255, 0.65),
        -26px -15px 0 0px rgba(61, 80, 255, 0.44),
        -30px 0px 0 0px rgba(61, 80, 255, 0.3),
        -26px 15px 0 0px rgba(61, 80, 255, 0.3),
        -15px 26px 0 0px rgba(61, 80, 255, 0.3),
        0px 30px 0 0px rgba(61, 80, 255, 0.3),
        15px 26px 0 0px rgba(61, 80, 255, 0.3),
        26px 15px 0 0px rgba(61, 80, 255, 0.3),
        30px 0px 0 0px rgba(61, 80, 255, 0.3),
        26px -15px 0 0px var(--main-color),
        15px -26px 0 0px rgba(61, 80, 255, 0.93);
    }
    25% {
      box-shadow: 0px -30px 0px 0px rgba(61, 80, 255, 0.65),
        -15px -26px 0 0px rgba(61, 80, 255, 0.44),
        -26px -15px 0 0px rgba(61, 80, 255, 0.3),
        -30px 0px 0 0px rgba(61, 80, 255, 0.3),
        -26px 15px 0 0px rgba(61, 80, 255, 0.3),
        -15px 26px 0 0px rgba(61, 80, 255, 0.3),
        0px 30px 0 0px rgba(61, 80, 255, 0.3),
        15px 26px 0 0px rgba(61, 80, 255, 0.3),
        26px 15px 0 0px rgba(61, 80, 255, 0.3), 30px 0px 0 0px var(--main-color),
        26px -15px 0 0px rgba(61, 80, 255, 0.93),
        15px -26px 0 0px rgba(61, 80, 255, 0.86);
    }
    33.2% {
      box-shadow: 0px -30px 0px 0px rgba(61, 80, 255, 0.44),
        -15px -26px 0 0px rgba(61, 80, 255, 0.3),
        -26px -15px 0 0px rgba(61, 80, 255, 0.3),
        -30px 0px 0 0px rgba(61, 80, 255, 0.3),
        -26px 15px 0 0px rgba(61, 80, 255, 0.3),
        -15px 26px 0 0px rgba(61, 80, 255, 0.3),
        0px 30px 0 0px rgba(61, 80, 255, 0.3),
        15px 26px 0 0px rgba(61, 80, 255, 0.3),
        26px 15px 0 0px var(--main-color),
        30px 0px 0 0px rgba(61, 80, 255, 0.93),
        26px -15px 0 0px rgba(61, 80, 255, 0.86),
        15px -26px 0 0px rgba(61, 80, 255, 0.65);
    }
    41.5% {
      box-shadow: 0px -30px 0px 0px rgba(61, 80, 255, 0.3),
        -15px -26px 0 0px rgba(61, 80, 255, 0.3),
        -26px -15px 0 0px rgba(61, 80, 255, 0.3),
        -30px 0px 0 0px rgba(61, 80, 255, 0.3),
        -26px 15px 0 0px rgba(61, 80, 255, 0.3),
        -15px 26px 0 0px rgba(61, 80, 255, 0.3),
        0px 30px 0 0px rgba(61, 80, 255, 0.3), 15px 26px 0 0px var(--main-color),
        26px 15px 0 0px rgba(61, 80, 255, 0.93),
        30px 0px 0 0px rgba(61, 80, 255, 0.86),
        26px -15px 0 0px rgba(61, 80, 255, 0.65),
        15px -26px 0 0px rgba(61, 80, 255, 0.44);
    }
    50% {
      box-shadow: 0px -30px 0px 0px rgba(61, 80, 255, 0.3),
        -15px -26px 0 0px rgba(61, 80, 255, 0.3),
        -26px -15px 0 0px rgba(61, 80, 255, 0.3),
        -30px 0px 0 0px rgba(61, 80, 255, 0.3),
        -26px 15px 0 0px rgba(61, 80, 255, 0.3),
        -15px 26px 0 0px rgba(61, 80, 255, 0.3),
        0px 30px 0 0px var(--main-color),
        15px 26px 0 0px rgba(61, 80, 255, 0.93),
        26px 15px 0 0px rgba(61, 80, 255, 0.86),
        30px 0px 0 0px rgba(61, 80, 255, 0.65),
        26px -15px 0 0px rgba(61, 80, 255, 0.44),
        15px -26px 0 0px rgba(61, 80, 255, 0.3);
    }
    66.6% {
      box-shadow: 0px -30px 0px 0px rgba(61, 80, 255, 0.3),
        -15px -26px 0 0px rgba(61, 80, 255, 0.3),
        -26px -15px 0 0px rgba(61, 80, 255, 0.3),
        -30px 0px 0 0px rgba(61, 80, 255, 0.3),
        -26px 15px 0 0px rgba(61, 80, 255, 0.3),
        -15px 26px 0 0px var(--main-color),
        0px 30px 0 0px rgba(61, 80, 255, 0.93),
        15px 26px 0 0px rgba(61, 80, 255, 0.86),
        26px 15px 0 0px rgba(61, 80, 255, 0.65),
        30px 0px 0 0px rgba(61, 80, 255, 0.44),
        26px -15px 0 0px rgba(61, 80, 255, 0.3),
        15px -26px 0 0px rgba(61, 80, 255, 0.3);
    }
    75% {
      box-shadow: 0px -30px 0px 0px rgba(61, 80, 255, 0.3),
        -15px -26px 0 0px rgba(61, 80, 255, 0.3),
        -26px -15px 0 0px rgba(61, 80, 255, 0.3),
        -30px 0px 0 0px rgba(61, 80, 255, 0.3),
        -26px 15px 0 0px var(--main-color),
        -15px 26px 0 0px rgba(61, 80, 255, 0.93),
        0px 30px 0 0px rgba(61, 80, 255, 0.86),
        15px 26px 0 0px rgba(61, 80, 255, 0.65),
        26px 15px 0 0px rgba(61, 80, 255, 0.44),
        30px 0px 0 0px rgba(61, 80, 255, 0.3),
        26px -15px 0 0px rgba(61, 80, 255, 0.3),
        15px -26px 0 0px rgba(61, 80, 255, 0.3);
    }
    83.3% {
      box-shadow: 0px -30px 0px 0px rgba(61, 80, 255, 0.3),
        -15px -26px 0 0px rgba(61, 80, 255, 0.3),
        -26px -15px 0 0px rgba(61, 80, 255, 0.3),
        -30px 0px 0 0px var(--main-color),
        -26px 15px 0 0px rgba(61, 80, 255, 0.93),
        -15px 26px 0 0px rgba(61, 80, 255, 0.86),
        0px 30px 0 0px rgba(61, 80, 255, 0.65),
        15px 26px 0 0px rgba(61, 80, 255, 0.44),
        26px 15px 0 0px rgba(61, 80, 255, 0.3),
        30px 0px 0 0px rgba(61, 80, 255, 0.3),
        26px -15px 0 0px rgba(61, 80, 255, 0.3),
        15px -26px 0 0px rgba(61, 80, 255, 0.3);
    }
    91.6% {
      box-shadow: 0px -30px 0px 0px rgba(61, 80, 255, 0.3),
        -15px -26px 0 0px rgba(61, 80, 255, 0.3),
        -26px -15px 0 0px var(--main-color),
        -30px 0px 0 0px rgba(61, 80, 255, 0.93),
        -26px 15px 0 0px rgba(61, 80, 255, 0.86),
        -15px 26px 0 0px rgba(61, 80, 255, 0.65),
        0px 30px 0 0px rgba(61, 80, 255, 0.44),
        15px 26px 0 0px rgba(61, 80, 255, 0.3),
        26px 15px 0 0px rgba(61, 80, 255, 0.3),
        30px 0px 0 0px rgba(61, 80, 255, 0.3),
        26px -15px 0 0px rgba(61, 80, 255, 0.3),
        15px -26px 0 0px rgba(61, 80, 255, 0.3);
    }
  }
`

Spinner.propTypes = {
  loadingTitle: propTypes.string,
}

export default Spinner

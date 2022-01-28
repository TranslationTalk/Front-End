/**
 * list에 보여줄 것이 아무것도 없을 때 사용
 *
 * listName: 들어갈 문장
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as LogoGray } from '../../assets/icons/Logo.svg'
import styled from 'styled-components'

const NoList = ({ listName }) => {
  return (
    <Wrap>
      <LogoGray fill="#C4C4C4" />
      <h3>{listName}</h3>
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
  padding: 50px 0;
  svg {
    margin-bottom: 25px;
  }
  h3 {
    font-size: var(--fs-18);
    font-weight: bold;
  }
`

NoList.propTypes = {
  listName: PropTypes.string,
}

export default NoList

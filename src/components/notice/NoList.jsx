/**
 * list에 보여줄 것이 아무것도 없을 때 사용
 *
 * listName: 어떤 종류인지 ("리뷰", "의뢰", "견적"...)
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as LogoGray } from '../../assets/icons/Logo.svg'
import styled from 'styled-components'

const NoList = ({ listName }) => {
  return (
    <Wrap>
      <LogoGray fill="#C4C4C4" />
      <h3>아직 받은 {listName}가 없어요.</h3>
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

/*
 태그 컴포넌트
 text: 태그 내용
 textColor: 태그 글자 색
 backgroundColor: 태그 배경 색
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Tag = ({ text, bgColor, color }) => {
  return (
    <TagBox bgColor={bgColor} color={color}>
      <p>{text}</p>
      <div style={{ width: '20px', fontSize: '20px' }}>
        <span></span>
      </div>
    </TagBox>
  )
}

const TagBox = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  margin-right: 5px;
  background: ${props => props.bgColor};
  & p {
    color: ${props => props.color};
  }
`
Tag.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  bgColor: PropTypes.string,
}

export default Tag

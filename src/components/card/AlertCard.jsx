/*
  알림카드 
  type : warning, notice, tip (이 세가지 타입만 받을 수 있으며 이에 맞는 스타일이 적용된다.)
  text : 알림카드의 내용을 받아온다.
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import warning from '../../assets/icons/alert_card_warning.png'
import notice from '../../assets/icons/alert_card_notice.png'
import tip from '../../assets/icons/alert_card_tip.png'

const AlertCard = ({ text, type }) => {
  return (
    <Card>
      <div className={type}>
        <h5>
          <img
            src={type == 'warning' ? warning : type == 'notice' ? notice : tip}
            alt={type}
          />
          {head(type)}
        </h5>
        <p>{text}</p>
      </div>
    </Card>
  )
}

const head = type => {
  switch (type) {
    case 'warning':
      return '경고'
    case 'notice':
      return '알림'
    case 'tip':
      return 'TIP'
    default:
      console.log(
        'AlertCard 컴포넌츠의 type에는 warning, notice, tip 만 입력 가능합니다. ',
      )
      return
  }
}

const Card = styled.div`
  & div {
    display: inlin-block;
    margin: 10px;
    padding: 20px;
    border-radius: 5px;
  }
  & .warning {
    border: 1px solid #e9e0e3;
    background: #fef8f8;
    color: #bd3d4a;
  }
  & .notice {
    border: 1px solid #d2e0d3;
    background: #eefaf0;
    color: #42784b;
  }
  & .tip {
    border: 1px solid #d6dbdf;
    background: #f3f8fe;
    color: #29598a;
  }
  & h5 {
    line-height: 30px;
    font-weight: bold;
    & img {
      vertical-align: middle;
      margin-right: 5px;
      margin-top: -5px;
    }
  }
  & p {
    margin-left: 15px;
    line-height: 25px;
  }
`

AlertCard.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
}

export default AlertCard

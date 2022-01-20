import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import profileImg from '../../assets/images/blueStar.png'
import { Tag } from '../index'

const TranslatorInfo = ({
  name,
  profileUrl,
  totalTrans,
  totalReviews,
  avgReviews,
  taxPossible,
  cashPossible,
  isBusiness,
  introduce,
}) => {
  return (
    <>
      <Profile>
        <Img
          src={profileImg ?? profileUrl}
          alt="프로필이미지"
          width="90px"
          height="90px"
        />
        <TransLatorInfo>
          <Name>{name} 번역가님</Name>
          <Total>
            <p>
              번역 {totalTrans}건 리뷰 {totalReviews}건
            </p>
            <img src={profileImg} alt="별점이미지" width="16px" height="16px" />
            <span>{avgReviews}</span>
          </Total>
          {taxPossible && <Tag text="세금명세서 가능" bgColor="#FCBBBB" />}
          {cashPossible && <Tag text="현금영수증 가능" bgColor="#FCBBBB" />}
          {isBusiness && <Tag text="사업자 확인" bgColor="#FCBBBB" />}
        </TransLatorInfo>
      </Profile>
      <Introduce>{introduce}</Introduce>
    </>
  )
}

const Profile = styled.div`
  display: flex;
`

const Img = styled.img`
  width: ${props => (props.width ? props.width : ``)};
  height: ${props => (props.height ? props.height : ``)};
  background-color: #999;
`

const TransLatorInfo = styled.div`
  padding: 10px;
`

const Name = styled.div``

const Total = styled.div``

const Introduce = styled.div``

TranslatorInfo.propTypes = {
  name: PropTypes.string,
  profileUrl: PropTypes.string,
  totalTrans: PropTypes.number,
  totalReviews: PropTypes.number,
  avgReviews: PropTypes.number,
  taxPossible: PropTypes.bool,
  cashPossible: PropTypes.bool,
  isBusiness: PropTypes.bool,
  introduce: PropTypes.string,
}

export default TranslatorInfo

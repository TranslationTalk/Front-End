import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import profileImg from '../../assets/images/TranslatorThumb.png'
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
    <Profile>
      <div>
        <img src={profileUrl ?? profileImg} alt={name + '프로필이미지'} />
        <TransLatorInfo>
          <p>
            <b>{name}</b> <span>번역가님</span>
          </p>
          <p>
            <span>번역 {totalTrans ?? 0}건</span>
            <span>리뷰 {totalReviews ?? 0}건</span>
            <span>
              {totalReviews ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                      fill="#FF5F5F"
                    />
                  </svg>
                  <b>{avgReviews}</b>
                </>
              ) : null}
            </span>
          </p>
          <div>
            {taxPossible && (
              <Tag text="세금명세서" bgColor="#3D51FF" color="#fff" />
            )}
            {cashPossible && (
              <Tag text="현금영수증" bgColor="#3D51FF" color="#fff" />
            )}
            {isBusiness && <Tag text="사업자" bgColor="#3D51FF" color="#fff" />}
          </div>
        </TransLatorInfo>
      </div>
      <p>{introduce}</p>
    </Profile>
  )
}

const Profile = styled.div`
  & > div {
    display: flex;
    margin-bottom: 17px;
  }
  & img {
    margin-right: 21px;
    width: 93px;
    height: 93px;
  }
  & b {
    font-weight: bold;
  }
`

const TransLatorInfo = styled.div`
  margin-top: 9px;
  & > p {
    font-size: var(--fs-14);
    line-height: 1.4;
    &:first-child > span {
      opacity: 0.4;
    }
    & > span {
      margin-right: 8px;
    }
    & > b {
      font-size: var(--fs-18);
    }
    & svg {
      margin-bottom: -2px;
      margin-right: 2px;
    }
  }
  & > div {
    margin-top: 10px;
    & > div {
      font-size: var(--fs-12);
      margin-top: 2px;
    }
  }
`

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

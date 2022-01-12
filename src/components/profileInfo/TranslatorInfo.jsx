import React from 'react'
import styled from 'styled-components'
import profileImg from '../../assets/images/blueStar.png'
import { Tag } from '../index'

const TranslatorInfo = () => {
  return (
    <>
      <Profile>
        <Img src={profileImg} alt="프로필이미지" width="90px" height="90px" />
        <TransLatorInfo>
          <Name>안상국 번역가님</Name>
          <Total>
            번역 123건 리뷰 31건{' '}
            <img src={profileImg} alt="별점이미지" width="16px" height="16px" />{' '}
            4.5
          </Total>
          <Tag text="사업자 확인" bgColor="#FCBBBB" />
          <Tag text="현금영수증 가능" bgColor="#FCBBBB" />
          <Tag text="세금명세서 가능" bgColor="#FCBBBB" />
        </TransLatorInfo>
      </Profile>
      <Introduce>자기소개 적는 곳입니다.</Introduce>
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

export default TranslatorInfo

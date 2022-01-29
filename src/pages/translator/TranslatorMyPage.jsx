import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  PageHeader,
  TranslatorInfo,
  ReviewCard,
  NavigationTranslator,
  Tag,
  NoList,
} from '../../components/index'
import { apis } from '../../utils/axios'

const TranslatorMyPage = () => {
  const [translatorInfo, setTranslatorInfo] = useState(null)
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMyInformation = async () => {
      const {
        data: { data: infoData },
      } = await apis.getTranslatorMypage()
      setTranslatorInfo(infoData)

      const {
        data: { data: reviewData },
      } = await apis.getReviews(infoData.translatorId)
      console.log(reviewData)
      setReviews([...reviews, ...reviewData])
    }
    fetchMyInformation()
  }, [])

  const gotoSetting = () => {
    navigate(`/translator/mypage/setting`)
  }

  return (
    <>
      <PageHeader
        title="마이페이지"
        useSettingButton
        settingEvent={gotoSetting}
      />
      <Wrap>
        <TranslatorInfo
          name={translatorInfo?.name}
          profileUrl={translatorInfo?.profileUrl}
          totalTrans={translatorInfo?.totalTrans}
          totalReviews={translatorInfo?.totalReviews}
          avgReviews={translatorInfo?.avgReviews}
          taxPossible={translatorInfo?.taxPossible}
          cashPossible={translatorInfo?.cashPossible}
          isBusiness={translatorInfo?.isBusiness}
          introduce={translatorInfo?.introduce}
        />
        <MidTitle>
          <h2>내가 받은 리뷰</h2>
          <Tag
            text={translatorInfo?.totalReviews.toString()}
            bgColor="#FF5F5F"
            color="#FFFFFF"
          />
        </MidTitle>
        {reviews.length === 0 ? (
          <NoList listName="리뷰" />
        ) : (
          reviews.map((review, index) => (
            <ReviewCard
              key={index}
              userName={review.name}
              score={review.score}
              comment={review.comment}
              date={review.date}
            />
          ))
        )}
      </Wrap>
      <NavigationTranslator />
    </>
  )
}

const Wrap = styled.div`
  padding: 76px 20px 0 20px;
`

const MidTitle = styled.div`
  margin: 30px 0 16px;
  padding-bottom: 9px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--gray-c4);
  h2 {
    font-size: var(--fs-16);
    margin-right: 8px;
  }
`

export default TranslatorMyPage

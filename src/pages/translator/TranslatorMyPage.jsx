import React, { useEffect, useState } from 'react'
import {
  PageHeader,
  TranslatorInfo,
  ReviewCard,
  NavigationTranslator,
} from '../../components/index'
import { apis } from '../../utils/axios'

const TranslatorMyPage = () => {
  const [translatorInfo, setTranslatorInfo] = useState(null)
  const [reviews, setReviews] = useState([
    { name: '', score: 4.5, comment: 'nice', date: '2022-01-24' },
  ])
  console.log(translatorInfo)

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

  return (
    <>
      <PageHeader title="마이페이지" />
      <TranslatorInfo
        name={translatorInfo.name}
        profileUrl={translatorInfo.profileUrl}
        totalTrans={translatorInfo.totalTrans}
        totalReviews={translatorInfo.totalReviews}
        avgReviews={translatorInfo.avgReviews}
        taxPossible={translatorInfo.taxPossible}
        cashPossible={translatorInfo.cashPossible}
        isBusiness={translatorInfo.isBusiness}
        introduce={translatorInfo.introduce}
      />
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          userName={review.name}
          score={review.score}
          comment={review.comment}
          date={review.date}
        />
      ))}
      <NavigationTranslator />
    </>
  )
}

export default TranslatorMyPage

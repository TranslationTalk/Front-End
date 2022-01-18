import React from 'react'
import { PageHeader, TranslatorInfo, ReviewCard } from '../../components/index'
import { apis } from '../../utils/axios'

const TranslatorMyPage = () => {
  React.useEffect(() => {
    apis.getReview().then(res => console.log(res.data))
  })
  return (
    <>
      <PageHeader />
      <TranslatorInfo />
      <ReviewCard
        userName="홍길동"
        score={4.5}
        comment="잘해주세요"
        date="2022-01-17"
      />
      <ReviewCard
        userName="김길동"
        score={5}
        comment="만족스럽습니다."
        date="2022-01-18"
      />
    </>
  )
}

export default TranslatorMyPage

/*
  Client 
  견적요청 form -> 견적요청List -> 받은 견적List -> 번역가 상세페이지*
  번역가 상세페이지
*/
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { clientAPIs } from '../../utils/axios'
import {
  Button,
  EstimateDetail,
  NoList,
  ReviewCard,
  Spinner,
  SubPageHeader,
  ToggleMenu,
  TranslatorInfo,
} from '../../components'
import styled from 'styled-components'

const TranslatorDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [estimate, setEstimate] = useState([])
  const [status, setsStatus] = useState('')
  const [review, setReview] = useState()
  const [clickNumber, setClickNumber] = useState(0)
  const [loading, setLoading] = useState(false)

  //비동기처리: 번역 견적
  useEffect(() => {
    setLoading(true)
    const fetchEstimateList = async () => {
      const {
        data: { data },
      } = await clientAPIs.requestEstimate(
        location.state.requestId,
        location.state.estimateId,
      )
      setEstimate(data)
      setsStatus(data.status)
      setLoading(false)
    }
    fetchEstimateList()
  }, [status])

  //비동기처리: 번역가 리뷰
  useEffect(() => {
    if (!estimate.translatorId) return
    const reviewList = async () => {
      const {
        data: { data },
      } = await clientAPIs.requestReview(estimate.translatorId)
      setReview(data)
    }
    reviewList()
  }, [estimate])

  // 상담하기 Btn
  // 채팅방 생성 -> navigate로 바로 채팅방이동
  const consultBtn = () => {
    if (estimate.roomId === 0) {
      clientAPIs
        .addChatroom(location.state.estimateId)
        .then(data => {
          alert(`roomId ${data.data.id}번 생성`)
          navigate(`/chat/${data.data.id}`, {
            state: {
              roomId: data.data.id,
              estimateId: location.state.estimateId,
              requestId: location.state.requestId,
              anothername: estimate.name,
              createdTime: data.data.createdAt,
            },
          })
        })
        .catch(e => alert(`${e}`))
    } else {
      navigate(`/chat/${estimate.roomId}`, {
        state: {
          roomId: estimate.roomId,
          estimateId: location.state.estimateId,
          requestId: location.state.requestId,
          anothername: estimate.name,
          createdTime: estimate.roomCreateAt,
        },
      })
    }
  }

  // 확정하기 Btn
  // status  ready => done 변경
  const confirmed = () => {
    if (estimate.status === 'ready') {
      clientAPIs
        .TranslatorConfirmed(
          location.state.requestId,
          location.state.estimateId,
        )
        .then(() => {
          alert(`확정 완료`)
          setsStatus('processing')
        })
        .catch(e => alert(`${e}`))
    }
  }

  // 확정 버튼 show여부
  const confirmedBtn = status => {
    if (estimate.roomId === 0) {
      return null
    }
    switch (status) {
      case 'ready':
        return <Button content="확정하기" onClick={confirmed} />
      case 'processing':
        return <Button content="확정 완료" bgColor="#C4C4C4" />
      case 'done':
        return <Button content="거래 완료" bgColor="#C4C4C4" />
      default:
        return <p>요청기간이 3일 지났습니다.</p>
    }
  }

  // 토글 메뉴 선택된 넘버 set
  const handleToggleMenu = number => setClickNumber(number)

  return (
    <TranslatorDetailPage>
      <SubPageHeader title="번역가 소개" />
      <Info>
        <TranslatorInfo
          name={estimate.name}
          profileUrl={estimate.profileUrl}
          totalTrans={estimate.totalTrans}
          totalReivews={estimate.totalReviews}
          avgReviews={estimate.avgReviews}
          taxPossible={estimate.taxPossible}
          cashPossible={estimate.cashPossible}
          isBusiness={estimate.isBusiness}
          introduce={estimate.introduce}
        />
      </Info>
      <nav>
        <ToggleMenu
          menu={['번역 견적', '번역가님 리뷰']}
          click={clickNumber}
          onClick={handleToggleMenu}
        />
      </nav>

      <section>
        {clickNumber == 0 ? (
          //번역 견적
          <>
            <EstimateDetail
              offerPrice={estimate.offerPrice ?? 0}
              comment={estimate.comment ?? 'test'}
              confirmedDate={estimate.confirmedDate ?? '0000-00-00'}
            />

            <Button content="상담하기" onClick={consultBtn} />
            {/* 확정하기->확정완료->거래완료 */}
            {confirmedBtn(status)}
          </>
        ) : (
          //번역가 리뷰

          <>
            {review.length === 0 ? (
              <NoList listName="아직 리뷰가 없어요" />
            ) : (
              review?.map(el => (
                <ReviewCard
                  key={el.id}
                  userName={el.clientId}
                  score={el.score}
                  comment={el.comment}
                  date={el.reviewDate}
                />
              ))
            )}

            <Button
              content="리뷰쓰기"
              border
              onClick={() => {
                navigate(`/client/review`, {
                  state: { requestId: estimate.requestId },
                })
              }}
            />
          </>
        )}
      </section>
      {loading && <Spinner loadingTitle="내 번역 가져오는 중" />}
    </TranslatorDetailPage>
  )
}

const TranslatorDetailPage = styled.div`
  margin-top: 76px;
  nav {
    margin: 30px 20px 0;
  }
  > section {
    padding: 20px 0;
    button {
      margin: 20px auto;
      width: calc(100% - 40px);
      display: block;
    }
  }
`
const Info = styled.div`
  margin: 0 20px;
`

export default TranslatorDetail

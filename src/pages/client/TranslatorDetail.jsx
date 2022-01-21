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
  PageHeader,
  ToggleMenu,
  TranslatorInfo,
} from '../../components'

const TranslatorDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [estimate, setEstimate] = useState([])
  const [status, setsStatus] = useState('')

  //비동기처리
  useEffect(() => {
    const fetchEstimateList = async () => {
      const {
        data: { data },
      } = await clientAPIs.requestEstimate(
        location.state.requestId,
        location.state.estimateId,
      )
      setEstimate(data)
      setsStatus(data.status)
    }
    fetchEstimateList()
  }, [])

  // 상담하기 Btn
  // 채팅방 생성 -> navigate로 바로 채팅방이동
  const consultBtn = () => {
    if (estimate.roomId === 0) {
      clientAPIs
        .addChatroom(location.state.estimateId)
        .then(data => {
          console.log(data)
          alert(`roomId ${data.data.id}번 생성`)
          navigate(`/chat/${data.data.id}`, {
            state: { roomId: data.data.id },
          })
        })
        .catch(e => alert(`${e}`))
    } else {
      navigate(`/chat/${estimate.roomId}`, {
        state: { roomId: estimate.roomId },
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
        return <p>확정 완료</p>
      case 'done':
        return <p>거래 완료</p>
      default:
        return <p>요청기간이 3일 지났습니다.</p>
    }
  }

  return (
    <div>
      <PageHeader title="" />
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
      <ToggleMenu menu={['번역 견적', '번역가님 리뷰']} />
      <EstimateDetail
        offerPrice={estimate.offerPrice ?? 0}
        comment={estimate.comment ?? 'test'}
        confirmedDate={estimate.confirmedDate}
      />
      {confirmedBtn(status)}

      <Button content="상담하기" onClick={consultBtn} />
    </div>
  )
}

export default TranslatorDetail

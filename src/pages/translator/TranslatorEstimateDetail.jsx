import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  Button,
  StatusMessage,
  SubPageHeader,
  SummaryCard,
  VideoCard,
} from '../../components'
import { apis } from '../../utils/axios'

const TranslatorEstimateDetail = () => {
  const {
    state: { estimate },
  } = useLocation()
  const [estimateDetail, setEstimateDetail] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEstimate = async () => {
      const {
        data: { data },
      } = await apis.getEstimate(estimate.id)
      setEstimateDetail(data)
      console.log(data)
    }
    fetchEstimate()
  }, [])

  const gotoChatroom = () => {
    // chat 경로 바뀜 translator/chat/
    navigate(`/chat/${estimateDetail.roomId}`, {
      state: {
        estimateId: estimate.id,
        roomId: estimateDetail.roomId,
        anothername: estimateDetail.username,
        createdTime: estimateDetail.roomCreateAt,
      },
    })
  }

  const finishWork = async () => {
    console.log('작업 완료')
    const data = await apis.finishEstimate(estimate.id)
    console.log(data)
    // 일단 작업 완료 후 채팅방으로 이동하는 것으로 함

    // 작업 완료하면, 채팅방에서 자동으로 '작업 완료 되었습니다.' 보내주는 기능 추가 필요
    alert('작업 완료 처리가 되었습니다.')
    navigate(`/chat/${estimateDetail.roomId}`, {
      state: { roomId: estimateDetail.roomId },
    })
  }

  return (
    <>
      <SubPageHeader title="견적서" />
      <Wrap>
        <h2>번역 견적 제안서</h2>
        <RequestInfo>
          <Line />
          <SummaryCard
            userName={estimate.User.username}
            field={estimate.field}
            beforeLanguage={estimate.beforeLanguage}
            afterLanguage={estimate.afterLanguage}
            needs={estimate.needs}
            deadline={estimate.deadline}
            isText={estimate.isText}
            fileUrl={estimate.fileUrl}
          />
          {estimate.youtubeUrl !== '' && (
            <VideoCard youtubeUrl={estimate.youtubeUrl} />
          )}
        </RequestInfo>
        <CommentBox>
          <p>{estimateDetail?.comment}</p>
        </CommentBox>
        <Line />
        <SuggestWrap>
          <h3>목표일정</h3>
          <span>{estimateDetail?.confirmedDate}</span>
        </SuggestWrap>
        <SuggestWrap>
          <h3>견적금액</h3>
          <span>{estimateDetail?.offerPrice.toLocaleString()}원</span>
        </SuggestWrap>
        {estimateDetail?.roomId === 0 ? (
          <>
            <Button content="상담하기" bgColor="gray" />
            <StatusMessage
              text="요청자가 상담 요청을 하면 활성화됩니다."
              icon="info"
            />
          </>
        ) : (
          <>
            <Button content="상담하기" onClick={gotoChatroom} />
            {estimateDetail?.status === 'processing' ? (
              <Button content="작업완료" onClick={finishWork} />
            ) : (
              <>
                <Button content="작업완료" bgColor="gray" />
                <StatusMessage
                  text="요청자가 번역가를 확정하면 활성화됩니다."
                  icon="info"
                />
              </>
            )}
          </>
        )}
      </Wrap>
    </>
  )
}

const Wrap = styled.div`
  padding: 87px 20px 90px 20px;
  h2 {
    font-size: var(--fs-18);
    font-weight: 500;
  }
  & > button {
    margin-top: 20px;
  }
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--gray-bc);
  margin-bottom: 20px;
`

const RequestInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${Line} {
    margin-top: 19px;
    margin-bottom: 12px;
    background-color: #000;
  }
`

const CommentBox = styled.div`
  background-color: var(--light-blue);
  min-height: 100px;
  border-radius: 4px;
  margin: 24px 0;
  padding: 8px 12px;
  font-size: var(--fs-14);
`

const SuggestWrap = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--fs-14);
  margin-top: 12px;
  h3 {
    color: var(--gray);
  }
  span {
    font-weight: 500;
  }
`

export default TranslatorEstimateDetail

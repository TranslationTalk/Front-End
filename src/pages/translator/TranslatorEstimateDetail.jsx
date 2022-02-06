import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  Button,
  CommentBox,
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
    }
    fetchEstimate()
  }, [])

  const gotoChatroom = () => {
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
    await apis.finishEstimate(estimate.id)
    // 일단 작업 완료 후 채팅방으로 이동하는 것으로 함

    // 작업 완료하면, 채팅방에서 자동으로 '작업 완료 되었습니다.' 보내주는 기능 추가 필요
    alert('작업 완료 처리가 되었습니다.')
    navigate(`/chat/${estimateDetail.roomId}`, {
      state: {
        estimateId: estimate.id,
        roomId: estimateDetail.roomId,
        anothername: estimateDetail.username,
        createdTime: estimateDetail.roomCreateAt,
      },
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
            deadline={estimate.deadline}
            isText={estimate.isText}
            fileUrl={estimate.fileUrl}
          />
          <SectionTitle>번역 상세 요청</SectionTitle>
          <CommentBox comment={estimate.needs} />
          {estimate.youtubeUrl !== '' && (
            <VideoCard youtubeUrl={estimate.youtubeUrl} />
          )}
        </RequestInfo>
        <SectionTitle>의뢰자에게 전하는 말</SectionTitle>
        <CommentBox comment={estimateDetail?.comment} />
        <Line />
        <SuggestWrap>
          <SectionTitle>목표일정</SectionTitle>
          <span>{estimateDetail?.confirmedDate}</span>
        </SuggestWrap>
        <SuggestWrap>
          <SectionTitle>견적금액</SectionTitle>
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
                {estimateDetail?.status === 'done' ? (
                  <StatusMessage text="이미 완료된 거래입니다." icon="info" />
                ) : (
                  <StatusMessage
                    text="요청자가 번역가를 확정하면 활성화됩니다."
                    icon="info"
                  />
                )}
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
  & > div:nth-child(3) {
    margin-bottom: 20px;
  }
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--gray-bc);
  margin-top: 10px;
`

const SectionTitle = styled.h3`
  font-size: var(--fs-14);
  font-weight: 500;
  margin-bottom: 12px;
`

const RequestInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${Line} {
    margin-top: 19px;
    margin-bottom: 12px;
    background-color: #000;
  }
  & > div:nth-child(4),
  & > div:nth-child(5) {
    margin-bottom: 20px;
  }
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
  ${SectionTitle} {
    font-weight: normal;
  }
`

export default TranslatorEstimateDetail

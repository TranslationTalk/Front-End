/**
 * EstimateDetail
 * 견적 Detail에서 사용되는 견적서
 * offerPice: 견적 가격 number (여기서 ,포함된 string으로 변경)
 * comment: string (150자 이상 시 150자 자르고 ... 더보기/숨기기 기능)
 * confirmedDate: string (yyyy-mm-dd)
 */
import React, { useState } from 'react'
import propTypes from 'prop-types'
import { StatusMessage } from '..'
import styled from 'styled-components'

const EstimateDetail = ({ offerPrice, comment, confirmedDate }) => {
  const [commentShort, setCommentShort] = useState(true)

  const toggleComment = () => {
    setCommentShort(prev => !prev)
  }

  return (
    <Container>
      <Wrap>
        <Price>
          <span>견적가</span>
          <p>{offerPrice.toLocaleString()}원</p>
        </Price>
        <Comment>
          <span>코멘트</span>
          {comment.length > 150 ? (
            <>
              {commentShort ? (
                <p>
                  {`${comment.slice(0, 150)}...`}
                  <button onClick={toggleComment}>더 보기</button>
                </p>
              ) : (
                <p>
                  {comment}
                  <button onClick={toggleComment}>숨기기</button>
                </p>
              )}
            </>
          ) : (
            <p>{comment}</p>
          )}
        </Comment>
        <Deadline>
          <span>희망 마감 날짜</span>
          <p>{confirmedDate}</p>
        </Deadline>
      </Wrap>
      <Notification>
        <StatusMessage
          text="번역톡은 번역 및 결제를 책임지지 않습니다."
          color="blue"
          icon="!"
        />
      </Notification>
    </Container>
  )
}

const Container = styled.div`
  background-color: wheat;
  width: 90%;
  margin: auto;
`

const Wrap = styled.div`
  padding: 1rem;
  padding-bottom: 0;
`

const Price = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  & span {
    font-size: 1rem;
    font-weight: bold;
    color: blue;
    margin-bottom: 10px;
  }
  & p {
    font-size: 2rem;
    font-weight: bold;
    color: blue;
  }
`

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  & span {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  & > p {
    overflow-wrap: break-word;
  }
  & > p > button {
    border: none;
    background-color: transparent;
    font-size: 0.8rem;
    text-decoration: underline;
  }
`

const Deadline = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  & span {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  & p {
    font-size: 1rem;
    font-weight: bold;
    color: red;
  }
`

const Notification = styled.div`
  background-color: gray;
  padding: 2rem;
`

EstimateDetail.propTypes = {
  offerPrice: propTypes.number.isRequired,
  comment: propTypes.string,
  confirmedDate: propTypes.string.isRequired,
}

export default EstimateDetail

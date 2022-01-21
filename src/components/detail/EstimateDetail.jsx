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
                  <button onClick={toggleComment}>자세히 보기</button>
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
          <span>
            희망 마감 날짜 {confirmedDate?.split('-').join('.') ?? '0000-00-00'}
          </span>
        </Deadline>
      </Wrap>
      <Notification>
        <StatusMessage
          text="번역톡은 판매중개자로서 거래에 관련된 책임과 의무를 지지 않습니다."
          color="#383838"
          icon="info"
        />
      </Notification>
    </Container>
  )
}

const Container = styled.div`
  background-color: var(--white);
  width: 100%;
  margin: auto;
`

const Wrap = styled.div`
  padding: 0 20px 27px 20px;
`

const Price = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  & span {
    font-size: var(--fs-18);
    font-weight: bold;
    color: var(--main-color);
    margin-bottom: 14px;
  }
  & p {
    font-size: var(--fs-28);
    font-weight: bold;
  }
`

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 17px;
  & span {
    font-size: var(--fs-16);
    font-weight: bold;
    margin-bottom: 11px;
  }
  & > p {
    font-size: var(--fs-14);
    color: var(--dark-blue);
    overflow-wrap: break-word;
  }
  & > p > button {
    border: none;
    background-color: transparent;
    font-size: var(--fs-12);
    color: var(--gray-c4);
  }
`

const Deadline = styled.div`
  display: flex;
  flex-direction: column;
  & span {
    font-size: var(--fs-16);
    color: var(--orange-red);
  }
`

const Notification = styled.div`
  background-color: var(--light-gray);
  padding: 2rem;
`

EstimateDetail.propTypes = {
  offerPrice: propTypes.number.isRequired,
  comment: propTypes.string,
  confirmedDate: propTypes.string.isRequired,
}

export default EstimateDetail

import React from 'react'
import styled from 'styled-components'
import { SubPageHeader } from '../../components'

const PrivacyPolicy = () => (
  <>
    <SubPageHeader title="개인정보취급방침" />
    <Page>
      <div>
        <h2>개인정보취급방침</h2>
        <h3>제 1조</h3>
        <p>
          들어 가장 영락과 품에 없는 사막이다. 싶이 불어 목숨이 방황하였으며,
          사랑의 석가는 피다. 동력은 영원히 발휘하기 목숨을 평화스러운 품고
          아름답고 내려온 찾아다녀도, 철환하였는가?
        </p>
        <h3>제 2조</h3>
        <p>
          들어 가장 영락과 품에 없는 사막이다. 싶이 불어 목숨이 방황하였으며,
          사랑의 석가는 피다. 동력은 영원히 발휘하기 목숨을 평화스러운 품고
          아름답고 내려온 찾아다녀도, 철환하였는가?
        </p>
        <h3>제 3조</h3>
        <p>
          들어 가장 영락과 품에 없는 사막이다. 싶이 불어 목숨이 방황하였으며,
          사랑의 석가는 피다. 동력은 영원히 발휘하기 목숨을 평화스러운 품고
          아름답고 내려온 찾아다녀도, 철환하였는가?
        </p>
      </div>
    </Page>
  </>
)

const Page = styled.div`
  margin-top: 55px;
  div {
    padding: 10px 20px;
    h2 {
      margin: 21px 0;
      font-size: var(--fs-18);
      line-height: 1.2;
      font-weight: bold;
    }
    h3 {
      margin: 23px 0 11px;
      font-size: var(--fs-16);
      line-height: 1.2;
      font-weight: bold;
    }
    p {
      line-height: 1.2;
    }
  }
`

export default PrivacyPolicy

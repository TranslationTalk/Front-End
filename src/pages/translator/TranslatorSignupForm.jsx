import React, { useState } from 'react'
import styled from 'styled-components'
import {
  TextInput,
  SelectInput,
  CheckBoxInput,
  Button,
} from '../../components/index'
import { apis } from '../../utils/axios'

const TranslatorSignupForm = () => {
  const [name, setName] = useState(null)
  const [career, setCareer] = useState(null)
  const profileFile =
    'https://tistory1.daumcdn.net/tistory/user/264290/profile/profileImg?v=1635480821401'
  const [languag, setLanguage] = useState(null)
  const [languag2, setLanguage2] = useState(null)
  const language = languag + ', ' + languag2
  const [introduce, setIntroduce] = useState(null)
  const [taxPossible, setTaxPossible] = useState(false)
  const [cashPossible, setCashPossible] = useState(false)
  const [isBusiness, setIsBusiness] = useState(false)

  const submit = () => {
    console.log(
      name,
      career,
      profileFile,
      language,
      introduce,
      taxPossible,
      cashPossible,
      isBusiness,
    )
    apis
      .postTranslatorMypage(
        name,
        career,
        profileFile,
        language,
        introduce,
        taxPossible,
        cashPossible,
        isBusiness,
      )
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }

  return (
    <>
      <TextInput placeholder="이름" onChange={e => setName(e.target.value)} />
      <TextInput placeholder="경력" onChange={e => setCareer(e.target.value)} />
      <SelectInput
        id="select1"
        onChange={e => {
          setLanguage(e.target.value)
        }}
        defaultOption="가능언어"
        options={[
          '영어',
          '한국어',
          '중국어',
          '일본어',
          '러시아어',
          '베트남어',
          '독일어',
        ]}
      />
      <SelectInput
        id="select2"
        onChange={e => {
          setLanguage2(e.target.value)
        }}
        defaultOption="가능언어2"
        options={[
          '영어',
          '한국어',
          '중국어',
          '일본어',
          '러시아어',
          '베트남어',
          '독일어',
        ]}
      />
      <TextInput placeholder="이메일" />
      <TextInput placeholder="전화번호" />
      <TextInput
        placeholder="자기소개"
        onChange={e => setIntroduce(e.target.value)}
      />
      <Span>⦿ 번역톡은 번역 및 결제를 책임지지 않습니다.</Span>
      <CheckBoxInput
        label="세금명세서 가능 여부"
        onChange={() => setTaxPossible(!taxPossible)}
      />
      <CheckBoxInput
        label="현금영수증 가능 여부"
        onChange={() => setCashPossible(!cashPossible)}
      />
      <CheckBoxInput
        label="사업자 여부"
        onChange={() => setIsBusiness(!isBusiness)}
      />
      <Button content="제출하기" _onClick={submit} />
    </>
  )
}

const Span = styled.div`
  color: #ff0000;
`

export default TranslatorSignupForm

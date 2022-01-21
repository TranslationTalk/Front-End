import React, { useState } from 'react'
import {
  TextInput,
  SelectInput,
  CheckBoxInput,
  Button,
  StatusMessage,
  TextAreaInput,
  SubPageHeader,
  FileInput,
} from '../../components/index'
import { apis } from '../../utils/axios'
import defaultProfile from '../../assets/images/TranslatorProfile.png'
import { language } from '../../constant/selectOptions'
import styled from 'styled-components'

const initialState = {
  name: '',
  career: '',
  profileFile:
    'https://tistory1.daumcdn.net/tistory/user/264290/profile/profileImg?v=1635480821401',
  language: '',
  email: '',
  phoneNum: '',
  introduce: '',
  taxPossible: false,
  cashPossible: false,
  isBusiness: false,
}

const TranslatorSignupForm = () => {
  const [formData, setFormData] = useState(initialState)

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(formData)

    const {
      data: { data },
    } = await apis.postTranslatorMypage(formData)
    console.log(data)
    setFormData(initialState)
  }

  const handleChange = e => {
    const { id, name, value, checked } = e.target
    setFormData({
      ...formData,
      [name === '' ? id : name]: name === '' ? checked : value,
    })
  }

  return (
    <>
      <SubPageHeader title="번역가 정보입력" />
      <ProfileWrap>
        <img src={defaultProfile} alt="profileImg" />
        <div>
          <FileInput
            onChange={handleChange}
            label="프로필 선택"
            fontSize="12px"
            padding="8px 10px"
          />
        </div>
      </ProfileWrap>
      <Form onSubmit={handleSubmit}>
        <TextInput name="name" placeholder="이름" onChange={handleChange} />
        <TextInput name="career" placeholder="경력" onChange={handleChange} />
        <SelectInput
          id="select1"
          name="language"
          onChange={handleChange}
          defaultOption="가능언어"
          value={formData.language}
          options={language}
        />
        {/* 가능언어 추가 필요 */}
        <TextInput
          name="email"
          type="email"
          placeholder="이메일"
          onChange={handleChange}
        />
        <TextInput
          name="phoneNum"
          type="phone"
          placeholder="전화번호"
          onChange={handleChange}
        />
        <TextAreaInput
          name="introduce"
          placeholder="자기소개"
          onChange={handleChange}
        />
        <div>
          <StatusMessage
            text="번역톡은 번역 및 결제를 책임지지 않습니다."
            color="#FF5F5F"
          />
          <CheckBoxInput
            id="taxPossible"
            label="세금명세서 가능 여부"
            onChange={handleChange}
          />
          <CheckBoxInput
            id="cashPossible"
            label="현금영수증 가능 여부"
            onChange={handleChange}
          />
          <CheckBoxInput
            id="isBusiness"
            label="사업자 여부"
            onChange={handleChange}
          />
        </div>
        <Button type="submit" content="제출하기" />
      </Form>
    </>
  )
}

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 21px;
  padding: 24px;
  padding-bottom: 16px;
  & > img {
    margin-bottom: 15px;
  }
  & > div {
    width: 78px;
    height: 25px;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
  & > div {
    margin-top: 8px;
    & > div {
      margin-bottom: 4px;
    }
    & > div:first-child {
      margin-bottom: 12px;
    }
  }
`

export default TranslatorSignupForm

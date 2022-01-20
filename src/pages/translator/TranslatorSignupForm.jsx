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
import grayStar from '../../assets/images/grayStar.png'
import { language } from '../../constant/selectOptions'

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
      <SubPageHeader title="번역가 회원가입" />
      <h2>번역가 정보 입력</h2>
      <img src={grayStar} alt="profileImg" />
      <FileInput onChange={handleChange} label="프로필 선택" />
      <form onSubmit={handleSubmit}>
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
        <StatusMessage text="번역톡은 번역 및 결제를 책임지지 않습니다." />
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
        <Button type="submit" content="제출하기" />
      </form>
    </>
  )
}

export default TranslatorSignupForm

import React, { useState, useEffect } from 'react'
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
import { ReactComponent as AddIcon } from '../../assets/icons/Add.svg'
import { getDownloadUrl, uploadFile } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  profileUrl:
    'https://tistory1.daumcdn.net/tistory/user/264290/profile/profileImg?v=1635480821401',
  language: '',
  email: '',
  career: '번역 회사 근무',
  phoneNum: '',
  introduce: '',
  taxPossible: false,
  cashPossible: false,
  isBusiness: false,
}

const TranslatorSignupForm = () => {
  const [formData, setFormData] = useState(initialState)
  const [selectInputs, setSelectInputs] = useState([0])
  const [languages, setLanguages] = useState({})
  const [file, setFile] = useState(null) // input으로 받아온 file
  const [fileName, setFileName] = useState('') // 백엔드에 보내고, storage에 업로드할 파일 이름
  const [preview, setPreview] = useState('') // image preview 요소
  const [checkForm, setCheckForm] = useState({
    name: true,
    email: true,
    phoneNum: true,
    language: true,
    introduce: true,
  })

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    let check = Object.assign({}, checkForm)

    formData.name === '' ? (check.name = false) : (check.name = true)
    formData.email === '' ? (check.email = false) : (check.email = true)
    formData.phoneNum === ''
      ? (check.phoneNum = false)
      : (check.phoneNum = true)
    formData.language === '' || formData.language === '가능언어'
      ? (check.language = false)
      : (check.language = true)
    formData.introduce.length < 10
      ? (check.introduce = false)
      : (check.introduce = true)

    setCheckForm(check)
    if (!Object.entries(check).find(value => value[1] === false)) {
      // 파일 업로드
      uploadFile(file, `profile/${fileName}`)

      await apis.postTranslatorMypage(formData)
      setFormData(initialState)

      navigate('/translator/list')
    }
  }

  //! form 입력 하지 않았을 시 메시지
  const formMessage = (type, message) => {
    return type ? null : (
      <StatusMessage text={message} icon="info" color="#FF5F5F" />
    )
  }

  const handleChange = e => {
    const { id, name, value, checked } = e.target
    setFormData({
      ...formData,
      [id === '' ? name : id]: name === '' ? checked : value,
    })
  }

  // fileChange시
  const handleFileChange = e => {
    // 업로드 하지는 않고 미리보기만
    const { files } = e.target
    setFile(files[0])
    setFileName(`${files[0].lastModified}_${files[0].name}`) // file name 지정
  }

  // fileName 변경되었을 때 formData.profileUrl fileName 넣기
  useEffect(() => {
    if (fileName === '') return
    // url로 만들어서 백엔드에 전달
    const profileUrl = getDownloadUrl('profile', fileName)
    setFormData({
      ...formData,
      profileUrl: profileUrl,
    })
  }, [fileName])

  // image preview
  useEffect(() => {
    setPreview(
      <img
        src={file ? URL.createObjectURL(file) : defaultProfile}
        alt="profileImg"
        width="64px"
        height="64px"
      />,
    )
    return () => {}
  }, [file])

  const handleSelectChange = e => {
    const { name, value } = e.target
    setLanguages({ ...languages, [name]: value })
  }

  const addSelectInput = () => {
    setSelectInputs(prev => [...prev, prev.length.toString()])
  }

  const removeSelectInput = index => {
    if (selectInputs.length === 1) return // 기본 한 개는 가지고 있어야 하므로

    // 가능 언어 추가했다가 아직 선택 안했을 경우에도 삭제가 되어야 하므로
    // languages object 길이 early return 보다 먼저 해준다.

    setSelectInputs(
      selectInputs.filter((el, idx) => idx !== index).map((el, index) => index),
    )

    if (Object.keys(languages).length === 1) return

    // 그냥 바로 수정 하면 당연히 안될 듯 그래서 복제함
    const tempLanguages = { ...languages }
    delete tempLanguages[index]
    const entries = Object.entries(tempLanguages).map(([, lang], index) => [
      index.toString(),
      lang,
    ])
    setLanguages(Object.fromEntries(entries))
  }

  useEffect(() => {
    const language = Object.values(languages).join(', ')
    setFormData({ ...formData, language })
  }, [languages])

  return (
    <>
      <SubPageHeader title="번역가 정보입력" />
      <ProfileWrap>
        {preview}
        <div>
          <FileInput
            onChange={handleFileChange}
            label="프로필 선택"
            fontSize="12px"
            padding="8px 10px"
            id="profileUrl"
            name="profileUrl"
            accept="image"
          />
        </div>
      </ProfileWrap>
      <Form onSubmit={handleSubmit}>
        <TextInput name="name" placeholder="이름" onChange={handleChange} />
        {formMessage(checkForm.name, '이름을 입력해주세요')}
        <TextInput
          name="email"
          type="email"
          placeholder="이메일"
          onChange={handleChange}
        />
        {formMessage(checkForm.email, '이메일을 입력해주세요')}
        <TextInput
          name="phoneNum"
          type="phone"
          placeholder="전화번호"
          onChange={handleChange}
        />
        {formMessage(checkForm.phoneNum, '전화번호를 입력해주세요')}
        {selectInputs.map((select, index) => (
          <SelectContainer key={select}>
            <SelectInput
              id="language"
              name={select.toString()}
              value={languages[index]}
              onChange={handleSelectChange}
              defaultOption="가능언어"
              options={language}
            />
            {index ? (
              <Button
                type="button"
                content="삭제"
                onClick={() => removeSelectInput(index)}
                border
              />
            ) : null}
          </SelectContainer>
        ))}
        {formMessage(checkForm.language, '1개 이상의 언어를 선택해 주세요')}
        <ButtonWrap>
          <Button
            type="button"
            content="가능언어 추가"
            onClick={addSelectInput}
            bgColor="#fff"
            color="#3D51FF"
          />
          <AddIcon />
        </ButtonWrap>
        <TextAreaInput
          name="introduce"
          placeholder="자기소개"
          onChange={handleChange}
        />
        {formMessage(checkForm.introduce, '10글자 이상 적어주세요')}
        <CheckboxWrap>
          <StatusMessage
            icon="info"
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
        </CheckboxWrap>
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
  margin-top: 72px;
  margin-bottom: 21px;
  padding: 24px;
  padding-bottom: 16px;
  & > img {
    margin-bottom: 15px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
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
  padding-bottom: 20px;
  & > button {
    width: fit-content;
    height: fit-content;
    font-size: var(--fs-18);
    font-weight: bold;
    padding: 11px 33px;
    margin: auto;
  }
`

const SelectContainer = styled.div`
  display: flex;
  gap: 8px;
  button {
    max-width: 63px;
    font-size: var(--fs-14);
    font-weight: normal;
  }
`

const ButtonWrap = styled.div`
  margin-top: 0;
  position: relative;
  & > button {
    font-size: var(--fs-14);
    font-weight: normal;
  }
  svg {
    position: absolute;
    top: 12px;
    right: 35%;
    pointer-events: none;
  }
`

const CheckboxWrap = styled.div`
  margin-top: 8px;
  & > div {
    margin-bottom: 4px;
  }
  & > div:first-child {
    margin-bottom: 12px;
  }
`

export default TranslatorSignupForm

/*
  견적요청 페이지
*/

import React, { useState } from 'react'
import {
  Button,
  FileInput,
  StatusMessage,
  SubPageHeader,
  TextAreaInput,
  TextInput,
} from '../../components'
import SelectInput from '../../components/input/SelectInput'
import propTypes from 'prop-types'
import { fields, language } from '../../constant/selectOptions'
import { clientAPIs } from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getDownloadUrl, uploadFile } from '../../utils/firebase'

const ClientRequestForm = props => {
  const navigate = useNavigate()
  const [file, setfile] = useState()
  const [requestForm, setRequestForm] = useState({
    field: '',
    deadline: '',
    beforeLanguage: '',
    afterLanguage: '',
    email: '',
    phoneNumber: '',
    youtubeUrl: '',
    fileUrl: '',
    isText: props.isText,
    needs: '',
  })
  const [checkForm, setCheckForm] = useState({
    field: true,
    deadline: true,
    language: true,
    email: true,
    phoneNumber: true,
    file: true,
  })

  //! setRequestForm, setFile
  // file 이름 'lastModified_fileName'로 저장
  const onChange = async e => {
    const { value, name } = e.target
    if (e.target.type === 'file') {
      setfile(e.target.files[0])
      const fileName = `${e.target.files[0].lastModified}_${e.target.files[0].name}`
      setRequestForm({
        ...requestForm,
        fileUrl: getDownloadUrl('file', fileName),
      })
    } else {
      setRequestForm({ ...requestForm, [name]: value })
    }
  }

  //! form 입력 하지 않았을 시 메시지
  const formMessage = (type, message) => {
    return type ? null : (
      <StatusMessage text={message} icon="info" color="#FF5F5F" />
    )
  }

  //! 제출하기 버튼
  const onSubmit = e => {
    //submit 이벤트 발생시 reload방지
    e.preventDefault()

    let check = Object.assign({}, checkForm)

    // field
    requestForm.field == '' || requestForm.field === '분류'
      ? (check.field = false)
      : (check.field = true)
    // deadline
    requestForm.deadline === ''
      ? (check.deadline = false)
      : (check.deadline = true)
    // language 둘다 입력시 true
    requestForm.afterLanguage !== '번역 후' &&
    requestForm.beforeLanguage !== '번역 전' &&
    requestForm.afterLanguage !== '' &&
    requestForm.beforeLanguage !== ''
      ? (check.language = true)
      : (check.language = false)
    // email
    requestForm.email == '' ? (check.email = false) : (check.email = true)
    requestForm.phoneNumber == ''
      ? (check.phoneNumber = false)
      : (check.phoneNumber = true)
    //file
    !file
      ? (check.file = true)
      : file.size > 5 * 10 ** 6
      ? (check.file = false)
      : (check.file = true)
    setCheckForm(check)

    // 필수요소 입력 완료시 서버에 전송
    if (!Object.entries(check).find(value => value[1] === false)) {
      submit()
    }
  }

  //! 서버에 전송
  const submit = () => {
    // 파일 업로드
    if (requestForm.isText) {
      uploadFile(file, `file/${file.lastModified}_${file.name}`)
    }

    // 제출 후 RequestList페이지로 이동
    const {
      field,
      deadline,
      beforeLanguage,
      afterLanguage,
      email,
      phoneNumber,
      youtubeUrl,
      fileUrl,
      isText,
      needs,
    } = requestForm

    if (field)
      clientAPIs
        .estimateRequest(
          field,
          deadline,
          beforeLanguage,
          afterLanguage,
          email,
          phoneNumber,
          youtubeUrl,
          fileUrl,
          isText,
          needs,
        )
        .then(() => {
          alert(`요청 완료`)
          navigate('/client/request/list')
        })
        .catch(e => alert(`${e} already exist id '${requestForm}`))
  }

  return (
    <div>
      <SubPageHeader title="번역 요청 Form" />
      <Form onSubmit={onSubmit}>
        <p>번역 요청 의뢰서</p>
        {/* 분류 */}
        <SelectInput
          name="field"
          value={requestForm.field}
          defaultOption="분류"
          options={fields}
          onChange={onChange}
        />
        {formMessage(checkForm.field, '분류를 선택해 주세요')}
        {/* 요청날짜 */}
        <TextInput
          name="deadline"
          value={requestForm.deadline}
          type="date"
          onChange={onChange}
        />
        {formMessage(checkForm.deadline, '요청 날짜를 선택해 주세요')}
        {/* 번역 언어 */}
        <div>
          <SelectInput
            name="beforeLanguage"
            value={requestForm.beforeLanguage}
            defaultOption="번역 전"
            options={language}
            onChange={onChange}
          />
          <SelectInput
            name="afterLanguage"
            value={requestForm.afterLanguage}
            defaultOption="번역 후"
            options={language}
            onChange={onChange}
          />
        </div>
        {formMessage(checkForm.language, '번역 언어를 선택해 주세요')}
        {/* 이메일 입력 */}
        <TextInput
          name="email"
          value={requestForm.email}
          placeholder="이메일"
          type="email"
          onChange={onChange}
        />
        {formMessage(checkForm.email, '이메일을 입력해 주세요')}
        {/* 전화번호 입력 */}
        <TextInput
          name="phoneNumber"
          value={requestForm.phoneNumber}
          placeholder="전화번호"
          type="phone"
          onChange={onChange}
        />
        {formMessage(checkForm.phoneNumber, '전화번호를 입력해 주세요')}
        {/* 번역할 파일, url */}
        {props.isText ? (
          <>
            <FileInput
              name="fileUrl"
              label="파일 올리기(.txt)"
              value={requestForm.fileUrl}
              onChange={onChange}
              id="youtube"
              useUploadName
            />
            {formMessage(checkForm.file, '최대 5MB까지')}
          </>
        ) : (
          <TextInput
            name="youtubeUrl"
            value={requestForm.youtubeUrl}
            placeholder="youTube URL"
            onChange={onChange}
          />
        )}
        {/* 세부사항 요청 */}
        <TextAreaInput
          name="needs"
          value={requestForm.needs}
          placeholder="세부 요청 사항 ( 최대 500자 까지 )"
          onChange={onChange}
          maxLength={500}
        />
        <Button content="요청하기" type="submit" />
      </Form>
    </div>
  )
}

const Form = styled.form`
  margin: 90px 20px 20px;
  p {
    margin-bottom: 27px;
    font-size: var(--fs-18);
    font-weight: 500;
  }
  > select,
  > input,
  > textarea,
  > div {
    margin: 4px 0;
  }

  > button {
    display: block;
    width: 150px;
    margin: auto;
    margin-top: 20px;
  }
  > div {
    display: flex;
    select:first-child {
      margin-right: 8px;
    }
  }
`

ClientRequestForm.propTypes = {
  isText: propTypes.bool,
}

export default ClientRequestForm

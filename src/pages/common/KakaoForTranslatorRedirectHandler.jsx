import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apis } from '../../utils/axios'

const KakaoForTranslatorRedirectHandler = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const loginUser = async () => {
      let params = new URL(document.location.toString()).searchParams
      let code = params.get('code') // 인가코드 받는 부분

      console.log(code)

      try {
        const { data } = await apis.translatorLogin(code)
        console.log(data)

        // sessionStorage에 auth랑 token 저장
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('auth', data.auth)
        // sessionStorage 에 저장? 다른데 못 가도록 처리 필요

        if (data.isProfile) {
          // 가입 폼 제출했으면
          navigate('/translator/list')
        } else {
          // 아직 가입 폼이 없으면
          navigate('/translator/signup')
        }
        alert('로그인 성공.')
      } catch (error) {
        const errorMessage = error.response.data.message
        navigate('/')
        // 가입 폼 제출 안했을 시
        if (errorMessage === '번역가 승인 후 로그인 가능합니다.') {
          alert('번역가 승인을 기다려주세요.') // 추후 모달 처리
        } else if (errorMessage === '번역가로 로그인할 수 없습니다.') {
          // 번역가가 아닐 경우
          alert('번역가가 아닙니다. 카카오톡으로 로그인하기를 눌러주세요.') // 추후 모달 처리
        }
      }
    }

    loginUser()
  }, [])

  return <div>번역가 로그인 중입니다.</div>
}

export default KakaoForTranslatorRedirectHandler

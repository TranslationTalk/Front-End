import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '../../components'
import { apis } from '../../utils/axios'

const KakaoForUserRedirectHandler = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const loginUser = async () => {
      let params = new URL(document.location.toString()).searchParams
      let code = params.get('code') // 인가코드 받는 부분

      try {
        const { data } = await apis.login(code)

        // sessionStorage에 auth랑 token 저장
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('auth', data.auth)

        // 원하는 페이지로 이동
        navigate('/client/main')
      } catch (error) {
        console.log(error)
        navigate('/')
        alert('로그인할 수 없습니다. 번역가로 로그인해주세요.')
      }
    }

    loginUser()
  }, [])

  return <Spinner loadingTitle="카카오로 로그인 중" />
}

export default KakaoForUserRedirectHandler

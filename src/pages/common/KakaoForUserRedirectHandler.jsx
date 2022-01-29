import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apis } from '../../utils/axios'

const KakaoForUserRedirectHandler = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const loginUser = async () => {
      let params = new URL(document.location.toString()).searchParams
      let code = params.get('code') // 인가코드 받는 부분

      console.log(code)

      try {
        const data = await apis.login(code)
        console.log(data)

        // sessionStorage에 auth랑 token 저장

        // 원하는 페이지로 이동
        navigate(-1)
      } catch (error) {
        console.log(error)
      }
    }

    loginUser()
  }, [])

  return <div>유저 로그인 중입니다.</div>
}

export default KakaoForUserRedirectHandler

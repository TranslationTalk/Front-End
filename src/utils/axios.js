import axios from 'axios'

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: '',

  // 헤더에 넣을 정보
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
})

instance.interceptors.request.use(function (config) {
  config.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem(
    'accessToken',
  )}`
  return config
})

export const apis = {
  // 카카오 로그인
  login: () => instance.get('/auth/login'),
}

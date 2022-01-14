import axios from 'axios'

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: 'http://52.79.79.67:3000/',

  // 헤더에 넣을 정보
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
})

instance.interceptors.request.use(function (config) {
  config.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem(
    'token',
  )}`
  return config
})

export const apis = {
  // 카카오 로그인
  login: () => instance.get('api/auth/kakao/client'), // 일반 유저 로그인
  translatorLogin: () => instance.get('api/auth/kakao/translator'), // 번역가 로그인
  developerSignup: (id, auth) =>
    instance.post(`api/auth/dev/signup`, { id, auth }),
  developerLogin: id => instance.post(`api/auth/dev/login`, { id }),

  // 번역 요청
  requestList: () => instance.get(`api/request/list`),
}

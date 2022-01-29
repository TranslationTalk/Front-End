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
  login: code => instance.get(`api/auth/kakao/client/${code}`), // 일반 유저 로그인
  translatorLogin: code => instance.get(`api/auth/kakao/translator/${code}`), // 번역가 로그인
  developerSignup: (id, auth) =>
    instance.post(`api/auth/dev/signup`, { id, auth }),
  developerLogin: id => instance.post(`api/auth/dev/login`, { id }),

  // 번역가 마이페이지
  getTranslatorMypage: () => instance.get('api/translator/mypage'), // 마이페이지 정보 요청
  postTranslatorMypage: ({
    name,
    career,
    profileFile,
    language,
    email,
    phoneNum,
    introduce,
    taxPossible,
    cashPossible,
    isBusiness,
  }) =>
    instance.post('api/translator/mypage', {
      name,
      career,
      profileFile,
      language,
      email,
      phoneNum,
      introduce,
      taxPossible,
      cashPossible,
      isBusiness,
    }), // 첫 로그인시 정보 작성
  modifyTranslatorMypage: ({
    name,
    career,
    profileFile,
    language,
    email,
    phoneNum,
    introduce,
    taxPossible,
    cashPossible,
    isBusiness,
  }) =>
    instance.post('api/translator/mypage/update', {
      name,
      career,
      profileFile,
      language,
      email,
      phoneNum,
      introduce,
      taxPossible,
      cashPossible,
      isBusiness,
    }), // 마이페이지 정보 수정
  getReviews: id => instance.get(`api/review/${id}`),

  // 번역 요청
  requestList: () => instance.get(`api/request/list`),

  // translator
  estimatesList: () => instance.get(`api/estimate/list`),
  sendEstimate: (id, { comment, confirmedDate, offerPrice }) =>
    instance.post(`api/estimate/list/detail/${id}`, {
      comment,
      confirmedDate,
      offerPrice,
    }),
  fetchMyList: () => instance.get(`api/estimate/mylist`),
  getEstimate: id => instance.get(`api/estimate/list/detail/${id}`),
  finishEstimate: id => instance.post(`api/request/status/${id}`),

  // 채팅
  createChatroom: id => instance.post(`api/chatroom/${id}`),
  getChatroomListTranslator: () => instance.get(`api/chatroom/translator`),
  getChatroomListClient: () => instance.get(`api/chatroom/client`),
  getChatContents: id => instance.get(`api/chatroom/chat/${id}`),
  sendChat: (id, chat) => instance.post(`api/chatroom/chat/${id}`, { chat }),
}

export const clientAPIs = {
  // 견적 요청 form
  estimateRequest: (
    field,
    deadline,
    beforeLanguage,
    afterLanguage,
    email,
    phoneNumber,
    youtubeUrl,
    requestFile,
    isText,
    needs,
  ) =>
    instance.post(`api/request`, {
      field,
      deadline,
      beforeLanguage,
      afterLanguage,
      email,
      phoneNumber,
      youtubeUrl,
      requestFile,
      isText,
      needs,
    }),

  // 견적 요청
  requestList: () => instance.get(`api/request/list`),

  // 견적요청 -> 받은 견적
  requestEstimateList: requestId =>
    instance.get(`api/request/list/${requestId}`),

  // 견적요청 -> 받은 견적 -> 번역가 상세페이지
  requestEstimate: (requestId, estimateId) =>
    instance.get(`/api/request/list/${requestId}/${estimateId}`),

  //채팅방 생성
  addChatroom: estimateId => {
    return instance.post(`api/chatroom/${estimateId}`)
  },

  //번역가 확정하기
  TranslatorConfirmed: (requestId, estimateId) => {
    return instance.post(`api/request/list/${requestId}/${estimateId}`)
  },

  //리뷰 요청
  requestReview: requestId => {
    return instance.get(`api/review/${requestId}`)
  },

  //리뷰 작성
  writeReview: (requestId, review) => {
    return instance.post(`api/review/${requestId}`, review)
  },
}

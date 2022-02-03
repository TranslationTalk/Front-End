// 입력한 날짜로부터 3일 카운트 메시지
// 입력값 형식 2022-01-25T06:02:34.000Z
export const timeMessage = createdTime => {
  // 현재시간
  const currentTime = new Date()
  const secound = 1000
  const min = secound * 60
  const hour = min * 60
  const day = hour * 24
  const count = Date.parse(createdTime) + 3 * day - Date.parse(currentTime)

  // 생성날짜-3일
  const countDay = Math.floor(count / day)
  const countHour = Math.floor((count % hour) / min)
  const countMin = Math.floor((count % min) / secound)

  // 메시지
  if (countDay < 0) {
    return '견적 기간이 끝났습니다.'
  } else {
    return `${countDay}일 ${countHour}시간 ${countMin}분 후 마감`
  }
}

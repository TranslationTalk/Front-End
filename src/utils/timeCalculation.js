// 입력한 날짜로부터 3일 카운트 메시지
// 입력값 형식 2022-01-25T06:02:34.000Z
export const timeMessage = createdTime => {
  // 현재시간
  const currentTime = new Date()
  const currentDate = currentTime.getDate()
  const currentHour = currentTime.getHours()
  const currentMin = currentTime.getMinutes()

  // list의 생성 날짜
  const createdDay = new Date(createdTime).getDate()
  const createdHour = new Date(createdTime).getHours()
  const createdMin = new Date(createdTime).getMinutes()

  // 생성날짜-3일
  let countDay = createdDay + 3 - currentDate
  let countHour = createdHour - currentHour
  let countMin = createdMin - currentMin

  if (countMin < 0) {
    countHour--
    countMin += 60
  }
  if (countHour < 0) {
    countDay--
    countHour += 24
  }

  // 메시지
  if (countDay < 0) {
    return '견적 기간이 끝났습니다.'
  } else {
    return `${countDay}일 ${countHour}시간 ${countMin}분 후 마감`
  }
}

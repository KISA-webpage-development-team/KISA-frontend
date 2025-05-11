/**
 * @desc Date를 oo시간전, oo일전, oo년전을 반환하는 함수
 * @param date Date
 * @returns string
 * @example
 * Input: Thu, 11 Apr 2024 18:46:43 GMT
 * Output: 3일 전
 */
export function formatRelativeTime(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금 전";
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일 전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년 전`;
}

/**
 * @desc Date를 오늘이면 시간을, 오늘이 아니면 YY.MM.DD로 반환하는 함수
 * @param date: Date
 * @return string
 * @example
 * Input: Thu, 11 Apr 2024 18:46:43 GMT
 * Output: 18:46 or 24.04.11
 */
export function formatDateOrTime(date) {
  const today = new Date();
  const target = new Date(date);

  if (
    today.getFullYear() === target.getFullYear() &&
    today.getMonth() === target.getMonth() &&
    today.getDate() === target.getDate()
  ) {
    return target
      .toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/^24:/, "00:");
  } else {
    let currentYear = new Date().getFullYear();
    let year = target.getFullYear().toString().slice(-2);
    let month = ("0" + (target.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
    let day = ("0" + target.getDate()).slice(-2);

    return `${year}.${month}.${day}`;
  }
}

/**
 * @desc Date를 YYYY.MM.DD HH:MM 형식으로 반환하는 함수
 * @param date: Date
 * @return string
 * @example
 * Input: Thu, 11 Apr 2024 18:46:43 GMT
 * Output: 2024.04.11 18:46
 */
export function formatDateTimeString(date) {
  const target = new Date(date);

  let year = target.getFullYear();
  let month = ("0" + (target.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
  let day = ("0" + target.getDate()).slice(-2);
  let hour = ("0" + target.getHours()).slice(-2);
  let minute = ("0" + target.getMinutes()).slice(-2);

  return `${year}.${month}.${day} ${hour}:${minute}`;
}

// input year, month, day
// output: 2024.04.11
export function birthDateFormatter(year, month, day) {
  return `${year}.${month}.${day}`;
}

import dayjs from 'dayjs';

function day(str: string) {
  const min = 1000 * 60;
  const hour = 60 * min;
  const oneDay = 24 * hour;

  const target = dayjs(str).valueOf();
  const timezoneOffset = new Date().getTimezoneOffset() * min;
  const now = new Date().getTime();
  const diff = now - target + timezoneOffset;

  if (diff < min) {
    return '방금전';
  }
  if (diff < hour) {
    return `${Math.floor(diff / min)}분 전`;
  }
  if (diff < oneDay) {
    return `${Math.floor(diff / hour)}시간 전`;
  }
  if (diff < oneDay * 30) {
    return `${Math.floor(diff / oneDay)}일 전`;
  }
  return dayjs(str).format('yy-MM-dd');
}

export default day;

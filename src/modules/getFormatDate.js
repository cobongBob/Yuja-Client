// yyyy-MM-dd 포맷으로 반환
const getFormatDate = (date) => {
  let year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;
  return year + "-" + month + "-" + day;
};

export default getFormatDate;

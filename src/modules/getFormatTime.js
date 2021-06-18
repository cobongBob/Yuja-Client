export const getFormatTime = (day) => {
  let abc = ""
  let hours = day.getHours(); // 시
  let minutes = day.getMinutes();  // 분
  if(hours>12) {
    abc = "오후";
    hours -= 12;
  }else if(hours === 12 ) {
    abc = "오후";
  }else{
    abc = "오전";
  }
  return `${hours} : ${minutes} ${abc}`
}
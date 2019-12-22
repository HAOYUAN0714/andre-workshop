export default function (unixTimeStamp) {
  const timeStamp = new Date(unixTimeStamp * 1000);
  let dd = timeStamp.getDate();
  let mm = timeStamp.getMonth() + 1;
  const yyyy = timeStamp.getFullYear();
  // let hh = timeStamp.getHours();
  // let minutes = timeStamp.getMinutes();
  // let seconds = timeStamp.getSeconds();
  if (dd < 10) { // 讓個位數前加個0
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  // if (hh < 10) {
  //   hh = `0${hh}`;
  // }
  // if (minutes < 10) {
  //   minutes = `0${minutes}`;
  // }
  // if (seconds < 10) {
  //   seconds = `0${seconds}`;
  // }
  // var time = `${hh}:${minutes}:${seconds}`;
  const date = `${yyyy}-${mm}-${dd}`;
  // var fullTime = `${yyyy}-${mm}-${dd} ${time}` ;
  return date;
}

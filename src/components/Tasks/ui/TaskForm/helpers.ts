export const getInProgressTime = (createDate: string) => {
  const dateNew = new Date();

  const dif = dateNew.getTime() - new Date(createDate).getTime();

  const timeOffset = new Date(dif).getTimezoneOffset() / 60;

  const hours = new Date(dif).getHours() + timeOffset;
  const seconds = new Date(dif).getSeconds();
  const minutes = new Date(dif).getMinutes();

  const hoursInProgress = hours < 10 ? `0${hours}` : hours;
  const secondsInProgress = seconds < 10 ? `0${seconds}` : seconds;
  const minutesInProgress = minutes < 10 ? `0${minutes}` : minutes;

  return `${hoursInProgress}:${minutesInProgress}:${secondsInProgress}`;
};

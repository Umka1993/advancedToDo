export const getInProgressTime = (timeStartInProgress: string) => {
  const dateNew = new Date();

  const dif = dateNew.getTime() - new Date(timeStartInProgress).getTime();

  const timeOffset = new Date(dif).getTimezoneOffset() / 60;

  const hours = new Date(dif).getHours() + timeOffset;
  const seconds = new Date(dif).getSeconds();
  const minutes = new Date(dif).getMinutes();

  const hoursInProgress = hours < 10 ? `0${hours}` : hours;
  const secondsInProgress = seconds < 10 ? `0${seconds}` : seconds;
  const minutesInProgress = minutes < 10 ? `0${minutes}` : minutes;

  return `${hoursInProgress}:${minutesInProgress}:${secondsInProgress}`;
};

export const convertFormatReadyDate = (readyDate: string) => {
  const dateNew = new Date(readyDate).getTime();

  const offset = new Date(dateNew).getTimezoneOffset() / 60;

  const hours = new Date(dateNew).getHours() + offset;
  const seconds = new Date(dateNew).getSeconds();
  const minutes = new Date(dateNew).getMinutes();

  const hoursInProgress = hours < 10 ? `0${hours}` : hours;
  const secondsInProgress = seconds < 10 ? `0${seconds}` : seconds;
  const minutesInProgress = minutes < 10 ? `0${minutes}` : minutes;

  const time = `${hoursInProgress}:${minutesInProgress}:${secondsInProgress}`;
  const date = new Date(readyDate).toLocaleString('de-DE').split(', ')[0];

  return `${date} до ${time}`;
};

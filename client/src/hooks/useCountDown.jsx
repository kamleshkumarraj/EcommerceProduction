import { useState } from "react";

export const useCountDown = (date = "January 10, 2025 00:00:00") => {
  const now = new Date().getTime();
  const futureDate = new Date(date).getTime();
  let timeLeft = futureDate - now;
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const [seconds, setSecond] = useState("00");
  const [minutes, setMinute] = useState("00");
  const [hours, setHour] = useState("00");
  const [days, setDay] = useState("00");

  const updateTime = () => {
    const daysLeft = Math.floor(timeLeft / day);
    const hoursLeft = Math.floor((timeLeft % day) / hour);
    const minutesLeft = Math.floor((timeLeft % hour) / minute);
    const secondsLeft = Math.floor((timeLeft % minute) / second);
    setDay(daysLeft);
    setHour(hoursLeft);
    setMinute(minutesLeft);
    setSecond(secondsLeft);
  };
  const id = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(id);
      return;
    }
    timeLeft -= 1000;
    updateTime();
  }, 1000);
  return { days, hours, minutes, seconds };
};

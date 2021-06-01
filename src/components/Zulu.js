import React, { useState, useEffect } from "react";

const Zulu = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, [time]);

  let seconds = time.getSeconds().toString();
  let minutes = time.getMinutes().toString();
  let hours = time.getHours().toString();
  let day = time.getDate().toString();
  let month = time.getMonth();
  const year = time.getFullYear().toString();

  let secondsUTC = time.getUTCSeconds().toString();
  let minutesUTC = time.getUTCMinutes().toString();
  let hoursUTC = time.getUTCHours().toString();
  let dayUTC = time.getUTCDate().toString();
  let monthUTC = time.getUTCMonth();
  const yearUTC = time.getUTCFullYear().toString();

  if (hours.length === 1) {
    hours = "0" + hours;
  }
  if (seconds.length === 1) {
    seconds = "0" + seconds;
  }
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }
  if (day.length === 1) {
    day = "0" + day;
  }

  if (hoursUTC.length === 1) {
    hoursUTC = "0" + hoursUTC;
  }
  if (secondsUTC.length === 1) {
    secondsUTC = "0" + secondsUTC;
  }
  if (minutesUTC.length === 1) {
    minutesUTC = "0" + minutesUTC;
  }
  if (dayUTC.length === 1) {
    dayUTC = "0" + dayUTC;
  }

  switch (month) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;

    default:
      break;
  }

  switch (monthUTC) {
    case 0:
      monthUTC = "January";
      break;
    case 1:
      monthUTC = "February";
      break;
    case 2:
      monthUTC = "March";
      break;
    case 3:
      monthUTC = "April";
      break;
    case 4:
      monthUTC = "May";
      break;
    case 5:
      monthUTC = "June";
      break;
    case 6:
      monthUTC = "July";
      break;
    case 7:
      monthUTC = "August";
      break;
    case 8:
      monthUTC = "September";
      break;
    case 9:
      monthUTC = "October";
      break;
    case 10:
      monthUTC = "November";
      break;
    case 11:
      monthUTC = "December";
      break;

    default:
      break;
  }

  return (
    <div>
      <h4 style={{ fontStyle: "italic", color: "navy" }}>
        Local Time: {`${day} ${month} ${year} ${hours}:${minutes}:${seconds}`}
      </h4>
      <h4 style={{ fontStyle: "italic", color: "navy" }}>
        Zulu Time:{" "}
        {`${dayUTC} ${monthUTC} ${yearUTC} ${hoursUTC}:${minutesUTC}:${secondsUTC}Z`}
      </h4>
    </div>
  );
};

export default Zulu;

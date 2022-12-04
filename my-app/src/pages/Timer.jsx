import { useState, useEffect } from "react";
import React from "react";

export function Timer() {
  const [time, setTime] = React.useState(0);
  const [status, setStatus] = React.useState(0);
  const [interv, setInterv] = useState();

  /*
   0 = off
   1 = on
   2 = paused
  */

  const run = () => {
    return setTime((prevTime) => prevTime + 1);
  };

  useEffect(() => {
    let interval = null;

    const start = (e) => {
      setInterv(setInterval(run, 10));
      setStatus(1);
    };

    const stop = (e) => {
      clearInterval(interv);
      setStatus(2);
    };

    const reset = (e) => {
      clearInterval(interv);
      setTime(0);
      setStatus(0);
    };

    if (status === 0) {
      document.body.addEventListener("touchend", start);
      return () => document.body.removeEventListener("touchend", start);
    } else if (status === 1) {
      document.body.addEventListener("touchend", stop);
      return () => document.body.removeEventListener("touchend", stop);
    } else if (status === 2) {
      document.body.addEventListener("touchend", reset);
      return () => document.body.removeEventListener("touchend", reset);
    }

    return () => clearInterval(interval);
  });

  return (
    <div>
      <span>
        {Math.floor((time / 6000) % 60) >= 10
          ? Math.floor((time / 6000) % 60)
          : "0" + Math.floor((time / 6000) % 60)}
      </span>
      &nbsp;&nbsp;
      <span>
        {Math.floor((time / 100) % 60) >= 10
          ? Math.floor((time / 100) % 60)
          : "0" + Math.floor((time / 100) % 60)}
      </span>
      &nbsp;&nbsp;
      <span>{time % 100 >= 10 ? time % 100 : "0" + (time % 100)}</span>
    </div>
  );
}

import { useState, useEffect } from "react";
import React from "react";

export function Timer() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  const h = () => {
    if (time.h === 0) {
      return "";
    } else {
      return <span>{time.h >= 10 ? h : "0" + time.h}</span>;
    }
  };

  /*
  not started = 0
  started = 1
  paused = 2
  */

  var updateMs = time.ms,
    updateS = time.s,
    updateM = time.m,
    updateH = time.h;

  const run = () => {
    if (updateM === 60) {
      updateH++;
      updateM = 0;
    }
    if (updateS === 60) {
      updateM++;
      updateS = 0;
    }
    if (updateMs === 100) {
      updateS++;
      updateMs = 0;
    }
    updateMs++;
    return setTime({ ms: updateMs, s: updateS, m: updateM, h: updateH });
  };

  useEffect(() => {
    const start = (e) => {
      run();
      setInterv(setInterval(run, 10));
      setStatus(1);
    };
    const stop = (e) => {
      clearInterval(interv);
      setStatus(2);
    };
    const reset = (e) => {
      clearInterval(interv);
      setTime({ ms: 0, s: 0, m: 0, h: 0 });
      setStatus(0);
    };
    if (status === 0) {
      document.body.addEventListener("touchend", start);
      return () => document.body.removeEventListener("touchend", start);
    }
    if (status === 1) {
      document.body.addEventListener("touchend", stop);
      return () => document.body.removeEventListener("touchend", stop);
    }
    if (status === 2) {
      document.body.addEventListener("touchend", reset);
      return () => document.body.removeEventListener("touchend", reset);
    }
  });

  return (
    <div>
      {h()}
      &nbsp;&nbsp;
      <span>{time.m >= 10 ? time.m : "0" + time.m}</span>
      &nbsp;&nbsp;
      <span>{time.s >= 10 ? time.s : "0" + time.s}</span>
      &nbsp;&nbsp;
      <span>{time.ms >= 10 ? time.ms : "0" + time.m}</span>
      &nbsp;&nbsp;
    </div>
  );
}

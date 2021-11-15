import React, { useState, useEffect } from "react";

export default function Notification(props) {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalId, setIntervalId] = useState();

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }
        clearInterval(id);
        return prev;
      });
    }, 20);
    setIntervalId(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalId);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id,
      });
    }, 400);
  };

  useEffect(() => {
    if (width === 100) {
      handleCloseNotification();
    }
  }, [width]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${
        props.type === "SUCCESS" ? "success" : "error"
      } ${exit ? "exit" : ""}`}
    >
      {props.title && <h2>{props.title}</h2>}
      <p>{props.message}</p>
      <div className="bar" style={{ width: `${width}%` }}></div>
    </div>
  );
}

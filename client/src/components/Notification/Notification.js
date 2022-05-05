import React, { useState, useEffect } from "react";

export default function Notification(props) {
  const [exit, setExit] = useState(false);

  const handleCloseNotification = () => {
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id,
      });
    }, 400);
  };

  useEffect(() => {}, []);

  return (
    <div
      className={`notification-item ${
        props.type === "SUCCESS" ? "success" : "error"
      } ${exit ? "exit" : ""}`}
    >
      {props.title ? (
        <>
          <div className="notification-header">
            <h2>{props.title}</h2>
            <div className="close-btn" onClick={handleCloseNotification}>
              &times;
            </div>
          </div>
          <p>{props.message}</p>
        </>
      ) : (
        <>
          <div className="notification-header">
            <p>{props.message}</p>
            <div className="close-btn" onClick={handleCloseNotification}>
              &times;
            </div>
          </div>
        </>
      )}
    </div>
  );
}

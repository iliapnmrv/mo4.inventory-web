import React from "react";

export default function Button({
  text,
  action,
  style = "success",
  type = "button",
}) {
  return (
    <button onClick={action} className={`btn ${style}`} type={type}>
      {text}
    </button>
  );
}

import React from "react";

export default function Input({
  span,
  type = "text",
  name,
  value,
  onChange,
  required = true,
  max,
  disabled = false,
  children,
}) {
  return (
    <>
      <label className="form-item">
        <span className={required && "required"}>{span}</span>
        <input
          disabled={disabled}
          required={required}
          max={max}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
        {children}
      </label>
    </>
  );
}

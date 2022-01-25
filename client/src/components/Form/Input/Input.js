import useForm from "hooks/useForm";
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
  formName = "itemInfo",
}) {
  const { changeInRedux, changeNewItemInRedux } = useForm();

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
          onBlur={
            formName === "itemInfo" ? changeInRedux : changeNewItemInRedux
          }
        />
        {children}
      </label>
    </>
  );
}

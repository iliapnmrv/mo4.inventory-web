import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function SelectInput(props) {
  const multiStyles = {
    placeholder: (styles) => ({ ...styles, fontSize: 14 }),
  };

  const [value, setValue] = useState();
  const [multiple, setMultiple] = useState();

  const handleSelect = (e) => {
    let out = {
      name: props.name,
      value: e.value,
    };
    setValue(e.value);
    props.onSelectChange(out);
  };

  const handleMultiple = (e) => {
    let values = [];
    e.forEach((elem) => {
      values = [...values, elem.value];
    });
    let out = {
      name: props.name,
      value: values,
    };
    setMultiple(values);
    props.onSelectChange(out);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <>
      <label className="form-item">
        <span className={props?.required ? "required" : null}>
          {props.span}
        </span>
        <Select
          styles={props.multi ? multiStyles : ""}
          options={props.data}
          placeholder={props.span}
          defaultValue={props.default}
          isMulti={props.multi ? "false" : null}
          onChange={(e) => {
            props.multi ? handleMultiple(e) : handleSelect(e);
          }}
        />
        <input
          tabIndex={-1}
          autoComplete="off"
          style={{ opacity: 0, height: 0 }}
          value={value || multiple}
          required={props?.required ? true : props.required}
        />
      </label>
    </>
  );
}

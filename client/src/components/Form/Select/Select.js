import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Select from "react-select";

export default function SelectInput(props) {
  const selectInputRef = useRef();

  const {
    name,
    onSelectChange,
    data,
    multi,
    span,
    required,
    default: defaultValue,
    onSelectReset,
  } = props;

  const multiStyles = {
    placeholder: (styles) => ({ ...styles, fontSize: 14 }),
  };

  const [value, setValue] = useState();
  const [multiple, setMultiple] = useState();

  const handleSelect = (e) => {
    let out = {
      name: name,
      value: e.value,
    };
    setValue(e.value);
    onSelectChange(out);
  };

  const handleMultiple = (e) => {
    let values = [];
    e.forEach((elem) => {
      values = [...values, elem.value];
    });
    let out = {
      name: name,
      value: values,
    };
    setMultiple(values);
    onSelectChange(out);
  };

  return (
    <>
      <label className="form-item">
        <span className={required ? "required" : null}>{span}</span>
        <Select
          ref={selectInputRef}
          styles={multi ? multiStyles : ""}
          options={data}
          placeholder={span}
          defaultValue={defaultValue}
          isMulti={multi ? "false" : null}
          onChange={(e) => {
            multi ? handleMultiple(e) : handleSelect(e);
          }}
          maxMenuHeight={210}
        />
        <input
          tabIndex={-1}
          autoComplete="off"
          style={{ opacity: 0, height: 0 }}
          value={value || multiple}
          required={required ? true : required}
        />
      </label>
    </>
  );
}

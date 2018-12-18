import React from "react";

export default function Input({
  name,
  placeholder,
  value,
  errors,
  type = "text",
  onChange,
  disabled
}) {
  let classes = "form-control form-control-lg " + (errors ? "is-invalid" : "");
  return (
    <div className="form-group">
      <input
        className={classes}
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
}

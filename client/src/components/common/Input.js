import React from "react";

export default function Input({
  name,
  placeholder,
  value,
  error,
  type = "text",
  onChange,
  disabled
}) {
  return (
    <div className="form-group">
      <input
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

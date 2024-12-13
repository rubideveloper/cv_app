import React from "react";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  required = false,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-3 mb-4 border-2 border-[#023E8A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
    required={required}
  />
);

export default InputField;

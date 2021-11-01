import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const InputField = ({
  className,
  type,
  placeholder,
  id,
  onChangeMethod,
  value,
  autoComplete,
  name,
  customStyles = null,
  required = true,
  readonly = false,
  disabled = false,
}) => {
  return (
    <input
      style={customStyles}
      className={className || "inputField_Wrap"}
      type={type}
      placeholder={placeholder}
      id={id}
      onChange={onChangeMethod}
      required={required}
      readOnly={readonly}
      disabled={disabled}
      value={value}
      autoComplete = {autoComplete}
      name ={name}
    />
  );
};

InputField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  id: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  autoComplete:PropTypes.string,
  className: PropTypes.string,
  onChangeMethod: PropTypes.func,
  onKeyPressMethod: PropTypes.func,
  required: PropTypes.bool,
};

export default InputField;

import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Button = ({
  text,
  className,
  handleButtonClick,
  icon,
  btnstyle,
  type,
  disabled = false
}) => {
  return (
    <button
      type={type}
      style={btnstyle}
      title={text}
      className={className || "Button_Wrap"}
      onClick={handleButtonClick}
      disabled={disabled}
    >
      {icon} {text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
  handleButtonClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

export default Button;

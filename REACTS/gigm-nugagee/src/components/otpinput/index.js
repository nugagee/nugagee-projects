import React from "react";
import PropTypes from "prop-types";
import PinInput from "react-pin-input";

const ButtonComponent = ({
  style,
  secret,
  handlePinInput,
  inputStyle,
  handlePincomplete,
  length,
}) => {
  return (
    <PinInput
      style={style}
      inputStyle={inputStyle}
      secret={secret}
      length={length}
      focus
      type="numeric"
      onChange={handlePinInput}
      onComplete={handlePincomplete}
    />
  );
};

ButtonComponent.propTypes = {
  length: PropTypes.number,
  style: PropTypes.any,
  secret: PropTypes.any,
  inputStyle: PropTypes.any,
  handlePinInput: PropTypes.func,
  handlePincomplete: PropTypes.func,
};

export default ButtonComponent;

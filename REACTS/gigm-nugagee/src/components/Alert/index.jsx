import React from "react";
import PropTypes from 'prop-types';

const AlertComponent = ({ className, text }) => {
  return (
    <div className={className} role="alert">
      {text}
    </div>
  );
}

AlertComponent.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default AlertComponent;
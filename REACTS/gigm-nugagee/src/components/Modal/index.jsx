import React from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import PropTypes from "prop-types";
import "./index.css";

const ModalComponent = ({
  visible,
  handleClose,
  title,
  paragraph,
  body,
  width,
  height,
}) => {
  return (
    <Rodal
      visible={visible}
      onClose={handleClose}
      width={width}
      height={height}
    >
      <div className="modContainer">
        <div className="modalTitle">{title}</div>
        <div className="modalPar">{paragraph}</div>
        <div style={{ marginTop: "10px" }}>{body}</div>
      </div>
    </Rodal>
  );
};

ModalComponent.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  paragraph: PropTypes.string,
  body: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalComponent;

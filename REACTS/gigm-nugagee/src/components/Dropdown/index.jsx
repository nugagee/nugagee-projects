import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "./index.css";

const SelectComponent = ({
  data,
  handleChange,
  defaultValue,
  options,
  disabled = false,
  selectClass,
  placeholder,
  styles,
}) => {
  return (
    <Select
      className={`basic-single ${selectClass || "select_default_sty"}`}
      classNamePrefix="select"
      defaultValue={defaultValue}
      name="color"
      options={options}
      placeholder={placeholder}
      onChange={handleChange}
      styles={styles}
    />
  );
};

SelectComponent.propTypes = {
  data: PropTypes.array,
  handleChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.object,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  styles: PropTypes.object
};

export default SelectComponent;

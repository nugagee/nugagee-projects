import React from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

export const BookStatus = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="email" className="label-auth">
            Check booking status
          </label>
          <InputField
            type="text"
            placeholder="Enter departure point"
            onChangeMethod={() => {}}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-12">
          <Button
            text="Proceed"
            handleButtonClick={() => {}}
            type="button"
            btnstyle={{ background: "#E21D00", color: "white" }}
          />
        </div>
      </div>
    </div>
  );
};
export default BookStatus;

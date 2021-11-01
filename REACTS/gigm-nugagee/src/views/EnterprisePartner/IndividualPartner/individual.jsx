import React from "react";
import "./individual.css";
import InputField from "../../../components/InputField/index";
import Button from "../../../components/Button/index";

const IndividualPartner = ({ next }) => {
  return (
    <div>
      <section>
        <div className="contactform">
          <div className="contactformholder">
            <div className="partnerform">
              <h1>Contact Details</h1>
              <p>Kindly provide the details below</p>

              <div>
                <label htmlFor="firstname">First Name</label>
                <InputField
                  type="text"
                  placeholder="Enter first name"
                  onChangeMethod={() => {}}
                />
                <label htmlFor="lastname">Last Name</label>
                <InputField
                  type="text"
                  placeholder="Enter last name"
                  onChangeMethod={() => {}}
                />
                <label htmlFor="phonenumber">Phone Number</label>
                <InputField
                  type="number"
                  placeholder="234566789909"
                  onChangeMethod={() => {}}
                />
                <label htmlFor="email">Emaill Address</label>
                <InputField
                  type="email"
                  placeholder="Demmah@gmail.com"
                  onChangeMethod={() => {}}
                />
                <Button
                  handleButtonClick={next}
                  text="Next"
                  type="button"
                  btnstyle={{ backgroundColor: "#E21D00", margin: "20px 0px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndividualPartner;

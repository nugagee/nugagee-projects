import React, { useState } from "react";
import Appinstall from "../../components/Appinstall";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./pickup.css";
import InputField from "../../components/InputField";
import { pickupData } from "./pickupdata";
import { pickupDataAjah } from "./aja";

const Pickup = () => {
  const [value, setValue] = useState("");
  const [pickup, setPickUp] = useState(pickupDataAjah);

  const handleChange = (e) => {
    let newValue = e.target.value;
    const newPickup = pickupData;
    if (!newValue) {
      setPickUp(pickupDataAjah);
    } else {
      let obj = newPickup.filter(
        (o) =>
          o.state.toLowerCase().includes(newValue.toLowerCase().trim()) ||
          o.terminal.toLowerCase().includes(newValue.toLowerCase().trim())
      );
      setPickUp(obj);
      console.log(obj);
    }
    setValue(newValue);
  };
  return (
    <div>
      <Navbar />
      <section className="pickup">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-sm-12">
              <div>
                <div>
                  <div class="wrapper">
                    <h2>
                      Pickup Location{" "}
                      <span>
                        <i class="fa fa-info-circle"></i>
                      </span>
                    </h2>
                    <div class="tooltip">
                      <p>
                        Our Pick-Up service operates in the morning hours to
                        Fixed Routes for your travel dates. Specific times vary
                        by geographic area. There is no Pick-Up service on New
                        Year’s Day and Christmas Day. Pick-Up Service ends early
                        on Christmas Eve. Kindly note that these locations for
                        the Pick-Up Service are for the pilot stage and will
                        increase over the coming months. You most opt for pickup
                        when booking online.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <h1 className="mb-2">Pick-up Locations</h1> */}
                <div className="terminal-input">
                  <InputField
                    type="text"
                    value={value}
                    placeholder="Search for pickup location"
                    onChangeMethod={handleChange}
                  />
                </div>
                {/* butoon row */}
                {/* <div className="pl-3 row mt-3 terminal-btn">
                  <div className="mr-2 mt-2">
                    <Button
                      text="Abia"
                      handleButtonClick={() => {}}
                      type="button"
                      btnstyle={{
                        backgroundColor: "rgba(243, 246, 250, 0.8)",
                        color: "rgba(51, 51, 51, 0.7)",
                        border: "solid 1px rgba(86, 204, 242,0.5)",
                        padding: "0px 25px",
                      }}
                    />
                  </div>
                  <div className="mr-2 mt-2">
                    <Button
                      text="Ajah"
                      handleButtonClick={() => {}}
                      type="button"
                      btnstyle={{
                        backgroundColor: "rgba(243, 246, 250, 0.8)",
                        color: "rgba(51, 51, 51, 0.7)",
                        border: "solid 1px rgba(86, 204, 242,0.5)",
                        padding: "0px 28px",
                      }}
                    />
                  </div>
                  <div className="mr-2 mt-2">
                    <Button
                      text="Akonwojo"
                      handleButtonClick={() => {}}
                      type="button"
                      btnstyle={{
                        backgroundColor: "rgba(243, 246, 250, 0.8)",
                        color: "rgba(51, 51, 51, 0.7)",
                        border: "solid 1px rgba(86, 204, 242,0.5)",
                        padding: "0px 28px",
                      }}
                    />
                  </div>
                  <div className="mr-2 mt-2">
                    <Button
                      text="Onitsha"
                      handleButtonClick={() => {}}
                      type="button"
                      btnstyle={{
                        backgroundColor: "rgba(243, 246, 250, 0.8)",
                        color: "rgba(51, 51, 51, 0.7)",
                        border: "solid 1px rgba(86, 204, 242,0.5)",
                        padding: "0px 28px",
                      }}
                    />
                  </div>
                  <div className="mr-2 mt-2">
                    <Button
                      text="Auchi"
                      handleButtonClick={() => {}}
                      type="button"
                      btnstyle={{
                        backgroundColor: "rgba(243, 246, 250, 0.8)",
                        color: "rgba(51, 51, 51, 0.7)",
                        border: "solid 1px rgba(86, 204, 242,0.5)",
                        padding: "0px 28px",
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <Button
                      text="Bayelsa"
                      handleButtonClick={() => {}}
                      type="button"
                      btnstyle={{
                        backgroundColor: "rgba(243, 246, 250, 0.8)",
                        color: "rgba(51, 51, 51, 0.7)",
                        border: "solid 1px rgba(86, 204, 242,0.5)",
                        padding: "0px 28px",
                      }}
                    />
                  </div>
                </div> */}
                {/* button row ends */}
                <div className="mt-5">
                  {pickup.map((pickupdatas) => (
                    <div key={pickupdatas.id}>
                      <ol>
                        {pickupdatas.location.map((locations, index) => (
                          <li key={index}>{locations}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-5 col-sm-12"></div>
          </div>
        </div>
      </section>
      <Appinstall />
      <Footer />
    </div>
  );
};

export default Pickup;

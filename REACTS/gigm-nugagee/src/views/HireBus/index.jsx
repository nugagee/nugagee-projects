import React, { useState } from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import map from "../../assets/img/location.svg";
import Select from "../../components/Dropdown/index";
import people from "../../assets/img/people.svg";
import jetBus from "../../assets/img/Jetmover 1.png";
import hiace from "../../assets/img/hiace.png";
import sienna from "../../assets/img/sienna 1.png";
import Button from "../../components/Button";
import luggages from "../../assets/img/luggage 1.svg";
import { useHistory } from "react-router-dom";
import { getUser } from "../../services/auth";

export const HireBusComponent = () => {
  const history = useHistory();
  const travelDistance = localStorage.getItem("estimatedTravelDistance");
  let hireDetails = localStorage.getItem("allHireDetails");
  hireDetails = JSON.parse(hireDetails);
  // console.log(hireDetails, "check details");
  const [child, setChildren] = useState([]);
  const [bus, setBuses] = useState([]);
  const loggedInUser = getUser();
  const children = [];
  for (let i = 1; i <= 3; i++) {
    children.push(i);
  }
  const childrenOptions = children.map((x) => ({ label: x, value: x }));

  const handleChange = (i, item, e) => {
    const old = child[i];
    const updated = {
      ...old,
      VehicleModelId: item.VehicleModelId,
      NoOfBookedVehicle: e.value,
      FarePrice: item.FarePrice,
      SleepOverPrice: item.SleepOverPrice,
    };
    const clone = [...child];
    clone[i] = updated;
    // console.log(clone)
    setChildren(clone);
    localStorage.setItem("selectedHireBuses", JSON.stringify(clone));

    const oldBus = bus[i];
    const busNames = {
      ...oldBus,
      busName: item.VehicleModelName,
      Quantity: e.value,
    };
    const cloneBus = [...bus];
    cloneBus[i] = busNames;
    // console.log(cloneBus, 'bus Name');
    setBuses(cloneBus);
    localStorage.setItem("busNameQantity", JSON.stringify(cloneBus));
  };

  // console.log(child);

  const handleShowPassenger = (e) => {
    e.preventDefault();
    if (loggedInUser === null) {
      setTimeout(() => {
        history.push("/signnow");
      }, 5000);
    } else {
      setTimeout(() => {
        history.push("/hire-passenger-details");
      }, 5000);
    }
  };

  const nf = new Intl.NumberFormat();
  const routeDate = new Date(hireDetails.Departures[0].OnewayPickupDate);
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div>
      <Navbar />
      <section className="bus-select pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="h1-route">
                {hireDetails.Departures[0].OnewayPickupLocation} to{" "}
                {hireDetails.Departures[0].OneWayDropoffLocation}{" "}
                {dateTimeFormat.format(routeDate)}
              </h1>
              <p className="p-route">Select your bus type</p>
            </div>
          </div>
          <br />
          <div className="row row-grid sticky">
            <div className="col-md-9">
              <>
                {!hireDetails.Departures.length ? (
                  <div className="text-center">No bus found</div>
                ) : (
                  <>
                    {hireDetails.Departures.map((item, index) => (
                      <div className="bus-card" key={index}>
                        <div className="row row-grid">
                          <div className="col-md-3">
                            <div className="img-shield p-2">
                              <h1 className="select-h1 text-center">
                                {item.VehicleModelName}
                              </h1>
                              {item.VehicleModelName === "Hiace" ? (
                                <img
                                  src={hiace}
                                  alt="Jetmover 1"
                                  width="170px"
                                />
                              ) : item.VehicleModelName === "Sienna" ? (
                                <img src={sienna} alt="Jetmover 1" />
                              ) : item.VehicleModelName === "Prime" ? (
                                <img src={jetBus} alt="Jetmover 1" />
                              ) : item.VehicleModelName === "Sprinter" ? (
                                <img src={jetBus} alt="Jetmover 1" />
                              ) : null}
                            </div>
                          </div>
                          <div className="col-md-6 align-self-center">
                            <div className="row text-center">
                              <div className="col-md-4">
                                <img src={people} alt="" />
                                <p
                                  className="select-p"
                                  style={{ fontSize: "13px" }}
                                >
                                  <span>Max no of people</span>
                                </p>
                                <p
                                  className="select-p"
                                  style={{ fontSize: "13px" }}
                                >
                                  {item.VehicleTotalNoSeats}
                                </p>
                              </div>
                              <div className="col-md-4">
                                <img src={luggages} alt="" />
                                <p
                                  className="select-p"
                                  style={{ fontSize: "13px" }}
                                >
                                  <span>Excess luggage</span>
                                </p>
                                <p className="select-p">Not allowed</p>
                              </div>
                              <div className="col-md-4">
                                <img src={map} alt="" />
                                <p
                                  className="select-p"
                                  style={{ fontSize: "13px" }}
                                >
                                  <span>Estimated distance</span>
                                </p>
                                <p className="select-p">{travelDistance}Km</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 align-self-center">
                            <div className="pr-5">
                              <h1
                                className="select-amt text-center"
                                style={{ color: "#333333" }}
                              >
                                ₦{nf.format(item.FarePrice)}
                              </h1>
                              <Select
                                options={childrenOptions}
                                handleChange={(e) =>
                                  handleChange(index, item, e)
                                }
                                placeholder="Quantity"
                                // value={child[index]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            </div>
            <div className="col-md-3 con-sticky">
              <div className="trip-summary">
                <h1 className="trip-route" style={{ fontSize: "16px" }}>
                  Booking Summary
                </h1>
                <div className="d-flex">
                  <p className="left-par">Departure </p>
                  <p className="left-par ml-auto"></p>
                </div>
                <div className="d-flex">
                  <p className="left-par">Date </p>
                  <p className="left-par ml-auto">
                    <span>{dateTimeFormat.format(routeDate)}</span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">From</p>
                  <p className="left-par ml-auto">
                    <span>
                      {hireDetails.Departures[0].OnewayPickupLocation}
                    </span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">To</p>
                  <p className="left-par ml-auto">
                    <span>
                      {hireDetails.Departures[0].OneWayDropoffLocation}
                    </span>{" "}
                  </p>
                </div>

                <Button
                  text="Continue"
                  handleButtonClick={handleShowPassenger}
                  type="button"
                  btnstyle={{ backgroundColor: " #E21D00" }}
                  disabled={!child.length}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default HireBusComponent;

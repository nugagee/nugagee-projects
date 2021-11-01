import React, { useState } from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./index.css";
import jetBus from "../../assets/img/Jetmover 1.png";
import chair from "../../assets/img/car-seat 1.svg";
import time from "../../assets/img/clock (2) 2.svg";
import adult from "../../assets/img/group.svg";
import map from "../../assets/img/location.svg";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import steering from "../../assets/img/steering-wheel 1.svg";
import carseat from "../../assets/img/seat 2.svg";
import selected from "../../assets/img/selected.svg";
import available from "../../assets/img/available.svg";
import booked from "../../assets/img/booked.svg";
//import { seatsData } from "./data";
import { useHistory } from "react-router-dom";
import { getUser } from "../../services/auth";

export const BusSelectComponent = () => {
  const [modalVisible, setVisible] = useState(false);
  const [returnModalVisible, setReturnModalVisible] = useState(false);
  const [modalVisibleOne, setVisibleOne] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [returnCurrentData, setReturnCurrentData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageLoadingTwo, setPageLoadingTwo] = useState(false);
  const history = useHistory();
  let userInfo = localStorage.getItem("userSelect");
  const userTripDetails = localStorage.getItem("allTripDetails");
  const loggedInUser = getUser();

  userInfo = JSON.parse(userInfo);
  const data = JSON.parse(userTripDetails);
  console.log(data, "buses");

  const [returnView, setReturnView] = useState(false);

  //split route name to reuse
  const fromArea = userInfo.departureName;
  const toArea = userInfo.arrivalName;

  //coverted date to June 29, 2021 format
  const routeDate = new Date(userInfo.date);
  const routeEndDate = new Date(userInfo.endDate);
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const limit = userInfo.noOfAdult;
  const limitTwo = userInfo.noOfAdult;
  // eslint-disable-next-line
  const [availableSeats, setAvailableSeats] = useState([]);
  const [totalNumberOfSeats, setTotalNumberOfSeats] = useState();
  const [returnAvailableSeats, setReturnAvailableSeats] = useState([]);
  // const [bookedSeats, setBookedSeats] = useState(seatsData[0].BookedSeats);

  const toggleModal = (item) => {
    setVisible(true);
    setTotalNumberOfSeats(item.TotalNumberOfSeats);
    setAvailableSeats(item.AvailableSeats);
    localStorage.setItem("selectedBusData", JSON.stringify(item));
  };

  const toggleModalClose = () => {
    setVisible(false);
  };

  const toggleReturnModal = (item) => {
    setReturnModalVisible(true);
    setReturnAvailableSeats(item.AvailableSeats);
    localStorage.setItem("selectedReturnBusData", JSON.stringify(item));
  };

  const toggleReturnModalClose = () => {
    setReturnModalVisible(false);
  };

  const toggleModalOne = () => {
    setVisibleOne(true);
  };

  const toggleModalCloseOne = () => {
    setVisibleOne(false);
  };

  const nf = new Intl.NumberFormat();

  const handleChange = (e) => {
    let isSelected = e.currentTarget.checked;
    let values = e.target.value;
    let items = [...currentData, values];
    let uniqueItems = [...new Set(items)];
    if (isSelected) {
      if (currentData.length < limit) {
        setCurrentData(uniqueItems);
        localStorage.setItem("selectedSeats", JSON.stringify(uniqueItems));
      } else {
        e.preventDefault();
        isSelected = false;
        toggleModalOne();
      }
    } else {
      setCurrentData(currentData.filter((item) => values !== item));
    }
  };

  const handleChangeReturn = (e) => {
    let isSelected = e.currentTarget.checked;
    let values = e.target.value;
    let items = [...returnCurrentData, values];
    let uniqueItems = [...new Set(items)];
    if (isSelected) {
      if (returnCurrentData.length < limitTwo) {
        setReturnCurrentData(uniqueItems);
        localStorage.setItem(
          "selectedSeatsReturn",
          JSON.stringify(uniqueItems)
        );
      } else {
        e.preventDefault();
        isSelected = false;
        toggleModalOne();
      }
    } else {
      setReturnCurrentData(returnCurrentData.filter((item) => values !== item));
    }
  };

  const showPassengerDetails = (e) => {
    setVisible(false);
    setPageLoading(true);
    e.preventDefault();
    if (data.TripType === 0) {
      if (loggedInUser === null) {
        setTimeout(() => {
          history.push("/signin");
        }, 2000);
      } else {
        setTimeout(() => {
          history.push("/passenger-details");
        }, 2000);
      }
    } else {
      setTimeout(() => {
        setReturnView(true);
        setVisible(false);
        setPageLoading(false);
      }, 2000);
    }
  };

  const showPassengerDetailsRound = (e) => {
    setPageLoadingTwo(true);
    e.preventDefault();
    if (loggedInUser === null) {
      history.push("/signin");
    } else {
      history.push("/passenger-details");
    }
  };

  //exceeded seats modal
  const modalTitleOne = "Select Seat(s) Exceeded";
  const modalBodyOne = (
    <div className="row">
      <div className="col-md-12 text-center">
        <h1 className="h1-route">
          You have exceeded the number of seats selectable
        </h1>
      </div>
    </div>
  );

  //one way seat selection modal
  const width = 500;
  const height = 520;
  const modalTitle = "Select Seat(s)";
  const modalBody = (
    <div className="seats-select pt-2 pb-2">
      <div className="row text-center">
        <div className="col-4">
          <h1 className="titles-seat">
            <img src={selected} alt="" />
            <br/> Selected Seat
          </h1>
        </div>
        <div className="col-4">
          <h1 className="titles-seat">
            <img src={available} alt="" /> <br/>Available Seat
          </h1>
        </div>
        <div className="col-4">
          <h1 className="titles-seat">
            <img src={booked} alt="" /> <br/>Booked Seat
          </h1>
        </div>
      </div>
      <br />
      {totalNumberOfSeats === 14 ? (
        <div className="row">
          <div className="col-sm-12 col-md-10 offset-md-1">
            <div className="row">
              <div className="col-9">
                <img src={steering} alt="" style={{ width: "40px" }} />
              </div>
              <div className="col-3 align-self-center">
                {availableSeats.includes(1) ? (
                  <>
                    <input
                      id="seat-1"
                      type="checkbox"
                      onChange={handleChange}
                      value="1"
                    />
                    <label htmlFor="seat-1" className="seat-one">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">1</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-1" type="checkbox" disabled={true} />
                    <label htmlFor="seat-1" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">1</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-3">
                {availableSeats.includes(2) ? (
                  <>
                    <input
                      id="seat-2"
                      type="checkbox"
                      onChange={handleChange}
                      value="2"
                    />
                    <label htmlFor="seat-2" className="seat-two">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">2</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-2" type="checkbox" disabled={true} />
                    <label htmlFor="seat-2" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">2</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(3) ? (
                  <>
                    <input
                      id="seat-3"
                      type="checkbox"
                      onChange={handleChange}
                      value="3"
                    />
                    <label htmlFor="seat-3" className="seat-three">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">3</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-3" type="checkbox" disabled={true} />
                    <label htmlFor="seat-3" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">3</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(4) ? (
                  <>
                    <input
                      id="seat-4"
                      type="checkbox"
                      onChange={handleChange}
                      value="4"
                    />
                    <label htmlFor="seat-4" className="seat-four">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">4</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-4" type="checkbox" disabled={true} />
                    <label htmlFor="seat-4" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">4</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-3">
                {availableSeats.includes(5) ? (
                  <>
                    <input
                      id="seat-5"
                      type="checkbox"
                      onChange={handleChange}
                      value="5"
                    />
                    <label htmlFor="seat-5" className="seat-five">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">5</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-5" type="checkbox" disabled={true} />
                    <label htmlFor="seat-5" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">5</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(6) ? (
                  <>
                    <input
                      id="seat-6"
                      type="checkbox"
                      onChange={handleChange}
                      value="6"
                    />
                    <label htmlFor="seat-6" className="seat-six">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">6</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-6" type="checkbox" disabled={true} />
                    <label htmlFor="seat-6" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">6</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3"></div>
              <div className="col-3">
                {availableSeats.includes(7) ? (
                  <>
                    <input
                      id="seat-7"
                      type="checkbox"
                      onChange={handleChange}
                      value="7"
                    />
                    <label htmlFor="seat-7" className="seat-seven">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">7</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-7" type="checkbox" disabled={true} />
                    <label htmlFor="seat-7" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">7</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-3">
                {availableSeats.includes(8) ? (
                  <>
                    <input
                      id="seat-8"
                      type="checkbox"
                      onChange={handleChange}
                      value="8"
                    />
                    <label htmlFor="seat-8" className="seat-eight">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">8</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-8" type="checkbox" disabled={true} />
                    <label htmlFor="seat-8" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">8</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(9) ? (
                  <>
                    <input
                      id="seat-9"
                      type="checkbox"
                      onChange={handleChange}
                      value="9"
                    />
                    <label htmlFor="seat-9" className="seat-nine">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">9</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-9" type="checkbox" disabled={true} />
                    <label htmlFor="seat-9" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">9</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3"></div>
              <div className="col-3">
                {availableSeats.includes(10) ? (
                  <>
                    <input
                      id="seat-10"
                      type="checkbox"
                      onChange={handleChange}
                      value="10"
                    />
                    <label htmlFor="seat-10" className="seat-ten">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">10</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-10" type="checkbox" disabled={true} />
                    <label htmlFor="seat-10" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">10</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-3">
                {availableSeats.includes(11) ? (
                  <>
                    <input
                      id="seat-11"
                      type="checkbox"
                      onChange={handleChange}
                      value="11"
                    />
                    <label htmlFor="seat-11" className="seat-eleven">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">11</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-11" type="checkbox" disabled={true} />
                    <label htmlFor="seat-11" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">11</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(12) ? (
                  <>
                    <input
                      id="seat-12"
                      type="checkbox"
                      onChange={handleChange}
                      value="12"
                    />
                    <label htmlFor="seat-12" className="seat-twelve">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">12</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-12" type="checkbox" disabled={true} />
                    <label htmlFor="seat-12" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">12</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(13) ? (
                  <>
                    <input
                      id="seat-13"
                      type="checkbox"
                      onChange={handleChange}
                      value="13"
                    />
                    <label htmlFor="seat-13" className="seat-thirteen">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">13</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-13" type="checkbox" disabled={true} />
                    <label htmlFor="seat-13" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">13</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(14) ? (
                  <>
                    <input
                      id="seat-14"
                      type="checkbox"
                      onChange={handleChange}
                      value="14"
                    />
                    <label htmlFor="seat-14" className="seat-fourteen">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">14</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-14" type="checkbox" disabled={true} />
                    <label htmlFor="seat-14" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">14</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <Button
                  text="Continue"
                  handleButtonClick={showPassengerDetails}
                  type="button"
                  disabled={currentData.length < limit}
                />
              </div>
            </div>
          </div>
        </div>
      ) : totalNumberOfSeats === 13 ? (
        <div className="row">
          <div className="col-sm-12 col-md-10 offset-md-1">
            <div className="row">
              <div className="col-9">
                <img src={steering} alt="" style={{ width: "40px" }} />
              </div>
              <div className="col-3 align-self-center">
                {availableSeats.includes(1) ? (
                  <>
                    <input
                      id="seat-1"
                      type="checkbox"
                      onChange={handleChange}
                      value="1"
                    />
                    <label htmlFor="seat-1" className="seat-one">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">1</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-1" type="checkbox" disabled={true} />
                    <label htmlFor="seat-1" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">1</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-3">
                {availableSeats.includes(2) ? (
                  <>
                    <input
                      id="seat-2"
                      type="checkbox"
                      onChange={handleChange}
                      value="2"
                    />
                    <label htmlFor="seat-2" className="seat-two">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">2</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-2" type="checkbox" disabled={true} />
                    <label htmlFor="seat-2" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">2</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(3) ? (
                  <>
                    <input
                      id="seat-3"
                      type="checkbox"
                      onChange={handleChange}
                      value="3"
                    />
                    <label htmlFor="seat-3" className="seat-three">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">3</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-3" type="checkbox" disabled={true} />
                    <label htmlFor="seat-3" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">3</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(4) ? (
                  <>
                    <input
                      id="seat-4"
                      type="checkbox"
                      onChange={handleChange}
                      value="4"
                    />
                    <label htmlFor="seat-4" className="seat-four">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">4</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-4" type="checkbox" disabled={true} />
                    <label htmlFor="seat-4" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">4</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-3">
                {availableSeats.includes(5) ? (
                  <>
                    <input
                      id="seat-5"
                      type="checkbox"
                      onChange={handleChange}
                      value="5"
                    />
                    <label htmlFor="seat-5" className="seat-five">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">5</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-5" type="checkbox" disabled={true} />
                    <label htmlFor="seat-5" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">5</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(6) ? (
                  <>
                    <input
                      id="seat-6"
                      type="checkbox"
                      onChange={handleChange}
                      value="6"
                    />
                    <label htmlFor="seat-6" className="seat-six">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">6</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-6" type="checkbox" disabled={true} />
                    <label htmlFor="seat-6" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">6</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3"></div>
              <div className="col-3">
                {availableSeats.includes(7) ? (
                  <>
                    <input
                      id="seat-7"
                      type="checkbox"
                      onChange={handleChange}
                      value="7"
                    />
                    <label htmlFor="seat-7" className="seat-seven">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">7</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-7" type="checkbox" disabled={true} />
                    <label htmlFor="seat-7" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">7</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-3">
                {availableSeats.includes(8) ? (
                  <>
                    <input
                      id="seat-8"
                      type="checkbox"
                      onChange={handleChange}
                      value="8"
                    />
                    <label htmlFor="seat-8" className="seat-eight">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">8</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-8" type="checkbox" disabled={true} />
                    <label htmlFor="seat-8" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">8</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(9) ? (
                  <>
                    <input
                      id="seat-9"
                      type="checkbox"
                      onChange={handleChange}
                      value="9"
                    />
                    <label htmlFor="seat-9" className="seat-nine">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">9</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-9" type="checkbox" disabled={true} />
                    <label htmlFor="seat-9" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">9</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3"></div>
              <div className="col-3">
                {availableSeats.includes(10) ? (
                  <>
                    <input
                      id="seat-10"
                      type="checkbox"
                      onChange={handleChange}
                      value="10"
                    />
                    <label htmlFor="seat-10" className="seat-ten">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">10</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-10" type="checkbox" disabled={true} />
                    <label htmlFor="seat-10" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">10</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-3">
                {availableSeats.includes(11) ? (
                  <>
                    <input
                      id="seat-11"
                      type="checkbox"
                      onChange={handleChange}
                      value="11"
                    />
                    <label htmlFor="seat-11" className="seat-eleven">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">11</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-11" type="checkbox" disabled={true} />
                    <label htmlFor="seat-11" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">11</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(12) ? (
                  <>
                    <input
                      id="seat-12"
                      type="checkbox"
                      onChange={handleChange}
                      value="12"
                    />
                    <label htmlFor="seat-12" className="seat-twelve">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">12</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-12" type="checkbox" disabled={true} />
                    <label htmlFor="seat-12" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">12</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3"></div>
              <div className="col-3">
                {availableSeats.includes(13) ? (
                  <>
                    <input
                      id="seat-13"
                      type="checkbox"
                      onChange={handleChange}
                      value="13"
                    />
                    <label htmlFor="seat-13" className="seat-thirteen">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">13</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-13" type="checkbox" disabled={true} />
                    <label htmlFor="seat-13" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">13</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <Button
                  text="Continue"
                  handleButtonClick={showPassengerDetails}
                  type="button"
                  disabled={currentData.length < limit}
                />
              </div>
            </div>
          </div>
        </div>
      ) : totalNumberOfSeats === 6 ? (
        <div className="row">
          <div className="col-sm-12 col-md-10 offset-md-1">
            <div className="row">
              <div className="col-9">
                <img src={steering} alt="" style={{ width: "40px" }} />
              </div>
              <div className="col-3 align-self-center">
                {availableSeats.includes(1) ? (
                  <>
                    <input
                      id="seat-1"
                      type="checkbox"
                      onChange={handleChange}
                      value="1"
                    />
                    <label htmlFor="seat-1" className="seat-one">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">1</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-1" type="checkbox" disabled={true} />
                    <label htmlFor="seat-1" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">1</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-3">
                {availableSeats.includes(2) ? (
                  <>
                    <input
                      id="seat-2"
                      type="checkbox"
                      onChange={handleChange}
                      value="2"
                    />
                    <label htmlFor="seat-2" className="seat-two">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">2</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-2" type="checkbox" disabled={true} />
                    <label htmlFor="seat-2" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">2</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(3) ? (
                  <>
                    <input
                      id="seat-3"
                      type="checkbox"
                      onChange={handleChange}
                      value="3"
                    />
                    <label htmlFor="seat-3" className="seat-three">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">3</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-3" type="checkbox" disabled={true} />
                    <label htmlFor="seat-3" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">3</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(4) ? (
                  <>
                    <input
                      id="seat-4"
                      type="checkbox"
                      onChange={handleChange}
                      value="4"
                    />
                    <label htmlFor="seat-4" className="seat-four">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">4</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-4" type="checkbox" disabled={true} />
                    <label htmlFor="seat-4" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">4</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-3">
                {availableSeats.includes(5) ? (
                  <>
                    <input
                      id="seat-5"
                      type="checkbox"
                      onChange={handleChange}
                      value="5"
                    />
                    <label htmlFor="seat-5" className="seat-five">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">5</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-5" type="checkbox" disabled={true} />
                    <label htmlFor="seat-5" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">5</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3">
                {availableSeats.includes(6) ? (
                  <>
                    <input
                      id="seat-6"
                      type="checkbox"
                      onChange={handleChange}
                      value="6"
                    />
                    <label htmlFor="seat-6" className="seat-six">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">6</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-6" type="checkbox" disabled={true} />
                    <label htmlFor="seat-6" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">6</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
              <div className="col-3"></div>
              <div className="col-3">
                {availableSeats.includes(7) ? (
                  <>
                    <input
                      id="seat-7"
                      type="checkbox"
                      onChange={handleChange}
                      value="7"
                    />
                    <label htmlFor="seat-7" className="seat-seven">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">7</h1>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <input id="seat-7" type="checkbox" disabled={true} />
                    <label htmlFor="seat-7" className="disable-seat">
                      <div className="seat-numbers">
                        <img src={carseat} alt="" />
                        <h1 className="number">7</h1>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <Button
                  text="Continue"
                  handleButtonClick={showPassengerDetails}
                  type="button"
                  disabled={currentData.length < limit}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );

  //round trip seat selection modal
  const widthRound = 500;
  const heightRound = 520;
  const modalTitleRound = "Return Trip Select Seat(s)";
  const modalBodyRound = (
    <div className="seats-select pt-2 pb-2">
      <div className="row">
        <div className="col-md-4">
          <h1 className="titles-seat">
            <img src={selected} alt="" /> Selected Seat
          </h1>
        </div>
        <div className="col-md-4">
          <h1 className="titles-seat">
            <img src={available} alt="" /> Available Seat
          </h1>
        </div>
        <div className="col-md-4">
          <h1 className="titles-seat">
            <img src={booked} alt="" /> Booked Seat
          </h1>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-12 col-md-10 offset-md-1">
          <div className="row">
            <div className="col-9">
              <img src={steering} alt="" style={{ width: "40px" }} />
            </div>
            <div className="col-3 align-self-center">
              {returnAvailableSeats.includes(1) ? (
                <>
                  <input
                    id="seat-15"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="1"
                  />
                  <label htmlFor="seat-15" className="seat-fifteen">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">1</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-15" type="checkbox" disabled={true} />
                  <label htmlFor="seat-15" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">1</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-3">
              {returnAvailableSeats.includes(2) ? (
                <>
                  <input
                    id="seat-16"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="2"
                  />
                  <label htmlFor="seat-16" className="seat-sixteen">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">2</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-16" type="checkbox" disabled={true} />
                  <label htmlFor="seat-16" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">2</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
            <div className="col-3">
              {returnAvailableSeats.includes(3) ? (
                <>
                  <input
                    id="seat-17"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="3"
                  />
                  <label htmlFor="seat-17" className="seat-seventeen">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">3</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-17" type="checkbox" disabled={true} />
                  <label htmlFor="seat-17" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">3</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
            <div className="col-3">
              {returnAvailableSeats.includes(4) ? (
                <>
                  <input
                    id="seat-18"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="4"
                  />
                  <label htmlFor="seat-18" className="seat-eighteen">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">4</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-18" type="checkbox" disabled={true} />
                  <label htmlFor="seat-18" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">4</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-3">
              {returnAvailableSeats.includes(5) ? (
                <>
                  <input
                    id="seat-19"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="5"
                  />
                  <label htmlFor="seat-19" className="seat-nineteen">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">5</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-19" type="checkbox" disabled={true} />
                  <label htmlFor="seat-19" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">5</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
            <div className="col-3">
              {returnAvailableSeats.includes(6) ? (
                <>
                  <input
                    id="seat-20"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="6"
                  />
                  <label htmlFor="seat-20" className="seat-twenty">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">6</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-20" type="checkbox" disabled={true} />
                  <label htmlFor="seat-20" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">6</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
            <div className="col-3"></div>
            <div className="col-3">
              {returnAvailableSeats.includes(7) ? (
                <>
                  <input
                    id="seat-21"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="7"
                  />
                  <label htmlFor="seat-21" className="seat-twentyone">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">7</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-21" type="checkbox" disabled={true} />
                  <label htmlFor="seat-21" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">7</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-3">
              {returnAvailableSeats.includes(8) ? (
                <>
                  <input
                    id="seat-22"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="8"
                  />
                  <label htmlFor="seat-22" className="seat-twentytwo">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">8</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-22" type="checkbox" disabled={true} />
                  <label htmlFor="seat-22" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">8</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
            <div className="col-3">
              {returnAvailableSeats.includes(9) ? (
                <>
                  <input
                    id="seat-23"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="9"
                  />
                  <label htmlFor="seat-23" className="seat-twentythree">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">9</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-23" type="checkbox" disabled={true} />
                  <label htmlFor="seat-23" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">9</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
            <div className="col-3"></div>
            <div className="col-3">
              {returnAvailableSeats.includes(10) ? (
                <>
                  <input
                    id="seat-24"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="10"
                  />
                  <label htmlFor="seat-24" className="seat-twentyfour">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">10</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-24" type="checkbox" disabled={true} />
                  <label htmlFor="seat-24" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">10</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-3">
              {returnAvailableSeats.includes(11) ? (
                <>
                  <input
                    id="seat-25"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="11"
                  />
                  <label htmlFor="seat-25" className="seat-twentyfive">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">11</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-25" type="checkbox" disabled={true} />
                  <label htmlFor="seat-25" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">11</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
            <div className="col-3">
              {returnAvailableSeats.includes(12) ? (
                <>
                  <input
                    id="seat-26"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="12"
                  />
                  <label htmlFor="seat-26" className="seat-twentysix">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">12</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-26" type="checkbox" disabled={true} />
                  <label htmlFor="seat-26" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">12</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
            <div className="col-3">
              {returnAvailableSeats.includes(13) ? (
                <>
                  <input
                    id="seat-27"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="13"
                  />
                  <label htmlFor="seat-27" className="seat-twentyseven">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">13</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-27" type="checkbox" disabled={true} />
                  <label htmlFor="seat-27" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">13</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
            <div className="col-3">
              {returnAvailableSeats.includes(14) ? (
                <>
                  <input
                    id="seat-28"
                    type="checkbox"
                    onChange={handleChangeReturn}
                    value="14"
                  />
                  <label htmlFor="seat-28" className="seat-twentyeight">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">14</h1>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <input id="seat-28" type="checkbox" disabled={true} />
                  <label htmlFor="seat-28" className="disable-seat">
                    <div className="seat-numbers">
                      <img src={carseat} alt="" />
                      <h1 className="number">14</h1>
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12">
              <Button
                text="Continue"
                handleButtonClick={showPassengerDetailsRound}
                type="button"
                disabled={returnCurrentData.length < limitTwo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      {/* one way Modal*/}
      <Modal
        width={width}
        height={height}
        visible={modalVisible}
        title={modalTitle}
        body={modalBody}
        handleClose={toggleModalClose}
      />
      {/* Return Modal*/}
      <Modal
        width={widthRound}
        height={heightRound}
        visible={returnModalVisible}
        title={modalTitleRound}
        body={modalBodyRound}
        handleClose={toggleReturnModalClose}
      />

      {/* Exceeded seat selection modal*/}
      <Modal
        visible={modalVisibleOne}
        title={modalTitleOne}
        body={modalBodyOne}
        handleClose={toggleModalCloseOne}
      />

      {pageLoading ? (
        <div className="text-center">
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          {returnView === true ? (
            <>
              {pageLoadingTwo ? (
                <div className="text-center">
                  <div className="lds-default">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ) : (
                <>
                  <section className="bus-select pt-5 pb-5">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <h1 className="h1-route">
                            Return Trip Bus Availability
                          </h1>
                          <h1 className="h1-route">
                            {toArea} to {fromArea}{" "}
                            {dateTimeFormat.format(routeEndDate)}{" "}
                            {userInfo.noOfAdult} Adult(s)
                          </h1>
                          <p className="p-route">Select your bus type</p>
                        </div>
                      </div>
                      <br />
                      <>
                        {!data.Arrivals.length ? (
                          <div className="text-center">No bus found</div>
                        ) : (
                          <>
                            {data.Arrivals.map((item, index) => (
                              <div className="bus-card" key={index}>
                                <div className="row row-grid">
                                  <div className="col-md-3">
                                    <div className="img-shield p-5">
                                      <img src={jetBus} alt="Jetmover 1" />
                                    </div>
                                  </div>
                                  <div className="col-md-6 align-self-center">
                                    <h1 className="select-h1">
                                      {item.VehicleName}
                                    </h1>
                                    <p className="select-p">
                                      <span>Departure:</span>&nbsp;{toArea}
                                      &nbsp;
                                      <span>•</span>
                                      &nbsp;<span>Arrival:</span>&nbsp;
                                      {fromArea}
                                    </p>
                                    <p className="select-p">
                                      <img src={chair} alt="" />
                                      &nbsp; {item.TotalNumberOfSeats}{" "}
                                      seats(available)&nbsp;{" "}
                                      <img src={time} alt="" />
                                      &nbsp; {item.DepartureTime}
                                    </p>
                                    <p className="select-p">
                                      <img src={adult} alt="" />
                                      &nbsp; Adult: {userInfo.noOfAdult}&nbsp;
                                      Child:{" "}
                                      {userInfo.noOfChild <= 0
                                        ? "0"
                                        : userInfo.noOfChild}
                                    </p>
                                    <hr />
                                    <p className="map-p">
                                      <img src={map} alt="" />
                                      &nbsp; View terminal location on map{" "}
                                      <i className="fa fa-angle-right"></i>
                                    </p>
                                  </div>
                                  <div className="col-md-3 align-self-center">
                                    <div className=" text-center pr-5">
                                      <h1 className="select-amt">
                                        ₦{nf.format(item.FarePrice)}
                                      </h1>
                                      <Button
                                        text="View Seats"
                                        handleButtonClick={() =>
                                          toggleReturnModal(item)
                                        }
                                        type="button"
                                        btnstyle={{
                                          background: "#56CCF2",
                                          color: "white",
                                        }}
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
                  </section>
                </>
              )}
            </>
          ) : (
            <section className="bus-select pt-5 pb-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="h1-route">
                      {fromArea} to {toArea} {dateTimeFormat.format(routeDate)}{" "}
                      {userInfo.noOfAdult} Adult(s)
                    </h1>
                    <p className="p-route">Select your bus type</p>
                  </div>
                </div>
                <br />
                <>
                  {!data.Departures.length ? (
                    <div className="text-center">No bus found</div>
                  ) : (
                    <>
                      {data.Departures.map((item, index) => (
                        <div className="bus-card" key={index}>
                          <div className="row row-grid">
                            <div className="col-md-3">
                              <div className="img-shield p-5">
                                <img src={jetBus} alt="Jetmover 1" />
                              </div>
                            </div>
                            <div className="col-md-6 align-self-center">
                              <h1 className="select-h1">{item.VehicleName}</h1>
                              <p className="select-p">
                                <span>Departure:</span>&nbsp;{fromArea}&nbsp;
                                <span>•</span>
                                &nbsp;<span>Arrival:</span>&nbsp;{toArea}
                              </p>
                              <p className="select-p">
                                <img src={chair} alt="" />
                                &nbsp; {item.TotalNumberOfSeats}{" "}
                                seats(available)&nbsp; <img src={time} alt="" />
                                &nbsp; {item.DepartureTime}
                              </p>
                              <p className="select-p">
                                <img src={adult} alt="" />
                                &nbsp; Adult: {userInfo.noOfAdult}&nbsp; Child:{" "}
                                {userInfo.noOfChild <= 0
                                  ? "0"
                                  : userInfo.noOfChild}
                              </p>
                              <hr />
                              <p className="map-p">
                                <img src={map} alt="" />
                                &nbsp; View terminal location on map{" "}
                                <i className="fa fa-angle-right"></i>
                              </p>
                            </div>
                            <div className="col-md-3 align-self-center">
                              <div className=" text-center pr-5">
                                <h1 className="select-amt">
                                  ₦{nf.format(item.FarePrice)}
                                </h1>
                                <Button
                                  text="View Seats"
                                  handleButtonClick={() => toggleModal(item)}
                                  type="button"
                                  btnstyle={{
                                    background: "#56CCF2",
                                    color: "white",
                                  }}
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
            </section>
          )}
        </>
      )}

      <Footer />
    </div>
  );
};
export default BusSelectComponent;

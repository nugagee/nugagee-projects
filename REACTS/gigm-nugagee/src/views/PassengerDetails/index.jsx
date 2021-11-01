import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useHistory } from "react-router-dom";
import "./index.css";
import Button from "../../components/Button";
//import PhoneInput, { formatPhoneNumber } from "react-phone-number-input";
//import "react-phone-number-input/style.css";
import InputField from "../../components/InputField";
import errorIcon from "../../assets/img/x-circle.png";
import Modal from "../../components/Modal";
import nb from "../../assets/img/nb.png";
import paystack from "../../assets/img/Paystack-CeruleanBlue-StackBlue-HL.png";
import flutterwave from "../../assets/img/flutterwave_logo_color.svg";
import woven from "../../assets/img/Woven_Forly.svg";
import apiroutes from "../../services/apiroutes";
import { request } from "../../services/apiservice";
import { requestWallet } from "../../services/apiserviceWallet";
import ButtonComponent from "../../components/otpinput";
import {
  getAuth,
  getAuthWallet,
  setUserWallet,
  getUserWallet,
} from "../../services/auth";
import makeAPICall from "../../services/paystackPay";
import makeAPICallFlutter from "../../services/flutterwavePay";
import makeAPICallWoven from "../../services/wovenPay";
import { getUser } from "../../services/auth";
import config from "../../configs";

export const DetailsComponent = () => {
  const history = useHistory();
  const loggedInUser = getUser();
  const walletUser = getUserWallet();
  const walletDetails = getAuthWallet();
  // console.log(walletUser, "wallet user amount");
  const [modalVisible, setVisible] = useState(false);
  const [modalVisibleAmount, setVisibleAmount] = useState(false);
  const [modalVisiblePin, setVisiblePin] = useState(false);
  const [walletState, setWalletState] = useState(false);
  const [value, setValue] = useState();
  const [valueTwo, setValueTwo] = useState("");
  const [fullName, setFullName] = useState("");
  const [kinName, setKinName] = useState("");
  const [email, setEmail] = useState("");
  const [otpInput, setOtpInput] = useState();
  const [gender, setGender] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  const token = getAuth("access_token");
  const [inputList, setInputList] = useState([{ fullName: "", Gender: "" }]);
  const [isActive, setIsActive] = useState(false);
  const paymentOptions = [
    { id: 13, name: "woven" },
    { id: 8, name: "flutterwave" },
    { id: 5, name: "paystack" },
    { id: 23, name: "wallet" },
  ];
  const userTripDetails = localStorage.getItem("allTripDetails");
  const data = JSON.parse(userTripDetails);
  let userInfo = localStorage.getItem("userSelect");
  userInfo = JSON.parse(userInfo);
  let tripInfo = localStorage.getItem("selectedBusData");
  tripInfo = JSON.parse(tripInfo);
  let returnTripInfo = localStorage.getItem("selectedReturnBusData");
  returnTripInfo = JSON.parse(returnTripInfo);
  // console.log(returnTripInfo, 'details')
  const totalPayableAmount =
    returnTripInfo === null
      ? tripInfo.FarePrice * userInfo.noOfAdult
      : returnTripInfo.FarePrice * userInfo.noOfAdult +
        tripInfo.FarePrice * userInfo.noOfAdult;
  let selectedSeats = localStorage.getItem("selectedSeats");
  selectedSeats = JSON.parse(selectedSeats);
  const userSeats = selectedSeats.toString();
  let selectedSeatsReturn = localStorage.getItem("selectedSeatsReturn");
  selectedSeatsReturn =
    selectedSeatsReturn === null ? "1,2,3" : JSON.parse(selectedSeatsReturn);
  const userReturnSeats = selectedSeatsReturn.toString();
  const routeDate = new Date(userInfo.date);
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleInputChange = (i, e) => {
    const values = [...inputList];
    if (e.target.name === "fullName") {
      values[i].fullName = e.target.value;
    } else {
      values[i].Gender = e.target.value;
    }

    setInputList(values);
  };

  const handleAddFields = (value) => {
    const values = [...inputList];
    for (let i = 0; i < value - 1; i++) {
      values.push({ fullName: "", Gender: "" });
      setInputList(values);
    }
  };

  useEffect(() => {
    if (loggedInUser === null) {
      return false;
    } else {
      setValueTwo(loggedInUser.PhoneNumber);
      setFullName(loggedInUser.FirstName);
      setEmail(loggedInUser.Email);
      setGender(loggedInUser.Gender === 0 ? "male" : "female");
      setKinName(loggedInUser.NextOfKinName);
      setValue(loggedInUser.NextOfKinPhone);
      getCurrentWallet();
    }
    // eslint-disable-next-line
  }, []);

  const onChangeOtp = (otpInput) => {
    setOtpInput(otpInput);
  };

  const getCurrentWallet = () => {
    requestWallet(
      apiroutes.GetWallet(loggedInUser.PhoneNumber, loggedInUser.Email),
      "get",
      null,
      walletDetails.access_token
    )
      .then((res) => {
        // console.log(res.data);
        const data = {
          availableBalance: res.data.payload.availableBalance,
          blockedBalance: res.data.payload.blockedBalance,
          email: res.data.payload.email,
          hasPin: res.data.payload.hasPin,
          id: res.data.payload.id,
          ledgerBalance: res.data.payload.ledgerBalance,
          phoneNumber: res.data.payload.phoneNumber,
        };
        setUserWallet(data);
        setWalletState(true);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.description === "Wallet does not exist") {
          setWalletState(false);
        }
      });
  };

  useEffect(() => {
    let noOfAdult = parseInt(userInfo.noOfAdult);
    handleAddFields(noOfAdult - 1);
    // eslint-disable-next-line
  }, []);

  const onValueChange = (e) => {
    setGender(e.target.value);
  };

  const toggleModal = () => {
    setVisible(true);
  };

  const toggleModalClose = () => {
    setVisible(false);
  };

  const toggleModalPin = () => {
    setVisiblePin(true);
    toggleModalClose();
  };

  const toggleModalPinClose = () => {
    setVisiblePin(false);
  };

  const toggleModalAmount = () => {
    setVisibleAmount(true);
    toggleModalClose();
  };

  const toggleModalAmountClose = () => {
    setVisibleAmount(false);
  };

  const nf = new Intl.NumberFormat();

  const payPostSearch = (items) => {
    setPageLoading(true);
    let postData = {};
    if (data.TripType === 0) {
      if (userInfo.noOfAdult === "1") {
        postData = {
          TripType: 0,
          PaymentMethod: items.id,
          BookingType: 2,
          PassengerType: 0,
          FirstName: fullName,
          LastName: "",
          Gender: gender === "male" ? 0 : 1,
          RouteId: tripInfo.RouteId,
          Amount: totalPayableAmount,
          TravelDocumentId: 0,
          Email: email,
          PhoneNumber: valueTwo,
          NextOfKinName: kinName,
          NextOfKinPhone: value,
          SeatRegistrations: tripInfo.VehicleTripRegistrationId.concat(
            ":" + userSeats
          ),
          VehicleTripRegistrationId: tripInfo.VehicleTripRegistrationId,
        };
      } else {
        postData = {
          TripType: 0,
          PaymentMethod: items.id,
          BookingType: 2,
          PassengerType: 0,
          FirstName: fullName,
          LastName: "",
          Gender: gender === "male" ? 0 : 1,
          RouteId: tripInfo.RouteId,
          Amount: totalPayableAmount,
          TravelDocumentId: 0,
          Email: email,
          PhoneNumber: valueTwo,
          NextOfKinName: kinName,
          NextOfKinPhone: value,
          SeatRegistrations: tripInfo.VehicleTripRegistrationId.concat(
            ":" + userSeats
          ),
          VehicleTripRegistrationId: tripInfo.VehicleTripRegistrationId,
          Beneficiaries: inputList,
        };
      }
    } else {
      if (userInfo.noOfAdult === "1") {
        postData = {
          TripType: 1,
          PaymentMethod: items.id,
          BookingType: 2,
          PassengerType: 0,
          FirstName: fullName,
          LastName: "",
          Gender: gender === "male" ? 0 : 1,
          RouteId: tripInfo.RouteId,
          RouteIdReturn: returnTripInfo.RouteIdReturn,
          Amount: totalPayableAmount,
          TravelDocumentId: 0,
          Email: email,
          PhoneNumber: valueTwo,
          NextOfKinName: kinName,
          NextOfKinPhone: value,
          SeatRegistrations:
            tripInfo.VehicleTripRegistrationId.concat(":" + userSeats) +
            ";" +
            returnTripInfo.VehicleTripRegistrationId.concat(
              ":" + userReturnSeats
            ),
          VehicleTripRegistrationId: tripInfo.VehicleTripRegistrationId,
        };
      } else {
        postData = {
          TripType: 1,
          PaymentMethod: items.id,
          BookingType: 2,
          PassengerType: 0,
          FirstName: fullName,
          LastName: "",
          Gender: gender === "male" ? 0 : 1,
          RouteId: tripInfo.RouteId,
          RouteIdReturn: returnTripInfo.RouteIdReturn,
          Amount: totalPayableAmount,
          TravelDocumentId: 0,
          Email: email,
          PhoneNumber: valueTwo,
          NextOfKinName: kinName,
          NextOfKinPhone: value,
          SeatRegistrations:
            tripInfo.VehicleTripRegistrationId.concat(":" + userSeats) +
            ";" +
            returnTripInfo.VehicleTripRegistrationId.concat(
              ":" + userReturnSeats
            ),
          VehicleTripRegistrationId: tripInfo.VehicleTripRegistrationId,
          Beneficiaries: inputList,
        };
      }
    }

    // console.log(postData, "post data info");

    request(apiroutes.PostSearch(), "post", postData, token)
      .then((res) => {
        // console.log(res, "transacction reference post search response");
        setPageLoading(false);
        const emailAmount = {
          email: email,
          amount: res.data.Object.Amount,
          mainName: fullName,
          otherNames: inputList,
          seats: selectedSeats,
          refCode: res.data.Object.BookingReferenceCode,
        };
        localStorage.setItem("transEmailAmount", JSON.stringify(emailAmount));
        if (items.id === 5) {
          paystackPay(
            res.data.Object.BookingReferenceCode,
            res.data.Object.Amount
          );
        } else if (items.id === 8) {
          flutterwavePay(
            res.data.Object.BookingReferenceCode,
            res.data.Object.Amount
          );
        } else if (items.id === 13) {
          wovenPay(
            res.data.Object.BookingReferenceCode,
            res.data.Object.Amount
          );
        } else if (items.id === 23) {
          walletPay(res.data.Object.Amount);
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err.response);
        setPageLoading(false);
      });
  };

  const paystackPay = (refCode, amount) => {
    const configLoad = {
      reference: refCode,
      email: email,
      amount: amount * 100,
      callback_url: config.FALL_BACK_ENDPOINT,
    };
    return makeAPICall({
      payload: configLoad,
      method: "POST",
    })
      .then((result) => {
        console.log(result);
        if (result.status === true) {
          window.location.href = `https://checkout.paystack.com/${result.data.access_code}`;
        }
      })
      .catch((err) => console.log(err));
  };

  const payWallet = () => {
    toggleModalPinClose();
    let data = localStorage.getItem("transEmailAmount");
    data = JSON.parse(data);
    const formEncoded = new URLSearchParams({
      Email: email,
      Amount: data.amount,
      PhoneNumber: valueTwo,
      WalletId: walletUser.id,
      Reference: data.refCode,
      TransactionDesc: "Bus Booking",
      Pin: otpInput,
    });
    // console.log(formEncoded, "pay wallet config");
    requestWallet(
      apiroutes.DebitWallet(),
      "post",
      formEncoded,
      walletDetails.access_token
    )
      .then((res) => {
        console.log(res);
        if (res.data.description === "Successful") {
          history.push("/confirmed-wallet-payment");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const walletPay = (amount) => {
    if (walletUser.availableBalance < amount) {
      toggleModalAmount();
    } else {
      toggleModalPin();
      // payWallet(refCode, amount);
    }
  };

  const flutterwavePay = (refCode, amount) => {
    // return console.log("flutterwave pay");
    const configLoad = {
      tx_ref: refCode,
      amount: amount,
      currency: "NGN",
      redirect_url: config.FALL_BACK_ENDPOINT_FLUTTER,
      payment_options: "card, mobilemoney, ussd",
      customer: {
        email: email,
        phonenumber: valueTwo,
      },
    };
    return makeAPICallFlutter({
      payload: configLoad,
      method: "POST",
    })
      .then((result) => {
        // console.log(result);
        if (result.status === "success") {
          window.location.href = result.data.link;
        }
      })
      .catch((err) => console.log(err));
  };

  const currentNow = new Date();

  // eslint-disable-next-line no-extend-native
  Date.prototype.addMinutes = function (minutes) {
    this.setMinutes(this.getMinutes() + minutes);
    return this;
  };

  const wovenPay = (refCode, amount) => {
    // return console.log("woven pay");
    const configLoad = {
      customer_reference: refCode,
      name: fullName,
      email: email,
      mobile_number: valueTwo,
      expires_on: currentNow.addMinutes(60).toString("yyyy-MM-dd : HH:MM:ss"),
      use_frequency: "1",
      min_amount: amount,
      max_amount: amount,
      callback_url: config.FALL_BACK_ENDPOINT_WOVEN,
      destination_nuban: "",
      meta_data: ["somedatakey", "somdatavalue"],
    };
    return makeAPICallWoven({
      payload: configLoad,
      method: "POST",
    })
      .then((result) => {
        // console.log(result);
        localStorage.setItem(
          "wovenAccountDetails",
          JSON.stringify(result.data)
        );
        history.push("/woven-pay");
      })
      .catch((err) => console.log(err));
  };

  const width = 500;
  const height = 530;
  const heightThree = 300;
  const modalTitle = "Trip payment";
  const modalPar = "You are about to fund this trip";
  const modalTitleTwo = "Transaction Pin";
  const modalParTwo = "Please Enter Your 4 Digit Transaction Pin";
  const modalBodyPin = (
    <div>
      <div className="row">
        <div className="col-md-12">
          <ButtonComponent
            secret
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            inputStyle={{
              borderRadius: "0.7142857143rem",
              width: "60px",
              height: "60px",
              backgroundColor: "#f8f5f4",
              border: "0.3px solid #c5afad52",
              fontSize: "1.1428571429rem",
              fontFamily: "Cerebri Sans Pro Bold",
              color: "#949494",
              marginBottom: "10px",
            }}
            handlePincomplete={onChangeOtp}
            length={4}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-12 col-md-8 offset-md-2">
          <div className="text-center">
            <Button
              type="button"
              handleButtonClick={payWallet}
              text="Proceed"
              disabled={!otpInput}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const modalBodyLowAmount = (
    <div className="row">
      <div className="col-md-12">
        <div className="text-center">
          <img src={errorIcon} alt="" />
        </div>
        <p className="wallet-onboarding-p text-center">
          Your wallet balance is low
        </p>
        <br />
        <div className="row">
          <div className="col-sm-12 col-md-8 offset-md-2">
            <div className="text-center">
              <Button
                type="button"
                handleButtonClick={toggleModalAmountClose}
                text="Try Again"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const modalBody = (
    <div>
      <div className="text-center">
        <p className="passenger-amt">Amount</p>
        <h1 className="p-amt">₦{nf.format(totalPayableAmount)}</h1>
        <p className="p-nb">
          <img src={nb} alt="" style={{ width: "10px" }} /> Selecting any of the
          payment method will redirect you to their payment platform.
        </p>
        <h2 className="pay-mthod">Select payment method</h2>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-12">
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
            <div className="row">
              {paymentOptions.map((items) => (
                <div className="col-md-4" key={items.id}>
                  <div onClick={() => payPostSearch(items)}>
                    <div>
                      {items.id === 5 ? (
                        <div className="pay-bg">
                          <img src={paystack} alt="" width="80px" />
                        </div>
                      ) : items.id === 8 ? (
                        <div className="pay-bg">
                          <img src={flutterwave} alt="" width="100px" />
                        </div>
                      ) : items.id === 13 ? (
                        <div className="pay-bg">
                          <img src={woven} alt="" width="100px" />
                        </div>
                      ) : items.id === 23 ? (
                        walletState && <div className="pay-bg">Wallet Pay</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const createInput = (el, index) => {
    const inputs = [];
    inputs.push(
      <div className="stepform-card" key={index}>
        <h2 className="step-p">Passenger #{index + 1}</h2>
        <label className="label-auth">Full Name</label>
        <input
          type="text"
          placeholder="Enter Full Name"
          name="fullName"
          value={el.fullName}
          onChange={(e) => handleInputChange(index, e)}
          className="multiple-input"
        />
        <br />
        <br />
        <label className="con1">
          <span>Male</span>
          <input
            type="radio"
            name={`${index}-Gender`}
            value="0"
            onChange={(e) => handleInputChange(index, e)}
            required
          />
          <span className="checkmarkSpan"></span>
        </label>
        <label className="con1">
          <span>Female</span>
          <input
            type="radio"
            name={`${index}-Gender`}
            value="1"
            onChange={(e) => handleInputChange(index, e)}
            required
          />
          <span className="checkmarkSpan"></span>
        </label>
      </div>
    );

    return inputs;
  };

  return (
    <div>
      <Navbar />
      <Modal
        width={width}
        height={height}
        visible={modalVisible}
        title={modalTitle}
        paragraph={modalPar}
        body={modalBody}
        handleClose={toggleModalClose}
      />

      <Modal
        width={width}
        height={heightThree}
        visible={modalVisibleAmount}
        body={modalBodyLowAmount}
        handleClose={toggleModalAmountClose}
      />

      <Modal
        width={width}
        height={heightThree}
        visible={modalVisiblePin}
        title={modalTitleTwo}
        paragraph={modalParTwo}
        body={modalBodyPin}
        handleClose={toggleModalPinClose}
      />
      <section className="passenger-details pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="h1-route">
                Hi {loggedInUser === null ? "Guest" : loggedInUser.FirstName},
                we just need few more details about you
              </h1>
            </div>
          </div>
          <br />
          <div className="row row-grid sticky">
            <div className="col-md-6">
              <div className="mobileShow">
                <div className="accordion-item-test">
                  <div
                    className="accordion-title-test"
                    onClick={() => setIsActive(!isActive)}
                  >
                    <div>
                      <h1 className="trip-route">Trip Summary</h1>
                    </div>
                    <div className="actve-state">{isActive ? "see less" : "see more"}</div>
                  </div>
                  {isActive && (
                    <div className="accordion-content-test">
                      <div className="trip-summary">
                        <div className="d-flex">
                          <p className="left-par">From </p>
                          <p className="left-par ml-auto">
                            <span>{userInfo.departureName}</span>{" "}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="left-par">To </p>
                          <p className="left-par ml-auto">
                            <span>{userInfo.arrivalName}</span>{" "}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="left-par">Date </p>
                          <p className="left-par ml-auto">
                            <span>{dateTimeFormat.format(routeDate)}</span>{" "}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="left-par">Time</p>
                          <p className="left-par ml-auto">
                            <span>{tripInfo.DepartureTime}</span>{" "}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="left-par">Adult(s)</p>
                          <p className="left-par ml-auto">
                            <span>{userInfo.noOfAdult}</span>{" "}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="left-par">Price</p>
                          <p className="left-par ml-auto">
                            <span>₦{nf.format(totalPayableAmount)}</span>{" "}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="left-par">Discount</p>
                          <p className="left-par ml-auto">
                            <span>0</span>{" "}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="left-par">Total Amount</p>
                          <p className="left-par ml-auto">
                            <span style={{ fontSize: "24px" }}>
                              ₦{nf.format(totalPayableAmount)}
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <br/>
              </div>

              <ol className="timeline">
                <li>
                  {" "}
                  <section>
                    <h1 className="step-h1">Pick Up</h1>

                    <p className="step-p">Would you like to be picked up</p>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label className="label-auth" htmlFor="exampleCheck1">
                        Yes, I want to be picked up.
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck2"
                      />
                      <label className="label-auth" htmlFor="exampleCheck2">
                        No, I will join the Bus at the terminal
                      </label>
                    </div>
                  </section>
                </li>
                <li>
                  {" "}
                  <section>
                    <h1 className="step-h1">Passenger Details</h1>

                    <p className="step-p">
                      Please enter name as they appear on identification
                      document
                    </p>
                    <div className="stepform-card">
                      <h2 className="step-p">Adult 1</h2>
                      <label className="label-auth">Full Name</label>
                      <InputField
                        type="text"
                        placeholder="Enter Full Name"
                        onChangeMethod={(e) => setFullName(e.target.value)}
                        value={fullName}
                      />
                      <br />
                      <br />
                      <label className="con1">
                        <span>Male</span>
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={gender === "male"}
                          onChange={onValueChange}
                        />
                        <span className="checkmarkSpan"></span>
                      </label>
                      <label className="con1">
                        <span>Female</span>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={gender === "female"}
                          onChange={onValueChange}
                        />
                        <span className="checkmarkSpan"></span>
                      </label>
                    </div>
                    {userInfo.noOfAdult === "1" ? null : (
                      <>
                        {inputList.map((el, index) => {
                          return createInput(el, index);
                        })}
                      </>
                    )}

                    {/* {JSON.stringify(inputList)} */}
                  </section>{" "}
                </li>
                <li>
                  {" "}
                  <section>
                    <h1 className="step-h1">
                      {" "}
                      Contact and Next of Kin Details
                    </h1>
                    <p className="step-p">
                      We need your contact details for booking confirmation
                    </p>
                    <div className="row row-grid">
                      <div className="col-md-6">
                        <label className="label-auth">Next of Kin Name</label>
                        <InputField
                          type="text"
                          placeholder="Enter Next of Kin name"
                          onChangeMethod={(e) => setKinName(e.target.value)}
                          value={kinName}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="label-auth">
                          Next of Kin's Mobile Phone Number
                        </label>
                        {/* <PhoneInput
                          placeholder="Enter next of kin number"
                          country="NG"
                          value={value}
                          onChange={setValue}
                        /> */}
                        <InputField
                          type="number"
                          placeholder="Enter next of kin number"
                          onChangeMethod={(e) => setValue(e.target.value)}
                          value={value}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="row row-grid">
                      <div className="col-md-6">
                        <label className="label-auth">
                          Customer Email Address
                        </label>
                        <InputField
                          type="email"
                          placeholder="Enter Customer Email"
                          onChangeMethod={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="label-auth">
                          Customer Phone Number
                        </label>
                        {/* <PhoneInput
                          placeholder="Enter Customer phone number"
                          country="NG"
                          value={valueTwo}
                          onChange={setValueTwo}
                        /> */}
                        <InputField
                          type="number"
                          placeholder="Enter customer phone number"
                          onChangeMethod={(e) => setValueTwo(e.target.value)}
                          value={valueTwo}
                        />
                      </div>
                    </div>
                  </section>
                </li>
                <li>
                  <section>
                    <h1 className="step-h1">Terms and Condition</h1>
                    <p className="step-P">
                      Please Note that GIGM does not have a refund policy,
                      However, our tickets valid for a Month. By proceeding to
                      Make Payment, You agree to the Terms and conditions of
                      GIGM
                    </p>
                  </section>
                  <br />
                  <div className="mobileShow">
                    <Button
                      text="Pay"
                      handleButtonClick={toggleModal}
                      type="button"
                      btnstyle={{ backgroundColor: " #E21D00" }}
                      disabled={
                        !(
                          fullName &&
                          gender &&
                          kinName &&
                          value &&
                          valueTwo &&
                          email &&
                          inputList
                        )
                      }
                    />
                  </div>
                </li>
              </ol>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-4 mobileHide con-sticky">
              <div className="trip-summary">
                <h1 className="trip-route text-center">Trip Summary</h1>
                <div className="d-flex">
                  <p className="left-par">From </p>
                  <p className="left-par ml-auto">
                    <span>{userInfo.departureName}</span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">To </p>
                  <p className="left-par ml-auto">
                    <span>{userInfo.arrivalName}</span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">Date </p>
                  <p className="left-par ml-auto">
                    <span>{dateTimeFormat.format(routeDate)}</span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">Time</p>
                  <p className="left-par ml-auto">
                    <span>{tripInfo.DepartureTime}</span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">Adult(s)</p>
                  <p className="left-par ml-auto">
                    <span>{userInfo.noOfAdult}</span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">Price</p>
                  <p className="left-par ml-auto">
                    <span>₦{nf.format(totalPayableAmount)}</span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">Discount</p>
                  <p className="left-par ml-auto">
                    <span>0</span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">Total Amount</p>
                  <p className="left-par ml-auto">
                    <span style={{ fontSize: "24px" }}>
                      ₦{nf.format(totalPayableAmount)}
                    </span>{" "}
                  </p>
                </div>
                <Button
                  text="Pay"
                  handleButtonClick={toggleModal}
                  type="button"
                  btnstyle={{ backgroundColor: " #E21D00" }}
                  disabled={
                    !(
                      fullName &&
                      gender &&
                      kinName &&
                      value &&
                      valueTwo &&
                      email &&
                      inputList
                    )
                  }
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
export default DetailsComponent;

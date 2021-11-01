import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./index.css";
import Button from "../../components/Button";
//import PhoneInput, { formatPhoneNumber } from "react-phone-number-input";
//import "react-phone-number-input/style.css";
import InputField from "../../components/InputField";
import Modal from "../../components/Modal";
import nb from "../../assets/img/nb.png";
import paystack from "../../assets/img/Paystack-CeruleanBlue-StackBlue-HL.png";
import flutterwave from "../../assets/img/flutterwave_logo_color.svg";
import apiroutes from "../../services/apiroutes";
import { request } from "../../services/apiservice";
import { getAuth } from "../../services/auth";
import makeAPICall from "../../services/paystackPay";
//import makeAPICallFlutter from "../../services/flutterwavePay";
import { getUser } from "../../services/auth";
import config from "../../configs";

export const HireDetailsComponent = () => {
  const loggedInUser = getUser();
  // console.log(loggedInUser)
  const [modalVisible, setVisible] = useState(false);
  const [value, setValue] = useState();
  const [valueTwo, setValueTwo] = useState("");
  const [fullName, setFullName] = useState("");
  const [kinName, setKinName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  const token = getAuth("access_token");
  const paymentOptions = [
    { id: 13, name: "woven" },
    { id: 8, name: "flutterwave" },
    { id: 5, name: "paystack" },
  ];

  let hireDetails = localStorage.getItem("allHireDetails");
  hireDetails = JSON.parse(hireDetails);
  console.log(hireDetails, "hire details");
  let selectedBusFare = localStorage.getItem("selectedHireBuses");
  selectedBusFare = JSON.parse(selectedBusFare);
  let busNameQantity = localStorage.getItem("busNameQantity");
  busNameQantity = JSON.parse(busNameQantity);
  const travelDistance = localStorage.getItem("estimatedTravelDistance");
  const returnPickupDate = localStorage.getItem("returnPickupDate");
  const routeDate = new Date(hireDetails.Departures[0].OnewayPickupDate);
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //   console.log(selectedBusFare, "all data for selected buses");

  // eslint-disable-next-line no-extend-native
  Array.prototype.sum = function (prop, propTwo) {
    var total = 0;
    for (var i = 0, _len = this.length; i < _len; i++) {
      total += this[i][prop] * this[i][propTwo];
    }
    return total;
  };

  //   console.log(selectedBusFare.sum("amount", "Quantity"))

  const totalPayableAmount = selectedBusFare.sum(
    "FarePrice",
    "NoOfBookedVehicle"
  );

  const totalPayableAmountWithCalc =
    hireDetails.HiredServiceType === 0
      ? totalPayableAmount
      : totalPayableAmount * 2;

  const totalQuantity = selectedBusFare.reduce(
    (n, { NoOfBookedVehicle }) => n + NoOfBookedVehicle,
    0
  );

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
    }
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

  const nf = new Intl.NumberFormat();

  const payPostSearch = (items) => {
    setPageLoading(true);
    const newStartDate = new Date(hireDetails.Departures[0].OnewayPickupDate);
    let date = JSON.stringify(newStartDate);
    date = date.slice(1, 11);
    let postData;
    if (hireDetails.HiredServiceType === 0) {
      postData = {
        FullName: fullName,
        Gender: gender === "male" ? 0 : 1,
        Email: email,
        PhoneNumber: valueTwo,
        NextOfKinName: kinName,
        NextOfKinPhone: value,
        Address: address,   
        PaymentMethod: items.id,
        HiredServiceType: "0",
        OnewayPickupLocation: hireDetails.Departures[0].OnewayPickupLocation,
        OneWayDropoffLocation: hireDetails.Departures[0].OneWayDropoffLocation,
        OnewayDistanceApart: travelDistance,
        OnewayPickupDate: date,
        IsSleepOver: hireDetails.Departures[0].IsSleepOver,
        HireVehicleDetail: selectedBusFare,
        Amount: totalPayableAmountWithCalc,
      };
    } else {
      postData = {
        FullName: fullName,
        Gender: gender === "male" ? 0 : 1,
        Email: email,
        PhoneNumber: valueTwo,
        NextOfKinName: kinName,
        NextOfKinPhone: value,
        Address: address,
        PaymentMethod: items.id,
        HiredServiceType: "1",
        OnewayPickupLocation: hireDetails.Departures[0].OnewayPickupLocation,
        OneWayDropoffLocation: hireDetails.Departures[0].OneWayDropoffLocation,
        ReturnPickupLocation: hireDetails.Departures[0].OneWayDropoffLocation,
        ReturnDropoffLocation: hireDetails.Departures[0].OnewayPickupLocation,
        OnewayDistanceApart: travelDistance,
        ReturnDistanceApart: travelDistance,
        OnewayPickupDate: date,
        ReturnPickupDate: returnPickupDate,
        IsSleepOver: hireDetails.Departures[0].IsSleepOver,
        HireVehicleDetail: selectedBusFare,
        Amount: totalPayableAmountWithCalc,
      };
    }
    //   console.log(postData, "post Data info return");

    request(apiroutes.HireServiceSearch(), "post", postData, token)
      .then((res) => {
        console.log(res);
        const emailAmount = {
          email: email,
          amount: res.data.Object.Amount,
          mainName: fullName,
          date: date,
          returnDate: returnPickupDate,
        };
        localStorage.setItem("hireEmailAmount", JSON.stringify(emailAmount));
        if (items.id === 5) {
          paystackPay(res.data.Object.RefCode, res.data.Object.Amount);
        } else if (items.id === 8) {
          flutterwavePay(res.data.Object.RefCode, res.data.Object.Amount);
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        setPageLoading(false);
      });
  };

  const paystackPay = (refCode, amount) => {
    const configLoad = {
      reference: refCode,
      email: email,
      amount: amount * 100,
      callback_url: config.FALL_BACK_ENDPOINT_HIRE,
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

  const flutterwavePay = (refCode, amount) => {
    return console.log("flutterwave pay");
    // const configLoad = {
    //   tx_ref: refCode,
    //   amount: amount,
    //   currency: "NGN",
    //   redirect_url: config.FALL_BACK_ENDPOINT_HIRE,
    //   payment_options: "card, mobilemoney, ussd",
    //   customer: {
    //     email: email,
    //     phonenumber: valueTwo,
    //   },
    // };
    // return makeAPICallFlutter({
    //   payload: configLoad,
    //   method: "POST",
    // })
    //   .then((result) => {
    //     console.log(result);
    //     if (result.status === "success") {
    //       window.location.href = result.data.link;
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  const width = 500;
  const height = 530;
  const modalTitle = "Trip payment";
  const modalPar = "You are about to fund this trip";
  const modalBody = (
    <div>
      <div className="text-center">
        <p className="passenger-amt">Amount</p>
        <h1 className="p-amt">₦{nf.format(totalPayableAmountWithCalc)}</h1>
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
                  <div className="pay-bg" onClick={() => payPostSearch(items)}>
                    <div>
                      {items.id === 5 ? (
                        <img src={paystack} alt="" />
                      ) : items.id === 8 ? (
                        <img src={flutterwave} alt="" width="50px" />
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
      <section className="passenger-details pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="h1-route">
                Hi {loggedInUser === null ? "Guest" : loggedInUser.FirstName},
                We just need a few more details. Who is travelling?
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
                      <span>
                        {hireDetails.Departures[0].OnewayPickupLocation}
                      </span>{" "}
                    </p>
                  </div>
                  <div className="d-flex">
                    <p className="left-par">To </p>
                    <p className="left-par ml-auto">
                      <span>
                        {hireDetails.Departures[0].OneWayDropoffLocation}
                      </span>{" "}
                    </p>
                  </div>
                  <div className="d-flex">
                    <p className="left-par">Date </p>
                    <p className="left-par ml-auto">
                      <span>{dateTimeFormat.format(routeDate)}</span>{" "}
                    </p>
                  </div>
                  <div className="d-flex">
                    <p className="left-par">Vehicle Type</p>
                    <p className="left-par ml-auto">
                      <span>
                        {" "}
                        {busNameQantity.map((item) => item.busName).join(", ")}
                      </span>{" "}
                    </p>
                  </div>
                  <div className="d-flex">
                    <p className="left-par">Total Number Of Vehicles</p>
                    <p className="left-par ml-auto">
                      <span>{totalQuantity}</span>{" "}
                    </p>
                  </div>
                  <div className="d-flex">
                    <p className="left-par">Total Amount</p>
                    <p className="left-par ml-auto">
                      <span style={{ fontSize: "24px" }}>
                        ₦{nf.format(totalPayableAmountWithCalc)}
                      </span>{" "}
                    </p>
                  </div>
                </div>
                    </div>
                  )}
                </div>
                
              </div>
              <ol className="timeline">
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
                      <br />
                      <br />
                      <label className="label-auth">Residential Address</label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="text-area"
                      />
                    </div>
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
                          placeholder="Enter customer number"
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
                          address
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
                    <span>
                      {hireDetails.Departures[0].OnewayPickupLocation}
                    </span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">To </p>
                  <p className="left-par ml-auto">
                    <span>
                      {hireDetails.Departures[0].OneWayDropoffLocation}
                    </span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">Date </p>
                  <p className="left-par ml-auto">
                    <span>{dateTimeFormat.format(routeDate)}</span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">Vehicle Type</p>
                  <p className="left-par ml-auto">
                    <span>
                      {" "}
                      {busNameQantity.map((item) => item.busName).join(", ")}
                    </span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">Total Number Of Vehicles</p>
                  <p className="left-par ml-auto">
                    <span>{totalQuantity}</span>{" "}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="left-par">Total Amount</p>
                  <p className="left-par ml-auto">
                    <span style={{ fontSize: "24px" }}>
                      ₦{nf.format(totalPayableAmountWithCalc)}
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
                      address
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
export default HireDetailsComponent;

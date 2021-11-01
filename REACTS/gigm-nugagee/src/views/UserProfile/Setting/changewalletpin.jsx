import React, { useState } from "react";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import eye from "../../../assets/img/eye-24-512.png";
import eyeHidden from "../../../assets/img/invisible 2.png";
import password from "../../../assets/img/password.png";
import { getUser, getAuthWallet } from "../../../services/auth";
import apiroutes from "../../../services/apiroutes";
import { requestWallet } from "../../../services/apiserviceWallet";
import Alert from "../../../components/Alert";
import Expire from "../../../components/Expire";
import Loader from "../../../components/Loader";
import Modal from "../../../components/Modal";
import ButtonComponent from "../../../components/otpinput";
import { useHistory } from "react-router";

const ChangeWalletpin = () => {
  const history = useHistory();
  const [showOldPin, setShowOldPin] = useState(false);
  const [pinField, setPinField] = useState("password");
  const [showNewPin, setShowNewPin] = useState(false);
  const [newPinField, setNewPinField] = useState("password");
  const [otpInput, setOtpInput] = useState();
  const loggedInUser = getUser();
  const walletDetails = getAuthWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [modalVisible, setVisible] = useState(true);
  const [modalVisibleTwo, setVisibleTwo] = useState(false);

  const onChangeOtp = (otpInput) => {
    setOtpInput(otpInput);
  };

  const generateWalletOtp = () => {
    const formEncoded = new URLSearchParams({
      PhoneNumber: loggedInUser.PhoneNumber,
      Email: loggedInUser.Email,
      OtpType: "ChangePin",
    });
    requestWallet(
      apiroutes.GenerateOtp(),
      "post",
      formEncoded,
      walletDetails.access_token
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const showOldPinToggle = () => {
    setShowOldPin(!showOldPin);
    setPinField(pinField === "number" ? "password" : "number");
    setError(false);
    setResponseMsg(null);
  };

  const showNewPinToggle = () => {
    setShowNewPin(!showNewPin);
    setNewPinField(newPinField === "number" ? "password" : "number");
    setError(false);
    setResponseMsg(null);
  };

  const handleChangeWalletPin = (e) => {
    e.preventDefault();
    setError("");
    setResponseMsg("Processing");
    setLoading(true);

    const formEncoded = new URLSearchParams({
      PhoneNumber: loggedInUser.PhoneNumber,
      Email: loggedInUser.Email,
      Otp: otpInput,
      OldPin: oldPin,
      NewPin: newPin,
    });
    requestWallet(
      apiroutes.ChangeWalletpin(),
      "post",
      formEncoded,
      walletDetails.access_token
    )
      .then((res) => {
        console.log(res);
        setResponseMsg(res.data.description);
        setTimeout(() => {
          history.push("/profile");
        }, 3000);
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data.description);
        setLoading(false);
        setResponseMsg(null);
      });
  };

  const toggleModalClose = () => {
    setVisible(true);
    setVisibleTwo(false);
    history.push("/profile");
  };
  const toggleModalCloseTwo = () => {
    setVisibleTwo(false);
    setVisible(true);
  };

  const changePin = () => {
    setVisible(false);
    setVisibleTwo(false);
  };

  const toggleOtpModalPin = () => {
    setVisible(false);
    generateWalletOtp();
    setVisibleTwo(true);
  };

  const width = 500;
  const height = 500;
  // const heightSe = 300;
  // const heightTwo = 600;
  const modalBody = (
    <div className="row">
      <div className="col-md-12">
        <div className="text-center">
          <img
            src={password}
            alt=""
            style={{
              width: "100px",
            }}
          />
        </div>
        <h1 className="wallet-onboarding-h1">Request For OTP</h1>
        <p className="wallet-onboarding-p">
          We will like to let you know that we’ll be sending an OTP for the
          request to change your wallet PIN. If you want to proceed with this,
          you can click on the continue button to get the OTP. If not, you can
          click on the cancel button to exit this page.
        </p>
        <br />
        <div className="row">
          <div className="col-sm-12 col-md-8 offset-md-2">
            <div className="text-center">
              <Button
                type="button"
                handleButtonClick={toggleOtpModalPin}
                text="Continue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const modalTitlePin = "Transaction PIN";
  const modalParTwo = "Enter the OTP sent to you.";
  const modalBodyPin = (
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
          length={6}
        />
        <p className="wallet-onboarding-p text-center">
          Didn’t get any code?{" "}
          <span
            style={{ color: "red", cursor: "pointer" }}
            onClick={generateWalletOtp}
          >
            Request Again
          </span>
        </p>
        <br />
        <div className="row">
          <div className="col-sm-12 col-md-8 offset-md-2">
            <div className="text-center">
              <Button
                type="button"
                handleButtonClick={changePin}
                text="Proceed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        width={width}
        height={height}
        visible={modalVisible}
        body={modalBody}
        handleClose={toggleModalClose}
      />

      <Modal
        width={width}
        height={height}
        visible={modalVisibleTwo}
        title={modalTitlePin}
        paragraph={modalParTwo}
        body={modalBodyPin}
        handleClose={toggleModalCloseTwo}
      />
      <div className="row justify-content-md-center">
        <div className="col-6">
          {error && (
            <Expire delay={3000}>
              <Alert className="alert text-center alert-danger" text={error} />
            </Expire>
          )}
          {responseMsg && !error && (
            <Expire delay={3000}>
              <Alert
                className="alert text-center alert-primary"
                text={responseMsg}
              />
            </Expire>
          )}
        </div>
      </div>
      <div className="changepin">
        <div className="row">
          <div className="col-md-12">
            <div className="setting-row2">
              <h2>Change Wallet PIN</h2>
            </div>
          </div>
          <div className="col-md-12 col-sm-12">
            <div>
              <div className="pininput">
                <label htmlFor="oldPin">Enter Old Pin</label>
                <div className="pass-wrapper">
                  <InputField
                    type={pinField}
                    placeholder="*********"
                    onChangeMethod={(e) => setOldPin(e.target.value)}
                    value={oldPin}
                  />
                  {showOldPin ? (
                    <img
                      src={eye}
                      alt=""
                      onClick={showOldPinToggle}
                      className="passwordVisible img-size"
                    />
                  ) : (
                    <img
                      src={eyeHidden}
                      alt=""
                      onClick={showOldPinToggle}
                      className="passwordVisible"
                    />
                  )}
                </div>
              </div>
              <br />
              <div className="pininput">
                <label htmlFor="newPin">New Pin</label>
                <div className="pass-wrapper">
                  <InputField
                    type={newPinField}
                    placeholder="*********"
                    onChangeMethod={(e) => setNewPin(e.target.value)}
                    value={newPin}
                  />

                  {showNewPin ? (
                    <img
                      src={eye}
                      alt=""
                      onClick={showNewPinToggle}
                      className="passwordVisible img-size"
                    />
                  ) : (
                    <img
                      src={eyeHidden}
                      alt=""
                      onClick={showNewPinToggle}
                      className="passwordVisible"
                    />
                  )}
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="pin-btn">
              <Button
                text={loading ? <Loader dark={false} /> : "Update"}
                type="Save"
                btnstyle={{ background: "#E21D00" }}
                handleButtonClick={handleChangeWalletPin}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeWalletpin;

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

const Resetpin = () => {
  const history = useHistory();
  const [showPin, setShowPin] = useState(false);
  const [pinField, setPinField] = useState("password");
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [confirmPinField, setConfirmPinField] = useState("password");
  const [otpInput, setOtpInput] = useState();
  const loggedInUser = getUser();
  const walletDetails = getAuthWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [modalVisible, setVisible] = useState(true);
  const [modalVisibleTwo, setVisibleTwo] = useState(false);

  const onChangeOtp = (otpInput) => {
    setOtpInput(otpInput);
  };

  const generateWalletOtp = () => {
    const formEncoded = new URLSearchParams({
      PhoneNumber: loggedInUser.PhoneNumber,
      Email: loggedInUser.Email,
      OtpType: "ResetPin",
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

  const showPinToggle = () => {
    setShowPin(!showPin);
    setPinField(pinField === "number" ? "password" : "number");
    setError(false);
    setResponseMsg(null);
  };

  const showConfirmPinToggle = () => {
    setShowConfirmPin(!showConfirmPin);
    setConfirmPinField(confirmPinField === "number" ? "password" : "number");
    setError(false);
    setResponseMsg(null);
  };

  const handleWalletResetPin = (e) => {
    e.preventDefault();
    setError("");
    setResponseMsg("Processing");
    setLoading(true);

    const formEncoded = new URLSearchParams({
      PhoneNumber: loggedInUser.PhoneNumber,
      Email: loggedInUser.Email,
      Otp: otpInput,
      NewPin: newPin,
    });
    if (newPin === confirmPin) {
      requestWallet(
        apiroutes.ResetWalletpin(),
        "post",
        formEncoded,
        walletDetails.access_token
      )
        .then((res) => {
          console.log(res);
          setResponseMsg(res.data.payload);
          setLoading(false);
          setError(false);
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
    } else {
      setError("Pin not Match");
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const toggleModalClose = () => {
    setVisible(false);
    setVisibleTwo(false);
    history.push("/profile");
  };
  const toggleModalCloseTwo = () => {
    setVisibleTwo(false);
    setVisible(true);
  };

  const resetPin = () => {
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
          {/* <Button
            text={loading ? 
            setTimeout(() => {<Loader dark={false} />}, 1000) : "Request Again"}
            handleButtonClick={generateWalletOtp}
            btnstyle={{ color: "red", 
            cursor: "pointer",
          display: "inline-block"}}
            type="button"
          /> */}
        </p>
        <br />
        <div className="row">
          <div className="col-sm-12 col-md-8 offset-md-2">
            <div className="text-center">
              <Button
                type="button"
                handleButtonClick={resetPin}
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
              <h2>Reset PIN</h2>
            </div>
          </div>
          <div className="col-md-12 col-sm-12">
            <div>
              <div className="pininput">
                <label htmlFor="newPin">New Pin</label>
                <div className="pass-wrapper">
                  <InputField
                    type={pinField}
                    placeholder="*********"
                    onChangeMethod={(e) => setNewPin(e.target.value)}
                    value={newPin}
                  />
                  {showPin ? (
                    <img
                      src={eye}
                      alt=""
                      onClick={showPinToggle}
                      className="passwordVisible img-size"
                    />
                  ) : (
                    <img
                      src={eyeHidden}
                      alt=""
                      onClick={showPinToggle}
                      className="passwordVisible"
                    />
                  )}
                </div>
              </div>
              <br />
              <div className="pininput">
                <label htmlFor="confirmPin">Confirm Pin</label>
                <div className="pass-wrapper">
                  <InputField
                    type={confirmPinField}
                    placeholder="*********"
                    onChangeMethod={(e) => setConfirmPin(e.target.value)}
                    value={confirmPin}
                  />
                  {showConfirmPin ? (
                    <img
                      src={eye}
                      alt=""
                      onClick={showConfirmPinToggle}
                      className="passwordVisible img-size"
                    />
                  ) : (
                    <img
                      src={eyeHidden}
                      alt=""
                      onClick={showConfirmPinToggle}
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
                handleButtonClick={handleWalletResetPin}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resetpin;

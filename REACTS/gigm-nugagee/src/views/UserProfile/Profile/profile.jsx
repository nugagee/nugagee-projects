import React, { useState, useEffect } from "react";
import "./profile.css";
import blackbg from "../../../assets/img/bg-black.png";
import gradient from "../../../assets/img/gradient.png";
import createWallet from "../../../assets/img/Group 16619.png";
import errorIcon from "../../../assets/img/x-circle.png";
import circleIcon from "../../../assets/img/tick-circle.png";
import SideBar from "../SideBar/index";
import { useHistory, useLocation } from "react-router";
import MobileNavBar from "../MobileNavbar/index";
import Navbar from "../../../components/NavBar/index";
import Button from "../../../components/Button";
import apiroutes from "../../../services/apiroutes";
import { requestWallet } from "../../../services/apiserviceWallet";
import Alert from "../../../components/Alert";
import Expire from "../../../components/Expire";
import Modal from "../../../components/Modal";
import Loader from "../../../components/Loader";
import ButtonComponent from "../../../components/otpinput";
import paystack from "../../../assets/img/Paystack-CeruleanBlue-StackBlue-HL.png";
import woven from "../../../assets/img/Woven_Forly.svg";
import nb from "../../../assets/img/nb.png";
import NumberFormat from "react-number-format";
import makeAPICall from "../../../services/paystackPay";
import config from "../../../configs";
import makeAPICallWoven from "../../../services/wovenPay";

// import { setAuth } from "../../services/auth";
import { getUser, getAuthWallet, setUserWallet } from "../../../services/auth";

export const UserComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const reference = urlParams.get("reference");
  const loggedInUser = getUser();
  const walletDetails = getAuthWallet();
  const [modalVisible, setVisible] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [fundModal, setFundModal] = useState(false);
  const [modalVisiblePin, setVisiblePin] = useState(false);
  // console.log(walletDetails.access_token, 'wallet')
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [wallet, setWallet] = useState(false);
  const [walletAmount, setWalletAmount] = useState();
  const [fundAmount, setFundAmount] = useState("0.00");
  const [otpInput, setOtpInput] = useState();
  const [pinTwo, setPinTwo] = useState();
  const [pinOne, setPinOne] = useState();
  const paymentOptions = [
    { id: 3, name: "woven" },
    { id: 1, name: "paystack" },
  ];
  const nf = new Intl.NumberFormat();

  useEffect(() => {
    if (reference === null) {
      return false;
    } else {
      requestWallet(
        apiroutes.VerifyPayStackRef(reference),
        "get",
        null,
        walletDetails.access_token
      )
        .then((res) => {
          console.log(res, "process payment confirmation");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [reference, walletDetails.access_token]);

  useEffect(() => {
    if (loggedInUser === null) {
      history.push("/");
      return false;
    } else {
      getCurrentWallet();
    }
    // eslint-disable-next-line
  }, []);

  const getCurrentWallet = () => {
    requestWallet(
      apiroutes.GetWallet(loggedInUser.PhoneNumber, loggedInUser.Email),
      "get",
      null,
      walletDetails.access_token
    )
      .then((res) => {
        console.log(res.data);
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
        setWalletAmount(res.data.payload);
        // setFundAmount(res.data.payload.availableBalance);
        setWallet(false);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.description === "Wallet does not exist") {
          setWallet(true);
        }
      });
  };

  const onChangeOtp = (otpInput) => {
    setOtpInput(otpInput);
  };

  const onChangePinOne = (pinOne) => {
    setPinOne(pinOne);
  };

  const onChangePinTwo = (pinTwo) => {
    setPinTwo(pinTwo);
  };

  const toggleModal = () => {
    setVisible(true);
  };

  const toggleModalClose = () => {
    setVisible(false);
  };

  const fundModalOne = () => {
    setFundModal(true);
  };

  const toggleFundModalClose = () => {
    setFundModal(false);
  };

  const toggleTransactionPinError = () => {
    setErrorModal(true);
    toggleFundModalClose();
    toggleModalClosePin();
  };

  const toggleTransactionPinErrorClose = () => {
    setErrorModal(false);
  };

  const toggleTransactionPinSuccess = () => {
    setSuccessModal(true);
    toggleFundModalClose();
    toggleModalClosePin();
  };

  const toggleTransactionPinSuccessClose = () => {
    setSuccessModal(false);
  };

  const toggleModalPin = () => {
    setVisible(false);
    setVisiblePin(true);

    setErrorModal(false);
  };

  const toggleModalClosePin = () => {
    setVisiblePin(false);
  };

  const generateWalletOtp = () => {
    const formEncoded = new URLSearchParams({
      PhoneNumber: loggedInUser.PhoneNumber,
      Email: loggedInUser.Email,
      OtpType: "CreatePin",
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

  const setUpWallet = (e) => {
    e.preventDefault();
    setError("");
    setResponseMsg("Processing");
    setLoading(true);
    const formEncoded = new URLSearchParams({
      PhoneNumber: loggedInUser.PhoneNumber,
      Email: loggedInUser.Email,
      FirstName: loggedInUser.FirstName,
      LastName: "Nil",
    });
    requestWallet(
      apiroutes.CreateWallet(),
      "post",
      formEncoded,
      walletDetails.access_token
    )
      .then((res) => {
        console.log(res);
        setResponseMsg("Wallet Created Successfully");
        generateWalletOtp();
        toggleModal();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.description);
        setLoading(false);
        setResponseMsg(null);
      });
  };

  const createPin = (e) => {
    e.preventDefault();
    setError("");
    setResponseMsg("Processing");
    setLoading(true);

    const formEncoded = new URLSearchParams({
      PhoneNumber: loggedInUser.PhoneNumber,
      Email: loggedInUser.Email,
      Pin: pinOne,
      Otp: otpInput,
    });
    if (pinOne === pinTwo) {
      requestWallet(
        apiroutes.CreatePin(),
        "post",
        formEncoded,
        walletDetails.access_token
      )
        .then((res) => {
          console.log(res);
          toggleTransactionPinSuccess();
        })
        .catch((err) => {
          console.log(err.response);
          setError(err.response.description);
          setLoading(false);
          setResponseMsg(null);
        });
    } else {
      toggleTransactionPinError();
    }
  };

  const payPostSearch = (items) => {
    console.log(fundAmount, "amount");
    setPageLoading(true);
    const formEncoded = new URLSearchParams({
      PhoneNumber: loggedInUser.PhoneNumber,
      Email: loggedInUser.Email,
      Amount: fundAmount,
      FundingSource: "1",
      PaymentChannel: items.id,
      Currency: "ngn",
    });
    // console.log(formEncoded);
    requestWallet(
      apiroutes.CreatePayment(),
      "post",
      formEncoded,
      walletDetails.access_token
    )
      .then((res) => {
        // console.log(res, "transacction reference post search response");
        if (items.id === 1) {
          paystackPay(res.data.payload.reference, fundAmount);
        } else {
          wovenPay(res.data.payload.reference, fundAmount);
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
      email: loggedInUser.Email,
      amount: amount * 100,
      callback_url: config.FALL_BACK_ENDPOINT_FUND_WALLET,
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
      .catch((err) => console.log(err.response));
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
      name: loggedInUser.FirstName,
      email: loggedInUser.Email,
      mobile_number: loggedInUser.PhoneNumber,
      expires_on: currentNow.addMinutes(60).toString("yyyy-MM-dd : HH:MM:ss"),
      use_frequency: "1",
      min_amount: amount,
      max_amount: amount,
      callback_url: config.FALL_BACK_ENDPOINT_WOVEN_WALLET,
      destination_nuban: "",
      meta_data: ["somedatakey", "somdatavalue"],
    };
    return makeAPICallWoven({
      payload: configLoad,
      method: "POST",
    })
      .then((result) => {
        console.log(result);
        localStorage.setItem(
          "wovenWalletAccountDetails",
          JSON.stringify(result.data)
        );
        history.push("/wallet-woven-pay");
      })
      .catch((err) => console.log(err));
  };


  const width = 500;
  const height = 500;
  const heightSe = 300;
  const heightSet = 450;
  // const heightTwo = 600;
  const heightPin = 640;
  const modalBody = (
    <div className="row">
      <div className="col-md-12">
        <div className="text-center">
          <img src={createWallet} alt="" />
        </div>
        <h1 className="wallet-onboarding-h1">
          Hi {loggedInUser === null ? "guest" : loggedInUser.FirstName},
        </h1>
        <p className="wallet-onboarding-p">
          We have exciting new features that allows you do so much more than
          transportation on our app.
        </p>
        <p className="wallet-onboarding-p">
          {" "}
          Experience ease with making payments for all transactions using the
          E-wallet and buy airtime, pay for electricity and much more with the
          new Bills Payment service.{" "}
        </p>{" "}
        <p className="wallet-onboarding-p">
          To enjoy these features, please set up your 4 digit Transaction PIN
        </p>
        <br />
        <div className="row">
          <div className="col-sm-12 col-md-8 offset-md-2">
            <div className="text-center">
              <Button
                type="button"
                handleButtonClick={toggleModalPin}
                text="Continue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const modalBodyError = (
    <div className="row">
      <div className="col-md-12">
        <div className="text-center">
          <img src={errorIcon} alt="" />
        </div>
        <p className="wallet-onboarding-p text-center">
          Transaction pin doesn't match
        </p>
        <br />
        <div className="row">
          <div className="col-sm-12 col-md-8 offset-md-2">
            <div className="text-center">
              <Button
                type="button"
                handleButtonClick={toggleModalPin}
                text="Try Again"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const modalBodySuccess = (
    <div className="row">
      <div className="col-md-12">
        <div className="text-center">
          <img src={circleIcon} alt="" />
        </div>
        <p className="wallet-onboarding-p text-center">
          Transaction pin successfully created
        </p>
        <br />
        <div className="row">
          <div className="col-sm-12 col-md-8 offset-md-2">
            <div className="text-center">
              <Button
                type="button"
                handleButtonClick={fundModalOne}
                text="Fund Wallet"
              />
            </div>
          </div>
        </div>
        <p
          className="wallet-onboarding-p text-center"
          style={{ cursor: "pointer" }}
          onClick={toggleTransactionPinSuccessClose}
        >
          Skip I'll do this
        </p>
      </div>
    </div>
  );

  const modalTitle = "Transaction PIN";
  const modalPar = "Enter 6 digit code sent to your mobile number and email";
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
          Set up your one time, 4-digit Transaction PIN
        </p>
        <br />
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
          handlePincomplete={onChangePinOne}
          length={4}
        />
        <p className="wallet-onboarding-p text-center">
          Confirm Transaction Pin
        </p>
        <br />
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
          handlePincomplete={onChangePinTwo}
          length={4}
        />
        <p className="wallet-onboarding-p text-center">
          Before you set up your PIN, ensure you have access to the email or
          phone number used during sign-up as an OTP will be sent to these
          channels to validate your PIN.
        </p>
        <br />
        <div className="row">
          <div className="col-sm-12 col-md-8 offset-md-2">
            <div className="text-center">
              <Button
                type="button"
                handleButtonClick={createPin}
                text="Proceed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const modalTitleFund = "Fund Wallet";
  const modalBodyFund = (
    <div>
      <div className="text-center">
        <p className="passenger-amt">Enter Amount</p>
        {/* <h1 className="p-amt">₦10000</h1> */}
        {/* <input type="text" className="fund-amount" placeholder="0.00" /> */}
        <NumberFormat
          value={fundAmount}
          thousandSeparator={true}
          prefix="₦"
          className="fund-amount"
          displayType="input"
          type="text"
          onValueChange={(values) => setFundAmount(values.value)}
        />
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
                <div className="col-md-6" key={items.id}>
                  <div onClick={() => payPostSearch(items)}>
                    <div>
                      {items.id === 1 ? (
                        <div className="pay-bg">
                          <img src={paystack} alt="" width="80px" />
                        </div>
                      ) : items.id === 3 ? (
                        <div className="pay-bg">
                          <img src={woven} alt="" width="100px" />
                        </div>
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
        body={modalBody}
        handleClose={toggleModalClose}
      />
      <Modal
        width={width}
        height={height}
        title={modalTitleFund}
        visible={fundModal}
        body={modalBodyFund}
        handleClose={toggleFundModalClose}
      />
      <Modal
        width={width}
        height={heightSe}
        visible={errorModal}
        body={modalBodyError}
        handleClose={toggleTransactionPinErrorClose}
      />
      <Modal
        width={width}
        height={heightSet}
        visible={successModal}
        body={modalBodySuccess}
        handleClose={toggleTransactionPinSuccessClose}
      />
      <Modal
        width={width}
        height={heightPin}
        visible={modalVisiblePin}
        title={modalTitle}
        paragraph={modalPar}
        body={modalBodyPin}
        handleClose={toggleModalClosePin}
      />
      <div className="container">
        <div className="side-bar">
          <SideBar />
          <div className="contentarea">
            <MobileNavBar />
            <div className="row justify-content-md-center">
              <div className="col-6">
                {error && (
                  <Expire delay={3000}>
                    <Alert
                      className="alert text-center alert-danger"
                      text={error}
                    />
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
            <div className="fund-wallet">
              <div
                className="flex-left"
                style={{
                  backgroundImage: `url(${blackbg})`,
                  backgroundSize: "cover",
                  backgroundrepeat: "no-repeat",
                }}
              >
                <h3>Digital wallet</h3>
              </div>
              <div
                className="flex-right"
                style={{
                  backgroundImage: `url(${gradient})`,
                  backgroundSize: "cover",
                  backgroundrepeat: "no-repeat",
                  padding:"30px 0px 0px 0px"
                }}
              >
                <h6>Your balance</h6>
                <h1>
                  ₦
                  {walletAmount
                    ? nf.format(walletAmount.availableBalance)
                    : "0.00"}
                </h1>
                <div className="fundbtn">
                  <Button
                    type="button"
                    text="Fund wallet"
                    btnstyle={{
                      color: "black",
                      backgroundColor: "white",
                      backdropFilter: "blur(10px)",
                      borderRadius: "20px",
                      lineHeight:"17px"
                    }}
                    disabled={wallet}
                    handleButtonClick={fundModalOne}
                    // handleButtonClick={toggleModal}
                  />
                </div>
              </div>
            </div>
            <br />
            {wallet && (
              <div className="row">
                <div className="col-sm-12 col-md-3 offset-md-4">
                  <Button
                    type="button"
                    handleButtonClick={setUpWallet}
                    text={loading ? <Loader dark={false} /> : "Set Up Wallet"}
                  />
                </div>
              </div>
            )}

            {/* <div className="transaction">
              <div className="tabs">
                <input id="tab1" type="radio" name="tabs" defaultChecked />
                <label htmlFor="tab1">Credit</label>
                <input id="tab2" type="radio" name="tabs" />
                <label htmlFor="tab2">Debit</label>
                <div className="content">
                  <div id="content1">
                    <div className="row container transaction-heading">
                      <div className="col-md-6">
                        <p>Details</p>
                      </div>
                      <div className="col-md-6 text-md-right text-sm-left">
                        <p>Amount</p>
                      </div>
                    </div>

                    <div className="row row-grid creditcard-content1">
                      <div className="col-md-6">
                        <div>
                          <h3>Funding Using Paystack</h3>
                          <p>Ref code:2436456374</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="text-md-right text-sm-left">
                          <h3>₦30,092</h3>
                          <p>28th of June 2021</p>
                        </div>
                      </div>
                    </div>

                    <div className="row row-grid container creditcard-content1">
                      <div className="col-md-6">
                        <div>
                          <h3>Funding Using Woven</h3>
                          <p>Ref code:2436456374</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="text-md-right text-sm-left">
                          <h3>₦30,092</h3>
                          <p>28th of June 2021</p>
                        </div>
                      </div>
                    </div>

                    <div className="row row-grid container creditcard-content1">
                      <div className="col-md-6">
                        <div>
                          <h3>Funding Using USSD</h3>
                          <p>Ref code:2436456374</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="text-md-right text-sm-left">
                          <h3>₦30,092</h3>
                          <p>28th of June 2021</p>
                        </div>
                      </div>
                    </div>

                  <div id="content2">
                    <div className="row container transaction-heading">
                      <div className="col-md-6">
                        <p>Details</p>
                      </div>
                      <div className="d-sm-none col-md-6 text-right">
                        <p>Amount</p>
                      </div>
                    </div>

                    <div className="row row-grid creditcard-content1">
                      <div className="col-md-6">
                        <div>
                          <h3>Bills Payment</h3>
                          <p>Ref code:2436456374</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="text-md-right text-sm-left">
                          <h3>₦30,092</h3>
                          <p>28th of June 2021</p>
                        </div>
                      </div>
                    </div>

                    <div className="row row-grid container creditcard-content1">
                      <div className="col-md-8">
                        <div>
                          <h3>Trip Payment</h3>
                          <p>Ref code:2436456374</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-md-right text-sm-left">
                          <h3>₦30,092</h3>
                          <p>28th of June 2021</p>
                        </div>
                      </div>
                    </div>

                    <div className="row row-grid container creditcard-content1">
                      <div className="col-md-6">
                        <div>
                          <h3>Bills Payment</h3>
                          <p>Ref code:2436456374</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="text-md-right text-sm-left">
                          <h3>₦30,092</h3>
                          <p>28th of June 2021</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserComponent;

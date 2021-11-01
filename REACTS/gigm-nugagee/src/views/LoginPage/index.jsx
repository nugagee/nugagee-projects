import React, { useState } from "react";
import "./login.css";
import logo from "../../assets/img/Layer x0020 1.png";
// import google from "../../assets/img/google (1) 1.svg";
// import facebook from "../../assets/img/facebook.png";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import eye from "../../assets/img/eye-24-512.png";
import eyeHidden from "../../assets/img/invisible 2.png";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import { useHistory } from "react-router";
import Loader from "../../components/Loader";
import { request } from "../../services/apiservice";
import Alert from "../../components/Alert";
import Expire from "../../components/Expire";
import apiroutes from "../../services/apiroutes";
import { getAuth, setUser } from "../../services/auth";

export const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordField, setPasswordField] = useState("password");
  const [modalVisible, setVisible] = useState(false);
  const [modalVisibleConfirm, setVisibleConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const history = useHistory();

  const token = getAuth("access_token");

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
    setPasswordField(passwordField === "text" ? "password" : "text");
  };

  const toggleModal = () => {
    setVisible(true);
  };

  // const resendVerification = () => {
  //   setVisibleConfirm(false);
  //   setVisible(true);
  // };

  const toggleModalClose = () => {
    setVisible(false);
  };

  const toggleModalCloseTwo = () => {
    setVisibleConfirm(false);
  };

  const handleForgotPassword = (e) => {
    // setError("");
    // setResponseMsg("Processing");
    setLoading(true);
    const verify = {
      UserName: phoneNumber,
    };
    request(apiroutes.ForgotPassword(), "post", verify, token)
      .then((res) => {
        // console.log(res, 'verify code');
        if (
          res.data.Code === null ||
          res.data.Object === null ||
          res.data.Object === null
        ) {
          setLoading(false);
          setResponseMsg(null);
          setError(res.data.ShortDescription);
        } else {
          setLoading(false);
          setResponseMsg("Verification Code Sent");
          setVisible(false);
          setVisibleConfirm(true);
        }
      })
      .catch((err) => {
        console.log(err.response);
        setResponseMsg(null);
        setLoading(false);
      });
  };

  const toggleModalConfirm = (e) => {
    e.preventDefault();
    setVisibleConfirm(false);
    history.push("/forgot-password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResponseMsg("Processing");
    setLoading(true);
    const loginDetails = {
      UserName: email,
      Password: password,
    };
    request(apiroutes.Login(), "post", loginDetails, token)
      .then((res) => {
        // console.log(res, 'login data');
        if (
          res.data.Code === null ||
          res.data.Object === null ||
          res.data.Object === null
        ) {
          setLoading(false);
          setResponseMsg(null);
          setError(res.data.ShortDescription);
        } else {
          setLoading(false);
          setResponseMsg("Logged In Successfully");

          const data = {
            Email: res.data.Object.Email,
            FirstName: res.data.Object.FirstName,
            Gender: res.data.Object.Gender,
            Image: res.data.Object.Image,
            IsActive: res.data.Object.IsActive,
            NextOfKinName: res.data.Object.NextOfKinName,
            NextOfKinPhone: res.data.Object.NextOfKinPhone,
            PhoneNumber: res.data.Object.PhoneNumber,
            ReferralCode: res.data.Object.ReferralCode,
            UserId: res.data.Object.UserId,
            UserType: res.data.Object.UserType,
          };
          setUser(data);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err.response);
        setResponseMsg(null);
        setLoading(false);
      });
  };

  const width = 500;
  const height = 350;
  const modalTitle = "Forgot Password?";
  const modalPar =
    "Please type in the email address or phone number linked to your GIGM account";
  const modalBody = (
    <div>
      <label htmlFor="email" className="label-auth">
        Email
      </label>
      <InputField
        type="text"
        placeholder="email"
        onChangeMethod={(e) => setPhoneNumber(e.target.value)}
      />
      <br />
      <br />
      <Button
      text={loading ? <Loader dark={false} /> : "Get Verification Code"}
        // text="Get Verification Code"
        handleButtonClick={handleForgotPassword}
        disabled={!phoneNumber}
        type="button"
      />
    </div>
  );

  const modalTitleTwo = "Verification code";
  const modalParTwo =
    "Hi there, we just sent a verification code to your provided email and phone number";
  const modalBodyTwo = (
    <div className="text-center">
      <br />
      <p>
        Didn’t get verification code?{" "}
        <span
          onClick={handleForgotPassword}
          // onClick={resendVerification}
          style={{ color: "#56CCF2", cursor: "pointer" }}
        >
          Resend
        </span>
      </p>
      <br />
      <br />
      <Button
        text="Click To Reset Your Password"
        // text="Get Verification Code"
        handleButtonClick={toggleModalConfirm}
        type="button"
      />
    </div>
  );

  return (
    <div>
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
        height={height}
        visible={modalVisibleConfirm}
        title={modalTitleTwo}
        paragraph={modalParTwo}
        body={modalBodyTwo}
        handleClose={toggleModalCloseTwo}
      />

      <div className="d-md-flex h-md-100">
        <div className="col-md-5 bg-indigo h-md-100">
          <div className="row">
            <div className="col-md-12">
              <div className="this-position">
              <Link to="/">
            <img src={logo} alt="" className="home-logo" />
          </Link>
                <h1>Revolutionizing road transportation in Africa</h1>
                <p>
                  GIGM is a technologically powered road transport platform
                  providing MOBILITY services to people across Africa
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7 h-md-100">
          <div className="d-md-flex align-items-center justify-content-center h-md-100">
            <div className="pt-0">
              <div className="auth-section">
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
                <h1>Sign into your GIGM account using</h1>
                {/* <div className="text-center">
                  <button className="btn-social">
                    <img src={google} alt="" />
                    &nbsp; &nbsp; Google
                  </button>
                  &nbsp; &nbsp;
                  <button className="btn-social">
                    <img src={facebook} alt="" />
                    &nbsp; &nbsp; Facebook
                  </button>
                </div>
                <span className="breaking-or">Or</span> */}
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="email" className="label-auth">
                      Email
                    </label>
                    <InputField
                      type="email"
                      placeholder="example@gmail.com"
                      onChangeMethod={(e) => setEmail(e.target.value)}
                      value={email}
                      autoComplete = 'new-password'
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="password" className="label-auth">
                      Password
                    </label>
                    <div className="pass-wrapper">
                      <InputField
                        type={passwordField}
                        placeholder="Enter Your Password"
                        onChangeMethod={(e) => setPassword(e.target.value)}
                        value={password}
                        autoComplete = 'new-password'
                      />

                      {showPassword ? (
                        <img
                          src={eye}
                          alt=""
                          onClick={showPasswordToggle}
                          className="passwordVisible img-size"
                        />
                      ) : (
                        <img
                          src={eyeHidden}
                          alt=""
                          onClick={showPasswordToggle}
                          className="passwordVisible"
                        />
                      )}
                    </div>
                    <p className="forgot-password" onClick={toggleModal}>
                      Forgot Password?
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-6 offset-md-3 text-center">
                    <Button
                      text={loading ? <Loader dark={false} /> : "Sign In"}
                      handleButtonClick={handleSubmit}
                      type="button"
                      disabled={!(email && password)}
                    />
                    <p className="forgot-password">
                      Don't have an Account? <Link to="/register">Sign Up</Link>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-6 offset-md-3">
                    <h2>Why sign up on GIGM</h2>
                    <ul>
                      <li>Get Additional 5% off</li>
                      <li>Manage your booking</li>
                      <li>Get exclusive deals and offers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;

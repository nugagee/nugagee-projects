import React, { useState } from "react";
import logo from "../../assets/img/Layer x0020 1.png";
import google from "../../assets/img/google (1) 1.svg";
import facebook from "../../assets/img/facebook.png";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Select from "../../components/Dropdown/index";
import eye from "../../assets/img/eye-24-512.png";
import eyeHidden from "../../assets/img/invisible 2.png";
import PhoneInput, { formatPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Loader from "../../components/Loader";
import { request } from "../../services/apiservice";
import Alert from "../../components/Alert";
import Expire from "../../components/Expire";
import apiroutes from "../../services/apiroutes";
import { getAuth, setUser } from "../../services/auth";
//import { useHistory } from "react-router";
import Modal from "../../components/Modal";
import tick from "../../assets/img/tick-circle.png";

export const RegisterComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordField, setPasswordField] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFieldConfirm, setPasswordConfirmField] = useState("password");
  const [value, setValue] = useState();
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [modalVisible, setVisible] = useState(false);
  const [modalVisibleTwo, setVisibleTwo] = useState(false);
  // const history = useHistory();
  const [termsError, setTermsError] = useState("")

  const token = getAuth("access_token");


  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
    setPasswordField(passwordField === "text" ? "password" : "text");
    setError(false);
    setResponseMsg(null);
  };

  const showConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
    setPasswordConfirmField(
      passwordFieldConfirm === "text" ? "password" : "text"
    );
    setError(false);
    setResponseMsg(null);
  };

  const genderOptions = ["Male", "Female"];
  const optionsGender = genderOptions.map((x) => ({ label: x, value: x }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword && terms) {
      setError("");
      setResponseMsg("Processing");
      setLoading(true);
      const signDetails = {
        Name: fullName,
        Email: email,
        PhoneNumber: formatPhoneNumber(value).replace(/\s/g, ""),
        Gender: gender === "Male" ? 0 : 1,
        Password: password,
      };
      request(apiroutes.Register(), "post", signDetails, token)
        .then((res) => {
          // console.log(res, 'lsign up data');
          if (
            res.data.Code === null ||
            res.data.Object === null ||
            res.data.Object === null
          ) {
            setLoading(false);
            setResponseMsg(null);
            setError(res.data.Code);
          } else {
            setLoading(false);
            setResponseMsg("Signed Up Successfully");
            if (res.data.Object.IsActive === false) {
              setVisible(true);
            } else {
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
            }
          }
        })
        .catch((err) => {
          setError(err.data.shortDescription);
          setResponseMsg(null);
          setLoading(false);
        });
    } else if(!terms) {
      setTermsError("Please agree to the Terms and Conditions to complete Signup");
      console.log(termsError);
      
    }
    else {
      setError("Password Doesn't Match");
      
    }
  };

  const verifyCode = (e) => {
    e.preventDefault();
    setResponseMsg("Processing");
    setLoading(true);
    const verifyDetails = {
      Username: email,
      VerificationCode: verificationCode,
    };
    request(apiroutes.verifyPhoneNumber(), "post", verifyDetails, token)
      .then((res) => {
        // console.log(res, 'lsign up data');
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
          setResponseMsg("Phone Number Verified");
          setVisibleTwo(true);

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
        }
      })
      .catch((err) => {
        setError(err.data.shortDescription);
        setResponseMsg(null);
        setLoading(false);
      });
  };

  const toggleModalClose = () => {
    setVisible(true);
  };
  const toggleModalCloseTwo = () => {
    setVisibleTwo(false);
  };
  // const TermsErrorChecking = (e) => {
  //   if(!terms) {
  //     setTermsError("Please Accept our Terms Policy")
  //     console.log(termsError)
  //   }
  // }

  const width = 500;
  const height = 350;
  const modalTitle = "Enter Verification Code";
  const modalPar = "Please check your Email/Phone and Enter the Verification Code.";
  const modalBody = (
    <div>
      <label htmlFor="email" className="label-auth">
        Verification Code
      </label>
      <InputField
        type="text"
        placeholder="Verification code"
        onChangeMethod={(e) => setVerificationCode(e.target.value)}
      />
      <br />
      <br />
      <Button
        text="Get Verification Code"
        handleButtonClick={verifyCode}
        disabled={!verificationCode}
        type="button"
      />
    </div>
  );

  const modalTitleTwo = "Phone Number Verified";
  const modalBodyTwo = (
    <div className="text-center">
      <img src={tick} alt="" className="tick-img" />
      <br />
      <br />
      <p className="success-password">
        <Link to="/">Go to Dashboard</Link>
      </p>
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
        visible={modalVisibleTwo}
        title={modalTitleTwo}
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
                <div className="text-center">
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
                <span className="breaking-or">Or</span>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="email" className="label-auth">
                      Full Name
                    </label>
                    <InputField
                      type="text"
                      placeholder="Enter Full Name"
                      onChangeMethod={(e) => setFullName(e.target.value)}
                      value={fullName}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="password" className="label-auth">
                      Sex
                    </label>
                    <Select
                      options={optionsGender}
                      handleChange={(e) => setGender(e.value)}
                      placeholder="Select gender"
                      value={gender}
                    />
                  </div>
                </div>
                <br />
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
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="password" className="label-auth">
                      Phone Number
                    </label>
                    <PhoneInput
                      placeholder="Enter phone number"
                      defaultCountry="NG"
                      value={value}
                      onChange={setValue}

                    />
                  </div>
                </div>
                <br />
                <div className="row">
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
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="label-auth">
                      Confirm Password
                    </label>
                    <div className="pass-wrapper">
                      <InputField
                        type={passwordFieldConfirm}
                        placeholder="Enter Your Password"
                        onChangeMethod={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        value={confirmPassword}
                      />

                      {showConfirmPassword ? (
                        <img
                          src={eye}
                          alt=""
                          onClick={showConfirmPasswordToggle}
                          className="passwordVisible img-size"
                        />
                      ) : (
                        <img
                          src={eyeHidden}
                          alt=""
                          onClick={showConfirmPasswordToggle}
                          className="passwordVisible"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <div className="row">
                  <div className="col-md-12 text-center">
                    <label className="container-check">
                      &nbsp; &nbsp; By Signing Up, I Agree to GIGM's{" "}
                      <Link to="/terms">Terms and Conditions</Link> and{" "}
                      <Link to="/privacy">Privacy Policy</Link>
                      <input
                        type="checkbox"
                        onChange={(e) => setTerms(e.target.checked)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
                <Expire delay={5000}>
                {!terms ? <p style={{color:"red", textAlign:"center"}}>{termsError}</p> : ""}
                </Expire>
                <div className="row">
                  <div className="col-sm-12 col-md-6 offset-md-3 text-center">
                    <Button
                      text={loading ? <Loader dark={false} /> : "Sign Up"}
                      handleButtonClick={handleSubmit}
                      btnstyle={{cursor: "pointer" }}
                      type="button"
                      disabled={
                        !(
                          email &&
                          password &&
                          confirmPassword &&
                          fullName &&
                          gender &&
                          fullName
                          // terms
                        )
                      }
                    />
                    <p className="forgot-password">
                      Already have an Account? <Link to="/login">Sign In</Link>
                    </p>
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
export default RegisterComponent;

import React, { useState } from "react";
import logo from "../../assets/img/Layer x0020 1.png";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import eye from "../../assets/img/eye-24-512.png";
import eyeHidden from "../../assets/img/invisible 2.png";
import tick from "../../assets/img/tick-circle.png";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { request } from "../../services/apiservice";
import Alert from "../../components/Alert";
import Expire from "../../components/Expire";
import apiroutes from "../../services/apiroutes";
import { getAuth, setUser } from "../../services/auth";



export const PasswordComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordField, setPasswordField] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFieldConfirm, setPasswordConfirmField] = useState("password");
  const [modalVisibleConfirm, setVisibleConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);
  


  const token = getAuth("access_token");

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
    setPasswordField(passwordField === "text" ? "password" : "text");
  };

  const showConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
    setPasswordConfirmField(
      passwordFieldConfirm === "text" ? "password" : "text"
    );
  };

  const toggleModalClose = () => {
    setVisibleConfirm(false);
  };

  const toggleModalConfirm = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      setError("");
      setResponseMsg("Processing");
      setLoading(true);
      const signDetails = {
        Username: email,
        VerificationCode: verificationCode,
        NewPassword: newPassword,
      };
      request(apiroutes.ResetPassword(), "post", signDetails, token)
        .then((res) => {
          // console.log(res, "lsign up datareset siucessfull");
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
            setResponseMsg("Password Reset Successful");
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
            setVisibleConfirm(true);
          }
        })
        .catch((err) => {
          setError(err.data.shortDescription);
          setResponseMsg(null);
          setLoading(false);
        });
    } else {
      setError("Password Doesn't Match");
    }
    
  };

  const width = 500;
  const height = 350;
  const modalTitle = "Password reset successful";
  const modalBody = (
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
        visible={modalVisibleConfirm}
        title={modalTitle}
        body={modalBody}
        handleClose={toggleModalClose}
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
                <h1>Forgot Password</h1>
                <p className="general-par">Kindly fill in the details below</p>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="email" className="label-auth">
                      Verification Code
                    </label>
                    <InputField
                      type="text"
                      placeholder="Enter verification code"
                      onChangeMethod={(e) => setVerificationCode(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="label-auth">
                      Email
                    </label>
                    <InputField
                      type="text"
                      placeholder="Enter email"
                      onChangeMethod={(e) => setEmail(e.target.value)}
                      autoComplete = 'new-password'
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="password" className="label-auth">
                      New Password
                    </label>
                    <div className="pass-wrapper">
                      <InputField
                        type={passwordField}
                        onChangeMethod={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter Your Password"
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
                      Confirm New Password
                    </label>
                    <div className="pass-wrapper">
                      <InputField
                        type={passwordFieldConfirm}
                        onChangeMethod={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        placeholder="Enter Your Password"
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
                <div className="row">
                  <div className="col-sm-12 col-md-6 offset-md-3 text-center">
                    <Button
                      handleButtonClick={toggleModalConfirm}
                      text={
                        loading ? <Loader dark={false} /> : "Reset Password"
                      }
                      type="button"
                      disabled={
                        !(email && newPassword && confirmPassword && verificationCode)
                      }
                    />
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
export default PasswordComponent;

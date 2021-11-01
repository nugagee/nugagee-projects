import React, { useState } from "react";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import { request } from "../../../services/apiservice";
import Alert from "../../../components/Alert";
import Expire from "../../../components/Expire";
import apiroutes from "../../../services/apiroutes";
import { getAuth, getUser } from "../../../services/auth";

const Changepin = () => {
  const loggedinUser = getUser();
  const [showoldPassword, setShowOldPassword] = useState(false);
  const [oldpasswordField, setoldPasswordField] = useState("password");
  const [shownewConfirmPassword, setShowNewConfirmPassword] = useState(false);
  const [newpasswordFieldConfirm, setnewPasswordFieldConfirm] =
    useState("password");
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [confirmNewpasswordField, setConfirmNewPasswordFieldConfirm] =
    useState("password");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const showPasswordToggle = () => {
    setShowOldPassword(!showoldPassword);
    setoldPasswordField(oldpasswordField === "text" ? "password" : "text");
  };

  const showConfirmPasswordToggle = () => {
    setShowNewConfirmPassword(!shownewConfirmPassword);
    setnewPasswordFieldConfirm(
      newpasswordFieldConfirm === "text" ? "password" : "text"
    );
  };

  const showConfirmNewPasswordToggle = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
    setConfirmNewPasswordFieldConfirm(
      confirmNewpasswordField === "text" ? "password" : "text"
    );
  };

  const token = getAuth("access_token");

  const toggleModalConfirm = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      setError("");
      setResponseMsg("Processing");
      setLoading(true);
      const signDetails = {
        Username: loggedinUser.Email,
        OldPassword: oldPassword,
        NewPassword: newPassword,
      };
      request(apiroutes.ChangePassword(), "post", signDetails, token)
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
            setResponseMsg("Password Changed Successfully");
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

  return (
    <div>
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
            <div>
              <h2>Change Password</h2>
            </div>
          </div>
          <div className="col-sm-12 col-md-12">
            <div>
              <div className="pininput">
                <label htmlFor="name">Old Password</label>
                <InputField
                  type={oldpasswordField}
                  placeholder="*********"
                  onChangeMethod={(e) => setOldPassword(e.target.value)}
                />
                {showoldPassword ? (
                  <i
                    className="fa fa-eye pininputicon"
                    onClick={showPasswordToggle}
                  ></i>
                ) : (
                  <i
                    className="fa fa-eye-slash pininputicon"
                    onClick={showPasswordToggle}
                  ></i>
                )}
              </div>
              <br />
              <div className="pininput">
                <label htmlFor="name">New Password</label>
                <InputField
                  type={newpasswordFieldConfirm}
                  placeholder="*********"
                  onChangeMethod={(e) => setNewPassword(e.target.value)}
                />
                {shownewConfirmPassword ? (
                  <i
                    className="fa fa-eye pininputicon"
                    onClick={showConfirmPasswordToggle}
                  ></i>
                ) : (
                  <i
                    className="fa fa-eye-slash pininputicon"
                    onClick={showConfirmPasswordToggle}
                  ></i>
                )}
              </div>
              <br />
              <div className="pininput">
                <label htmlFor="email">Confirm Password</label>
                <InputField
                  type={confirmNewpasswordField}
                  placeholder="*********"
                  onChangeMethod={(e) => setConfirmPassword(e.target.value)}
                />
                {showConfirmNewPassword ? (
                  <i
                    className="fa fa-eye pininputicon"
                    onClick={showConfirmNewPasswordToggle}
                  ></i>
                ) : (
                  <i
                    className="fa fa-eye-slash pininputicon"
                    onClick={showConfirmNewPasswordToggle}
                  ></i>
                )}
              </div>
              <br />
            </div>
          </div>
        </div>
        <br />

        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="pin-btn">
              <Button
                text={loading ? <Loader dark={false} /> : "Change Password"}
                type="Submit"
                btnstyle={{ background: "#E21D00" }}
                handleButtonClick={toggleModalConfirm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Changepin;

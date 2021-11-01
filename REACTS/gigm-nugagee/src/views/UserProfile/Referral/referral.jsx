import React, { useState } from "react";
import "./referral.css";
import SideBar from "../SideBar/index";
import MobileNavBar from "../MobileNavbar/index";
import discount from "../../../assets/img/discount.svg";
import Button from "../../../components/Button/index";
import Navbar from "../../../components/NavBar/index";
import { Link } from "react-router-dom";
import Expire from "../../../components/Expire";
import { getUser } from "../../../services/auth";

const ReferralComponent = () => {
  const loggedInUser = getUser();
  const [state, setState] = useState("");

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(loggedInUser.ReferralCode);
    setState("Copied!!!");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="side-bar">
          <SideBar />
          <div className="contentarea">
            <MobileNavBar />
            <div className="help-support">
              <h3>Referral</h3>
            </div>

            <div>
              <div className="col-md-11 Referralholder">
                <h3>Do you enjoy Discounts?</h3>
                <div className="referral-img">
                  <img src={discount} alt="" />
                </div>
                <div className="referral-code">
                  <p>
                    Referral code:
                    {/* <span className="refCopy">12345</span> */}
                    <span className="refCopy">
                      {loggedInUser.ReferralCode
                        ? loggedInUser.ReferralCode
                        : "No Referral Code Found"}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="referral-text">
                    Share your referral code with friends,colleagues and family.
                    As soon as they register,you will receive a coupon code with
                    additional discount via email. <span>Share now!</span>
                  </p>
                </div>
                {/* <div className="referral-icon">
                          <div className="referralicon">
                          <a target="_blank"  rel="noreferrer" href="https://twitter.com/GIGMobility?s=09"> <i className="fa fa-twitter"></i></a>
                          </div>

                          <div className="referralicon">
                          <a target="_blank"  rel="noreferrer" href="https://www.facebook.com/GIGMobility"> <i className="fa fa-facebook"></i></a>
                          </div>

                          <div className="referralicon">
                          <i className="fa fa-comment"></i>
                          </div>

                          <div className="referralicon">
                          <i className="fa fa-envelope-open"></i>
                          </div>

                          <div className="referralicon">
                          <i className="fa fa-envelope-open"></i>
                          </div>
                      </div> */}
                <div className="referralbtn">
                  <Button
                    text="Copy Referral Code"
                    handleButtonClick={copyCodeToClipboard}
                    type="button"
                  />
                  <Expire delay={2000}>
                    <p className="mt-3">{state}</p>
                  </Expire>
                </div>

                <div className="referral-terms">
                  <Link to="/terms">
                    <p>Terms &amp; Conditions</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralComponent;

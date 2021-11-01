import React from "react";
import "./entry.css";
import logo from "../../assets/img/Layer x0020 1.png";
import pattern from "../../assets/img/Group 5328.png";
import indicator from "../../assets/img/indicator.png";
import indicatorTwo from "../../assets/img/left-arrow 2.png";
import { Link } from "react-router-dom";

export const EntryComponent = () => {
  return (
    <div>
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
        <div className="col-md-7 h-md-100 right-elements">
          <div className="d-md-flex align-items-center justify-content-center h-md-100">
            <div className="pt-0">
              <h1>Book seats to enjoy maximum travel experience using GIGM</h1>
              <div className="row row-grid">
                <div className="col-md-6">
                  <div className="signUp-handle">
                    <img src={pattern} alt="" />
                    <div className="centered">
                      <Link to="/login">
                        <img src={indicator} alt="" />
                        <h2>Sign In / Sign Up</h2>
                      </Link>
                      <p>Have an account with us.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="guest-view">
                    <div className="centered-one">
                      <Link to="/">
                        <img src={indicatorTwo} alt="" />
                        <h2 style={{ color: "#4F4F4F" }}>
                          Continue as a guest
                        </h2>
                      </Link>
                      <p style={{ color: "#4F4F4F" }}>
                        Enjoy great discounts on your next bookings
                      </p>
                    </div>
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
export default EntryComponent;

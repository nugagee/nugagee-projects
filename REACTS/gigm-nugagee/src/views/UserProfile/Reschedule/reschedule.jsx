import React from "react";
import "./reschedule.css";
import SideBar from "../SideBar/index";
import MobileNavBar from "../MobileNavbar/index";
import Button from "../../../components/Button/index"
import Navbar from "../../../components/NavBar/index"

const RescheduleComponent = () => {
  
    return (
        <div>
            <Navbar />
      <div className="container">
        <div className="side-bar">
          <SideBar />
          <div className="contentarea">
            <MobileNavBar />
            <div className="help-support">
                <h3>Reschedule Bookings</h3>
            </div>

            <div className="reschedule">
                <div className="row">
                    <div className="col-md-6">
                        <div className="reschedule-text">
                            <div className="row row-grid">
                                <div className=" col-sm-12 col-md-6">
                                    <div>
                                        <p>From</p>
                                        <h3>Lagos (Jibowu)</h3>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div className="reschedule-to">
                                        <p>To</p>
                                        <h3>Enugu (Nsukka)</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="row row-grid mt-4">
                                <div className="col-md-6">
                                    <div>
                                        <p>Travel date</p>
                                        <h3>26 June 2021 - 09:00PM</h3>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div className="reschedule-to">
                                        <p>Booking Status</p>
                                        <h3>Approved</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="row row-grid mt-4">
                                <div className="col-md-6">
                                    <div>
                                        <p>Booking Reference</p>
                                        <h3>26 June 2021 - 09:00PM</h3>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div className="reschedule-to mb-5">
                                        <p>Amount Paid</p>
                                        <h2> ₦2000</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="reschedulebtn">
                                <Button 
                                text="Reschedule Now"
                                handleButtonClick={() => {}}
                                type="button"
                                btnstyle={{backgroundColor:"red"}}
                                />
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="col-md-6">
                    <div className="reschedule-text">
                            <div className="row row-grid">
                                <div className="col-md-6">
                                    <div>
                                        <p>From</p>
                                        <h3>Lagos (Jibowu)</h3>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div className="reschedule-to">
                                        <p>To</p>
                                        <h3>Enugu (Nsukka)</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="row row-grid mt-4">
                                <div className="col-md-6">
                                    <div>
                                        <p>Travel date</p>
                                        <h3>26 June 2021 - 09:00PM</h3>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div className="reschedule-to">
                                        <p>Booking Status</p>
                                        <h3>Approved</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="row row-grid mt-4">
                                <div className="col-md-6">
                                    <div>
                                        <p>Booking Reference</p>
                                        <h3>26 June 2021 - 09:00PM</h3>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div className="reschedule-to mb-5">
                                        <p>Amount Paid</p>
                                        <h2> ₦2000</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="reschedulebtn">
                                <Button 
                                text="Reschedule Now"
                                handleButtonClick={() => {}}
                                type="button"
                                btnstyle={{backgroundColor:"red"}}
                                />
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
  
  export default RescheduleComponent;
  
import React from "react";
import "./index.css";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="container">
      <div className="side-bar">
        <ul className="sidebar-list">
          <li>
            <NavLink to="/profile" exact activeClassName="active">
              <div className="profile-sidebar">Wallet</div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/reschedule" exact activeClassName="active">
              <div className="profile-sidebar">Reschedule a booking</div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/bookinghistory" exact activeClassName="active">
              <div className="profile-sidebar">Booking history</div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/support" exact activeClassName="active">
              <div className="profile-sidebar">Help &amp; Support</div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/referral" exact activeClassName="active">
              <div className="profile-sidebar">Referral</div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/setting" exact activeClassName="active">
              <div className="profile-sidebar">Setting</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;

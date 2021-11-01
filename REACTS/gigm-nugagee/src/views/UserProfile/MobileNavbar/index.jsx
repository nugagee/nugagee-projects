import React from 'react';
import "./index.css";
import { NavLink } from 'react-router-dom';

const MobileNavBar =()=>{
    return (
        <div className="sidebar-sm">
            <ul>
            <li>
              <NavLink to="/profile" exact activeClassName="active">
              <div className="sidebar-nav">Wallet</div>
            </NavLink>
              </li>

              <li>
              <NavLink to="/reschedule" exact activeClassName="active">
              <div className="sidebar-nav">Reschedule</div>
            </NavLink>
              </li>

              <li>
              <NavLink to="/history" exact activeClassName="active">
              <div className="sidebar-nav">Booking History</div>
            </NavLink>
              </li>

              <li>
              <NavLink to="/support" exact activeClassName="active">
              <div className="sidebar-nav">Help &amp; Support</div>
            </NavLink>
              </li>

              <li>
              <NavLink to="/setting" exact activeClassName="active">
              <div className="sidebar-nav">Setting</div>
            </NavLink>
              </li>

              <li>
          <NavLink to="/referral" exact activeClassName="active">
            <div className="sidebar-nav">Referral</div>
          </NavLink>
        </li>
            </ul>
          </div>
    )
}

export default MobileNavBar;
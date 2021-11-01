import React from "react";
import "./setting.css";
import SideBar from "../SideBar/index";
import MobileNavBar from "../MobileNavbar/index";
import Navbar from "../../../components/NavBar/index";
import Editprofile from "./editprofile";
import Changepin from "./changepin";
import ChangeWalletPin from "./changewalletpin";
import ResetPin from "./Resetpin";

const SettingComponent = () => {

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="side-bar">
          <SideBar />
          <div className="contentarea">
            <MobileNavBar />
            <div style={{ backgroundColor: "#EBF4FA" }}>
              <div className="tabsSettings">
                <input
                  className="tab-input"
                  id="tab1"
                  type="radio"
                  name="tabs"
                  defaultChecked
                />
                <label htmlFor="tab1" className="tab-label">
                  Profile
                </label>
                <input
                  className="tab-input"
                  id="tab2"
                  type="radio"
                  name="tabs"
                />
                <label htmlFor="tab2" className="tab-label">
                  Change Password
                </label>
                <input
                  className="tab-input"
                  id="tab3"
                  type="radio"
                  name="tabs"
                />
                <label htmlFor="tab3" className="tab-label">
                  Change Wallet PIN
                </label>
                <input
                  className="tab-input"
                  id="tab4"
                  type="radio"
                  name="tabs"
                />
                <label htmlFor="tab4" className="tab-label">
                  Reset Wallet Pin
                </label>
                <div className="content">
                  <div id="content1">
                    <Editprofile />
                  </div>

                  <div id="content2">
                    <Changepin/>
                  </div>

                  <div id="content3">
                    <ChangeWalletPin />
                  </div>

                  <div id="content4">
                    <ResetPin />
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

export default SettingComponent;

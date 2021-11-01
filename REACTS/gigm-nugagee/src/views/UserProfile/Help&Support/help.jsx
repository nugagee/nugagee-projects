import React from "react";
import "./help.css";
import SideBar from "../SideBar/index";
import MobileNavBar from "../MobileNavbar/index";
import { Link} from "react-router-dom";
import Navbar from "../../../components/NavBar";

const HelpComponent = () => {
  
    return (
      <div>
        <Navbar/>
      <div className="container">
        <div className="side-bar">
          <SideBar />
          <div className="contentarea">
            <MobileNavBar />
            <div className="help-support">
                <h3>Help &amp; Support</h3>
            </div>

            <div>
                <div className="helpholder">
                <div className="row row-grid">
                   <div className="col">
                       <div className="helpholder1">
                           <p>Customer Care Contact</p>
                           <h3> <a href="tel:08046738648">08046738648, <a href="mailto:">contact@gigm.com</a></a></h3>
                       </div>
                   </div>
                </div>

                <div className="row row-grid">
                   <div className="col">
                       <div className="helpholder1">
                           <p>Privacy and Policy</p>
                           <h3>Read through our Privacy Policy</h3>
                           <Link to="/privacy"><i className="fa fa-arrow-right"></i></Link>
                           
                       </div>
                   </div>
                </div>

                <div className="row row-grid">
                   <div className="col">
                       <div className="helpholder1">
                           <p>Terms &amp; Conditions</p>
                           <h3>Read through our Terms &amp; Conditions</h3>
                           <Link to="/terms"><i className="fa fa-arrow-right"></i></Link>
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
  
  export default HelpComponent;
  
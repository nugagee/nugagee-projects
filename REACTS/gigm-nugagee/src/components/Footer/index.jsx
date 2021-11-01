import React from "react";
import logo from "../../assets/img/Layer x0020 1.png";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { Link} from "react-router-dom";

export const Footer = () => {
  return (
    <div>
      <section className="subscribe-section pt-5 pb-5">
        <div className="container">
          <div className="bg-sub">
            <div className="row row-grid">
              <div className="col-md-9">
                <h1>
                  Be the first to receive the latest news, events and product
                  updates.
                </h1>
              </div>
              <div className="col-md-3 text-right">
                <InputField
                  type="text"
                  placeholder="Enter email"
                  onChangeMethod={() => {}}
                />
                <br />
                <br />
                <Button
                  text="Subscribe"
                  handleButtonClick={() => {}}
                  type="button"
                  btnstyle={{
                    background: "#E21D00",
                    color: "white",
                    width: "60%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="last-section pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <img src={logo} alt="gigm logo" />
            </div>
            <div className="col">
              <h1>Company</h1>
              <Link to="/about"><p>About Us</p></Link>
              <Link to="/busterminal"><p>Bus Terminals</p></Link>
              <Link to="/"><p>Become an Ambassador</p></Link>
              <Link to="/"><p>Become a captain</p></Link>
            </div>
            <div className="col">
              <h1>Experience</h1>
              <Link to="/travels"><p>Travels and Tour</p></Link>
              <Link to="/safety"><p>Safety</p></Link>
              <Link to="/contact"><p>Contact Us</p></Link>
              <Link to="/faq"><p>FAQ</p></Link>
            </div>
            <div className="col">
              <h1>Terms</h1>
              <Link to="/privacy"><p>Privacy &amp; Policy</p></Link>
              <Link to="/terms"><p>Terms &amp; Condition</p></Link>
              <Link to="/luggage"><p>Luggage Allowance</p></Link>
            </div>
            <div className="col">
              <h1>Connect with us</h1>
              <a target="_blank"  rel="noreferrer" href="https://twitter.com/GIGMobility?s=09"><i className="fa fa-twitter mr-4 text-dark"></i></a>
              <a target="_blank"  rel="noreferrer" href="https://www.facebook.com/GIGMobility"><i className="fa fa-facebook mr-4 text-dark"></i></a>
              <a target="_blank"  rel="noreferrer" href="https://instagram.com/gigmobility?utm_medium=copy_link"><i className="fa fa-instagram text-dark"></i></a>
            </div>
          </div>
        </div>
        <br />
        <br />
        <hr />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>GIG Mobility</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

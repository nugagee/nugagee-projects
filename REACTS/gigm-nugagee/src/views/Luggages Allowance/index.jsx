import React from "react";
import Navbar from "../../components/NavBar";
import "./index.css";
import ghanabag from "../../assets/img/ghanabag.png";
import travelbag from "../../assets/img/travelbag.png";
import travelbox from "../../assets/img/travelbox.png";
import Footer from "../../components/Footer";

const Luggage = () => {
  return (
    <div>
      <Navbar />
      <section className="luggage">
        <div className="container">
          <div className="row row-grid">
            <div className="col-md-6 col-sm-12">
              <div className="luggage-text">
                <h1>Luggage Allowance</h1>
                <p>
                  Guests are entitled to one medium sized luggage{" "}
                  <b>(30”x22”x15)</b> per ticket. For comfort and safety
                  purposes, we are unable to accommodate any luggage with
                  dimensions exceeding this requirement. In cases where luggage
                  is in excess, affected guests would either need to send the
                  excess luggage via our sister company, <b>GIG Logistics</b> or
                  purchase an extra seat to accommodate it.
                </p>
                <br />
                <p>
                  We recommend the use of flexible traveling boxes as{" "}
                  <b>plastic boxes</b> are not acceptable on our buses due to
                  their fragile nature and the difficulties experienced in
                  manipulating such boxes during luggage loading activities.
                </p>
                <br />
                <p>
                  Owing to the embargo placed by the Nigeria Customs, guests are
                  advised to refrain from carrying rice as we can only
                  accommodate no more than 50kg bag of rice per bus.
                </p>
                <br />
                <h4>Maximum Luggage size</h4>
                <br />
                <h2>30 x 22 x 18 inches</h2>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row  ghana-box-holder">
                <div className="col-md-6 col-sm-12">
                  <div className="ghana">
                    <img src={ghanabag} alt="" className="img-fluid" />
                  </div>
                </div>
                <div className="col-md-5 col-sm-12 offset-md-1">
                  <div className="travelbox">
                    <img src={travelbox} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
              <div className="row travelbag-holder">
                <div className="col-md-10 col-sm-12 offset-md-1 text-center">
                  <div className="travelbag">
                    <img src={travelbag} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Luggage;

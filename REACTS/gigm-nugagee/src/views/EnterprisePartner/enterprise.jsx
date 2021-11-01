import React, { useState } from "react";
import Navbar from "../../components/NavBar";
import "./enterprise.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import partner1 from "../../assets/img/enterprise1.png";
import partner2 from "../../assets/img/enterprise3.png";
import IndividualPartner from "./IndividualPartner/individual";
import CorporatePartner from "./CorporatePartner/corporate";
import Submitform from "./SubmitForm/submit";
import CorporateSubmitForm from "./CooperateSubmitForm/cooperatesubmitform"

const Enterprise = () => {
  const [individual, setIndividual] = useState(true);
  const [corporate, setCorporate] = useState(false);
  const [submitDetails, setSubmitDetails] = useState(false);
  const [submitDetailsTwo, setSubmitDetailsTwo] = useState(false);

  const handleChange = () => {
    setIndividual(true);
    setCorporate(false);
    setSubmitDetails(false);
  };

  const handleChangeTwo = () => {
    setCorporate(true);
    setIndividual(false);
    setSubmitDetailsTwo(false);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //individual field to show next form
  const showSubmit = (e) => {
    setSubmitDetails(true);
    setIndividual(false);
  }

  //corporate field to show next form
  const showSubmitCoporate = (e) => {
    setSubmitDetailsTwo(true);
    setCorporate(false);
  }

  //go back to individual first form
  const goBack = (e) => {
    setSubmitDetails(false);
    setIndividual(true);
  }

   //go back to corporate first form
  const goBackTwo = (e) => {
    setSubmitDetailsTwo(false);
    setCorporate(true);
  }

  const individualContent = individual ? <IndividualPartner next={showSubmit} /> : null;
  
  const corporateContent = corporate ? <CorporatePartner corporatenext={showSubmitCoporate} /> : null;

  const submitContent = submitDetails ? <Submitform prev={goBack}/> : null;

  const CorporateSubmit = submitDetailsTwo ? <CorporateSubmitForm cooperate={goBackTwo}  /> : null;

  return (
    <div>
      <Navbar />

      <section className="enterprise">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="enterprise-partner">
                <h1>Become an Enterprise Partner</h1>
                <h2>What's your Partner Type?</h2>
                <div className="partner-checkbox">
                  <input
                    type="checkbox"
                    checked={individual}
                    onChange={handleChange}
                  />
                  <label htmlFor="partner">Individual Partner</label>
                  <p>
                    You own a vehicle and want to drive it as a captain (Driver)
                    within GIGM
                  </p>

                  <input type="checkbox" checked={corporate}
                    onChange={handleChangeTwo}/>
                  <label htmlFor="partner">Corporate Partner</label>
                  <p>
                    You own a vehicle and want to put them for profitable use on
                    GIGM Platform
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-7 slider-holder">
              <Slider {...settings}>
                <div>
                  <div className="slide-partner">
                    <img src={partner1} alt="" />
                  </div>
                </div>
                <div>
                  <div className="slide-partner">
                    <img src={partner2} alt="" />
                  </div>
                </div>
                <div>
                  <div className="slide-partner">
                    <img src={partner1} alt="" />
                  </div>
                </div>
                <div>
                  <div className="slide-partner">
                    <img src={partner2} alt="" />
                  </div>
                </div>
                <div>
                  <div className="slide-partner">
                    <img src={partner1} alt="" />
                  </div>
                </div>
                <div>
                  <div className="slide-partner">
                    <img src={partner2} alt="" />
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {individualContent}
      
      {corporateContent}
      {submitContent}
      {CorporateSubmit}
    </div>
  );
};

export default Enterprise;

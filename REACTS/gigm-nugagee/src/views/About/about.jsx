import React from "react";
import Navbar from "../../components/NavBar/index";
import Footer from "../../components/Footer/index";
import "./about.css";
import mission1 from "../../assets/img/mission1.png";
import mission2 from "../../assets/img/mission2.png";
import mission3 from "../../assets/img/mission3.png";
import mission4 from "../../assets/img/mission4.png";
import people from "../../assets/img/people.png";
import rectangle from "../../assets/img/rectangle.png";

const About = () => {
  return (
    <div>
      <Navbar />
      <section className="about">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="mb-2">About us</h1>
              <p>
                GIGM.com is a member of the GIG Group and is the most
                technologically driven road transport company in Nigeria.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row pt-5">
            <div className="col-md-6 col-sm-12">
              <div className="our-vision pt-5 pb-md-5">
                <h2>OUR VISION</h2>
                <br />
                <p>
                  To be the most technologically driven road transport platform
                  in Africa .
                </p>
                <br />
                <br />
                <h2>OUR MISSION</h2>
                <br />
                <p>
                  To relentlessly pursue customer satisfaction and safety in the
                  delivery of innovative travel solutions.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="alittle pt-5">
                <h1>A little more about us</h1> <br />
                <p>
                  Headquartered in Benin-City Edo state, GIGM.com has earned the
                  reputation of service excellence since incorporation in 1998.
                  Over the years, we have metamorphosed from what we were to
                  what we are occupying the position of a trail blazer in our
                  industry
                </p>
                <br />
                <p>
                  Our core focus is providing amazing travel experience for
                  commuters end to end.
                </p>
                <br />
                <p>
                  GIGM.com operates in over 10 states in Nigeria cutting across
                  five of the six geo political zones of the country.
                </p>
                <br />
                <p>
                  With our ever growing fleet, excellent service experience and
                  our extensive route network, GIGM.com has become a household
                  name known for providing cutting edge passenger transport
                  solutions
                </p>
                <br />
                <p>
                  A landmark for GIGM.com was our change of name from God is
                  Good Motors to GIGM.com and the commissioning of our
                  Ultra-Modern Bus terminal at Jibowu Lagos state which is
                  arguably the best bus terminal in West Africa.
                </p>
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />

      <section className="">
        <div className="container">
          <div className="row p-3">
            <div className="col-md-4">
              <div className="about-img-holder">
                <img src={mission1} alt="" className="img-fluid" />
                <br />
                <br />
                <div className="mission-img text-right">
                  <img
                    src={mission3}
                    alt=""
                    className="img-fluid object-fit_contain"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div>
                <div>
                  <img
                    src={mission2}
                    alt=""
                    className="img-fluid mission-img2"
                  />
                  <img src={rectangle} alt="" className="img-fluid rectangle" />
                </div>
                <img src={mission4} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ourteam">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>OUR TEAM</h1>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div>
                <div className="team-icon">
                  <img src={people} alt="" className="img-fluid" />
                </div>
                <br />
                <h2>EXECUTIVE MANAGEMENT</h2>
                <br />
                <p>
                  The firm is structured along seven different departments, each
                  managed by qualified and highly experienced professionals. The
                  departments are: Operations, Finance, Administration,
                  Customer-care, Fleet, and Engineering Services. Fit and
                  nimble, the Executive Management is supported by a zonal
                  structure that ensures proactive engagement of resources for
                  value creation.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div>
                <div className="team-icon">
                  <img src={people} alt="" className="img-fluid" />
                </div>
                <br />
                <h2>BOARD</h2>
                <br />
                <p>
                  The GIGM Board is comprised of the President, Executive
                  Chairman and two Directors. They are: Mrs Stella Ajaere, Chidi
                  Ajaere, Uche Ajaere and Chima Ajaere. Working with, and
                  through the Executive Management, the Board has helped to
                  initiate business models that have ensured steady growth and
                  profitability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;

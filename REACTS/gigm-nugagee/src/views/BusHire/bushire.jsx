import React from "react";
import "./bushire.css";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import PleaseNote from "../../components/pleasenote/note";
import Appinstall from "../../components/Appinstall";
import Button from "../../components/Button";
import vectorhirebus from "../../assets/img/Vector-hirebus.png";
import siennahirebus from "../../assets/img/sienna-hirebus.png";
import ellipsehirebus from "../../assets/img/Ellipse-44.png";

function BusHire() {
  return (
    <div>
      <Navbar />
      <section className="bushire">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="mb-2">Get to your destination as a group</h1>
              <br />
              <p>
                Enjoy from the amazing benefits that comes with choosing our Bus
                Hire Service; from travelling stress free to arriving and
                departing from your destination as a whole group.{" "}
              </p>
              <br />
              <p>
                You will also find that opting for this service gives you the
                opportunity to bond with family or friends on the trip,
                something that they may not be able to do if travelling the
                regular way.
              </p>
              <br />
              <div className="hirebus-btn">
                <Button
                  text="Register Now"
                  type="button"
                  btnstyle={{ backgroundColor: "#E21D00", margin: "20px 0px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>How it Works</h1>
            </div>
          </div>
          <br />
          <div className="row row-grid">
            <div className="col-md-4 col-sm-12">
              <div>
                <div className="vector-hirebus">
                  <img src={vectorhirebus} alt="" />
                </div>
                <br />
                <p>
                  Make sure you have considered all your travel requirements. We
                  will require you to answer a few simple questions regarding
                  your trip such as your departure date and type of vehicle you
                  need.
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 ">
              <div>
                <div className="vector-hirebus">
                  <img src={vectorhirebus} alt="" />
                </div>
                <br />
                <p>
                  Register on Our Website or on the Mobile App. WE have
                  operational bus terminals in four (4) geo-political zones but
                  cover all zones for hire services.
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div>
                <div className="vector-hirebus">
                  <img src={vectorhirebus} alt="" />
                </div>
                <br />
                <p>
                  We allow you to pay directly through our payment platforms on
                  our website. Immediately, you will receive a confirmation
                  email with your itinerary details and unique reference code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="availablebus">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div>
                <h1>Buses available for Hire</h1>
                <br />
                <p>
                  We have a large fleet of vehicles, and take pride in providing
                  the best charter services thus far. You can trust our services
                  as we provide you with different sized vehicle options to
                  cater to your travel needs – large or small. All vehicle hire
                  journeys are completed only by our highly trained captains,
                  our captains have years of experience driving and they are up
                  on their safety measures.
                </p>
                <br />
                <h3>The available buses are;</h3>
                <br />
                <ul>
                  <li>Toyota Hiace Bus</li>
                  <li>Toyota Sienna Minivans</li>
                  <li>Mercedes Benz Sprinter Bus</li>
                  <li>Luxury Prime Buses</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 align-self-center offset-md-1">
              <div>
                <img src={siennahirebus} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Other things you need to know</h1>
            </div>
          </div>
          <br />
          <br />
          <div>
            <div className="row row-grid">
              <div className="col-md-6 col-sm-12">
                <div>
                  <div>
                    <h5>
                      <img src={ellipsehirebus} alt="" className="pr-3" />
                      Payment terms
                    </h5>
                  </div>
                  <br />
                  <p className="other-things-text">
                    Typically, we ask for a full (100%) advance payment to
                    confirm the booking and reserve the vehicle for hire. Toll
                    and tax amounts are also included in the final fare when
                    booking is confirmed.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div>
                  <div>
                    <h5>
                      <img src={ellipsehirebus} alt="" className="pr-3" />
                      How the Kilometers are calculated
                    </h5>
                  </div>
                  <br />
                  <p className="other-things-text">
                    In case of outstation trips, kilometers are calculated based
                    on the return trip distance between the source and
                    destination. Any extra kilometers which are used within the
                    city and the distance from the point of departure will be
                    additionally charged for.
                  </p>
                </div>
              </div>
            </div>
            <br />
            <br />

            <div className="row row-grid">
              <div className="col-md-6 col-sm-12">
                <div>
                  <div>
                    <h5>
                      <img src={ellipsehirebus} alt="" className="pr-3" />
                      If you need to cancel your trip
                    </h5>
                  </div>
                  <br />
                  <p className="other-things-text">
                    We have cancellation policies against each leg of a trip;
                    <ul>
                      <li>
                        For an outright cancellation of both legs (departure and
                        return) we typically charge a 20% penalty of the full
                        fare.
                      </li>
                      <li>
                        For a partial cancellation of either legs (one leg) we
                        typically charge a 20% penalty of the leg cancelled and
                        offer a refund of the balance.
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 ">
                <div>
                  <div>
                    <h5>
                      <img src={ellipsehirebus} alt="" className="pr-3" />
                      In the case of a Bus breakdown
                    </h5>
                  </div>
                  <br />
                  <p className="other-things-text">
                    We use the best vehicles for hire or charter operations. The
                    vehicles are usually reliable, but in case of a breakdown,
                    we will send a replacement vehicle to complete the journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PleaseNote />
      <Appinstall />
      <Footer />
    </div>
  );
}

export default BusHire;

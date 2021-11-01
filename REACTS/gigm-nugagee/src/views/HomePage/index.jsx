import React, { useEffect } from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./index.css";
import Button from "../../components/Button";
import imageOne from "../../assets/img/Rectangle 6512.png";
import imageTwo from "../../assets/img/Rectangle 6513.png";
import googleBtn from "../../assets/img/Google Play - eng.png";
import appleBtn from "../../assets/img/App Store - eng.png";
// import phone from "../../assets/img/phone mock ups.png";
import cards from "../../assets/img/cards.png";
import jetmove from "../../assets/img/jet tri 1.png";
import BookSeat from "./BookSeat";
import HireBus from "./HireBus";
import BookStatus from "./BookingStatus";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import apiroutes from "../../services/apiroutes";
import { request } from "../../services/apiservice";
import { requestWallet } from "../../services/apiserviceWallet";
import { setAuth, setAuthWallet } from "../../services/auth";
import config from "../../configs";

export const HomeComponent = () => {
  useEffect(() => {
    getToken();
    getWalletToken();
    localStorage.removeItem("hireEmailAmount");
    localStorage.removeItem("transEmailAmount");
    localStorage.removeItem("estimatedTravelDistance");
    localStorage.removeItem("allHireDetails");
    localStorage.removeItem("selectedHireBuses");
    localStorage.removeItem("busNameQantity");
    localStorage.removeItem("returnPickupDate");
    localStorage.removeItem("userSelect");
    localStorage.removeItem("allTripDetails");
    localStorage.removeItem("selectedBusData");
    localStorage.removeItem("selectedSeats");
    localStorage.removeItem("selectedSeatsReturn");
    localStorage.removeItem("selectedReturnBusData");
    localStorage.removeItem("wovenAccountDetails");
    localStorage.removeItem("walletUserDetails");
    localStorage.removeItem("wovenWalletAccountDetails")
  }, []);

  const getToken = () => {
    const formEncoded = new URLSearchParams({
      username: config.USERNAME,
      password: config.PASSWORD,
      client_id: config.CLIENT_ID,
      grant_type: config.GRANT_TYPE,
      client_secret: config.CLIENT_SECRET,
    });

    request(apiroutes.GetToken(), "post", formEncoded)
      .then((res) => {
        const data = {
          access_token: res.data.access_token,
          expires_in: res.data.expires_in,
          profilePix: res.data.profilePix,
          roles: res.data.roles,
          user_id: res.data.user_id,
          userassignedmenu: res.data.userassignedmenu,
          username: res.data.username,
        };
        setAuth(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getWalletToken = () => {
    const formEncoded = new URLSearchParams({
      client_id: "mobility",
      grant_type: "client_credentials",
      client_secret: "158ee0ea-c52b-4735-9145-110cd00f37e1",
    });

    requestWallet(apiroutes.GetWalletToken(), "post", formEncoded)
      .then((res) => {
        // console.log(res);
        const data = {
          access_token: res.data.access_token,
          expires_in: res.data.expires_in,
          token_type: res.data.token_type,
        };
        setAuthWallet(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
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
  return (
    <div>
      <Navbar />
      <section className="hero-bg pt-5 pb-5">
        <div className="container">
          <div className="row row-grid">
            <div className="col-md-7 align-self-center">
              <h1>Revolutionizing road transportation in Africa</h1>
              <p>
                GIGM is a technologically powered road transport platform
                providing <span className="gigm-red">MOBILITY</span> services to
                people across Africa
              </p>
            </div>
            <div className="col-md-5">
              <section id="open-positions">
                <div className="positions">
                  <div className="position-filters">
                    <label
                      tabIndex="0"
                      htmlFor="book-a-seat"
                      className="bookseat"
                    >
                      Book a seat
                    </label>
                    <label tabIndex="0" htmlFor="hire-a-bus">
                      Hire a bus
                    </label>
                    <label tabIndex="0" htmlFor="booking-status">
                      Booking status
                    </label>
                  </div>

                  <div className="position book-a-seat">
                    <input
                      type="radio"
                      id="book-a-seat"
                      name="job-category"
                      defaultChecked
                    />
                    <div className="position-group">
                      <div className="position-post">
                        <BookSeat />
                      </div>
                    </div>
                  </div>

                  <div className="position hire-a-bus">
                    <input type="radio" id="hire-a-bus" name="job-category" />
                    <div className="position-group">
                      <div className="position-post">
                        <HireBus />
                      </div>
                    </div>
                  </div>

                  <div className="position booking-status">
                    <input
                      type="radio"
                      id="booking-status"
                      name="job-category"
                    />
                    <div className="position-group">
                      <div className="position-post">
                        <BookStatus />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      <section className="hot-trips pt-5 pb-5">
        <div className="container">
          <div className="row row-grid">
            <div className="col-md-5 align-self-center">
              <div className="prices-container">
                <h1>Best Trip Prices</h1>
                <p>Bringing you more routes at the best prices.</p>
              </div>
            </div>
            <div className="col-md-7">
              <Slider {...settings}>
                <div>
                  <div className="slide-image">
                    <img src={imageOne} alt="" />
                    <div className="hold-items"></div>
                    <div className="centered-book">
                      <h2>Lagos to Asaba</h2>
                      <Button
                        text="Book Now"
                        handleButtonClick={() => {}}
                        type="button"
                        btnstyle={{ background: "#56CCF2", color: "white" }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="slide-image">
                    <img src={imageTwo} alt="" />
                    <div className="hold-items"></div>
                    <div className="centered-book">
                      <h2>Lagos to Enugu</h2>
                      <Button
                        text="Book Now"
                        handleButtonClick={() => {}}
                        type="button"
                        btnstyle={{ background: "#56CCF2", color: "white" }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="slide-image">
                    <img src={imageOne} alt="" />
                    <div className="hold-items"></div>
                    <div className="centered-book">
                      <h2>Lagos to Abuja</h2>
                      <Button
                        text="Book Now"
                        handleButtonClick={() => {}}
                        type="button"
                        btnstyle={{ background: "#56CCF2", color: "white" }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="slide-image">
                    <img src={imageTwo} alt="" />
                    <div className="hold-items"></div>
                    <div className="centered-book">
                      <h2>Lagos to Port Harcourt</h2>
                      <Button
                        text="Book Now"
                        handleButtonClick={() => {}}
                        type="button"
                        btnstyle={{ background: "#56CCF2", color: "white" }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="slide-image">
                    <img src={imageOne} alt="" />
                    <div className="hold-items"></div>
                    <div className="centered-book">
                      <h2>Lagos to Benin</h2>
                      <Button
                        text="Book Now"
                        handleButtonClick={() => {}}
                        type="button"
                        btnstyle={{ background: "#56CCF2", color: "white" }}
                      />
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>
      <section className="app-section">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <span>Introducing</span>
              <h1>The world in your pocket</h1>
              <p>
                Use the GIGM app to organize your entire trip and find
                mobile-exclusive deals on the go.
              </p>
              <img src={googleBtn} alt="" className="download-btn-btn" />
              &nbsp;
              <img src={appleBtn} alt="" className="download-btn-btn" />
            </div>
            <div className="col-md-7">
            </div>
          </div>
        </div>
      </section>
      <section className="mobileShow">
      <div className="image-mobile">

      </div>
      </section>
      {/* <section className="app-section">
        <div className="container-fluid p-0 overflow-hidden">
          <div className="row row-grid">
            <div
              className="col-md-5 pt-5 pb-5 align-self-center"
              style={{ backgroundColor: "#56CCF2" }}
            >
              <div className="app-cont">
                <span>Introducing</span>
                <h1>The world in your pocket</h1>
                <p>
                  Use the GIGM app to organize your entire trip and find
                  mobile-exclusive deals on the go.
                </p>
                <img src={googleBtn} alt="" className="download-btn" />
                &nbsp;
                <img src={appleBtn} alt="" className="download-btn" />
              </div>
            </div>
            <div
              className="col-md-7 pt-5 pb-5 text-center"
              style={{ backgroundColor: "rgba(86, 204, 242, 0.2)" }}
            >
              <div className="haram">
                <img src={phone} className="phone-img" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="wallet-section pt-5 pb-5">
        <div className="container">
          <div className="row row-grid">
            <div className="col-md-6 align-self-center">
              <h1>Our digital wallet system</h1>
              <p>
                Use the GIGM wallet system to perform all digital transactions.
                Pay bills, buy airtime and fund your trips only on the mobile
                app.
              </p>
            </div>
            <div className="col-md-6">
              <img src={cards} alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <section className="ep-section pt-5 pb-5">
        <div className="container">
          <div className="row row-grid">
            <div className="col-md-3">
              <div className="ep-apply">
                <h1>Become an Enterprise Partner</h1>
                <p>Want to start up a transport business?</p>

                <p>Have some buses you will like to profitable use?</p>

                <p>
                  Want to contribute to providing better interstate road
                  transport experience in Africa
                </p>

                <p>This scheme is designed for you</p>
                <Button
                  text="Get Started"
                  handleButtonClick={() => {}}
                  type="button"
                  btnstyle={{ background: "#E21D00", color: "white" }}
                />
              </div>
            </div>
            <div className="col-md-9 align-self-center">
              <img src={jetmove} alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default HomeComponent;

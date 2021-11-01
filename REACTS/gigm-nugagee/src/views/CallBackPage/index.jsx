import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import apiroutes from "../../services/apiroutes";
import { request } from "../../services/apiservice";
import { getAuth } from "../../services/auth";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import downarrow from "../../assets/img/downarrow.png";

export const CallBackComponent = () => {
  const [stateSuccessful, setStateSuccessful] = useState({});
  const [failureState, setFailureState] = useState(false);
  const [seatNumber, setSeatNumber] = useState([]);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const reference = urlParams.get("reference");
  const token = getAuth("access_token");
  const history = useHistory();
  const [details, setDetails] = useState({});

  let routeName = stateSuccessful.Route || "loading... ==> loading...";
  const routeFields = routeName.split("==>");

  useEffect(() => {
    let data = localStorage.getItem("transEmailAmount");
    data = JSON.parse(data);
    setSeatNumber(data.seats);
    // console.log(data);
    setDetails(data);
    const confirmPayment = {
      email: data.email,
      amount: data.amount,
      RefCode: reference,
      PayStackReference: reference,
    };

    request(apiroutes.ConfirmPayStackPayment(), "post", confirmPayment, token)
      .then((res) => {
        // console.log(res, "process payment confirmation");
        if (res.data.Object.Response === "Approved") {
          setStateSuccessful(res.data.Object);
          localStorage.removeItem("userSelect");
          localStorage.removeItem("allTripDetails");
          localStorage.removeItem("selectedBusData");
          localStorage.removeItem("selectedSeats");
          localStorage.removeItem("selectedSeatsReturn");
          localStorage.removeItem("selectedReturnBusData");
        } else {
          setFailureState(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reference, token]);

  var newDate = new Date(stateSuccessful.DepartureDate || "1/1/2000");
  var yearOne = newDate.getFullYear();
  var monthOne = newDate.getMonth() + 1; //getMonth is zero based;

  var dayOne = newDate.getDate();
  let formatted = dayOne + "-" + monthOne + "-" + yearOne;

  return (
    <div>
      <Navbar />
      <section className="suc-err-page">
        {failureState ? (
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <div className="col-10 col-md-8 col-lg-6">
                <div className="ticket-card">
                  <h1 className="route-card-h1" style={{ color: "#E21D00" }}>
                    Failed Booking
                  </h1>
                  <div className="route-card">
                    <div className="d-flex">
                      <p className="left-par">
                        {routeFields[0]}
                        <br />
                        {stateSuccessful.DepartureTime}
                      </p>
                      <p className="left-par ml-auto text-right">
                        {routeFields[1]}
                        <br />
                        {stateSuccessful.DepartureTime}
                      </p>
                    </div>
                  </div>
                  <div className="route-card-red">
                    <div className="d-flex">
                      <p className="left-par">
                        Departure date
                        <br />
                        {formatted}
                      </p>
                      <p className="left-par ml-auto text-right">
                        Departure Time
                        <br />
                        {stateSuccessful.DepartureTime}
                      </p>
                    </div>
                  </div>
                  <div className="route-card-white-r">
                    <div className="d-flex">
                      <p className="left-par">
                        Passenger
                        <br />
                        <span>{details.mainName}</span>
                        <br />
                        {!details.otherNames ||
                        details.otherNames.length === 0 ? (
                          "&nbsp;"
                        ) : (
                          <>
                            {details.otherNames.map((item, i) => (
                              <>
                                <span key={i}>{item.fullName}</span>
                                <br />
                              </>
                            ))}
                          </>
                        )}
                      </p>
                      <p className="left-par ml-auto text-right">
                        Seats
                        <br />
                        {seatNumber.toString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      className="download-btn"
                      style={{ backgroundColor: "#E21D00" }}
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      Book Again{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <div className="col-10 col-md-8 col-lg-6">
                <div className="ticket-card">
                  <h1 className="route-card-h1">Your Ticket</h1>
                  <div className="route-card">
                    <div className="d-flex">
                      <p className="left-par">
                        {routeFields[0]}
                        <br />
                        {stateSuccessful.DepartureTime}
                      </p>
                      <p className="left-par ml-auto text-right">
                        {routeFields[1]}
                        <br />
                        {stateSuccessful.DepartureTime}
                      </p>
                    </div>
                  </div>
                  <div className="route-card-blue">
                    <div className="d-flex">
                      <p className="left-par">
                        Departure date
                        <br />
                        {formatted}
                      </p>
                      <p className="left-par ml-auto text-right">
                        Departure Time
                        <br />
                        {stateSuccessful.DepartureTime}
                      </p>
                    </div>
                  </div>
                  <div className="route-card-white">
                    <div className="d-flex">
                      <p className="left-par">
                        Passenger
                        <br />
                        <span>{details.mainName}</span>
                        <br />
                        {!details.otherNames ||
                        details.otherNames.length === 0 ? (
                          "&nbsp;"
                        ) : (
                          <>
                            {details.otherNames.map((item, i) => (
                              <>
                                <span key={i}>{item.fullName}</span>
                                <br />
                              </>
                            ))}
                          </>
                        )}
                      </p>
                      <p className="left-par ml-auto text-right">
                        Seats
                        <br />
                        {seatNumber.toString()}
                      </p>
                    </div>
                  </div>
                  {/* <div className="route-card-white-b">
                     <div className="d-flex">
                       <p className="left-par">
                       Passenger
                         <br />
                         {stateSuccessful.DepartureDate}
                       </p>
                       <p className="left-par ml-auto text-right">
                       Seats
                         <br />
                         {stateSuccessful.SeatNumber}
                       </p>
                     </div>
                   </div> */}
                  <div className="text-center">
                    <button
                      className="download-btn"
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      Go Home &nbsp; <img src={downarrow} alt="" />
                    </button>
                  </div>
                </div>

                {/* <h3>Reference Code: {reference}</h3> */}
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
export default CallBackComponent;

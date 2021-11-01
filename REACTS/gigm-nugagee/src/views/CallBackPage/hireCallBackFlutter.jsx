import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import apiroutes from "../../services/apiroutes";
import { request } from "../../services/apiservice";
import { getAuth } from "../../services/auth";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import downarrow from "../../assets/img/downarrow.png";

export const HireCallBackFlutterComponent = () => {
  const [stateSuccessful, setStateSuccessful] = useState({});
  const [failureState, setFailureState] = useState(false);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const reference = urlParams.get("tx_ref");
  const token = getAuth("access_token");
  const history = useHistory();
  const [details, setDetails] = useState({});

  let routeName = stateSuccessful.Route || "loading... - loading...";
  const routeFields = routeName.split("-");

  const nf = new Intl.NumberFormat();

  useEffect(() => {
    let data = localStorage.getItem("hireEmailAmount");
    data = JSON.parse(data);
    // console.log(data);
    setDetails(data);

    request(apiroutes.ConfirmHireFlutterWavePayment(reference), "get", token)
      .then((res) => {
        // console.log(res, "process payment confirmation");
        if (res.data.Object.Response === "Approved") {
          setStateSuccessful(res.data.Object);
          localStorage.removeItem("estimatedTravelDistance");
          localStorage.removeItem("allHireDetails");
          localStorage.removeItem("selectedHireBuses");
          localStorage.removeItem("busNameQantity");
          localStorage.removeItem("returnPickupDate");
        } else {
          setFailureState(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reference, token]);

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
                        Departure Point
                        <br />
                        {routeFields[0]}
                      </p>
                      <p className="left-par ml-auto text-right">
                        Destination Point
                        <br />
                        {routeFields[1]}
                      </p>
                    </div>
                  </div>
                  <div className="route-card-red">
                    <div className="d-flex">
                      <p className="left-par">
                        Customer Name
                        <br />
                        <span>{details.mainName}</span>
                      </p>
                      <p className="left-par ml-auto text-right">
                        Amount Paid
                        <br />₦{nf.format(details.amount)}
                      </p>
                    </div>
                  </div>
                  {/* <div className="route-card-white-r">
                    <div className="d-flex">
                      <p className="left-par">
                        Passenger
                        <br />
                        <span>{details.mainName}</span>
                        
                      </p>
                      <p className="left-par ml-auto text-right">
                        Seats
                        <br />
                        jdjd
                      </p>
                    </div>
                  </div> */}
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
                        Departure Point
                        <br />
                        {routeFields[0]}
                      </p>
                      <p className="left-par ml-auto text-right">
                        Destination Point
                        <br />
                        {routeFields[1]}
                      </p>
                    </div>
                  </div>
                  <div className="route-card-blue">
                    <div className="d-flex">
                      <p className="left-par">
                        Customer Name
                        <br />
                        <span>{details.mainName}</span>
                      </p>
                      <p className="left-par ml-auto text-right">
                        Amount Paid
                        <br />₦{nf.format(details.amount)}
                      </p>
                    </div>
                  </div>
                  {/* <div className="route-card-white">
                    <div className="d-flex">
                      <p className="left-par">
                        Booker Name
                        <br />
                        <span>{details.mainName}</span>
                        
                      </p>
                      <p className="left-par ml-auto text-right">
                        Departure Date
                        <br />
                        {details.date}
                      </p>
                    </div>
                  </div> */}
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
export default HireCallBackFlutterComponent;

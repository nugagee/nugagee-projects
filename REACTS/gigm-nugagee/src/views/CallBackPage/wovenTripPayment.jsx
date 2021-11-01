import React from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import downarrow from "../../assets/img/downarrow.png";
import { useHistory } from "react-router";

export const PaymentComponent = () => {
  const history = useHistory();
  let data = localStorage.getItem("transEmailAmount");
    data = JSON.parse(data);
    // console.log(data, 'details')
    let seatData = localStorage.getItem("selectedSeats");
  seatData = JSON.parse(seatData);
//   console.log(seatData, 'seat data')
  let busData = localStorage.getItem("selectedBusData");
  busData = JSON.parse(busData);
//   console.log(busData, "bus data")

  const routeFields =busData.RouteName.split("==>");

  var newDate = new Date(busData.DepartureDate);
  var yearOne = newDate.getFullYear();
  var monthOne = newDate.getMonth() + 1; //getMonth is zero based;

  var dayOne = newDate.getDate();
  let formatted = dayOne + "-" + monthOne + "-" + yearOne;

  return (
    <div>
      <Navbar />
      <section className="suc-err-page">
        
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
                        {busData.DepartureTime}
                      </p>
                      <p className="left-par ml-auto text-right">
                        {routeFields[1]}
                        <br />
                        {busData.DepartureTime}
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
                        {busData.DepartureTime}
                      </p>
                    </div>
                  </div>
                  <div className="route-card-white">
                    <div className="d-flex">
                      <p className="left-par">
                        Passenger
                        <br />
                        <span>{data.mainName}</span>
                        <br />
                        {!data.otherNames ||
                        data.otherNames.length === 0 ? (
                          "&nbsp;"
                        ) : (
                          <>
                            {data.otherNames.map((item, i) => (
                              <>
                              <span key={i}>{item.fullName}</span>
                              <br/>
                              </>
                            ))}
                          </>
                        )}
                      </p>
                      <p className="left-par ml-auto text-right">
                        Seats
                        <br />
                        {seatData.toString()}
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
                    <button className="download-btn" onClick={() => {history.push('/')}}>
                      Go Home &nbsp; <img src={downarrow} alt="" />
                    </button>
                  </div>
                </div>

                {/* <h3>Reference Code: {reference}</h3> */}
              </div>
            </div>
          </div>
      </section>

      <Footer />
    </div>
  );
};
export default PaymentComponent;
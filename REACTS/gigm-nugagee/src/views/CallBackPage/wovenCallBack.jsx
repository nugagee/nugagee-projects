import React from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Button from "../../../src/components/Button/index";
import { useHistory } from "react-router";

export const WovenCallBackComponent = () => {
  const history = useHistory()
  let seatData = localStorage.getItem("selectedSeats");
  seatData = JSON.parse(seatData);
  let busData = localStorage.getItem("selectedBusData");
  busData = JSON.parse(busData);
  let paymentDetails = localStorage.getItem("wovenAccountDetails");
  paymentDetails = JSON.parse(paymentDetails);
  const nf = new Intl.NumberFormat();

  return (
    <div>
      <Navbar />
      <section className="suc-err-page">
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <div className="ticket-card">
                <h1 className="route-card-h1">
                  Dear {paymentDetails.account_name},
                </h1>
                <p>
                  Your reservation is successful and awaiting payment! See your
                  trip details below:
                </p>
                <p>
                  Reference number:{" "}
                  <strong>{paymentDetails.account_reference}</strong>
                </p>
                <hr />
                <p>Kindly make payment to the accout details below:</p>
                <p>Bank: Sparkle Bank</p>
                <p>
                  Account name: <strong>{paymentDetails.account_name}</strong>
                </p>
                <p>
                  Account number: <strong>{paymentDetails.vnuban}</strong>
                </p>
                <p>
                  Amount to pay: ₦{" "}
                  <strong>{nf.format(paymentDetails.max_amount)}</strong>
                </p>
                <p>
                  Reference/Description:{" "}
                  <strong>{paymentDetails.account_reference}</strong>
                </p>
                <br />
                <div className="row">
                  <div className="col-md-8">
                    <p>
                      {" "}
                      <strong>Trip Details:</strong>{" "}
                    </p>
                    <p>
                      {" "}
                      <strong>Route:</strong> {busData.RouteName}
                    </p>
                    <p>
                      {" "}
                      <strong>Bus Type:</strong> {busData.VehicleName}
                    </p>
                    <p>
                      {" "}
                      <strong>Trip Date:</strong> {busData.DepartureDate}
                    </p>
                    <p>
                      {" "}
                      <strong>Seat No:</strong> {seatData}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      {" "}
                      <strong>Price:</strong>{" "}
                    </p>
                    <p>₦{nf.format(paymentDetails.max_amount)}</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Button
                  handleButtonClick={() => {
                    history.push("/");
                  }}
                  text="Go Home"
                  type="button"
                  btnstyle={{ backgroundColor: "#E21D00", margin: "20px 0px", width:"50%" }}
                />
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
export default WovenCallBackComponent;

import React from "react";
import logo from "../../../assets/img/seyi.png";

const Details = ({ onclick, details }) => {
  console.log(details, "detalilikgdgh");

  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="bookingdetails-parent">
      <section className="booking-history2 mt-5">
        <div className="container">
          <div className="row row-grid">
            <div class="col-md-12 text-right">
              <i class="fa fa-times booking-time" onClick={onclick}></i>
            </div>
          </div>
          <div className="row row-grid">
            <div className="col-md-12 text-center">
              <div className="profilepic-holder">
                <img
                  src={logo}
                  style={{ borderRadius: "50%" }}
                  alt="dummy"
                  width="80"
                  height="80"
                />
              </div>
              <h4>Captain: Kuti Demmah</h4>
              <h4>Vehicle number: 0134529542</h4>
            </div>
          </div>
        </div>
      </section>
      <br />

      <section>
        <div className="container">
          <div className="booking-history2-details-holder">
            <div className="booking-history2-details">
              <div className="row mb-4">
                <div className="col-sm-12 col-md-6 ">
                  <h2>Route</h2>
                </div>
                <div className="col-md-6">
                  <p>
                    <i class="fa fa-map-marker map" aria-hidden="true"></i>
                    {details.DepartureTerminalName}
                  </p>
                  <p>
                    <i class="fa fa-ellipsis-v dotted"></i>
                  </p>
                  <p>
                    <i class="fa fa-dot-circle-o location"></i>Lagos
                    {details.DestinationTerminalName}
                  </p>
                </div>
              </div>

              <div className="row row-grid mb-4">
                <div className="col-md-6">
                  <h2>Booking</h2>
                </div>
                <div className="col-md-6">
                  <p style={{ color: "#6AC28F" }}>Approved</p>
                </div>
              </div>

              <div className="row row-grid mb-4">
                <div className="col-md-6">
                  <h2>Ratings</h2>
                </div>
                <div className="col-md-6">
                  <p>
                    {details.TripRating === null ? (
                      <div>
                        <i class="fa fa-star pr-2" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                      </div>
                    ) : (details.TripRating.AverageRating === 1 ? (
                      <div>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                      </div>
                    ) : details.TripRating.AverageRating === 2 ? (
                      <div>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                      </div>
                    ) : details.TripRating.AverageRating === 3 ? (
                      <div>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                      </div>
                    ):details.TripRating.AverageRating === 4 ? (
                      <div>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                      </div>
                    ):details.TripRating.AverageRating === 5 ? (
                      <div>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star pr-2 rating" aria-hidden="true"></i>
                        <i class="fa fa-star rating" aria-hidden="true"></i>
                      </div>
                    ):null)}
                  </p>
                </div>
              </div>

              <div className="row row-grid mb-4">
                <div className="col-md-6">
                  <h2>Ref code:</h2>
                </div>
                <div className="col-md-6">
                  <p>{details.BookingReferenceCode}</p>
                </div>
              </div>

              <div className="row row-grid mb-4">
                <div className="col-md-6">
                  <h2>Total amount</h2>
                </div>
                <div className="col-md-6">
                  <h4>N {details.Amount}</h4>
                </div>
              </div>

              <div className="row row-grid mb-4">
                <div className="col-md-6">
                  <h2>Booking date</h2>
                </div>
                <div className="col-md-6">
                  <p>{dateTimeFormat.format(new Date(details.DateCreated))}</p>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <h2>Departure date</h2>
                </div>
                <div className="col-md-6">
                  <p>
                    {dateTimeFormat.format(new Date(details.DepartureDate))}
                  </p>
                </div>
              </div>

              <div className="row row-grid mb-4">
                <div className="col-md-6">
                  <h2>Booking seats</h2>
                </div>
                <div className="col-md-6">
                  <p>{details.SeatNumber}</p>
                </div>
              </div>

              <div className="row row-grid mb-4">
                <div className="col-md-6">
                  <h2>Bus type</h2>
                </div>
                <div className="col-md-6">
                  <p>No Bus Type</p>
                </div>
              </div>

              <div className="row row-grid mb-4">
                <div className="col-md-6">
                  <h2>Contact info</h2>
                </div>
                <div className="col-md-6">
                  <p>
                    {details.FullName} {details.PhoneNumber}
                  </p>
                </div>
              </div>

              <div className="row row-grid mb-4">
                <div className="col-md-6">
                  <h2>Next of Kin</h2>
                </div>
                <div className="col-md-6">
                  <p>{details.NextOfKinName}</p>
                </div>
              </div>

              <div className="row row-grid mb-4">
                <div className="col-md-6">
                  <h2>Trip Type</h2>
                </div>
                <div className="col-md-6">
                  <p>One Way Trip</p>
                </div>
              </div>

              <div className="row row-grid">
                <div className="col-md-6">
                  <h2>Passenger type</h2>
                </div>
                <div className="col-md-6">
                  <p>{details.PassengerType === 0 ? "Adult" : "Child"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;

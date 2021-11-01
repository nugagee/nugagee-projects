import React from "react";
import bookingcode from "../../../assets/img/bookingcode.png";

const History = ({ onclick, product }) => {
    const newproduct = product

    const dateTimeFormat = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  return (
      <div>
        {
          newproduct.length === 0 ? <div>
          <div className="col-md-11 nobookinghistory">
            <h3>Booking History</h3>
            <div className="nobookinghistoryimg">
              <img src={bookingcode} alt="" />
            </div>
            <div className="referral-code">
              <p>You are yet to make a booking</p>
            </div>
          </div>
        </div> 
        : <div className="booking-history">
          {newproduct.map((item, index) => (
            <div className="booking-details" onClick={() => {onclick(item)}} key={index}>
              <div className="row row-grid">
                <div className="col-md-6">
                  <div>
                    <h3>{item.RouteName}</h3>
                    <p>{dateTimeFormat.format(new Date(item.DepartureDate))}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-md-right text-sm-left">
                    <p>{
                    item.BookingStatus === 0 ? 'Pending': 
                    item.BookingStatus === 1 ? 'Approved':
                    item.BookingStatus === 2 ? 'Cancelled':
                    item.BookingStatus === 3 ? 'Created':
                    item.BookingStatus === 4 ? 'Declined':
                    item.BookingStatus === 5 ? 'Expired':
                    item.BookingStatus === 6 ? 'Failed':'Not-Specified'
                  }</p>
                    <h4>{item.Amount}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        }
    </div>
  );
};

export default History;

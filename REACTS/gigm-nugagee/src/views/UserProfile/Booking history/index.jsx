import React, { useState, useEffect } from "react";
import SideBar from "../SideBar/index";
import MobileNavBar from "../MobileNavbar/index";
import Navbar from "../../../components/NavBar/index";
import Details from "./bookingdetails";
import History from "./bookinghistory";
import "./booking.css";
import { request } from "../../../services/apiservice";
import apiroutes from "../../../services/apiroutes";
import { getAuth, getUser } from "../../../services/auth";

export const BookingHistory = () => {
  const [history, setHistory] = useState(false);
  const [details, setDetails] = useState(false);
  const [bookingInfo, setBookingInfo] = useState();
  const [bookingItem, setBookingItem] = useState()
  const loggedInUser = getUser();
  const token = getAuth("access_token");

  const handleChange = (item) => {
    setHistory(false);
    setDetails(true);
    console.log(item, "item")
    setBookingItem(item)
  };

  const handleDetails = () => {
    setHistory(true);
    setDetails(false);
  };

  useEffect(() => {
    if (loggedInUser === null) {
      history.push("/");
      return false;
    } else {
      bookingToken();
    }
    // eslint-disable-next-line
  }, []);

  const bookingToken = () => {
    request(
      apiroutes.BookingHistory(loggedInUser.PhoneNumber),
      "get",
      null,
      token
    )
      .then((res) => {
        console.log(res);
        setBookingInfo(res.data.Object);
        setHistory(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(bookingInfo)
  const historyContent = history ? (
    <History onclick={handleChange} product={bookingInfo} />
  ) : null;

  const detailContent = details ? <Details onclick={handleDetails} details={bookingItem}/> : null;
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="side-bar">
          <SideBar />
          <div className="contentarea">
            <MobileNavBar />
            {historyContent}
            {detailContent}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingHistory;

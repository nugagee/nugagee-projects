import React, { useState, useEffect } from "react";
import Select from "../../components/Dropdown/index";
import Button from "../../components/Button";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router";
import apiroutes from "../../services/apiroutes";
import { request } from "../../services/apiservice";
import { getAuth } from "../../services/auth";
import Loader from "../../components/Loader";

export const BookSeat = () => {
  const [departure, setDeparture] = useState("");
  const [adult, setAdult] = useState("1");
  const [arrival, setArrival] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [departureRound, setDepartureRound] = useState("");
  const [adultRound, setAdultRound] = useState("1");
  const [arrivalRound, setArrivalRound] = useState("");
  const [startDateRound, setStartDateRound] = useState(new Date());
  const [endDateRound, setEndDateRound] = useState(null);
  const token = getAuth("access_token");
  const [departureTerminal, setDepartureTerminal] = useState([]);
  const [arrivalTerminal, setArrivalTerminal] = useState([]);
  const [departureTerminalRound, setDepartureTerminalRound] = useState([]);
  const [arrivalTerminalRound, setArrivalTerminalRound] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageLoadingRound, setPageLoadingRound] = useState(false);

  const departureSelect = departureTerminal.map((x) => ({
    label: x.TerminalName,
    value: x.TerminalId,
  }));
  const arrivalSelect = arrivalTerminal.map((x) => ({
    label: x.TerminalName,
    value: x.TerminalId,
  }));
  const adults = [];
  for (let i = 1; i <= 13; i++) {
    adults.push(i);
  }
  const adultOptions = adults.map((x) => ({ label: x, value: x }));

  const departureSelectRound = departureTerminalRound.map((x) => ({
    label: x.TerminalName,
    value: x.TerminalId,
  }));
  const arrivalSelectRound = arrivalTerminalRound.map((x) => ({
    label: x.TerminalName,
    value: x.TerminalId,
  }));
  const adultsRound = [];
  for (let i = 1; i <= 13; i++) {
    adultsRound.push(i);
  }
  const adultOptionsRound = adultsRound.map((x) => ({ label: x, value: x }));

  const history = useHistory();

  const colorStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted black',
      color: state.isSelected ? 'white' : 'black',
    })
  }
  

  useEffect(() => {
    const getDepartureTerminal = () => {
      request(apiroutes.DepartureTerminals(), "get", null, token)
        .then((res) => {
          setDepartureTerminal(res.data.Object.Items);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getDepartureTerminal();
  }, [token]);

  const getArrivalTerminal = (e) => {
    setDeparture(e.value);
    setPageLoading(true);
    request(apiroutes.ArrivalTerminals(e.value), "get", null, token)
      .then((res) => {
        setArrivalTerminal(res.data.Object);
        setPageLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setPageLoading(false);
      });
  };

  useEffect(() => {
    const getDepartureTerminalRound = () => {
      request(apiroutes.DepartureTerminals(), "get", null, token)
        .then((res) => {
          setDepartureTerminalRound(res.data.Object.Items);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getDepartureTerminalRound();
  }, [token]);

  const getArrivalTerminalRound = (e) => {
    setDepartureRound(e.value);
    setPageLoadingRound(true);
    request(apiroutes.ArrivalTerminals(e.value), "get", null, token)
      .then((res) => {
        setArrivalTerminalRound(res.data.Object);
        setPageLoadingRound(false);
      })
      .catch((err) => {
        console.log(err.response);
        setPageLoadingRound(false);
      });
  };

  const handleOneWay = (e) => {
    e.preventDefault();
    const newStartDate = new Date(startDate);
    let date = JSON.stringify(newStartDate);
    date = date.slice(1, 11);
    setLoading(true);
    const bookingData = {
      DepartureTerminalId: departure,
      DestinationTerminalId: arrival,
      DepartureDate: date,
      NumberOfAdults: adult,
      TripType: "0",
    };

    const currItem = JSON.parse(JSON.stringify(departureTerminal));
    const departing = currItem.find(
      (terminal) => terminal.TerminalId === departure
    );

    const currItemArrival = JSON.parse(JSON.stringify(arrivalTerminal));
    const arriving = currItemArrival.find(
      (terminal) => terminal.TerminalId === arrival
    );
    const userSelect = {
      noOfAdult: adult,
      date: startDate,
      departureName: departing.TerminalName,
      arrivalName: arriving.TerminalName,
    };

    localStorage.setItem("userSelect", JSON.stringify(userSelect));

    request(apiroutes.BookingSearch(), "post", bookingData, token)
      .then((res) => {
        setLoading(false);
        localStorage.setItem(
          "allTripDetails",
          JSON.stringify(res.data.Object)
        );
        history.push("/select-bus");
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  const handleRoundWay = (e) => {
    e.preventDefault();
    const newStartDate = new Date(startDateRound);
    let beginDate = JSON.stringify(newStartDate);
    beginDate = beginDate.slice(1, 11);
    const newEndDate = new Date(endDateRound);
    let stopDate = JSON.stringify(newEndDate);
    stopDate = stopDate.slice(1, 11);
    setLoading(true);
    const bookingData = {
      DepartureTerminalId: departureRound,
      DestinationTerminalId: arrivalRound,
      DepartureDate: beginDate,
      ReturnDate: stopDate,
      NumberOfAdults: adultRound,
      TripType: "1",
    };
    // console.log(bookingData, 'round trip post')

    const currItem = JSON.parse(JSON.stringify(departureTerminalRound));
    const departing = currItem.find(
      (terminal) => terminal.TerminalId === departureRound
    );

    const currItemArrival = JSON.parse(JSON.stringify(arrivalTerminalRound));
    const arriving = currItemArrival.find(
      (terminal) => terminal.TerminalId === arrivalRound
    );
    const userSelect = {
      noOfAdult: adultRound,
      date: startDateRound,
      endDate: endDateRound,
      departureName: departing.TerminalName,
      arrivalName: arriving.TerminalName,
    };

    localStorage.setItem("userSelect", JSON.stringify(userSelect));

    request(apiroutes.BookingSearch(), "post", bookingData, token)
      .then((res) => {
        // console.log(res, 'round trip')
        setLoading(false);
        localStorage.setItem(
          "allTripDetails",
          JSON.stringify(res.data.Object)
        );
        history.push("/select-bus");
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  return (
    <div className="bookSeat">
      <input id="oneway-book-a-set" type="radio" name="tabs" defaultChecked />
      <label htmlFor="oneway-book-a-set" className="oneway-book-a-set">
        One Way
      </label>

      <input id="roundtrip-book-a-set" type="radio" name="tabs" />
      <label htmlFor="roundtrip-book-a-set" className="roundtrip-book-a-set">
        Round Trip
      </label>

      <section id="content1">
        <div className="row">
          <div className="col-md-12">
            <label className="label-auth">Travelling From</label>
            <Select
              options={departureSelect}
              handleChange={getArrivalTerminal}
              value={departure}
              styles={colorStyles}
              placeholder="Departure Terminal"
            />
          </div>
        </div>
        <br />
        {pageLoading ? (
          <div className="text-center">
            <div className="lds-default">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12">
              <label className="label-auth">Travelling To</label>
              <Select
                options={arrivalSelect}
                handleChange={(e) => setArrival(e.value)}
                value={arrival}
                styles={colorStyles}
                placeholder="Arrival Terminal"
              />
            </div>
          </div>
        )}

        <br />
        <div className="row row-grid">
          <div className="col-md-6">
            <label className="label-auth">Departure Date</label>
            <DatePicker
              placeholderText="Select Date"
              selected={startDate}
              minDate={addDays(new Date(), 1)}
              maxDate={addDays(new Date(), 14)}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="col-md-6">
            <label className="label-auth">Adults</label>
            <Select
              options={adultOptions}
              handleChange={(e) => setAdult(e.value)}
              defaultValue={{ label: "1", value: 1 }}
              value={adult}
              styles={colorStyles}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <Button
              text={loading ? <Loader dark={false} /> : "Proceed"}
              handleButtonClick={handleOneWay}
              type="button"
              btnstyle={{ background: "#E21D00", color: "white" }}
              disabled={!(startDate && departure && arrival)}
            />
          </div>
        </div>
      </section>
      <section id="content2">
        <div className="row">
          <div className="col-md-12">
            <label className="label-auth">Travelling From</label>
            <Select
              options={departureSelectRound}
              handleChange={getArrivalTerminalRound}
              value={departureRound}
              placeholder="Departure Terminal"
              styles={colorStyles}
            />
          </div>
        </div>
        <br />
        {pageLoadingRound ? (
          <div className="text-center">
            <div className="lds-default">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className="row">
          <div className="col-md-12">
            <label className="label-auth">Travelling To</label>
            <Select
              options={arrivalSelectRound}
              handleChange={(e) => setArrivalRound(e.value)}
              value={arrivalRound}
              placeholder="Arrival Terminal"
              styles={colorStyles}
            />
          </div>
        </div>
        )}
        
        <br />
        <div className="row row-grid">
          <div className="col-md-6">
            <label className="label-auth">Departure Date</label>
            <DatePicker
              placeholderText="Select Date"
              selected={startDateRound}
              minDate={new Date()}
              maxDate={addDays(new Date(), 14)}
              onChange={(date) => setStartDateRound(date)}
            />
          </div>
          <div className="col-md-6">
            <label className="label-auth">Arrival Date</label>
            <DatePicker
              placeholderText="Select Date"
              selected={endDateRound}
              minDate={new Date(startDateRound)}
              maxDate={addDays(new Date(), 14)}
              onChange={(date) => setEndDateRound(date)}
            />
          </div>
        </div>
        <br />
        <div className="row row-grid">
          <div className="col-md-6">
            <label className="label-auth">Adults</label>
            <Select
              options={adultOptionsRound}
              handleChange={(e) => setAdultRound(e.value)}
              defaultValue={{ label: "1", value: 1 }}
              value={adultRound}
              styles={colorStyles}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <Button
              text={loading ? <Loader dark={false} /> : "Proceed"}
              handleButtonClick={handleRoundWay}
              type="button"
              btnstyle={{ background: "#E21D00", color: "white" }}
              disabled={!(startDateRound && departureRound && arrivalRound && endDateRound)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
export default BookSeat;


// //For each element of an array, a counter is set to 0. The element is compared to each element to its left.
// //If the element to the left is greater, the absolute difference is subtracted from the counter.
// // If the element to the left is less, the absolute difference is added to the counter.
// //For each element of the array, determine the value of the counter. These vaues should be stored in an array and returned.
// function arrayChallenge () {
//    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//   const result = array.map((element, index) => {
//     let counter = 0;
//     for(let i = 0; i < index; i++) {
//       if(array[i] > element) {
//         counter -= Math.abs(array[i] - element);
//       } else {
//         counter += Math.abs(array[i] - element);
//       }
//     }
//     return counter;
//   });
//   return result;
// }

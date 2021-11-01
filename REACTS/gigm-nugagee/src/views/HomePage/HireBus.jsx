import React, { useState } from "react";
// import Select from "../../components/Dropdown/index";
import Button from "../../components/Button";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import config from "../../configs";
import apiroutes from "../../services/apiroutes";
import { request } from "../../services/apiservice";
import { getAuth } from "../../services/auth";
import Loader from "../../components/Loader";
import makeAPICall from "../../services/googleMatrix";

export const HireBus = () => {
  const history = useHistory();
  const token = getAuth("access_token");
  const [startDate, setStartDate] = useState(new Date());
  const [returnStartDate, setReturnStartDate] = useState(new Date());
  const [departure, setValue] = useState(null);
  const [checkbox, setCheckBox] = useState(false);
  const [checkboxOne, setCheckBoxOne] = useState(false);
  const [arrival, setArrival] = useState(null);
  const [returnDeparture, setReturnDeparture] = useState(null);
  const [returnArrival, setReturnArrival] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pickUpLat, setPickUpLat] = useState({});
  const [arrivalLat, setArrivalLat] = useState({});
  const [returnPickUpLat, setReturnPickUpLat] = useState({});
  const [returnArrivalLat, setreturnArrivalLat] = useState({});
  const [loading, setLoading] = useState(false);
  // const _eQuatorialEarthRadius = 6378.137;
  // const _d2r = Math.PI / 180.0;
  const apiKey = config.GOOGLE_API;

  const handleDepartureSelect = (item) => {
    let newValue = item;
    setValue(newValue.label);
    geocodeByAddress(newValue.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setPickUpLat({ lat, lng });
      });
  };

  const handleArrivalSelect = (item) => {
    let newValue = item;
    setArrival(newValue.label);
    geocodeByAddress(newValue.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setArrivalLat({ lat, lng });
      });
  };

  const handleRoundDepartureSelect = (item) => {
    let newValue = item;
    setReturnDeparture(newValue.label);
    geocodeByAddress(newValue.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setReturnPickUpLat({ lat, lng });
      });
  };

  const handleRoundArrivalSelect = (item) => {
    let newValue = item;
    setReturnArrival(newValue.label);
    geocodeByAddress(newValue.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setreturnArrivalLat({ lat, lng });
      });
  };

  const getDistance = (lat1, long1, lat2, long2) => {
    return makeAPICall({
      fromLatLong: lat1,
      fromLatLongTwo: long1,
      toLatLong: lat2,
      toLatLongTwo: long2,
      method: "GET",
    })
      .then((result) => {
        // console.log(result);
        let distance = result.rows[0].elements[0].distance.text.split("km");
        // console.log(distance)
        return distance[0];
      })
      .catch((err) => console.log(err));
  };

  const postSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    const newStartDate = new Date(startDate);
    let date = JSON.stringify(newStartDate);
    date = date.slice(1, 11);
    const { lat, lng } = pickUpLat;
    const { lat: lat1, lng: lng2 } = arrivalLat;
    getDistance(lat, lng, lat1, lng2).then((response) => {
      const details = {
        OnewayPickupDate: date,
        OnewayDistanceApart: parseInt(response),
        OneWayDropoffLocation: arrival,
        HiredServiceType: "0",
        OnewayPickupLocation: departure,
        IsSleepOver: checkboxOne,
      };
      localStorage.setItem("estimatedTravelDistance", response);
      // console.log(details);

      request(apiroutes.HireSearch(), "post", details, token)
        .then((res) => {
          setLoading(false);
          // console.log(res, 'one way test');
          localStorage.setItem(
            "allHireDetails",
            JSON.stringify(res.data.Object)
          );
          history.push("/select-bus-hire");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    });
  };

  const postSearchReturn = (e) => {
    e.preventDefault();
    setLoading(true);
    const newStartDate = new Date(returnStartDate);
    let date = JSON.stringify(newStartDate);
    date = date.slice(1, 11);
    const newEndDate = new Date(endDate);
    let dateEnd = JSON.stringify(newEndDate);
    dateEnd = dateEnd.slice(1, 11);

    const { lat, lng } = returnPickUpLat;
    const { lat: lat1, lng: lng2 } = returnArrivalLat;
    getDistance(lat, lng, lat1, lng2).then((response) => {
      const details = {
        OnewayPickupDate: date,
        OnewayDistanceApart: parseInt(response),
        OneWayDropoffLocation: returnArrival,
        HiredServiceType: "1",
        OnewayPickupLocation: returnDeparture,
        ReturnDistanceApart: parseInt(response),
        ReturnPickupLocation: returnArrival,
        ReturnPickupDate: dateEnd,
        ReturnDropoffLocation: returnDeparture,
        IsSleepOver: checkbox,
      };

      // console.log(details);
      localStorage.setItem("estimatedTravelDistance", response);
      localStorage.setItem("returnPickupDate", dateEnd);
      request(apiroutes.HireSearch(), "post", details, token)
        .then((res) => {
          setLoading(false);
          // console.log(res);
          localStorage.setItem(
            "allHireDetails",
            JSON.stringify(res.data.Object)
          );
          history.push("/select-bus-hire");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    });
  };

  return (
    <div>
      <input id="oneway-hire" type="radio" name="tabshire" defaultChecked />
      <label htmlFor="oneway-hire" className="oneway-hire">
        One Way
      </label>

      <input id="roundtrip-hire" type="radio" name="tabshire" />
      <label htmlFor="roundtrip-hire" className="roundtrip-hire">
        Round Trip
      </label>

      <section id="content3">
        <div className="row">
          <div className="col-md-12">
            <label className="label-auth">Hire From</label>
            <GooglePlacesAutocomplete
              apiKey={apiKey}
              selectProps={{
                onChange: (value) => handleDepartureSelect(value),
                styles: {
                  option: (provided, state) => ({
                    ...provided,
                    borderBottom: "1px dotted black",
                    color: state.isSelected ? "white" : "black",
                  }),
                  singleValue: (provided, state) => ({
                    ...provided,
                    color: state.isSelected ? "black" : "white",
                  }),
                },
              }}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ["ng"],
                },
              }}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <label className="label-auth">Hire Destination</label>
            <GooglePlacesAutocomplete
              apiKey={apiKey}
              selectProps={{
                onChange: (value) => handleArrivalSelect(value),
                styles: {
                  option: (provided, state) => ({
                    ...provided,
                    borderBottom: "1px dotted black",
                    color: state.isSelected ? "white" : "black",
                  }),
                },
              }}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ["ng"],
                },
              }}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <label className="label-auth">Departing on</label>
            <DatePicker
              placeholderText="Select Date"
              selected={startDate}
              minDate={new Date()}
              maxDate={addDays(new Date(), 14)}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={checkboxOne}
                onChange={(e) => setCheckBoxOne(e.target.checked)}
              />
              <label className="label-auth" htmlFor="exampleCheck1">
                Retain bus for the night?
              </label>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <Button
              text={loading ? <Loader dark={false} /> : "Proceed"}
              handleButtonClick={postSearch}
              type="button"
              disabled={!(startDate && departure && arrival)}
              btnstyle={{ background: "#E21D00", color: "white" }}
            />
          </div>
        </div>
      </section>

      <section id="content4">
        <div className="row">
          <div className="col-md-12">
            <label className="label-auth">Hire From</label>
            <GooglePlacesAutocomplete
              apiKey={apiKey}
              selectProps={{
                onChange: (value) => handleRoundDepartureSelect(value),
                styles: {
                  option: (provided, state) => ({
                    ...provided,
                    borderBottom: "1px dotted black",
                    color: state.isSelected ? "white" : "black",
                  }),
                },
              }}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ["ng"],
                },
              }}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <label className="label-auth">Hire Destination</label>
            <GooglePlacesAutocomplete
              apiKey={apiKey}
              selectProps={{
                onChange: (value) => handleRoundArrivalSelect(value),
                styles: {
                  option: (provided, state) => ({
                    ...provided,
                    borderBottom: "1px dotted black",
                    color: state.isSelected ? "white" : "black",
                  }),
                },
              }}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ["ng"],
                },
              }}
            />
          </div>
        </div>
        <br />
        <div className="row row-grid">
          <div className="col-md-6">
            <label className="label-auth">Departing on</label>
            <DatePicker
              placeholderText="Select Date"
              selected={returnStartDate}
              minDate={new Date()}
              maxDate={addDays(new Date(), 14)}
              onChange={(date) => setReturnStartDate(date)}
            />
          </div>
          <div className="col-md-6">
            <label className="label-auth">Return</label>
            <DatePicker
              placeholderText="Select Date"
              selected={endDate}
              minDate={new Date(returnStartDate)}
              onChange={(date) => setEndDate(date)}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={checkbox}
                onChange={(e) => setCheckBox(e.target.checked)}
              />
              <label className="label-auth" htmlFor="exampleCheck1">
                Retain bus for the night?
              </label>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <Button
              text={loading ? <Loader dark={false} /> : "Proceed"}
              handleButtonClick={postSearchReturn}
              type="button"
              disabled={
                !(
                  returnStartDate &&
                  endDate &&
                  returnDeparture &&
                  returnArrival
                )
              }
              btnstyle={{ background: "#E21D00", color: "white" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
export default HireBus;

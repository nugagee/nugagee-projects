import axios from "axios";
// import { removeState } from "../store/removeState";
// import history from "./history.js";

export const requestWallet = (
  url,
  type,
  data,
  token = null,
  noStringify = false
) => {
  const baseURL = "https://wallet.gigmobilitysystem.com";
  let API_URL = `${baseURL}${url}`;
  let bodyData;
  let service;
  bodyData = noStringify ? JSON.stringify(data) : data;
  let config;

  if (token) {
    config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/x-www-form-urlencoded",
      },
    };
  }

  if (type === "GET" && token) {
    config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }

  if (type.toLowerCase() === "get") {
    service = axios.get(API_URL, config);
    return service
      .then((response) => {
        return service;
      })
      .catch((err) => {
        if (err.request) {
          return service;
        }
        if (err.response) {
          return service;
        }
        return service;
      });
  } else if (type.toLowerCase() === "post") {
    service = axios.post(API_URL, bodyData, config);
    return service
      .then((response) => {
        return service;
      })
      .catch((error) => {
        // console.log(error)
        if (error) {
          return service;
        }
        return service;
      });
  } else if (type.toLowerCase() === "delete") {
    service = axios.delete(API_URL, config);
    return service
      .then(function (response) {
        return service;
      })
      .catch(function (error) {
        if (error) {
          return service;
        }
        return service;
      });
  } else {
    service = axios.put(API_URL, bodyData, config);
    return service
      .then(function (response) {
        return service;
      })
      .catch(function (error) {
        if (error) {
          return service;
        }
        return service;
      });
  }
};

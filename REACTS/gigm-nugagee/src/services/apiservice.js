import axios from "axios";
// import { removeState } from "../store/removeState";
// import history from "./history.js";

export const request = (url, type, data, token = null, noStringify = false) => {
  const baseURL = "https://client.gigmobilitysystem.com";
  let API_URL = `${baseURL}${url}`;
  let bodyData;
  let service;
  bodyData = noStringify ? JSON.stringify(data) : data;
  let config;

  if (token) {
    config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
      },
    };
  }

  if (type.toLowerCase() === "get") {
    service = axios.get(API_URL, config);
    return service
      .then((response) => {
        return service;
      })
      .catch((error) => {
        if (error.request) {
          return service;
        }
        if (error.response) {
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
        if (error.request) {
          return service;
        }
        if (error.response) {
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
        if (error.request) {
          return service;
        }
        if (error.response) {
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
        if (error.request) {
          return service;
        }
        if (error.response) {
          return service;
        }
        return service;
      });
  }
};

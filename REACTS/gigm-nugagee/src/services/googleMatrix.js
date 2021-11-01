import config from '../configs';

const makeAPICall = async (
    { fromLatLong, fromLatLongTwo, toLatLong, toLatLongTwo, method = "POST"},
    ...customConfigs
  ) => {
  
    const configs = {
      method,
      ...customConfigs,
    };
  
    return window.fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${fromLatLong},${fromLatLongTwo}&destinations=${toLatLong},${toLatLongTwo}&key=${config.GOOGLE_API}`, configs)
      .then((response) => response.json())
      .catch((err) => err);
  };
  
  export default makeAPICall;
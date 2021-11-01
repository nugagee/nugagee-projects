const makeAPICall = async (
    { method = "POST", payload = null },
    ...customConfigs
  ) => {
    const headers = {
      "Content-type": "application/json",
      "Authorization": "Bearer sk_test_ndlplueh3eq7txdmzx6dkr2k0s4xoac9efrxvd2y",
    };
  
    const configs = {
      method,
      headers,
      ...customConfigs,
    };
  
    if (payload) configs.body = JSON.stringify(payload);
  
    return window
      .fetch("https://api.paystack.co/transaction/initialize", configs)
      .then((response) => response.json())
      .catch((err) => err);
  };
  
  export default makeAPICall;
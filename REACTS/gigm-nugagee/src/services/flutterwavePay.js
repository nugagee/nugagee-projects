const makeAPICallFlutter = async (
    { method = "POST", payload = null },
    ...customConfigs
  ) => {
    const headers = {
      "Accept": "application/json",
      "Content-type": "application/json",
      "Authorization": "Bearer FLWPUBK-865c4665eee6ba09ed0df9ebae80878e-X",
    };
  
    const configs = {
      method,
      headers,
      ...customConfigs,
    };
  
    if (payload) configs.body = JSON.stringify(payload);
  
    return window
      .fetch("https://api.flutterwave.com/v3/payments", configs)
      .then((response) => response.json())
      .catch((err) => err);
  };
  
  export default makeAPICallFlutter;
const makeAPICallWoven = async (
    { method = "POST", payload = null },
    ...customConfigs
  ) => {
    const headers = {
      "Content-type": "application/json",
      "Authorization": "Bearer FLWPUBK-865c4665eee6ba09ed0df9ebae80878e-X",
      "api_secret": "vb_ts_d3c4ce6843714ac50f447d218bbf4bd9784430362ef2"
    };
  
    const configs = {
      method,
      headers,
      ...customConfigs,
    };
  
    if (payload) configs.body = JSON.stringify(payload);
  
    return window
      .fetch("https://api.woven.finance/v2/api/vnubans/create_customer", configs)
      .then((response) => response.json())
      .catch((err) => err);
  };
  
  export default makeAPICallWoven;
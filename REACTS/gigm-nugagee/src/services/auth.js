export const setAuth = (data) => {
  localStorage.setItem("authDetails", JSON.stringify(data));
};

export const getAuth = (type) => {
  let data = localStorage.getItem("authDetails");
  if (data == null) {
    return false;
  } else {
    data = JSON.parse(data);
    return type ? data.access_token : data;
  }
};

export const setAuthWallet = (data) => {
  localStorage.setItem("walletDetails", JSON.stringify(data));
};

export const getAuthWallet = (type) => {
  let data = localStorage.getItem("walletDetails");
  if (data == null) {
    return false;
  } else {
    data = JSON.parse(data);
    return type ? data.access_token : data;
  }
};

export const setUser = (data) => {
  localStorage.setItem("userDetails", JSON.stringify(data));
};

export const getUser = (type) => {
  let data = localStorage.getItem("userDetails");
  data = JSON.parse(data);
  return type ? data.email : data;
};

export const setUserWallet = (data) => {
  localStorage.setItem("walletUserDetails", JSON.stringify(data));
};

export const getUserWallet = (type) => {
  let data = localStorage.getItem("walletUserDetails");
  data = JSON.parse(data);
  return type ? data.email : data;
};

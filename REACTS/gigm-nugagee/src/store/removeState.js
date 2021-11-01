export const removeState = () => {
  localStorage.removeItem("userDetails");
  window.location.reload();
};

export const removeStateWallet = () => {
  localStorage.removeItem("walletDetails");
  localStorage.removeItem("walletUserDetails");
  window.location.reload();
};



// eslint-disable-next-line
export default {
  GetToken() {
    return `/login`;
  },
  Login() {
    return `/api/customers/GetPassengerProfile`;
  },
  Register() {
    return `/api/customers/CreatePassenger`;
  },
  DepartureTerminals() {
    return `/api/terminals/terminalbycountrycode/NG`
  },
  ArrivalTerminals(departureTerminalId) {
    return `/api/routes/terminals/destinations/${departureTerminalId}`
  },
  BookingSearch() {
    return `/api/bookings/search`
  },
  PostSearch() {
    return `/api/bookings/postsearch`
  },
  HireSearch() {
    return `/api/hiredServiceBookings/hireservicebookingsearch`
  },
  HireServiceSearch() {
    return `/api/hiredServiceBookings/hireservicebookingsearchpost`
  },
  ConfirmPayStackPayment() {
    return `/api/bookings/ProcessPaystackPayment`
  },
  ConfirmFlutterPayment() {
    return `/api/bookings/ProcessFlutterWavePayment`
  },
  ConfirmHirePayStackPayment(refCode) {
    return `/api/hiredServiceBookings/processHireServicePaystackPayment/${refCode}`
  },
  ForgotPassword() {
    return `/api/customers/ForgotPasswordVerificationCode`
  },
  ResetPassword() {
    return `/api/customers/ForgotPassword`
  },
  verifyPhoneNumber() {
    return `/api/customers/VerifyCode`
  },
  UpdatePhoto(phoneNumber) {
    return `/api/customers/UpdatePassengerPhoto?phoneNumber=${phoneNumber}`
  },
  UpdatePassegerProfile() {
    return `/api/customers/UpdatePassenger`
  },
  DeletePhoto(customerId) {
    return `/api/customers/removeCustomerPhoto/${customerId}`
  },
  GetWalletToken() {
    return `/connect/token`
  },
  CreateWallet() {
    return `/api/WalletApi/CreateWallet`
  },
  GetWallet(phone, email) {
    return `/api/WalletApi/GetUserWallet?phone=${phone}&email=${email}`
  },
  GenerateOtp() {
    return `/api/v2/WalletApi/GenerateOtp`
  },
  CreatePin() {
    return `/api/v2/WalletApi/CreatePin`
  },
  CreatePayment() {
    return `/api/PaymentApi/CreatePayment`
  },
  VerifyPayStackRef(paystackreference) {
    return `/api/PaymentApi/VerifyPaystackRef/${paystackreference}`
  },
  DebitWallet () {
    return `/api/v2/WalletApi/DebitWallet`
  },
  BookingHistory(phoneNumber) {
    return `/api/bookings/history/${phoneNumber}`
  },
  ChangePassword(){
    return `/api/customers/ChangePassword`
  },

  ChangeWalletpin() {
    return `/api/v2/WalletApi/ChangePin`
  },
  ResetWalletpin() {
    return `/api/v2/WalletApi/ResetPin`
  },
  CustomerFeedback() {
    return `/api/CustomerFeedbacks`
  }
};
import React from "react";
import {Router, Switch, Route } from "react-router-dom";
import EntryComponent from "../views/EntryPage/index";
import LoginComponent from "../views/LoginPage/index";
import LoginTwoComponent from "../views/LoginPage/login";
import LoginThreeComponent from "../views/LoginPage/loginHire";
import RegisterComponent from "../views/RegisterPage/index";
import HomeComponent from "../views/HomePage/index";
import PasswordComponent from "../views/ForgotPasswordPage/index";
import history from "../services/history";
import NotFound from "../views/NotFoundPage/index";
import BusSelectComponent from "../views/SelectBookingBus/index";
import HireBusComponent from "../views/HireBus/index"
import DetailsComponent from "../views/PassengerDetails/index"
import CallBackComponent from "../views/CallBackPage/index"
import About from "../views/About/about"
import Contact from "../views/ContactUs/contact"
import Faq from "../../src/views/FAQ/Faq"
import Busterminal from "../../src/views/Busterminal/busterminal"
import HireCallBackComponent from "../views/CallBackPage/hireCallBack"
import WovenCallBackComponent from "../views/CallBackPage/wovenCallBack"
import WovenFundWalletComponent from "../views/CallBackPage/fundWalletWoven"
import PaymentComponent from "../views/CallBackPage/wovenTripPayment"
import FlutterCallBackComponent from "../views/CallBackPage/flutterCallBack"
import HireDetailsComponent from "../views/PassengerDetails/hireDetails"
import BusHire from "../views/BusHire/bushire";
import UserComponent from "../views/UserProfile/Profile/profile";
import SettingComponent from "../views/UserProfile/Setting/setting";
import HelpComponent from "../views/UserProfile/Help&Support/help";
import ReferralComponent from "../views/UserProfile/Referral/referral";
import RescheduleComponent from "../views/UserProfile/Reschedule/reschedule";
import Enterprise from "../views/EnterprisePartner/enterprise";
import Privacy from "../views/privacy/privacy";
import Travels from "../views/Travel&tours";
import Safety from "../views/Safety/safety";
import PayBills from "../views/paybills";
import Terms from "../views/Terms/terms";
import Luggage from "../views/Luggages Allowance/index";
import Pickup from "../views/PickupLocation/pickup";
import BookingHistory from "../views/UserProfile/Booking history";

const AllPages = () => (
  <Router history={history}>
    <Switch>
      <Route path="/entry" component={EntryComponent} />
      <Route path="/login" component={LoginComponent} />
      <Route path="/signin" component={LoginTwoComponent} />
      <Route path="/signnow" component={LoginThreeComponent} />
      <Route path="/register" component={RegisterComponent} />
      <Route exact path="/" component={HomeComponent} />
      <Route path="/select-bus" component={BusSelectComponent} />
      <Route path="/passenger-details" component={DetailsComponent} />
      <Route path="/hire-passenger-details" component={HireDetailsComponent } />
      <Route path="/call-back" component={CallBackComponent} />
      <Route path="/call-back-hire" component={HireCallBackComponent} />
      <Route path="/flutter-pay" component={FlutterCallBackComponent} />
      <Route path="/woven-pay" component={WovenCallBackComponent} />
      <Route path="/wallet-woven-pay" component={WovenFundWalletComponent} />
      <Route path="/confirmed-wallet-payment" component={PaymentComponent} />
      <Route path="/select-bus-hire" component={HireBusComponent} />
      <Route path="/forgot-password" component={PasswordComponent} />
      <Route path="/profile" component={UserComponent} />
      <Route path="/setting" component={SettingComponent} />
      <Route path="/support" component={HelpComponent} />
      <Route path="/referral" component={ReferralComponent} />
      <Route path="/reschedule" component={RescheduleComponent} />
      <Route path="/enterprise" component={Enterprise} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={Faq} />
      <Route path="/busterminal" component={Busterminal}/>
      <Route path="/bushire" component={BusHire}/>
      <Route path="/privacy" component={Privacy}/>
      <Route path="/travels" component={Travels}/>
      <Route path="/safety" component={Safety}/>
      <Route path="/paybills" component={PayBills}/>
      <Route path="/terms" component={Terms}/>
      <Route path="/luggage" component={Luggage}/>
      <Route path="/pickup" component={Pickup}/>
      <Route patg="/bookinghistory" component={BookingHistory}/>
      <Route path="*"><NotFound /></Route>
    </Switch>
  </Router>
);

export default AllPages;

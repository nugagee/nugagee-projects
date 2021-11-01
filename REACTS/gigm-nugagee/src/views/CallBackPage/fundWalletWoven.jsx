import React from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Button from "../../../src/components/Button/index";
import { useHistory } from "react-router";

export const WovenFundWalletComponent = () => {
  const history = useHistory();
  let paymentDetails = localStorage.getItem("wovenWalletAccountDetails");
  paymentDetails = JSON.parse(paymentDetails);
  const nf = new Intl.NumberFormat();

  return (
    <div>
      <Navbar />
      <section className="suc-err-page">
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <div className="ticket-card">
                <h1 className="route-card-h1">
                  Dear {paymentDetails.account_name},
                </h1>

                <hr />
                <p>Kindly make payment to the accout details below:</p>
                <p>Bank: Sparkle Bank</p>
                <p>
                  Account name: <strong>{paymentDetails.account_name}</strong>
                </p>
                <p>
                  Account number: <strong>{paymentDetails.vnuban}</strong>
                </p>
                <p>
                  Amount to pay: ₦{" "}
                  <strong>{nf.format(paymentDetails.max_amount)}</strong>
                </p>

                <br />
                <p>
                  Please understand that you have 30 minutes to make the
                  transfer!
                </p>
              </div>
              <div className="text-center">
                <Button
                  handleButtonClick={() => {
                    history.push("/profile");
                  }}
                  text="Go to Wallet"
                  type="button"
                  btnstyle={{ backgroundColor: "#E21D00", margin: "20px 0px", width:"50%" }}
                />
              </div>
              {/* <h3>Reference Code: {reference}</h3> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default WovenFundWalletComponent;

import React from 'react'
import Navbar from '../../components/NavBar'
import Footer from '../../components/Footer'
import "./index.css"
import paybills from "../../assets/img/paybills.png"
import Appinstall from '../../components/Appinstall'

const PayBills = () => {
    return (
        <div>
            <Navbar/>

            <section className="paybills">
        <div className="container">
          <div className="row row-grid">
            <div className="col-md-6 align-self-center">
            <div>
                    <h1>The easiest way to manage your wallet system</h1><br/>
                    <p>Wallet users can now fund their wallet via Paystack and Woven (Bank Transfer) and this funded account is visible on the Customers Dashboard where they can view their Wallet Balance in Naira. This feature will enable customers to book seamlessly on the Mobile App and Booking via Wallet comes with a <span style={{fontWeight: "600"}}>5% cashback.</span>
</p><br/>
<p><span style={{fontWeight: "bold"}}>Wallet 2FA:</span> The Product Security and Safety for the GIGM Mobile App is apt and we have ensured that every single wallet transaction comes with a Transaction PIN to authorize transactions. These PINs can be changed anytime.
</p>
                </div>
            </div>
            <div className="col-md-6 pl-5">
              <div className="paybills-imgholder">
                  <div className=" col-md-11 col-sm-12">
                  <img src={paybills} alt="paybills" className="img-fluid" />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            <Appinstall/>
            <Footer/>
        </div>
    )
}

export default PayBills

import React from 'react'
import Navbar from '../../components/NavBar'
import Footer from '../../components/Footer'
import "./privacy.css"

const Privacy = () => {
    return (
        <div>
            <Navbar/>
            <section className="privacy">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="mb-2">Privacy &amp; Policy</h1>
              <p>
              Personal Information at GIGM.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="privacy-text">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-justify">
              <p className="cardholder-privacy">
              Cardholder privacy is important to GIG Mobility (GIGM). To better protect the privacy of cardholder data, GIGM provides this privacy statement explaining the security 
              and handling practices of cardholder data in the processing of payment card transactions.
              </p><br/>
              <p>
              This privacy statement applies to all cardholder data collected by or submitted to GIGM’s website. Our website will only collect personally identifiable information and cardholder data voluntarily provided by cardholders and customers, and will only use that information for the specific purposes for which it was provided. GIGM will keep this information strictly confidential, and will not disclose, sell, or lease the information to third parties unless required by law, or with the written permission of the cardholder.
              </p><br/>
              <p>
              As with most websites used for payment card transaction services, our web servers collect web session data used to analyze site trends and gather broad demographic data. GIGM reserves the right to collect certain technical information of customers such as operating system, IP address, web browser software, and URL data through the use of cookies or other technology not linked to personally identifiable information or cardholder data.
              </p><br/>
              <p>
              GIGM-maintained websites may have links to other third-party sites used for payment card transactions. These third-party sites may collect cardholder data and personally identifiable information through the use of forms or cookies, or from the customer's web browser. Cardholders and customers are strongly encouraged to review the privacy policies of all third-party websites outside the control of GIGM for their procedures for collecting, utilizing, and disclosing cardholder data.
              </p><br/>
              <p>
              We have made significant investment in security measures employed to protect cardholder data under our control. Access to acquired cardholder data and personally identifiable information is limited to only those personnel for whom there is an established business need to access that data.
              </p><br/>
              <p>
              For questions, comments, or concerns regarding this privacy statement, or GIGM’s procedures for securely processing, storing, or transmitting cardholder data, please contact us via email at <span style={{color:"#56CCF2"}}> contact@gigm.com.</span> GIGM reserves the right to amend this privacy statement as and when required.
              </p><br/>
            </div>
          </div>
        </div>
      </section>
            <Footer/>
            
        </div>
    )
}

export default Privacy

import React from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { termsData } from "./termdata";
import Accordion from "../../components/Accordion/accordion";
import "./terms.css";

const Terms = () => {
  
  return (
    <div>
      <Navbar />
      <section className="terms">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="mb-2">Terms and Conditions</h1>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="accordion">
                  {termsData.map(({ id, title, content }) => (
                    <Accordion title={title} id={id} content={content}/>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="terms-enquries mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p className="mb-2">For queries and enquiries on issues not addressed above, kindly reach our care team via the WhatsApp Bot or send an email to contact@gigm.com.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Terms;
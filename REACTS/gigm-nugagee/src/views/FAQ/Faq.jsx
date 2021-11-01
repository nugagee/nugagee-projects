import React from "react";
import Navbar from "../../components/NavBar/index";
import Footer from "../../components/Footer/index";
import "./faq.css"
import Accordion from "../../components/Accordion/accordion";
import {bookingData} from "./answer"
import {ticketData} from "./answer"
import {paymentData} from "./answer"
import {busesData} from "./answer"
import Appinstall from "../../components/Appinstall/index"
import PleaseNote from "../../components/pleasenote/note";

const Faq = () => {
  return (
    <div>
      <Navbar />
      <section className="faq">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="mb-2">Frequently Asked Questions</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-answer">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="booking">
                <h1>Booking</h1>
              </div>
            </div>
            <div className="col-md-10">
            <div>
      <div className="accordion">
        {bookingData.map(({ id, title, content }) => (
          <Accordion title={title} id={id} content={content}/>
        ))}
      </div>
    </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-2">
              <div className="booking">
                <h1>Tickets</h1>
              </div>
            </div>
            <div className="col-md-10">
            <div>
      <div className="accordion">
        {ticketData.map(({id, title, content }) => (
          <Accordion title={title} id={id} content={content} />
        ))}
      </div>
    </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-2">
              <div className="booking">
                <h1>Payments</h1>
              </div>
            </div>
            <div className="col-md-10">
            <div>
      <div className="accordion">
        {paymentData.map(({ title, content }) => (
          <Accordion title={title} content={content} />
        ))}
      </div>
    </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-2">
              <div className="booking">
                <h1>Buses</h1>
              </div>
            </div>
            <div className="col-md-10">
            <div>
      <div className="accordion">
        {busesData.map(({ title, content }) => (
          <Accordion title={title} content={content} />
        ))}
      </div>
    </div>
            </div>
          </div>
        </div>
      </section>
      <PleaseNote/>
      <Appinstall/>
       <Footer />
    </div>
  );
};

export default Faq;

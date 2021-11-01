import React from 'react';
import "./index.css";
import appleplay from "../../assets/img/apple-play.png"
import googleplay from "../../assets/img/google-play.png"
import mockup from "../../assets/img/mockup.png"
import mockup2 from "../../assets/img/mockup2.png"

const Appinstall = () => {
    return(
        <div>
             <section className="appinstall p-5">
        <div className="container">
          <div className="row row-grid">
            <div className="col-md-6 align-self-center">
              <div>
                  <h2>The world in your pocket</h2><br/>
                  <p>Use the GIGM app to organize your entire trip and find 
                   mobile-exclusive deals on the go.</p><br/>
                   <div className="row">
                           <div className="col-md-4">
                           <img src={appleplay} alt="appleplay store" className="img-fluid" />
                           </div>
                           <div className="col-md-4"><img src={googleplay} alt="googleplay store" className="img-fluid" /></div>
                   </div>
              </div>
            </div>
            <div className="col-md-6 pl-5">
              <div className="row">
                  <div className=" col-md-6 col-sm-12">
                  <img src={mockup2} alt="movile view" className="img-fluid" />
                  </div>
                  <div className="col-md-6 col-sm-12 mt-5">
                  <img src={mockup} alt="movile data" className="img-fluid" />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    )
}

export default Appinstall
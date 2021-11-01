import React from 'react'
import Navbar from '../../components/NavBar'
import Footer from '../../components/Footer'
import "./index.css"
import traveldriver from "../../assets/img/travel-tour-driver.png"
import travelvehicle from "../../assets/img/travel-tour-vehicle.png"

const Travels = () => {
    return (
        <div>
            <Navbar/>
            <section className="container travel-banner">
            <h1 className="mb-5">Travel and Tours</h1>
        <div className="travel">
        </div>
      </section>
      <section className="travel-content">
          <div className="container">
        <div className="row row-grid">
            <div className="col-md-6 col-sm-12">
                <div>
                    <h1>Tour</h1>
                    <p>With one of the most extensive network of routes, GIGM prides itself as a major national carrier, and the most visible transporter on the lower half of the nation's map.
</p><br/>
<p>Our state-of-the-art terminals have helped to redefine, amongst others, the landscapes in Benin, Asaba, Owerri and Lagos.
</p><br/>
<p>These platforms represent our robust commitment to building enduring legacies that would generate the most conducive ambience for our people and customers.</p>
                </div>
            </div>
            <div className="col-md-6 col-sm-12">
                <div>
                    <img src={traveldriver} alt="" className="img-fluid" />
                </div>
            </div>
        </div>
        </div>
      </section>
      
      <section className="travel-content">
          <div className="container">
        <div className="row row-grid">
            <div className="col-md-6 col-sm-12">
                <div>
                    <img src={travelvehicle} alt="" className="img-fluid" style={{borderRadius:"10px"}} />
                </div>
            </div>
            <div className="col-md-6 col-sm-12">
                <div>
                    <h1>Travel</h1>
                    <p>Our tour services, which come highly customised, have the most luxury feel in the industry
</p><br/>
<p>A fleet of top-of-the-range buses with on-board entertainment packages are dedicated to this service
</p><br/>
<p>In partnership with some world class travel agencies, we offer organised tours to individuals,</p>
                </div>
            </div>
        </div>
        </div>
      </section>
            <Footer/>
        </div>
    )
}

export default Travels

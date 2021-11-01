import React from 'react'
import Navbar from '../../components/NavBar'
import Footer from '../../components/Footer'
import safety from "../../assets/img/safety.png"

const Safety = () => {
    return (
        <div>
            <Navbar/>
      <section className="travel-content">
          <div className="container">
              <div className="row">
             <div className="col-md-12 pt-5 pb-2">
             <h1>Safety</h1>
             </div>
              </div>
        <div className="row row-grid">
            <div className="col-md-6 col-sm-12">
                <div>
                    <p>Think Safety, think GIGM.com. Three blocks make up the DNA of our organization: SERVICE, INNOVATION &amp; SAFETY
</p><br/>
<p>We run with a safety culture that is up to par with global best practice. We understand the importance of safety in transportation from one destination to the other.
</p><br/>
<p>From the training and retraining of our captains, the hiring and equipping of excellent service engineers, deploying of routine highway patrol teams, to the use of modern technology by deploying speed trackers and the creation of an intelligence control department, we are setting the pace in the industry of achieving our goal of 100% safety.</p><br/>
<p> Partner with us today in this “TOTAL SAFETY” mission by calling our customer care lines if you find anomalies in our safety procedure. </p><br/>
<p> We take pride in getting you safely to your loved ones. </p>
                </div>
            </div>
            <div className="col-md-6 col-sm-12">
                <div>
                    <img src={safety} alt="" className="img-fluid" />
                </div>
            </div>
        </div>
        </div>
      </section>
      
            <Footer/>
        </div>
    )
}

export default Safety

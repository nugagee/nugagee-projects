import React from "react"
import Button from "../../../components/Button/index"
import Select from "../../../components/Dropdown/index";

const Submitform =({prev})=>{
    const stateOptions = ["Enugu", "Lagos"];
    const optionState = stateOptions.map((x) => ({ label: x, value: x }));
    return(
        <div>
            
           <section>
               <div className="contactform">
                   <div className="contactformholder">
                       <div className="partnerform">
                           <h3 class="backicon" onClick={prev}><i class="fa fa-arrow-left"></i>&nbsp; &nbsp;Back</h3>
                       <h1>Vehicle Details</h1>
                       <p>Kindly provide the details below</p>

                       <div>
                    <label htmlFor="state">Select Maker</label>
                    <Select
                      options={optionState}
                      handleChange={() => {}}
                      defaultValue="Select state"
                    />
                    <label htmlFor="state">Select Model</label>
                    <Select
                      options={optionState}
                      handleChange={() => {}}
                      defaultValue="jet"
                    />
                     <label htmlFor="state">Select Colour</label>
                    <Select
                      options={optionState}
                      handleChange={() => {}}
                      defaultValue="jet"
                    />
                    <label htmlFor="state">Select Year</label>
                    <Select
                      options={optionState}
                      handleChange={() => {}}
                      defaultValue="jet"
                    />
                     <Button
                     text="Submit"
                     btnstyle={{backgroundColor:"#E21D00", margin:"20px 0px"}} />
                  </div>
                  </div>
                   </div>
               </div>
           </section>
        </div>
    )
}

export default Submitform
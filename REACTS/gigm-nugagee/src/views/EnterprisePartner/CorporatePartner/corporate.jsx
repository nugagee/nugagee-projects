import React from "react"
import InputField from "../../../components/InputField/index"
import Button from "../../../components/Button/index"
import Select from "../../../components/Dropdown/index";

const CorporatePartner =({corporatenext})=>{
    const stateOptions = ["Enugu", "Lagos"];
    const optionState = stateOptions.map((x) => ({ label: x, value: x }));
    return(
        <div>
         <section>
               <div className="contactform">
                   <div className="contactformholder">
                       <div className="partnerform">
                           {/* <h3 class="backicon"><i class="fa fa-arrow-left"></i>&nbsp; &nbsp;Back</h3> */}
                       <h1>Contact Details</h1>
                       <p>Kindly provide the details below</p>

                       <div>
                    <label htmlFor="businessname">Business Name</label>
                    <InputField
                      type="text"
                      placeholder="Enter first name"
                      onChangeMethod={() => {}}
                    />
                    <label htmlFor="Businessaddress">Business Address</label>
                    <InputField
                      type="text"
                      placeholder="Enter address"
                      onChangeMethod={() => {}}
                    />
                    <label htmlFor="phonenumber">Company Rc Number</label>
                    <InputField
                      type="number"
                      placeholder="234566789909"
                      onChangeMethod={() => {}}
                    />
                    <label htmlFor="state">Select State</label>
                    <Select
                      options={optionState}
                      handleChange={() => {}}
                      defaultValue="Select state"
                    />
                    <label htmlFor="state">Select Preferred Inspect Location</label>
                    <Select
                      options={optionState}
                      handleChange={() => {}}
                      defaultValue="Select state"
                    />
                    
                     <Button
                      handleButtonClick={corporatenext}
                      text="Next"
                      type="button"
                     btnstyle={{backgroundColor:"#E21D00", margin:"20px 0px"}} />
                  </div>
                  </div>
                   </div>
               </div>
           </section>
        </div>
    )
}

export default CorporatePartner
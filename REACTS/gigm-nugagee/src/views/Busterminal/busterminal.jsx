import React, { useState } from "react";
import Navbar from "../../components/NavBar/index";
import Footer from "../../components/Footer/index";
import "./busterminal.css";
import InputField from "../../components/InputField/index";
import { terminalData } from "./terminals.js";
import Appinstall from "../../components/Appinstall/index";

const Busterminal = () => {
  const [terminal, setTerminal] = useState(terminalData);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    let newValue = e.target.value;
    const newTerminal = terminal;
    if (!newValue) {
      setTerminal(terminalData);
    } else {
      let obj = newTerminal.filter((o) =>
        o.state.toLowerCase().includes(newValue.toLowerCase().trim())
      );
      setTerminal(obj);
    }
    setValue(newValue);
  };
  return (
    <div>
      <Navbar />
      <section className="busterminal">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div>
                <h1>Bus Terminals</h1>
                <div className="terminal-input">
                  <InputField
                    type="text"
                    value={value}
                    placeholder="Where is your destination?"
                    onChangeMethod={handleChange}
                  />
                </div>
                
                {/* button row */}
                {/* <div className="pl-3 row mt-3 terminal-btn">
                  <div className="mr-2 mt-2">
                    <Button
                      text="Most Popular"
                      handleButtonClick={() => {}}
                      type="button"
                      btnstyle={{
                        backgroundColor: "rgba(243, 246, 250, 0.8)",
                        color: "rgba(51, 51, 51, 0.7)",
                        border: "solid 1px rgba(86, 204, 242,0.5)",
                        padding: "0px 25px",
                      }}
                    />
                  </div>
                  <div className="mr-2 mt-2">
                    <Button
                      text="North"
                      handleButtonClick={() => {}}
                      type="button"
                      btnstyle={{
                        backgroundColor: "rgba(243, 246, 250, 0.8)",
                        color: "rgba(51, 51, 51, 0.7)",
                        border: "solid 1px rgba(86, 204, 242,0.5)",
                        padding: "0px 28px",
                      }}
                    />
                  </div>
                  <div className="mr-2 mt-2">
                    <Button
                      text="Lagos"
                      handleButtonClick={() => {}}
                      type="button"
                      btnstyle={{
                        backgroundColor: "rgba(243, 246, 250, 0.8)",
                        color: "rgba(51, 51, 51, 0.7)",
                        border: "solid 1px rgba(86, 204, 242,0.5)",
                        padding: "0px 28px",
                      }}
                    />
                  </div>
                  <div className="mr-2 mt-2">
                    <Button
                      text="South"
                      handleButtonClick={() => {}}
                      type="button"
                      btnstyle={{
                        backgroundColor: "rgba(243, 246, 250, 0.8)",
                        color: "rgba(51, 51, 51, 0.7)",
                        border: "solid 1px rgba(86, 204, 242,0.5)",
                        padding: "0px 28px",
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <Button
                      text="Edo"
                      handleButtonClick={() => {}}
                      type="button"
                      btnstyle={{
                        backgroundColor: "rgba(243, 246, 250, 0.8)",
                        color: "rgba(51, 51, 51, 0.7)",
                        border: "solid 1px rgba(86, 204, 242,0.5)",
                        padding: "0px 28px",
                      }}
                    />
                  </div>
                </div> */}
                {/* button row ends */}

                <div className="terminal-img-holder">
                  {terminal.map((terminals) => (
                    <div className="row row-grid mb-4" key={terminals.id}>
                      <div className="col-md-7 col-sm-12">
                        <div>
                          <img
                            src={terminals.logo}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-md-5 col-sm-12">
                        <h4>{terminals.terminal}</h4>
                        <p>{terminals.address}</p>
                        <br />
                        <h6>{"0" + Number(terminals.phoneNumber)}</h6>
                        <h6>{terminals.email}</h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </section>
      <Appinstall />
      <Footer />
    </div>
  );
};

export default Busterminal;

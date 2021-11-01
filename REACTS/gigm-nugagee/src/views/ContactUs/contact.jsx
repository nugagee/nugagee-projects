import React, { useState } from "react";
import Navbar from "../../components/NavBar/index";
import Footer from "../../components/Footer/index";
import "./contact.css";
import InputField from "../../components/InputField/index";
import Button from "../../components/Button/index";
import Select from "../../components/Dropdown/index";
import { getAuth } from "../../services/auth";
import apiroutes from "../../services/apiroutes";
import { request } from "../../services/apiservice";
import Expire from "../../components/Expire";
import Alert from "../../components/Alert/index";
import Loader from "../../components/Loader";
import { set } from "date-fns";

const Contact = () => {
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [feedback, setFeedback] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    message: "",
  });

  function handleChange(event) {
    setFeedback({
      ...feedback,
      [event.target.name]: event.target.value,
    });
  }

  const token = getAuth("access_token");

  const customerFeedback = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponseMsg("Processing");
    const data = {
      CustomerName: feedback.name,
      CustomerPhoneNumber: feedback.phoneNumber,
      CustomerEmail: feedback.email,
      Category: category,
      Body: feedback.message,
      Subject: "Feedback from Website",
    };
    request(apiroutes.CustomerFeedback(), "post", data, token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setError("");
        setResponseMsg("We have Received your Feedback....Thank you");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.response);
        setResponseMsg("");
      });
  };

  const genderOptions = [
    { id: 0, name: "Enquiry" },
    { id: 1, name: "Query" },
    { id: 2, name: "Emergency" },
    { id: 3, name: "Feedback" },
  ];
  const optionsGender = genderOptions.map((x) => ({
    label: x.name,
    value: x.id,
  }));

  const enabled = !(
    feedback.name &&
    feedback.phoneNumber &&
    feedback.email &&
    feedback.message &&
    category
  );
  return (
    <div>
      <Navbar />
      <section className="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="mb-2">Contact Us</h1>
              <p>
                We are always available to assist you. Our Omni-Channel contact
                centre agents are available 24/7 to support you.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="customercenter">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-6">
              {error && (
                <Expire delay={3000}>
                  <Alert
                    className="alert text-center alert-danger"
                    text={error}
                  />
                </Expire>
              )}
              {responseMsg && !error && (
                <Expire delay={3000}>
                  <Alert
                    className="alert text-center alert-primary"
                    text={responseMsg}
                  />
                </Expire>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-sm-12 offset-md-2">
              <div className="row row-grid">
                <div className="col-md-8 col-sm-12">
                  <div className="customercare">
                    <p>
                      You can call in with us on 08139851110, or reach us on our
                      social media platforms; twitter and facebook, as well.
                    </p>
                    <p className="customercare-emailus mt-3">
                      You can also send us an email on{" "}
                      <span className="gigm-red">contact@gigm.com.</span>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12">
                  <div className="customerform">
                    <h1>Customer Feedback</h1>
                    <div>
                      <label htmlFor="category">Category</label>
                      <Select
                        options={optionsGender}
                        value={category}
                        handleChange={(e) => setCategory(e.value)}
                        placeholder="Select Category"
                      />
                      <label htmlFor="name">Full Name</label>
                      <InputField
                        type="text"
                        name="name"
                        value={feedback.name}
                        placeholder="Full Name"
                        onChangeMethod={handleChange}
                      />
                      <label htmlFor="phonenumber">Phone Number</label>
                      <InputField
                        type="number"
                        name="phoneNumber"
                        value={feedback.phoneNumber}
                        placeholder="phoneNumber"
                        onChangeMethod={handleChange}
                      />
                      <label htmlFor="email">Email Address</label>
                      <InputField
                        type="email"
                        name="email"
                        value={feedback.email}
                        placeholder="email"
                        onChangeMethod={handleChange}
                      />
                      <p>Message</p>
                      <textarea
                        rows="10"
                        value={feedback.message}
                        name="message"
                        onChange={handleChange}
                      ></textarea>
                      <Button
                        handleButtonClick={customerFeedback}
                        text={loading ? <Loader dark={false} /> : "Send"}
                        type="button"
                        disabled={enabled}
                        btnstyle={{
                          backgroundColor: "#E21D00",
                          margin: "20px 0px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;

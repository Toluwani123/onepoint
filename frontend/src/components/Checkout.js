import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams, withRouter, useNavigate } from "react-router-dom";

const Checkout = ({ prop1 }) => {
  const navigate = useNavigate();
  const { val } = useParams("");
  const [calc, setcalc] = useState(100);
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setaddress1] = useState("");
  const [address2, setaddress2] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [postcode, setpostcode] = useState("");

  useEffect(() => {
    fetch("/api/cart-retrieve/" + val)
      .then((response) => response.json())
      .then((data) => {
        setcalc(data.final_sum_cart);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Perfect");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        street1: address1,
        street2: address2,
        state: state,
        country: country,
        city: city,
        email: email,
        postcode: postcode,
      }),
    };
    fetch("/api/send_email", requestOptions)
      .then((response) => console.log(response.json()))
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="bod">
      <div className="progress-checkout-container">
        <div className="progress-step-container">
          <div className="step-check"></div>
          <span className="step-title">Shipping</span>
        </div>
      </div>

      <div className="form-container">
        <div>
          <h2>Total Price: ${calc}</h2>
        </div>
        <form action="POST" className="checkout-form" onSubmit={handleSubmit}>
          <div className="input-line">
            <label for="name">First Name</label>
            <input
              type="text"
              id="Street1"
              value={firstname}
              name="firstname"
              placeholder="e.g John"
              onChange={(e) => setfirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-line">
            <label for="name">Last Name</label>
            <input
              type="text"
              id="Street1"
              name="lastname"
              value={lastname}
              onChange={(e) => setlastName(e.target.value)}
              placeholder="e.g Doe"
              required
            />
          </div>
          <div className="input-line">
            <label for="name">Address Line 1</label>
            <input
              type="text"
              id="Street1"
              name="street1"
              value={address1}
              onChange={(e) => setaddress1(e.target.value)}
              placeholder="e.g 901 Flint Avenue"
              required
            />
          </div>
          <div className="input-line">
            <label for="name">Address Line 2</label>
            <input
              type="text"
              id="Street2"
              name="street2"
              value={address2}
              onChange={(e) => setaddress2(e.target.value)}
              placeholder="Building/Apartment/SuiteNumber etc"
              required
            />
          </div>
          <div className="input-line">
            <label for="name">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={state}
              onChange={(e) => setstate(e.target.value)}
              placeholder="e.g: Texas"
              required
            />
          </div>
          <div className="input-container">
            <div className="input-line">
              <label for="name">Country</label>
              <input
                type="text"
                id="Country"
                name="country"
                value={country}
                onChange={(e) => setcountry(e.target.value)}
                placeholder="e.g USA"
                required
              />
            </div>
            <div className="input-line">
              <label for="name">City</label>
              <input
                type="text"
                id="City"
                name="city"
                value={city}
                onChange={(e) => setcity(e.target.value)}
                placeholder="e.g Lubbock"
                required
              />
            </div>
          </div>
          <div className="input-container">
            <div className="input-line">
              <label for="name">Post Code</label>
              <input
                type="text"
                id="PostCode"
                name="postcode"
                value={postcode}
                onChange={(e) => setpostcode(e.target.value)}
                placeholder="79406"
                required
              />
            </div>
            <div className="input-line">
              <label for="name">Email Address</label>
              <input
                type="text"
                id="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john_doe@gmail.com"
                required
              />
            </div>
          </div>
          <button type="submit" className="main-btn">
            Submit
          </button>
          <PayPalScriptProvider
            options={{ "client-id": process.env.REACT_APP_CLIENT_ID }}
          >
            <PayPalButtons
              className="Paypal"
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: calc,
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                const name = details.payer.name.given_name;
                alert(
                  "Thank you for completing your trasaction " +
                    name +
                    "Feel free to clear everything in your cart, unless you would like to purchase the item/s again. Ensure to have pressed sumbit under the address section. If you have any challenges kindly send an email to rager.chisom@gmail.com. When your payment has been confirmed you will receive a confirmation email from us. Thank You For Shopping with EndToEnd"
                );
                navigate("/cart/" + val);
              }}
            />
          </PayPalScriptProvider>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

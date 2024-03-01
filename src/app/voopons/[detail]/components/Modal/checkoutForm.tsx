import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
  ExpressCheckoutElement,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import { useEffect, useState } from "react";
const customCardStyle = {
  base: {
    borderRadius: "55px",
    border: "1px solid #E60023",
    marginBottom: "20px",
    padding: "13px 20px 15px 65px",
    fontWeight: 500,
    // fontSize: "16px",
    // color: "#32325d",
    // fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    // fontSmoothing: "antialiased",
    // "::placeholder": {
    //   color: "#aab7c4",
    // },
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
};
const CheckoutForm = ({ setOpen }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    elements.submit();
    let cardElement = await elements.getElement(CardElement);

    console.log("cardElement", cardElement);
    const result = await stripe.createToken(cardElement!);

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (result?.error) {
      console.log("ress", result?.error);
    } else {
      console.log("id", result.token);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", paddingRight: "0px" }}
    >
      <div className="modal-dialog card-width">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title modal-title-center add-card-hd" id="">
              Add Card
            </h5>
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="close collab-btn"
            >
              <span aria-hidden="true">
                <Image width={28} height={28} src="/images/cross.svg" alt="" />
              </span>
            </button>
          </div>
          <div className="modal-body">
            <div className="add-to-card">
              <form onSubmit={handleSubmit}>
                {/* <CardElement /> */}
                <div className="form-group">
                  <label>Card Holder Name</label>
                  <input
                    // type="email"
                    id="cardholderName"
                    className="form-control"
                    placeholder="Card Holder Name"
                  />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <CardElement
                    options={{
                      hidePostalCode: true,
                      style: customCardStyle,
                      // classes: "form-control card-img",
                    }}
                  />
                  <input
                    // type="email"
                    id="cardNumber"
                    maxLength={16}
                    minLength={16}
                    className="form-control card-img"
                    placeholder="****    ****    ****    ****"
                  />
                </div>
                <div className="grid-add-card">
                  <div className="exp-date">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="exp-date"
                      className="form-control"
                      placeholder="Month / Year"
                    />
                  </div>
                  <div className="exp-pass">
                    <label>CVV</label>
                    <input
                      id="cardCvv"
                      type="password"
                      name="cvc"
                      minLength={3}
                      maxLength={3}
                      className="form-control"
                      placeholder="***"
                    />
                  </div>
                </div>

                <button className="btn submit-add-card mt-3 mb-2" type="submit">
                  {" "}
                  Submit{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;

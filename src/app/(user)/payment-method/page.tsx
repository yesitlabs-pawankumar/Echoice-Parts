"use client"
import Image from "next/image";
import { useState } from "react";
import Dialog from "./components/Dialog";

const PaymentMethod = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="user-dashboard-data">
        <div className="user-payment-method">
          <div className="user-card-icon">
            <Image width={100} height={76} src="/images/user-dashboard/payment-method/card-info-icon.svg" alt="" />
          </div>
          <h1>You have no saved cards.</h1>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commod
            o ligula eget dolor.</p>
          <a href="#" onClick={() => setOpen(true)}>Add Card</a>
        </div>
      </div>

      <Dialog open={open} setOpen={setOpen} />
    </>
  );
}

export default PaymentMethod;
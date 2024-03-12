import { Modal, Box } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUB_KEY } from "@/constant/constant";
import CheckoutForm from "./checkoutForm";
const stripePromise = loadStripe(STRIPE_PUB_KEY!);

const AddCard = ({
  open,
  setOpen,
  callBack,
}: {
  open: boolean;
  setOpen: Function;
  callBack: Function;
}) => {
  // const options = {
  //   // mode: "payment",
  //   amount: amount,
  //   currency: "usd",

  //   appearance: {
  //     theme: "stripe",
  //   },
  // };

  return (
    <>
      <Modal open={open}>
        <Box>
          {/* {clientSecret && ( */}
          <Elements stripe={stripePromise}>
            <CheckoutForm setOpen={setOpen} callBack={callBack} />
          </Elements>
          {/* )} */}
        </Box>
      </Modal>
    </>
  );
};

export default AddCard;

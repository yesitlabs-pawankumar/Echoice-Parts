import { Modal, Box } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUB_KEY } from "@/constant/constant";
import CheckoutForm from "./checkoutForm";
const stripePromise = loadStripe(STRIPE_PUB_KEY!);

const AddCard = ({ open, setOpen }: { open: boolean; setOpen: Function }) => {
  const options = {
    // clientSecret,
    mode: "payment",
    amount: 1099,
    currency: "usd",
    // Fully customizable with appearance API.
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <>
      <Modal open={open}>
        <Box>
          {/* {clientSecret && ( */}
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm setOpen={setOpen} />
          </Elements>
          {/* )} */}
        </Box>
      </Modal>
    </>
  );
};

export default AddCard;

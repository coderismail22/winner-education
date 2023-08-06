import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../../hooks/useCart";
// TODO: Load Stripe With PK
const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);
const Payment = () => {
  const [cartData] = useCart();
  // console.log('cartData', cartData);
  const total = cartData.reduce(
    (preVal, currentVal) => preVal + parseFloat(currentVal.price),
    0
  );
  const totalPrice = parseFloat(total.toFixed(2));
  // console.log(totalPrice);
  return (
    <div className="p-5">
      <h1 className="font-bold text-2xl text-slate-600">Proceed to Checkout: <span className="text-slate-800">${totalPrice}</span></h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={totalPrice} cartData={cartData}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;

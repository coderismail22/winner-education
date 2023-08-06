import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider";
import "./CheckoutForm.css";

const CheckoutForm = ({ totalPrice, cartData }) => {
  const elements = useElements();
  const stripe = useStripe();
  const { user } = useContext(AuthContext);
  const [clientSecret, setclientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentId, setpaymentId] = useState("");
  // console.log("totalPrice", totalPrice);
  useEffect(() => {
    if (totalPrice > 0) {
      axios
        .post("https://assignment-12-server-chi-ten.vercel.app/create-payment-intent", { totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setclientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error fetching client secret:", error);
        });
    }
  }, [totalPrice]);
  // console.log(user);

  useEffect(() => {
    // console.log("paymentId", paymentId);
  }, [paymentId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("stripe", stripe);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // console.log("card", card);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Error:", error.message);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    } else {
      console.log(paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName || "anonymous",
            email: user.email || "unknown",
          },
        },
      });
    if (error) {
      console.log(confirmError);
    }
    if (paymentIntent) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setProcessing(true);

    if (paymentIntent.status === "succeeded") {
      setpaymentId(paymentIntent.id);
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        totalPrice,
        date: new Date(),
        quantity: cartData.length,
        cartItems: cartData.map((item) => item._id),
        menuItems: cartData.map((item) => item.courseId),
        itemNames: cartData.map((item) => item.name),
        itemImages: cartData.map((item) => item.image)
      };

      axios.post("https://assignment-12-server-chi-ten.vercel.app/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data) {
          // display confirm
          console.log("payment database success hit");
        }
      });
    }
    // Reset the form values using state
    elements.getElement(CardElement).clear();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary btn-sm "
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {paymentId && (
        <p className="text-green-500 font-bold m-2 text-2xl">
          Transaction ID: <span className="text-slate-500">{paymentId}</span>
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;

import usePayment from "../../../hooks/usePayment";

const PaymentHistory = () => {
  const [paymentData] = usePayment();
  // console.log(paymentData);
  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Payment History
      </h2>
      <ul className="space-y-4">
        {paymentData
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort payments in descending order by date
          .map((payment) => (
            <li key={payment._id} className="bg-white p-4 rounded shadow-md">
              <div>
                <span className="font-bold text-slate-500"> Date & Time:</span>{" "}
                {new Date(payment.date).toLocaleDateString()}{" "}
                {new Date(payment.date).toLocaleTimeString()}
              </div>
              <div>
                <span className="font-bold text-slate-500">Amount:</span> $
                {payment.totalPrice}
              </div>
              <div>
                <span className="font-bold text-slate-500">ID:</span>{" "}
                {payment.transactionId}
              </div>
              <div>
                <span className="font-bold text-slate-500">Quantity:</span>{" "}
                {payment.quantity}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PaymentHistory;

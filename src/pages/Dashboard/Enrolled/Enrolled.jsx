import EnrolledCard from "../../../componentChunks/EnrolledCard/EnrolledCard";
import usePayment from "../../../hooks/usePayment";

const Enrolled = () => {
  const [paymentData] = usePayment();
  return (
    <div className="p-4">
      <h1 className="text-center text-2xl text-slate-500 mb-5">Enrolled Classes:  <span className="font-bold">{paymentData.length}</span></h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center ">
        {/* <div className="grid gap-5 grid-cols-1 md:grid-cols-2"> */}
          {paymentData.map((item) => (
            <EnrolledCard key={item._id} item={item}></EnrolledCard>
            // Div 1 (3Cards)
            // Div 2 (2Cards)
          ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Enrolled;

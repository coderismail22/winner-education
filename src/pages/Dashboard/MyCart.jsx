import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const MyCart = () => {
  const [cartData, refetch] = useCart();
  // console.log(cartData);

  // Calculate total price:
  const totalPrice = cartData.reduce(
    (totalAcc, item) => totalAcc + item.price,
    0
  );
  // console.log("Total Price:", totalPrice);

  // HandleDelete:
  const handleDelete = async (itemId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Remove",
        denyButtonText: `Cancel`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          console.log(itemId);
          const response = await axios.delete(
            `https://assignment-12-server-six-black.vercel.app/cart/${itemId}`
          );
          console.log(response.data); // Item deleted successfully
          refetch();
        } else if (result.isDenied) {
          Swal.fire("Item not removed", "", "info");
        }
      });
    } catch (error) {
      console.error(error.response.data); // Error message if any
    }
  };

  return (
    <div>
      <div className="flex justify-around items-center my-2">
        <h1 className="text-2xl">Items: {cartData.length}</h1>
        <h1 className="text-2xl">Total Price: ${parseFloat(totalPrice)}</h1>
        <Link
          to="/dashboard/payment"
          className="btn btn-neutral text-yellow-500 "
        >
          Payment
        </Link>
      </div>
      <div className="overflow-x-auto text-center">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {cartData.map((item, index) => (
              <>
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="font-semibold">{item.name}</div>
                    </div>
                  </td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="CourseImage" />
                      </div>
                    </div>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => handleDelete(item._id)}>
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;

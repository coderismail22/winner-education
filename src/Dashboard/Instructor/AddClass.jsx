import { useContext } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  // const [axiosSecure]=useAxiosSecure()
  const handleAddClass = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.courseName.value;
    const image = form.courseImage.value;
    const instructor = user?.displayName;
    const email = user?.email;
    const price = parseFloat(form.price.value);
    const availableSeats = parseFloat(form.availableSeats.value);
    const students = parseFloat(0);

    const newCourse = {
      name,
      image,
      instructor,
      email,
      price,
      availableSeats,
      students,
      status: "pending",
    };

    {
      axios.post("https://assignment-12-server-chi-ten.vercel.app/addclass", newCourse).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: name + " " + "added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <div className="p-5">
      <Helmet>
        <title>Winner Education | Dashboard</title>
      </Helmet>
      <h1 className="text-center text-2xl text-slate-500 mb-5 uppercase underline">
        Add a Class
      </h1>

      <form onSubmit={handleAddClass}>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Course Name</span>
            </label>
            <input
              required
              type="text"
              placeholder="Course Name"
              name="courseName"
              className="input input-bordered input-info"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              required
              type="text"
              placeholder="Course Image"
              name="courseImage"
              className="input input-bordered input-info"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Instructor</span>
            </label>
            <input
              required
              type="text"
              readOnly
              defaultValue={user?.displayName}
              name="instructorName"
              placeholder="Instructor Name"
              className="input input-bordered input-info"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              required
              type="text"
              readOnly
              name="instructorMail"
              defaultValue={user?.email}
              placeholder="Seller Mail"
              className="input input-bordered input-info"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              required
              type="number"
              name="price"
              placeholder="Price"
              className="input input-bordered input-info"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Available Seats</span>
            </label>
            <input
              required
              type="number"
              name="availableSeats"
              placeholder="Available Seats"
              className="input input-bordered input-info"
            />
          </div>
        </div>
        <div className="form-control mt-6">
          <input className="btn btn-accent" type="submit" value="Post" />
        </div>
      </form>
      <div className="card-body"></div>
    </div>
  );
};

export default AddClass;

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateClassForm = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [axiosSecure]=useAxiosSecure()

  useEffect(() => {
    axiosSecure.get(`/getclass/${courseId}`).then((res) => {
      setCourse(res.data);
      setLoading(false);
    });
  }, [courseId]);

  const handleUpdateClass = (event) => {
    event.preventDefault();

    const form = event.target;
    const updatedCourse = {
      name: form.courseName.value,
      image: form.courseImage.value,
      price: parseFloat(form.price.value),
      availableSeats: parseFloat(form.availableSeats.value),
    };

    // console.log("field from form", updatedCourse);

    axiosSecure
      .put(`https://assignment-12-server-chi-ten.vercel.app/updateclass/${courseId}`, updatedCourse)
      .then((res) => {
        // console.log(res.data);
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "Course updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-5">
      <h1 className="text-center text-2xl text-slate-500 mb-5 uppercase underline">
        Update Course
      </h1>
      <form onSubmit={handleUpdateClass}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Course Name</span>
          </label>
          <input
            required
            type="text"
            placeholder="Course Name"
            name="courseName"
            defaultValue={course.name}
            className="input input-bordered input-info"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Course Image</span>
          </label>
          <input
            required
            type="text"
            placeholder="Course Name"
            name="courseImage"
            defaultValue={course?.image}
            className="input input-bordered input-info"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Instructor</span>
          </label>
          <input
            readOnly
            type="text"
            placeholder="Instructor"
            defaultValue={course?.instructor}
            className="input input-bordered input-info"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            readOnly
            type="text"
            placeholder="Email"
            defaultValue={course?.email}
            className="input input-bordered input-info"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            required
            type="text"
            placeholder="Course Name"
            name="price"
            defaultValue={course.price}
            className="input input-bordered input-info"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Available Seats</span>
          </label>
          <input
            required
            type="text"
            placeholder="Course Name"
            name="availableSeats"
            defaultValue={course.availableSeats}
            className="input input-bordered input-info"
          />
        </div>
        <div className="form-control mt-6">
          <input className="btn btn-accent" type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
};

export default UpdateClassForm;

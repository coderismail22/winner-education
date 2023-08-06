import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Pending = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [courses, setCourses] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [approved, setApproved] = useState(false);
  const [declined, setDeclined] = useState(false);
  const handleFeedbackChange = (courseId, value) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [courseId]: value, // Store the feedback value for the specific course
    }));
  };

  const handleApproveCourse = async (courseId) => {
    console.log("hit approve");

    await axios
      .post(`https://assignment-12-server-chi-ten.vercel.app/approveclass/${courseId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Approved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setApproved(true);
      });
  };

  const handleDeclineCourse = async (courseId, feedback) => {
    console.log("hit decline");

    await axios
      .post(`https://assignment-12-server-chi-ten.vercel.app/declineclass/${courseId}`, { feedback })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Declined",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setDeclined(true);
      });
    // Refresh data or update state to remove the declined course
  };

  useEffect(() => {
    // Fetch courses for the logged-in instructor
    axiosSecure
      .get('/instructor-courses-for-admin')
      .then((response) => {
        setCourses(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [user.email, axiosSecure]);
  return (
    <div className="p-5">
      <h1 className="text-center text-2xl text-slate-500 mb-5 uppercase underline">
        Pending Courses: <span className="font-bold">{courses.length}</span>
      </h1>
      <div className="grid gap-5 justify-center md:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course._id}
            className="card w-64 bg-slate-300 shadow-xl overflow-hidden"
          >
            <figure className="px-5 pt-5">
              <img
                src={course.image}
                alt={course.name}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center">
              <div className="text-left">
                <h2 className="card-title text-xl  font-bold uppercase mb-2">
                  {course.name}
                </h2>
                <h2 className="card-title text-sm ">
                  <span className="text-red-700">Ins:</span> {course.instructor}
                </h2>
                <h2 className="card-title text-sm ">
                  <span className="text-red-700">Email:</span> {course.email}
                </h2>
                <h2 className="card-title text-sm ">
                  <span className="text-red-700">Seats:</span>{" "}
                  {course.availableSeats}
                </h2>
                <h2 className="card-title text-sm ">
                  <span className="text-red-700">Price:</span> {course.price}
                </h2>
                <h2 className="card-title text-sm ">
                  <span className="text-red-700">Status:</span> {course.status}
                </h2>
              </div>

              <div className="divider"></div>

              <div className="flex gap-2">
                <button
                  disabled={approved}
                  onClick={() => handleApproveCourse(course._id)}
                  className="btn btn-xs btn-neutral hover:btn-success"
                >
                  <RxCheckCircled></RxCheckCircled>Approve
                </button>
                <button
                  disabled={declined}
                  onClick={() =>
                    handleDeclineCourse(course._id, feedback[course._id])
                  }
                  className="btn btn-xs btn-error hover:btn-warning"
                >
                  <RxCrossCircled></RxCrossCircled> Decline
                </button>
              </div>
              <div>
                <input
                  className="rounded-md p-2 mt-2"
                  type="text"
                  placeholder="Feedback for declination"
                  value={feedback[course._id]}
                  onChange={(e) =>
                    handleFeedbackChange(course._id, e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pending;

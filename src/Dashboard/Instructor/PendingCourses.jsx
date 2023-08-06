import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingCourses = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure]=useAxiosSecure()

  const [courses, setCourses] = useState([]);


  useEffect(() => {
    // Fetch courses for the logged-in instructor
    axiosSecure
      .get(`https://assignment-12-server-chi-ten.vercel.app/instructor-courses/${user.email}`)

      .then((response) => {
        setCourses(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [user.email]);
  return (
    <div className="p-5">
      <h1 className="text-center text-2xl text-slate-500 mb-5 uppercase underline">
        Pending Courses: <span className="font-bold">{courses.length}</span>
      </h1>      <div className="grid gap-5 justify-center md:grid-cols-3">
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
                  <span className="text-red-700">Seats:</span> {course.availableSeats}
                </h2>
                <h2 className="card-title text-sm ">
                  <span className="text-red-700">Price:</span> {course.price}
                </h2>
                <h2 className="card-title text-sm ">
                  <span className="text-red-700">Status:</span> {course.status}
                </h2>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingCourses;

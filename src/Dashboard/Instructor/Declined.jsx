import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { RxCrossCircled } from "react-icons/rx";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Declined = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses for the logged-in instructor
    axiosSecure
      .get(`https://assignment-12-server-chi-ten.vercel.app/instructor-declined-courses/${user.email}`)

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
        Declined Courses: <span className="font-bold">{courses.length}</span>
      </h1>
      <div className="grid justify-center gap-3 md:grid-cols-3">
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

            <div className="card-body items-center text-center">
              <h2 className="card-title text-xl italic font-bold ">
                {course.name}
              </h2>
              <div className="divider"></div>
              <p className="text-sm mt-2 font-bold text-red-500 ">
                Feedback: <br />
                <span className="text-gray-500">
                  {course.feedback || "No feedback provided"}
                </span>
                <div className="divider"></div>
              </p>
              <button className="btn btn-error mt-2">
                <RxCrossCircled></RxCrossCircled>Declined
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Declined;

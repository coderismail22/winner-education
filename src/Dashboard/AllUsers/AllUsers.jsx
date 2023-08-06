import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { FaChalkboardTeacher, FaUserLock } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [axiosSecure]=useAxiosSecure()
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("https://assignment-12-server-chi-ten.vercel.app/users");
    return res.data;
  });
  const [adminButtonDisabled, setAdminButtonDisabled] = useState(false);
  const [instructorButtonDisabled, setInstructorButtonDisabled] =
    useState(false);

  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`https://assignment-12-server-chi-ten.vercel.app/users/admin/${user.email}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is Admin Now`,
            showConfirmButton: true,
            timer: 1500,
          });
        }
      });
  };

  const handleMakeInstructor = (user) => {
    axiosSecure
      .patch(`https://assignment-12-server-chi-ten.vercel.app/users/instructor/${user.email}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is Instructor Now`,
            showConfirmButton: true,
            timer: 1500,
          });
        }
      });
  };


  return (
    <div>
      <Helmet>
        <title>Winner Education | Dashboard</title>
      </Helmet>
      <h1 className="text-center text-2xl text-slate-500 mb-5 uppercase underline">
        Manage Users: <span className="font-bold">{users.length}</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Admin</th>
              <th>Make Instructor</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user?.role === "instructor"
                    ? "Instructor"
                    : user?.role === "admin"
                    ? "Admin"
                    : "Student"}
                </td>
                <td>
                  {user.role === "instructor" ? (
                    <button
                      onClick={() => {
                        handleMakeAdmin(user);
                        setAdminButtonDisabled(true); // Disable admin button after making admin
                      }}
                      disabled={adminButtonDisabled} // Disable the button if admin button was clicked
                    >
                      <FaUserLock></FaUserLock>
                    </button>
                  ) : (
                    <span className="text-red-500">Not Available</span>
                  )}
                </td>
                <td>
                  {user.role === "admin" ? (
                    <span className="text-red-500">Not Available</span>
                  ) : (
                    <button
                      onClick={() => {
                        handleMakeInstructor(user);
                        setInstructorButtonDisabled(true); // Disable instructor button after making instructor
                      }}
                      disabled={instructorButtonDisabled} // Disable the button if instructor button was clicked
                    >
                      <FaChalkboardTeacher></FaChalkboardTeacher>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useContext } from "react";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="text-center md:flex items-center justify-between p-5 text-2xl ">
      <div className="text-center  text-blue-600  md:flex flex-row items-center">
        <Link className="inline-block" href="/">
          <img src={logo} alt="WinnerImg" className="w-11" />
        </Link>
        <Link className="font-bold" to="/">
          WinnerEducation
        </Link>
      </div>
      <div className="flex flex-col text-gray-600 font-sans font-semibold md:flex-row gap-5 ">
        <Link className=" hover:text-gray-900" to="/">
          Home
        </Link>
        <Link className=" hover:text-gray-900" to="/instructors">
          Instructors
        </Link>
        <Link className=" hover:text-gray-900" to="/classes">
          Classes
        </Link>
        {user ? (
          <div className="flex flex-col md:flex-row justify-evenly gap-5 ">
            <Link className=" hover:text-gray-900" to="/dashboard/home">
              Dashboard
            </Link>
            <Link className=" hover:text-gray-900">
              <button onClick={logOut}>Logout</button>
            </Link>
          </div>
        ) : (
          <Link to="/login" state={{ from: location.pathname }}>
            Login
          </Link>
        )}
        {user && (
          <div className="flex justify-center">
            <img
              className="inline-block hover:text-gray-900 w-10 rounded-full"
              title={user.displayName}
              src={user.photoURL}
              alt="Profile"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import {
  FaBackward,
  FaBars,
  FaBookReader,
  FaCartPlus,
  FaCircleNotch,
  FaHistory,
  FaHome,
  FaMoneyCheck,
  FaUserAlt,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import {
  RxCheckCircled,
  RxCircleBackslash,
  RxDashboard,
  RxPlusCircled,
} from "react-icons/rx";
import useInstructor from "../../hooks/useInstructor";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [isInstructor] = useInstructor();
  const [isAdmin] = useAdmin();
  const isStudent = !isAdmin && !isInstructor;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle " />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn btn-neutral drawer-button m-4 lg:hidden flex justify-center"
        >
          <FaBars></FaBars> Open drawer
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side" id="sidebar">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className="menu p-4 w-80  text-base-content h-full bg-slate-400 flex justify-between ">
          <ul>
            {isAdmin ? (
              <ul>
                <li className="mt-2">
                  <NavLink to="/dashboard/adminhome">
                    <FaHome></FaHome>Home
                  </NavLink>
                </li>
                <li className="mt-2">
                  <NavLink to="/dashboard/allusers">
                    <FaUserAlt></FaUserAlt>Manage Users
                  </NavLink>
                </li>
                <li className="mt-2">
                  <NavLink to="/dashboard/pendingclasses">
                    <FaCircleNotch></FaCircleNotch>Manage Classes
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul>
                {isInstructor && (
                  <ul>
                    <li className="mt-2">
                      <NavLink to="/dashboard/instructorhome">
                        <FaHome></FaHome>Home
                      </NavLink>
                    </li>
                    <li className="mt-2">
                      <NavLink to="/dashboard/addclass">
                        <RxPlusCircled></RxPlusCircled>Add a Class
                      </NavLink>
                    </li>
                    <li className="mt-2">
                      <NavLink to="/dashboard/myclasses">
                        <RxCheckCircled></RxCheckCircled>My Classes
                      </NavLink>
                    </li>

                    <li className="mt-2">
                      <NavLink to="/dashboard/pendingcourses">
                        <RxDashboard></RxDashboard>Pending Classes
                      </NavLink>
                    </li>
                    <li className="mt-2">
                      <NavLink to="/dashboard/declinedclasses">
                        <RxCircleBackslash></RxCircleBackslash>Declined Classes
                      </NavLink>
                    </li>
                  </ul>
                )}
                {isStudent && (
                  <ul>
                    <li className="mt-2">
                      <NavLink to="/dashboard/home">
                        <FaHome></FaHome>Home
                      </NavLink>
                    </li>
                    <li className="mt-2">
                      <NavLink to="mycart">
                        <FaCartPlus></FaCartPlus>My Cart
                      </NavLink>
                    </li>
                    <li className="mt-2">
                      <NavLink to="enrolled">
                        <FaBookReader></FaBookReader>Enrolled Courses
                      </NavLink>
                    </li>
                    <li className="mt-2">
                      <NavLink to="payment">
                        <FaMoneyCheck></FaMoneyCheck>Payment
                      </NavLink>
                    </li>
                    <li className="mt-2">
                      <NavLink to="payhistory">
                        <FaHistory></FaHistory>Payment History
                      </NavLink>
                    </li>
                  </ul>
                )}
              </ul>
            )}
          </ul>
          <ul>
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaBackward></FaBackward>Back to Main Page
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home/Home";
import NotFound from "../pages/sharedPages/NotFound/NotFound";
import Instructors from "../pages/Instructors/Instructors/Instructors";
import Classes from "../pages/Classes/Classes/Classes";
import Login from "../pages/sharedPages/Login/Login";
import Register from "../pages/sharedPages/Registration/Registration";
import Dashboard from "../layout/Dashboard/Dashboard";
import MyCart from "../pages/Dashboard/MyCart";
import StudentHome from "../pages/Dashboard/Student/StudentHome";
import Enrolled from "../pages/Dashboard/Enrolled/Enrolled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import Payment from "../pages/Dashboard/Payment/Payment";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import InstructorHome from "../pages/Dashboard/Instructor/InstructorHome";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import Pending from "../pages/Dashboard/Admin/Pending";
import Declined from "../pages/Dashboard/Instructor/Declined";
import PendingCourses from "../pages/Dashboard/Instructor/PendingCourses";
import Admin from "../pages/Dashboard/Admin/Admin";
import UpdateClassForm from "../pages/Dashboard/Instructor/UpdateClassForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "instructors",
        element: <Instructors />,
      },
      {
        path: "classes",
        element: <Classes />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // student routes
      {
        path: "home",
        element: <StudentHome />,
      },
      {
        path: "mycart",
        element: <MyCart />,
      },
      {
        path: "enrolled",
        element: <Enrolled />,
      },
      {
        path: "payhistory",
        element: <PaymentHistory />,
      },
      {
        path: "payment",
        element: <Payment />,
      },

      // instructor routes
      {
        path: "instructorhome",
        element: <InstructorHome></InstructorHome>,
      },
      {
        path: "addclass",
        element: <AddClass></AddClass>,
      },
      {
        path: "myclasses",
        element: <MyClasses></MyClasses>,
      },
      {
        path: "updateclass/:courseId",
        element: <UpdateClassForm></UpdateClassForm>,
      },
      {
        path: "declinedclasses",
        element: <Declined></Declined>,
      },
      {
        path: "pendingcourses",
        element: <PendingCourses></PendingCourses>,
      },

      // admin routes
      {
        path: "adminhome",
        element: (
          <AdminRoute>
            <Admin></Admin>
          </AdminRoute>
        ),
      },
      {
        path: "allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "pendingclasses",
        element: (
          <AdminRoute>
            <Pending></Pending>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

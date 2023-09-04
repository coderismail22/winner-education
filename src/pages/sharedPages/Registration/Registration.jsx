import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const [error,setError] = useState('')
  const { createUser } = useContext(AuthContext); // Destructure the signUp function from the AuthContext
  const navigate = useNavigate();
  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    const photoURL = form.photo.value;
    console.log(displayName, email, password, confirm, photoURL);
    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        const user = res.user;
        // Update user profile
        updateProfile(user, {
          displayName: displayName,
          photoURL: photoURL,
        })
          .then(() => {
            navigate("/");
            // User profile updated successfully
            console.log("User profile updated successfully");
            console.log(res.user.email);
            axios.post("https://assignment-12-server-six-black.vercel.app/users", {
              name: res.user.displayName,
              email: res.user.email,
            });
            console.log(res.user.email, res.user.displayName);

            return user; // Return the user object
          })
          .catch((error) => {
            // An error occurred while updating the user profile
            console.log(error.message);
            throw error; // Throw the error to be caught by the outer catch block
          });
      })
      .catch((error) => {
        // An error occurred while creating the user
        console.log(error.message);
        setError(error.message)
        throw error; // Throw the error to be caught by the outer catch block
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <Helmet>
        <title>Winner Education</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Registration</h1>
        </div>
        <div className="card flex-shrink-0 w-96 p-4 max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                className="input input-bordered"
                name="name"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                required
                placeholder="Email"
                className="input input-bordered"
                name="email"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                required
                placeholder="Password"
                className="input input-bordered"
                name="password"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                required
                placeholder="Password"
                className="input input-bordered"
                name="confirm"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Photo</span>
              </label>
              <input
                type="text"
                required
                placeholder="Photo URL"
                className="input input-bordered"
                name="photo"
              />
            </div>
            <div>
              <h1></h1>
            </div>
            <h1 className="text-red-500">{error}</h1>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>

            <SocialLogin></SocialLogin>
          </form>
          <div className="label">
            <p className="label">
              Already have an account?
              <Link to="/login" className="text-primary">
                Login.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

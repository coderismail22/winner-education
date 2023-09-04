import googleIcon from "../../../assets/logos/google.svg";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn();
    navigate(from, { replace: true });
    // .then((result) => {
    //   const loggedInUser = result.user;
    //   const saveUser = {
    //     name: loggedInUser.displayName,
    //     email: loggedInUser.email,
    //   };
    //   console.log(saveUser)
    //   axios
    //     .post("https://assignment-12-server-six-black.vercel.app/users", saveUser)
    //     .then((res) => res.json())
    //     .then(() => {
    //     });
    // });
  };

  return (
    <div className="form-control mt-6 ">
      <button onClick={handleGoogleSignIn} className="btn btn-outline ">
        Sign In With Google
        <img className="w-5 md:w-8 ml-2" src={googleIcon} alt="Google Icon" />
      </button>
    </div>
  );
};

export default SocialLogin;

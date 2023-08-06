import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const handleRedirectResult = async () => {
    await getRedirectResult(auth)
      .then(async (res) => {
        console.log(res.user.email);
        await axios.post("https://assignment-12-server-chi-ten.vercel.app/users", {
          name: res.user.displayName,
          email: res.user.email,
        });
        console.log(res.user.email, res.user.displayName);
        // Handle the successful sign-in result here, set user state, etc.
      })
      .catch((error) => {
        console.log(error.message);
        // Handle the error here
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // get and set token:
      if (user) {
        setUser(user);
        setLoading(false);
        axios
          .post("https://assignment-12-server-chi-ten.vercel.app/jwt", { user: user.email })
          .then((res) => {
            localStorage.setItem("access_token", res.data.token);
          });
      } else {
        localStorage.removeItem("access_token");
        setUser(null);
        setLoading(false);
      }
    });

    handleRedirectResult(); // Call the function to handle the redirect result

    return () => unsubscribe();
  }, [user]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const Admin = () => {
  const { user, loading } = useContext(AuthContext);
  return (
    <div>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        user && (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="rounded-full overflow-hidden border-4 border-primary">
              <img
                className="w-24 md:w-40"
                src={user.photoURL}
                alt="userImage"
              />
            </div>
            <div className="text-center mt-8">
              <h1 className="font-extrabold text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-pink-600">
                Welcome {user?.displayName}
              </h1>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Admin;

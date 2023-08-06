import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import axios from "../hooks/axiosConfig"
import useAxiosSecure from "./useAxiosSecure";
import axios from "axios";
const useCart = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: cartData = [] } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`https://assignment-12-server-chi-ten.vercel.app/cart?email=${user?.email}`);
      return res.data;
    },
  });
  return [cartData, refetch];
};

export default useCart;

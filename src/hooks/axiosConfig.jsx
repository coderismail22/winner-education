import axios from "axios";

axios.interceptors.request.use((config) => {
  // Get the access token from local storage
  const token = localStorage.getItem("access_token");

  // Attach the token to the Authorization header if it exists
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  console.log("Headers:", config.headers);
  return config;
});

export default axios;

import axios from "axios";
import { useEffect, useState } from "react";
import ClassCard from "../../../componentChunks/ClassCard/ClassCard";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);
  // const [axiosSecure]=useAxiosSecure()

  useEffect(() => {
    axios.get("https://assignment-12-server-chi-ten.vercel.app/allclasses").then((res) => {
      setClasses(res.data);
    });
  }, []);
  return (
    <div>
      <h1 className="text-center font-bold text-2xl text-gray-600 mt-5">
        --- Popular Classes ---
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 m-5 justify-center items-center">
        {classes
          .sort((a, b) => b.students - a.students) // Sort in descending order
          .slice(0, 6) // Get the first 6 elements
          .map((singleClass) => (
            <ClassCard item={singleClass} key={singleClass._id}></ClassCard>
          ))}
      </div>
    </div>
  );
};

export default PopularClasses;

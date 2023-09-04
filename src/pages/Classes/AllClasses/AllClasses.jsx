import axios from "axios";
import { useEffect, useState } from "react";
import ClassCard from "../../../componentChunks/ClassCard/ClassCard";

const AllClasses = () => {
  const [classes, setClasses] = useState([]);


  useEffect(() => {
    axios
      .get("https://assignment-12-server-six-black.vercel.app/allclasses")
      .then((res) => setClasses(res.data));
  }, []);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 m-5 justify-center items-center">
      {classes.map((classItem) => (
        <ClassCard item={classItem} key={classItem._id}></ClassCard>
      ))}
    </div>
  );
};

export default AllClasses;

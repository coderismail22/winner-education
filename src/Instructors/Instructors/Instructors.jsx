import axios from "axios";
import { useEffect, useState } from "react";
import InstructorCard from "../../../componentChunks/InstructorCard/InstructorCard";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios
      .get("https://assignment-12-server-chi-ten.vercel.app/allinstructors")
      .then((res) => setInstructors(res.data));
  }, []);
  return (
    <div className="grid grid-cols-2  md:grid-cols-5 gap-3 m-5">
      {instructors.map((instructor) => (
        <InstructorCard
          key={instructor._id}
          name={instructor.name}
          email={instructor.email}
          image={instructor.image}
        ></InstructorCard>
      ))}
    </div>
  );
};

export default Instructors;

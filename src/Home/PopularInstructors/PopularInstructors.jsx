import axios from "axios";
import { useEffect, useState } from "react";
import InstructorCard from "../../../componentChunks/InstructorCard/InstructorCard";

const PopularInstructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios
      .get("https://assignment-12-server-chi-ten.vercel.app/allinstructors")
      .then((res) => setInstructors(res.data));
  }, []);
  return (
    <div className="mx-5">
      <h1 className="text-center font-bold text-2xl text-gray-600 mt-5">
        --- Popular Instructors ---
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 justify-center items-center">
        {instructors
          .sort((a, b) => b.students - a.students)
          .slice(0, 6)
          .map((instructor) => (
            <InstructorCard
              key={instructor._id}
              name={instructor.name}
              image={instructor.image}
              email={instructor.email}
              students={instructor.students}
            ></InstructorCard>
          ))}
      </div>
    </div>
  );
};

export default PopularInstructors;

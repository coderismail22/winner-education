import axios from "axios";
import { useEffect, useState } from "react";
import InstructorCard from "../../../componentChunks/InstructorCard/InstructorCard";
import { css } from "@emotion/react"; // Import CSS for react-spinners
import { ClipLoader } from "react-spinners"; // Import the spinner component

const PopularInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios
      .get("https://assignment-12-server-six-black.vercel.app/allinstructors")
      .then((res) => {
        setInstructors(res.data);
        setLoading(false); // Set loading to false when data is fetched
      });
  }, []);

  // Define CSS for the spinner
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="mx-5">
      <h2 className="uppercase my-7 font-sans text-2xl md:text-3xl font-bold text-center text-blue-900 sm:text-4xl">
        Popular Instructors
      </h2>
      {/* Show spinner while loading */}
      {loading ? (
        <div className="text-center">
          <ClipLoader color={"#123abc"} loading={loading} css={override} size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 justify-center items-center">
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
      )}
    </div>
  );
};

export default PopularInstructors;

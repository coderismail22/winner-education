import axios from "axios";
import { useEffect, useState } from "react";
import ClassCard from "../../../componentChunks/ClassCard/ClassCard";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios
      .get("https://assignment-12-server-six-black.vercel.app/allclasses")
      .then((res) => {
        setClasses(res.data);
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
    <div>
      <h2 className="uppercase my-7 font-sans text-2xl  md:text-3xl font-bold text-center text-blue-900 sm:text-4xl">
        Popular Classes
      </h2>
      {/* Show spinner while loading */}
      {loading ? (
        <div className="text-center">
          <ClipLoader color={"#123abc"} loading={loading} css={override} size={50} />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 m-5 justify-center items-center">
          {classes
            .sort((a, b) => b.students - a.students) // Sort in descending order
            .slice(0, 6) // Get the first 6 elements
            .map((singleClass) => (
              <ClassCard item={singleClass} key={singleClass._id}></ClassCard>
            ))}
        </div>
      )}
    </div>
  );
};

export default PopularClasses;

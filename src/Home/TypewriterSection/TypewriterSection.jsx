import { useTypewriter, Cursor } from "react-simple-typewriter";

const TypewriterSection = () => {
  const [text] = useTypewriter({
    words: ["Photographers", "Designers", "Skillful"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 100 ,
  });
  return (
    <div>
      <h1 className="text-center text-4xl">
        We make <span className="font-bold text-red-500">{text}</span>{" "}
        <span className="font-bold text-red-500">
          <Cursor cursorStyle="_"></Cursor>
        </span>
      </h1>
    </div>
  );
};

export default TypewriterSection;

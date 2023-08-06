const InstructorCard = ({ name, image, email, students }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-40">
        <img
          src={image}
          alt="instructorImage"
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>
        <p className="text-xs text-gray-600 mb-2">
          Students: <span className="font-bold">{students}</span>
        </p>
        <p className="text-xs text-gray-500">Email: {email}</p>
        <div className="mt-2">
          <button className="btn btn-primary btn-sm">See Classes</button>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;

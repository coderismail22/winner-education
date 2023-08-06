const EnrolledCard = ({ item }) => {
  const { itemNames, itemImages } = item;
  return (
    <>
      {item.itemImages.map((image, index) => (
        <div key={index} className="card  w-64 bg-slate-300 shadow-xl">
          <figure className="px-5 pt-5">
            <img
              src={image}
              alt={item.itemNames[index]}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-lg font-bold ">
              {item.itemNames[index]}
            </h2>
            <div className="card-actions ">
              <button className="btn btn-neutral">Classes</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default EnrolledCard;

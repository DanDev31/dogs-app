import { Link } from "react-router-dom";

export const DogCard = ({ id, name, image, temperament, weight }) => {
  return (
    <Link to={`/dogs/dog/${id}`} className="dog__card-link">
      <div className="dog__card">
        <h3 className="dog__card-title">{name}</h3>
        <div className="dog__card-img">
          <img
            src={image.hasOwnProperty("url") ? image.url : image}
            alt="Dog img"
          />
        </div>
        <div className="dog__card-info">
          <p>{weight.hasOwnProperty("metric") ? weight.metric : weight} Kgs</p>
          <p>{temperament}</p>
        </div>
      </div>
    </Link>
  );
};

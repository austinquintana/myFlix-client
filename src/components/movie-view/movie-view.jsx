import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
    <div className="movie-view">
      <div className="movie-container">
        <img className="w-100 movie-image" src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
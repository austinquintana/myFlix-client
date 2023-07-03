import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./movie-view.scss";
import { addFavorite, deleteFavorite } from "../../api.js";

export const MovieView = ({ movies, user, updateUserInfo }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const p = useParams();
  const movie = movies.find((m) => m._id === p.id);
  if (!movie) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (user.favoriteMovies && movie._id) {
      setIsFavorite(user.favoriteMovies.includes(movie._id));
    }
  }, [user, movie]);

  return (
    <div className="movie-view">
      <div className="movie-container">
        <img
          className="w-50 movie-image"
          src={movie.ImagePath}
          alt={movie.Title}
        />
      </div>
      <div>
        <h2>{movie.Title}</h2>
      </div>
      <div>
        <h4>Plot: </h4>
        <p>{movie.Description}</p>
      </div>
      <div>
        <h4>Director: </h4>
        <p>{movie.Director.Name}</p>
      </div>
      <div>
        <h4>Biography of the director: </h4>
        <p>{movie.Director.Bio}</p>
      </div>
      <div>
        <h4>Birth Year: </h4>
        <p>{movie.Director.Birth}</p>
      </div>
      <div>
        <h4>Genre: </h4>
        <p>{movie.Genre.Name}</p>
      </div>
      <div>
        <h4>Genre Description: </h4>
        <p>{movie.Genre.Description}</p>
      </div>
      {isFavorite ? (
        <Button
          onClick={() => deleteFavorite(updateUserInfo, user.Username, movie)}
          variant="warning"
          className="m-3"
        >
          Remove from favorites
        </Button>
      ) : (
        <Button
          onClick={() => addFavorite(updateUserInfo, user.Username, movie)}
          variant="success"
          className="m-3"
        >
          Add to favorites
        </Button>
      )}
      <Link to={`/`}>
        <button className="back-button m-3">Back</button>
      </Link>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";
import { addFavorite, deleteFavorite } from "../../api.js";

export const MovieCard = ({ movie, user, updateUserInfo }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  useEffect(() => {
    if (user.favoriteMovies && movie._id) {
      setIsFavorite(user.favoriteMovies.includes(movie._id));
    }
  }, [user, movie]);

  return (
    <div className="movie-card-container">
      <Card className="movie-card">
        <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
        </Card.Body>

        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button
            className="border text-blue font-bold bg-gray-300 m-4"
            variant="link"
          >
            See more
          </Button>
        </Link>

        {isFavorite ? (
          <Button
            onClick={() => deleteFavorite(updateUserInfo, user.Username, movie)}
            variant="warning"
            className="m-3"
          >
            Remove
          </Button>
        ) : (
          <Button
            onClick={() => addFavorite(updateUserInfo, user.Username, movie)}
            variant="success"
            className="m-3"
          >
            Add
          </Button>
        )}
      </Card>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MovieCard;

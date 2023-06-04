import React from 'react';
import PropTypes from 'prop-types';
import { Link } from'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';


export const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card-container">
      <Card className="movie-card">
        <Card.Img variant='top' src={movie.ImagePath} alt={movie.Title} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button className="border text-blue font-bold bg-gray-300" variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MovieCard;
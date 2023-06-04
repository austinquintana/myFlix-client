import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';


export const MovieCard = ({ movie, user, updateUserInfo }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  //  useEffect(() => {
  // //   if (user.favoriteMovies && movie._id) {
  // //     setIsFavorite(user.favoriteMovies.includes(movie._id))
  // //   }
  // // }, [movie]);

  const addFavorite = () => {

    const token = localStorage.getItem('token');

    fetch(`https://localhost:8080/users/${user.userName}/movies/${movie._id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Fail');
        }
      })
      .then((user) => {
        if (user) {
          alert(`You successfully added the movie '${movie.title}' to your favorites list.`);
          setIsFavorite(true);
          updateUserInfo(user);
        }
      })
      .catch((error) => {
        alert('Error message: ' + error);
      });
  };

  const deleteFavorite = () => {

    const token = localStorage.getItem('token');

    fetch(`https://localhost:8080/users/${user.userName}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Something went wrong.');
        }
      })
      .then((user) => {
        if (user) {
          alert(`You deleted the movie '${movie.title}' off of your favorites list.`);
          setIsFavorite(false);
          updateUserInfo(user);
        }
      })
      .catch((error) => {
        alert('Error message: ' + error);
      });
  };

  return (
    <div className="movie-card-container">
      <Card className="movie-card">
        <Card.Img variant='top' src={movie.ImagePath} alt={movie.Title} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
        </Card.Body>
          
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button className="border text-blue font-bold bg-gray-300" variant="link">See more</Button>
          </Link>
        
          {isFavorite
        ? (<Button onClick={deleteFavorite} variant='warning' className='m-3'>Remove from favorites</Button>)
        : (<Button onClick={addFavorite} variant='success' className='m-3'>Add to favorites</Button>)
      }
      </Card>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genres: PropTypes.shape({
      genreName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    director: PropTypes.shape({
      directorName: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MovieCard;
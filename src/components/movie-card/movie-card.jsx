import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';


export const MovieCard = ({ movie, user, updateUserInfo }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
   useEffect(() => {
    if (user.favoriteMovies && movie._id) {
      setIsFavorite(user.favoriteMovies.includes(movie._id))
    }
  }, [user, movie]);
  const apiURL = process.env.API_URL || 'http://localhost:8080';
  const addFavorite = () => {

    const token = localStorage.getItem('token');
    console.log(user);
    fetch(`${apiURL}/users/${user.Username}/movies/${movie._id}`, {
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
      .then((updateUser) => {
        console.log(updateUser);
        if (updateUser) {
          alert(`You successfully added the movie '${movie.Title}' to your favorites list.`);
          // setIsFavorite(true);
          updateUserInfo(updateUser);
        }
      })
      .catch((error) => {
        alert('Error message: ' + error);
      });
  };

  const deleteFavorite = () => {

    const token = localStorage.getItem('token');

    fetch(`${apiURL}/users/${user.Username}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
          alert('Something went wrong.');
        }
      })
      .then((user) => {
        if (user) {
          alert(`You deleted the movie '${movie.Title}' off of your favorites list.`);
          // setIsFavorite(false);
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
          
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
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
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      GenreName: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      DirectorName: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MovieCard;
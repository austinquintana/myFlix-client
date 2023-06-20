import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./movie-view.scss";
import { addFavorite, deleteFavorite } from '../../api.js';

export const MovieView = ({ user, movies, updateUserInfo }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
   useEffect(() => {
    if (user.favoriteMovies && movie._id) {
      setIsFavorite(user.favoriteMovies.includes(movie._id))
    }
  }, [user]);
  const p = useParams();
  const movie = movies.find( m => m._id === p.id);

  useEffect(() => {
    if (user.favoriteMovies && movie._id) {
      setIsFavorite(user.favoriteMovies.includes(movie._id))
    }
  }, [movie]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-view">
      <div className="movie-container">
        <img className="w-100 movie-image" src={movie.ImagePath} alt={movie.Title} />
      </div>
      <div>
        <h2>{movie.Title}</h2>
      </div>
      <div>
        <h4>Plot: </h4>
        <p>{movie.Description}</p>
      </div>
      {isFavorite
        ? (<Button onClick={() => deleteFavorite(updateUserInfo, user.Username, movie)} variant='warning' className='m-3'>Remove from favorites</Button>)
        : (<Button onClick={() => addFavorite(updateUserInfo, user.Username, movie)} variant='success' className='m-3'>Add to favorites</Button>)
      }

        {/* <div>
          <h4>Director</h4>
          <p>{movie.Director.directorName}</p>
          <h4>More details about {movie.director.directorName}</h4>
          <p>{movie.Director.bio}</p>
          <h4>Genre</h4>
          <p>{movie.Genre.genreName}</p>
          <h4>More details about {movie.genre.genreName}</h4>
          <p>{movie.Genre.description}</p>
        </div> */}
      <Link to={`/`}>
        <button className="back-button border text-white bg-black">Back</button>
      </Link>

    </div>
  );
};
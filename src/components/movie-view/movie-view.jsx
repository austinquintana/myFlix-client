import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ user, movies, updateUserInfo }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const p = useParams();
  const movie_id = "";
  console.log(p);
  const movie = movies.find( m => m._id === movie_id);
  console.log(movie_id);
  const apiURL = process.env.API_URL || 'http://localhost:8080';

  console.log('Movie ID from URL:', movie_id);
  console.log('Movies:', movie);

  if (movie) {
    console.log('Found movie:', movie);
    console.log('Movie ID:', movie._id);
  } else {
    console.log('No movie found');
  }

  useEffect(() => {
    if (user.favoriteMovies && movie._id) {
      setIsFavorite(user.favoriteMovies.includes(movie._id))
    }
  }, [movie]);

  const deleteFavorite = () => {

    const token = localStorage.getItem("token");

    fetch(`${apiURL}/users/${user.Username}/${movie.Title}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Something went wrong.");
        }
      })
      .then((user) => {
        if (user) {
          alert(`You deleted the movie '${movie.Title}' off of your favorites list.`);
          setIsFavorite(false);
          updateUserInfo(user);
        }
      })
      .catch((error) => {
        alert("Error message: " + error);
      });
  };

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
            ? (
              <Button
                onClick={deleteFavorite}
                variant="warning"
                className="movie-fav-button mt-4">
                Remove from List
              </Button>
            )
            : (
              <Button
                onClick={addFavorite}
                variant="success"
                className="movie-fav-button mt-4">
                Add to favorites
              </Button>
            )
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
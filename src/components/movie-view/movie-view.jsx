import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ user, movies, updateUserInfo }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  useEffect(() => {
    if (user.favoriteMovies && movie._id) {
      setIsFavorite(user.favoriteMovies.includes(movie._id))
    }
  }, [movie]);

  const addFavorite = () => {

    const token = localStorage.getItem("token");

    fetch(`https://localhost:8080/users/${user.userName}/movies/${movie._id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Fail");
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
        alert("Error message: " + error);
      });
  };

  const deleteFavorite = () => {

    const token = localStorage.getItem("token");

    fetch(`https://localhost:8080/users/${user.userName}/movies/${movie._id}`, {
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
          alert(`You deleted the movie '${movie.title}' off of your favorites list.`);
          setIsFavorite(false);
          updateUserInfo(user);
        }
      })
      .catch((error) => {
        alert("Error message: " + error);
      });
  };

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
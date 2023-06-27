import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import "./favorite-movies.scss";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ user, movie, updateUserInfo, favoriteMovies }) => {
  const storedData = JSON.parse(localStorage.getItem("user"));
  const favorites = storedData && storedData.favoriteMovies ? storedData.favoriteMovies : [];
  const removeFav = (id) => {};

  return (
    <div className="fav-movie-container">
      <h2 className="my-custom-class">Favorite Movies</h2>
      <Row>
          {favorites.map((movie) => (
              <Col xs={12} md={6} lg={4} xl={3} xxl={2} key={movie._id}>
                <img src={movie.ImagePath} />
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button className="border text-blue font-bold bg-gray-300 m-4" onClick={() => removeFav(movie._id)}>Remove from list</Button>
                </Link>
                  <MovieCard movie={movie} user={user} updateUserInfo={updateUserInfo} favoriteMovies={favoriteMovies}/>
              </Col>
                ))}
      </Row>
    </div>
  );
};
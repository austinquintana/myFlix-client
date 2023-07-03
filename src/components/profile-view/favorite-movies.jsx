import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./favorite-movies.scss";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ user, movies, updateUserInfo }) => {
  const storedData = JSON.parse(localStorage.getItem("user"));
  const favorites = user.favoriteMovies || [];
  const favoriteMovies = movies.filter((m) => favorites.includes(m._id));

  return (
    <div>
      <h2 className="my-custom-class">Favorite Movies</h2>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col
            xs={12}
            md={6}
            lg={3}
            xl={2}
            key={movie._id}
            className="fav-movie-container"
          >
            <MovieCard
              movie={movie}
              user={user}
              updateUserInfo={updateUserInfo}
              favoriteMovies={favoriteMovies}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

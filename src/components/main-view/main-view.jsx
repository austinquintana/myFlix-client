import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Row, Col, Container, Form } from "react-bootstrap";

import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";

const apiURL = process.env.API_URL || "http://localhost:8080";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [viewMovies, setViewMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (!token) return;

    fetch(`${apiURL}/movies`, {
      headers: 
      { Authorization: `Bearer ${token}` },
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    })
      .then((response) => response.json())
      .then((moviesFromApi) => {
        console.log(moviesFromApi);
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.log("Error fetching movies:", error);
      });
  }, [token]);

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  // always start from the complete movies array
  // movies is the comprehensive storage of all movies
  // setFilteredMovies call tempArray, that has just the movies that have the searchQuery in the title
  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    let tempArray = movies.filter(
      (movie) => movie.Title && movie.Title.toLowerCase().includes(searchQuery)
    );
    setFilteredMovies(tempArray);
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }}
        onSearch={(query) => {
          setFilteredMovies(
            movies.filter((movie) =>
              movie.title.toLowerCase().includes(query.toLowerCase())
            )
          );
        }}
      />
      <Container>
        <Row className="justify-content-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={6}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={6}>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                          localStorage.setItem("user", JSON.stringify(user));
                          localStorage.setItem("token", token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/user"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <ProfileView
                      user={user}
                      token={token}
                      movies={movies}
                      onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                      updateUserInfo={updateUser}
                    />
                  )}
                </>
              }
            />
            <Route
              path="/movies/:id"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col style={{ color: "white" }}>
                      <p>The list is empty. Loading data from api...</p>
                    </Col>
                  ) : (
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      updateUserInfo={updateUser}
                    />
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col style={{ color: "white" }}>
                      <p>The list is empty. Loading data from api...</p>
                    </Col>
                  ) : (
                    <>
                      <Col xs={12} className="justify-content-md-center">
                        <Form xs={12} className="mt-5 mb-3 pt-5 w-100">
                          <Form.Control
                            type="search"
                            placeholder="Search by title"
                            className="movie-search"
                            aria-label="Search"
                            onChange={handleSearch}
                          />
                        </Form>
                      </Col>
                      {filteredMovies.map((movie) => (
                        <Col
                          className="mb-4"
                          key={movie._id}
                          xl={2}
                          lg={3}
                          md={4}
                          xs={6}
                        >
                          <MovieCard
                            movie={movie}
                            user={user}
                            updateUserInfo={updateUser}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

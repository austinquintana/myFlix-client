import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import {Row, Col, Container} from 'react-bootstrap';


import { NavigationBar } from '../navigation-bar/navigation-bar';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [viewMovies, setViewMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
  // const apiURL = process.env.API_URL || 'http://localhost:8080/';


  const updateUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
} 

  useEffect(() => {
    if (!token) return;


    fetch('http://localhost:8080/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            ImagePath: movie.imagePath,
            Director: {
              Name: movie.Director.firstName,
              Bio: movie.Director.Bio,
            },
            Description: movie.Description,
            Year: movie.Year,
            Genres: movie.Genres,
            Featured: movie.Featured
          };
        });


        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.log('Error fetching movies:', error);
      });
  }, [token]);


  return (
    <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    // localStorage.clear();
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                }}
                onSearch={(query) => {
                    setViewMovies
                    (movies.filter((movie) => 
                        movie.title.toLowerCase().includes(query.toLowerCase())));
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
                            path="/users"
                            element={
                                <>
                                !user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <ProfileView user={user} token={token} movies={movies} onLoggedOut={() => {
                                        setUser(null);
                                        setToken(null);
                                        localStorage.clear();
                                    }} updateUser={updateUser}/>
                                )
                                </>
                            }
                        />
                        <Route
                            path="/movies/:movieId"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? ( 
                                        <Col style={{color: "white"}}><p>The list is empty. Loading data from api...</p></Col>
                                    ) : (
                                        <MovieView movies={movies} user={user} token={token} updateUser={updateUser}/>
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
                                        <Col style={{color: "white"}}><p>The list is empty. Loading data from api...</p></Col>
                                    ) : (
                                        <>
                                            {movies.map(movie => (
                                                <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
                                                    <MovieCard movie={movie} />
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
    

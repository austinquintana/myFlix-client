Objective: 

Using React, build the client-side for an app called myFlix based on its
existing server-side code (REST API and database).

Demo: 

View the app here: https://moviesdbaq.netlify.app/

User Stories:

● As a user, I want to be able to access information about movies so that I can learn more
about movies I’ve watched or am interested in.
● As a user, I want to be able to create a profile so I can save data about my favorite movies.

Key Features: 

Main view
● Returns ALL movies to the user (each movie item with an image, title, and description)
● Filtering the list of movies with a “search” feature
● Ability to select a movie for more details
● Ability to log out
● Ability to navigate to Profile view
Page 2

Single Movie view
● Returns data (description, genre, director, image) about a single movie to the user
● Allows users to add a movie to their list of favorites

Login view
● Allows users to log in with a username and password

Signup view
● Allows new users to register (username, password, email, date of birth)

Profile view
● Displays user registration details
● Allows users to update their info (username, password, email, date of birth)
● Displays favorite movies
● Allows users to remove a movie from their list of favorites
● Allows existing users to deregister

Getting Started: 

Tech Stack:

React
JSX
Bootstrap
Parcel as the build tool

Development Environment:

npm install -g parcel
npm install -save react react-dom
create a src folder in project directory with three files: index.jsx, index.scss, index.html
run parcel src/index.html in terminal to begin parcel build
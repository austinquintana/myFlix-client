const apiURL = process.env.API_URL || 'http://localhost:8080';
export const addFavorite = ( updateUserInfo, username, movie ) => {

    const token = localStorage.getItem('token');
    fetch(`${apiURL}/users/${username}/movies/${movie._id}`, {
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

export const deleteFavorite = ( updateUserInfo, username, movie ) => {

    const token = localStorage.getItem('token');

    fetch(`${apiURL}/users/${username}/movies/${movie._id}`, {
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
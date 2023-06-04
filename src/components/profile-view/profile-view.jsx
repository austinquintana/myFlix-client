import { UserInfo } from './user-info';
import { UserUpdate } from './user-update';
import { FavoriteMovies } from './favorite-movies';

// as user state and updateUserInfo function is defined in MainView:
// user can be used to display the user in UserInfo
// updateUserInfo can be used to update UserUpdate and UserMovieList
// also: movies can be used to pass all movies to UserMovielist
export const ProfileView = ({ user, updateUserInfo, movies }) => {

  return (
    <>
      <h2>User Profile</h2>
      <UserInfo user={user}/>
      <br />
      <UserUpdate updateUserInfo={updateUserInfo} />
      <br />
      <FavoriteMovies updateUserInfo={updateUserInfo} movies={movies} user={user} />
    </>
  )
};
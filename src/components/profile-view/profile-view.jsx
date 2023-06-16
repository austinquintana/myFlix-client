import { UserInfo } from './user-info';
import { UserUpdate } from './user-update';
import { FavoriteMovies } from './favorite-movies';

// as user state and updateUserInfo function is defined in MainView:
// user can be used to display the user in UserInfo
// updateUserInfo can be used to update UserUpdate and UserMovieList
// also: movies can be used to pass all movies to UserMovielist
export const ProfileView = ({ user, updateUser, movies }) => {

  return (
    <div className="mt-5">
      <h2>Your registration details: </h2>
      <UserInfo user={user}/>
      <br />
      <UserUpdate updateUser={updateUser} />
      <br />
      <FavoriteMovies updateUser={updateUser} movies={movies} user={user} />
    </div>
  )
};
import { UserInfo } from './user-info';
import { UserUpdate } from './user-update';
import { FavoriteMovies } from './favorite-movies';

// as user state and updateUserInfo function is defined in MainView:
// user can be used to display the user in UserInfo
// updateUserInfo can be used to update UserUpdate and UserMovieList
// also: movies can be used to pass all movies to UserMovielist
export const ProfileView = ({ user, movies, updateUserInfo, token }) => {

  return (
    <div className="mt-5 pt-5">
      <h2>Your registration details: </h2>
      <UserInfo user={user}/>
      <br />
      <UserUpdate token={token} user={user} updateUserInfo={updateUserInfo} />
      <br />
      <FavoriteMovies user={user} movies={movies} updateUserInfo={updateUserInfo}  />
    </div>
  
  )
};
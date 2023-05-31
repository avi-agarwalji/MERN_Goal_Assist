import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useLogout } from '../hooks/useLogout';

function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  // handle logout functionality when logout button clicked.
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    // Navbar
    <div className="navbar">
      {/* navbar logo */}
      <NavLink className="navbar__logo" to="/">
        Goal Assist
      </NavLink>
      <div className="navbar__links">
        {/* navbar links when user is logged in */}
        {user && (
          <div>
            <span className="navbar__user">{user.name}</span>
            <NavLink
              className="navbar__link navbar__link--spacing"
              to=""
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          </div>
        )}
        {/* navbar links when user is not logged in */}
        {!user && (
          <>
            {/* sign in link to login existing user */}
            <NavLink className="navbar__link" to="/signin">
              Signin
            </NavLink>
            {/* sign up link to register new user */}
            <NavLink
              className="navbar__link navbar__link--spacing"
              to="/signup"
            >
              Signup
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}
export default Navbar;

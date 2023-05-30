import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <NavLink className="navbar__logo" to="/">
        Goal Assist
      </NavLink>
      <div className="navbar__links">
        <NavLink className="navbar__link navbar__link--spacing" to="/signin">
          Signin
        </NavLink>
        <NavLink className="navbar__link" to="/signup">
          Signup
        </NavLink>
      </div>
    </div>
  );
}
export default Navbar;
